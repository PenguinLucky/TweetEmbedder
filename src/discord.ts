import { EmbedBuilder } from "discord.js";
import { fxtwitter } from "./types/fxtwitter";
import { getTweetImageUrlList } from "./fxtwitter";

const authorTitleLength = 256;
const titleLength = 256;
const descriptionLength = 4096;

function truncate(text: string, length: number): string {
    if (text.length <= length) return text;
    return text.slice(0, length - 3) + "...";
}

export function createTweetEmbed(tweet: fxtwitter.Tweet): EmbedBuilder[] {
    const embeds: EmbedBuilder[] = [];
    const embed = new EmbedBuilder();

    embed.setAuthor({
        name: truncate(`${tweet.author.name} (@${tweet.author.screen_name})`, authorTitleLength),
        iconURL: tweet.author.avatar_url,
        url: tweet.author.url,
    });

    embed.addFields([
        {
            name: "Likes",
            value: tweet.likes.toString(),
            inline: true,
        },
        {
            name: "Retweets",
            value: tweet.retweets.toString(),
            inline: true,
        },
    ]);

    embed.setFooter({
        text: "Twitter",
        iconURL: "https://abs.twimg.com/icons/apple-touch-icon-192x192.png",
    });

    const description = truncate(tweet.text, descriptionLength);
    embed.setDescription(description.length > 0 ? description : null);
    embed.setURL(tweet.url);
    embed.setColor("#1DA0F2");

    if (tweet.created_at) {
        embed.setTimestamp(new Date(tweet.created_at));
    }

    let imageUrlList = getTweetImageUrlList(tweet);
    const imageUrl = imageUrlList.shift();

    if (imageUrl) {
        embed.setImage(imageUrl);
    }

    embeds.push(embed);

    for (const imageUrl of imageUrlList) {
        if (embeds.length >= 10) break;
        const embed = new EmbedBuilder();
        embed.setURL(tweet.url);
        embed.setImage(imageUrl);
        embeds.push(embed);
    }

    return embeds;
}

export function createUserEmbed(user: fxtwitter.User): EmbedBuilder {
    const embed = new EmbedBuilder();

    const title = truncate(user.name, titleLength);
    embed.setTitle(title.length > 0 ? title : null);

    const description = truncate(user.description, descriptionLength);
    embed.setDescription(description.length > 0 ? description : null);

    embed.setURL(user.url);
    embed.setThumbnail(user.avatar_url);
    embed.setImage(user.banner_url);
    embed.setColor("#1DA0F2");

    embed.addFields([
        {
            name: "Followers",
            value: user.followers.toString(),
            inline: true,
        },
        {
            name: "Following",
            value: user.following.toString(),
            inline: true,
        },
        {
            name: "Tweets",
            value: user.tweets.toString(),
            inline: true,
        },
    ]);

    embed.setFooter({
        text: "Twitter",
        iconURL: "https://abs.twimg.com/icons/apple-touch-icon-192x192.png",
    });

    return embed;
}
