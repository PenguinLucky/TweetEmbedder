import dotenv from "dotenv";
import path from "path";
import { Client, GatewayIntentBits, Events, ActivityType, EmbedBuilder, MessageType } from "discord.js";
import { getTweet, getUser } from "./src/fxtwitter";
import { createTweetEmbed, createUserEmbed } from "./src/discord";
import { AutoPoster } from "topgg-autoposter";

dotenv.config({ path: path.join(__dirname, ".env") });

if (!process.env.DISCORD_TOKEN) {
    throw new Error("discord token is not defined");
}

if (!process.env.TOPGG_TOKEN) {
    throw new Error("top.gg token is not defined");
}

const discordClient = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const poster = AutoPoster(process.env.TOPGG_TOKEN, discordClient);

function setActivity() {
    // プレイ中にサーバー数を表示する
    const guildCount = discordClient.guilds.cache.size;
    discordClient.user?.setActivity(`${guildCount} Guilds`, { type: ActivityType.Playing });
}

setInterval(setActivity, 1000 * 60 * 10);

discordClient.on(Events.ClientReady, () => {
    console.log("====================================");
    console.log("Bot is ready");
    console.log("Client ID: ", discordClient.user?.id);
    console.log("Client Tag: ", discordClient.user?.tag);
    console.log("====================================");
    setActivity();
});

poster.on("posted", () => {
    console.log("Posted stats to top.gg");
});

discordClient.on(Events.MessageCreate, async (message) => {
    if (message.author.bot || message.webhookId) return;

    // メッセージに含まれるURLを取得する
    const urls = message.content.match(/(https?:\/\/[^\s]+)/g);
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

            embeds.push(...createTweetEmbed(tweet));
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

discordClient.on(Events.MessageDelete, async (deletedMessage) => {
    if (deletedMessage.author?.bot || deletedMessage.webhookId) return;
    if (!deletedMessage.content?.match(/https?:\/\/(x|twitter)\.com/)) return;

    // メッセージが削除されたときに、このBotが送信したメッセージを削除する
    const messages = await deletedMessage.channel.messages.fetch({ around: deletedMessage.id });
    const thisBotMessages = messages.filter((message) => {
        return message.author.id === discordClient.user?.id && message.type === MessageType.Reply && message.reference?.messageId === deletedMessage.id;
    });

    thisBotMessages.forEach((botMessage) => {
        botMessage.delete().catch(() => {});
    });
});

discordClient.login(process.env.DISCORD_TOKEN);
