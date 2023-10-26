import { EmbedBuilder } from "discord.js";
import { fxtwitter } from "./types/fxtwitter";
import { getTweetImageUrlList } from "./fxtwitter";

export function createTweetEmbed(tweet: fxtwitter.Tweet): EmbedBuilder[] {
    const embeds: EmbedBuilder[] = [];
    const embed = new EmbedBuilder();

    embed.setAuthor({
        name: `${tweet.author.name} (@${tweet.author.screen_name})`,
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

    embed.setDescription(tweet.text);
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
        const embed = new EmbedBuilder();
        embed.setURL(tweet.url);
        embed.setImage(imageUrl);
        embeds.push(embed);
    }

    return embeds;
}

export function createUserEmbed(user: fxtwitter.User): EmbedBuilder {
    const embed = new EmbedBuilder();

    embed.setTitle(user.name);
    embed.setURL(user.url);
    embed.setDescription(user.description);
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
