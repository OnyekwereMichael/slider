'use server'
import { auth } from '@clerk/nextjs/server'
import OpenAI from 'openai'
import { prisma } from '@/lib/prisma'
export const generateCreativePrompt = async (userPrompt: string) => {
    const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY })
    const finalPrompt = `
     Create a coherent and relevant outline for the following prompt: ${userPrompt}.
     The outline should consist of at least 6 points, with each point written as a single sentence.
     Ensure the outline is well-structured and directly related to the topic.
     Return the output in the following JSON format:
     {
        "outlines": [
           "point 1",
           "point 2",
           "point 3",
           "point 4",
           "point 5",
           "point 6"
        ]
     }

     Ensure that the JSON is valid and properly formatted. Do not include any additional text or explanation outside the JSON.
   `

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: 'You are a helpful AI that generates outlines for presentation slides' },
                { role: "user", content: finalPrompt }
            ],
            response_format: { type: "json_object" },
            max_tokens: 1000,
            temperature: 0.0,
        })
        let responseContent = completion.choices[0].message?.content;
        if (!responseContent) {
            return { status: 400, error: 'No response content received' };
        }

        // Clean up markdown code block wrappers if present
        responseContent = responseContent.replace(/^```json\s*/i, "").replace(/```$/, "").trim();

        try {
            const jsonResponse = JSON.parse(responseContent);
            return { status: 200, data: jsonResponse };
        } catch (error) {
            console.error('Invalid JSON received', error);
            return { status: 500, error: 'Failed to parse response' };
        }

    } catch (error) {
        console.log(error)
        return { status: 500, error: 'Failed to generate outline' };
    }
}

export const generateLayoutsJson = async (outlines: string[]) => {
    const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY })

    const prompt = `
You are an expert presentation designer. Given the following slide outline topics, generate a JSON array of slide objects.

Outline topics:
${outlines.map((o, i) => `${i + 1}. ${o}`).join('\n')}

Return a JSON array where each element represents one slide and follows this exact structure:
{
  "id": "<unique string id>",
  "SlideName": "<slide title>",
  "SlideOrder": <1-based integer>,
  "types": "title" | "content" | "imageAndText" | "blank",
  "className": "min-h-[200px]",
  "content": {
    "id": "<unique string id>",
    "type": "column",
    "name": "Column",
    "content": [
      {
        "id": "<unique string id>",
        "type": "heading1" | "heading2" | "paragraph" | "bulletList" | "image" | "resizable-column",
        "name": "Heading" | "Paragraph" | "Bullet List" | "Image",
        "content": "<detailed content value based on component type>",
        "restrictToDrop": false,
        "bgColor": "transparent",
        "isTransparent": true
      }
    ],
    "restrictToDrop": false,
    "bgColor": "transparent",
    "isTransparent": true
  }
}

Important Rules for the "content" field based on component type:
1. For text components ("heading1", "heading2", "paragraph"):
   - "content" MUST be a single string (the text content).
2. For "bulletList" component type:
   - "content" MUST be a JSON array of strings, e.g., ["point 1", "point 2", "point 3"].
3. For "image" component type:
   - "content" MUST be a single string containing a realistic unsplash image URL.
4. For "resizable-column" component type:
   - "content" MUST be a JSON array containing exactly two Column components (type: "column", name: "Column").
   - The first Column component's "content" field MUST be a JSON array of text components (like "heading2", "paragraph" or "bulletList").
   - The second Column component's "content" field MUST be a JSON array containing an "image" component.

General Rules:
- The first slide should be a "title" type with a heading1 and a subtitle paragraph.
- Subsequent slides should alternate between "content" (with heading2 + bulletList or paragraph) and "imageAndText" types.
- For "imageAndText" slides, the main content should be a "resizable-column" that follows the rules above.
- Each slide must have a clear, concise SlideName derived from the outline topic.
- Do NOT wrap the JSON in markdown code fences. Return only the raw JSON array.
- Generate exactly ${outlines.length} slides, one for each outline topic.
`

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: 'You are a presentation slide layout generator. Return only valid JSON.' },
                { role: 'user', content: prompt }
            ],
            max_tokens: 4000,
            temperature: 0.3,
        })

        let responseContent = completion.choices[0].message?.content
        if (!responseContent) {
            return { status: 400, error: 'No response content received from AI' }
        }

        // Strip markdown code fences the model sometimes wraps output in
        responseContent = responseContent.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/g, '').trim()

        try {
            const data = JSON.parse(responseContent)
            return { status: 200, data }
        } catch (parseError) {
            console.error('Failed to parse AI JSON response:', parseError)
            return { status: 500, error: 'Invalid JSON format received from AI' }
        }
    } catch (error) {
        console.error('generateLayoutsJson error:', error)
        return { status: 500, error: 'Failed to generate slide layouts' }
    }
}

export const generateLayouts = async (projectId: string, theme: string) => {
    try {
        if (!projectId) {
            return { status: 400, error: "Project ID is required" }
        }

        const { userId } = await auth()
        if (!userId) {
            return { status: 403, error: "User not authenticated" }
        }

        const userExist = await prisma?.user.findUnique({
            where: {
                clerkId: userId
            }
        })
        if (!userExist || !userExist.subscription) {
            return {
                status: 403,
                error: !userExist?.subscription
                    ? 'User does not have an active subscription'
                    : 'User not found in the database'
            }
        }

        const project = await prisma.project.findUnique({
            where: {
                id: projectId, isDeleted: false
            }
        })

        if (!project) {
            return { status: 404, error: 'Project not found' }
        }

        if (!project.outlines || project.outlines.length === 0) {
            return { status: 400, error: 'Project does not have any outlines' }
        }

        const layouts = await generateLayoutsJson(project.outlines)

        if (layouts.status !== 200) {
            return layouts
        }

        await prisma?.project.update({
            where: { id: projectId },
            data: { slides: layouts.data, themeName: theme }
        })

        return { status: 200, data: layouts.data }
    } catch (error) {
        console.log(error)
        return { status: 500, error: "Failed to generate layouts" }
    }
}