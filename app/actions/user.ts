"use server"
import { currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export const onAuthenticateUser = async () => {
    try {
        const user = await currentUser();

        if (!user) return { status: 403, message: 'User not authenticated' };

        const userExist = await prisma.user.findUnique({
            where: { clerkId: user.id },
            include: {
                PurchasedProjects: {
                    select: {
                        id: true
                    }
                }
            }
        });

        if (userExist) {
            return {
                status: 200,
                user: userExist
            }
        }

        const newUser = await prisma.user.create({
            data: {
                clerkId: user.id,
                name: user.firstName + ' ' + user.lastName,
                email: user.emailAddresses[0].emailAddress,
                profileImage: user.imageUrl,
            },
        })
        if (newUser) {
            return {
                status: 201,
                user: newUser
            }
        }

        return { status: 400 }
    } catch (error) {
        console.log(error)
        return { status: 500, message: 'Internal server error' }
    }
}