'use server'

import { lemonSqueezyClient } from "@/lib/axios"
import { onAuthenticateUser } from "./user"

export const buySubscription = async (userId: string) => {
    try {
        const res = await lemonSqueezyClient().post('/checkouts', {
            data: {
                type: 'checkouts',
                attributes: {
                    checkout_data: {
                        custom: {
                            buyerUserId: userId,
                        },
                    },
                    product_options: {
                        redirect_url: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard`,
                    },
                    expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
                },
                relationships: {
                    store: {
                        data: {
                            type: 'stores',
                            id: process.env.LEMON_SQUEEZY_STORE_ID
                        },
                    },
                    variant: {
                        data: {
                            type: 'variants',
                            id: process.env.LEMON_SQUEEZY_VARIANT_ID
                        }
                    }
                },
            },
        })

        const checkoutUrl = res.data.data.attributes.url
        return { url: checkoutUrl, status: 200 }
    } catch (error) {
        console.error('buySubscription error:', error)
        if (error instanceof Error && 'response' in error) {
            console.error('API response:', (error as any).response?.data)
        }
        throw error
    }
}