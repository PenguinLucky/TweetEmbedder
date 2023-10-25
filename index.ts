import dotenv from "dotenv";
import path from "path";
import { Client, Events, EmbedBuilder, GatewayIntentBits, ActivityType } from "discord.js";
import { getTweet, getUser } from "./src/fxtwitter";
import { createTweetEmbed, createUserEmbed } from "./src/discord";

dotenv.config({ path: path.join(__dirname, ".env") });

if (!process.env.DISCORD_TOKEN) {
    throw new Error("discord token is not defined");
}

const discordClient = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

setInterval(() => {
    // プレイ中にサーバー数を表示する
    const guildCount = discordClient.guilds.cache.size;
    discordClient.user?.setActivity(`${guildCount} servers`, { type: ActivityType.Playing });
}, 1000 * 60 * 10);

discordClient.on(Events.ClientReady, () => {
    console.log("====================================");
    console.log("Bot is ready");
    console.log("Client ID: ", discordClient.user?.id);
    console.log("Client Tag: ", discordClient.user?.tag);
    console.log("====================================");

    // プレイ中にサーバー数を表示する
    const guildCount = discordClient.guilds.cache.size;
    discordClient.user?.setActivity(`${guildCount} servers`, { type: ActivityType.Playing });
});

discordClient.on(Events.MessageCreate, async (message) => {
    if (message.author.bot || message.webhookId) return;

    // メッセージに含まれるURLを取得する
    const urlRegex = /(https?:\/\/[^\s]+)/g; // URLの正規表現
    const urls = message.content.match(urlRegex);

    // URLが含まれていない場合は処理を終了
    if (!urls) return;

    const embeds: EmbedBuilder[] = [];

    for (const url of urls) {
        // ドメインが x.com または twitter.com でない場合は処理を終了
        if (!url.match(/https?:\/\/(x|twitter)\.com/)) continue;

        if (url.match(/https?:\/\/(x|twitter)\.com\/.+\/status\/\d+/)) {
            // ツイートのURLの場合 (https://twitter.com/xxx/status/xxx)

            // ツイートIDを取得する
            const tweetId = url.match(/https?:\/\/(x|twitter)\.com\/.+\/status\/(\d+)/)?.[2];
            const authorId = url.match(/https?:\/\/(x|twitter)\.com\/(.+)\/status\/\d+/)?.[2];
            if (!tweetId || !authorId) continue;

            const tweet = await getTweet(tweetId, authorId);
            if (!tweet) continue;

            embeds.push(createTweetEmbed(tweet));
        } else if (url.match(/https?:\/\/(x|twitter)\.com\/(.+)/)) {
            // ユーザーのURLの場合 (https://twitter.com/xxx)

            // ユーザーIDを取得する
            const userId = url.match(/https?:\/\/(x|twitter)\.com\/(.+)/)?.[2];
            if (!userId) continue;

            const user = await getUser(userId);
            if (!user) continue;

            embeds.push(createUserEmbed(user));
        }
    }

    if (embeds.length === 0) return;

    await message
        .reply({
            embeds,
            allowedMentions: {
                repliedUser: false,
            },
        })
        .catch(() => {});
});

discordClient.login(process.env.DISCORD_TOKEN);
