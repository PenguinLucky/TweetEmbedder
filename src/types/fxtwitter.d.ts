export declare namespace fxtwitter {
    export type TweetResponse = {
        code: number;
        message: string;
        tweet?: Tweet;
    };

    export type UserResponse = {
        code: number;
        message: string;
        user?: User;
    };

    export interface Tweet {
        url: string;
        id: string;
        text: string;
        author: User;
        replies: number;
        retweets: number;
        likes: number;
        color: null;
        twitter_card: string;
        created_at: string;
        created_timestamp: number;
        possibly_sensitive: boolean;
        views: number;
        is_note_tweet: boolean;
        lang: "ja";
        replying_to: null | string;
        replying_to_status: null | string;
        media?: {
            all?: (Image | Video)[];
            photos?: Image[];
            videos?: Video[];
            mosaic?: {
                type: "mosaic_photo";
                formats: {
                    jpeg: string;
                    webp: string;
                };
            };
        };
        source?: string;
    }

    export interface User {
        id: string;
        name: string;
        screen_name: string;
        avatar_url: string;
        avatar_color: null;
        banner_url: string;
        description: string;
        location: string;
        url: string;
        followers: number;
        following: number;
        joined: string;
        tweets: number;
        likes: number;
        website: null | string;
    }

    interface Image {
        type: "photo";
        url: string;
        width: number;
        height: number;
        altText: string;
    }

    interface Video {
        url: string;
        thumbnail_url: string;
        duration: number;
        width: number;
        height: number;
        format: string;
        type: "video";
    }
}
