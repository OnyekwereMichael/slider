export const dynamic = 'force-dynamic'
import crypto from 'node:crypto'
import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text()
        const body = JSON.parse(rawBody)

        const { buyerUserId } = body.meta.custom_data

        if (!buyerUserId) {
            throw new Error('Buyer user ID is required')
        }

        const hmac = crypto.createHmac(
            "sha256",
            process.env.LEMON_SQUEEZY_WEBHOOK_SECRET as string
        )
        const digest = Buffer.from(hmac.update(rawBody).digest("hex"), 'utf8')
        const signature = Buffer.from(req.headers.get("X-Signature") || '', 'utf8')

        if (digest.length !== signature.length || !crypto.timingSafeEqual(digest, signature)) {
            throw new Error('Invalid signature')
        }

        const buyer = await prisma.user.update({
            where: { id: buyerUserId },
            data: {
                subscription: true
            }
        })

        if (!buyer) {
            throw new Error('Buyer not found')
        }

        return Response.json({ data: buyer }, { status: 200 })

    } catch (error) {
        console.error('Webhook error:', error)
        return Response.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
    }
}