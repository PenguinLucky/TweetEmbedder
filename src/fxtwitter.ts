import { fxtwitter } from "./types/fxtwitter";

export async function getTweet(tweetId: string, authorId: string): Promise<fxtwitter.Tweet | null> {
    const response = await fetch(`https://api.fxtwitter.com/${authorId}/status/${tweetId}`);
    if (!response.ok) return null;
    const json = (await response.json()) as fxtwitter.TweetResponse;
    if (json.code !== 200) return null;
    return json.tweet ?? null;
}

export async function getUser(userId: string): Promise<fxtwitter.User | null> {
    const response = await fetch(`https://api.fxtwitter.com/${userId}`);
    if (!response.ok) return null;
    const json = (await response.json()) as fxtwitter.UserResponse;
    if (json.code !== 200) return null;
    return json.user ?? null;
}
