import axios from "axios";


export const lemonSqueezyClient = (lemonSqueezyApiKey?: string) => {
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_API,
        headers: {
            Authorization: `Bearer ${lemonSqueezyApiKey ? lemonSqueezyApiKey : process.env.LEMON_SQUEEZY_API_KEY}`,
            "Accept": "application/vnd.lemonqueezy.v1+json",
            "Content-Type": "application/vnd.lemonqueezy.v1+json"
        }
    })

}