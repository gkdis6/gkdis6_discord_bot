"use strict";

import discord from "discord.js";
import * as fs from "fs";
import { make_simple_embed, is_same_vc_as, leave_voice_channel } from "./utils/utils.js";
import { any_audio_playing, stop_audio, pause_audio } from "./utils/audio.js";
import dotenv from "dotenv";
dotenv.config();

const token = process.env.DISCORD_TOKEN;

export const client = new discord.Client({
  intents: [discord.GatewayIntentBits.Guilds, discord.GatewayIntentBits.GuildVoiceStates],
});

const prefix = "!";

client.streams = new discord.Collection();
client.commands = new discord.Collection();

client.once(discord.Events.ClientReady, async () => {
  console.log("커맨드 입력 대기중...");

  const command_files = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));
  for await (const file of command_files) {
    const { data, execute } = await import(`./commands/${file}`);
    client.commands.set(data.name, execute);
    //console.log("Loaded command: " + data.name);
  }
  console.log(client.commands.size + " 개의 커맨드 불러옴!\n");

  console.log("봇 준비완료!\n");
});

client.on(discord.Events.VoiceStateUpdate, (oldState, newState) => {
  try {
    // Check if the bot was kicked from a voice channel
    if (oldState.member.user.id === client.user.id && oldState.channel && !newState.channel) {
      // Check if the bot is in a voice channel
      if (client.streams.has(oldState.guild.id)) {
        // Stop the audio
        stop_audio(oldState.guild.id);
        client.streams.delete(oldState.guild.id);

        //console.log("Stopped audio in guild with ID " + oldState.guild.id + " because I was kicked from the voice channel.");
        return;
      }
    }

    // Leave the voice channel if the bot is the only one in it
    if (oldState.channel) {
      if (oldState.channel.members.size === 1 && oldState.channel.members.first().user.id === client.user.id) {
        const guild_stream = client.streams.get(oldState.guild.id);

        if (guild_stream !== undefined) {
          clearTimeout(guild_stream.leave_timeout_id);
          guild_stream.leave_timeout_id = setTimeout(async () => {
            if (!oldState?.channel?.id || !oldState?.guild?.id) {
              return;
            }

            const channel = await client.channels.fetch(oldState.channel.id);
            if (channel && channel.members.size === 1) {
              leave_voice_channel(oldState.guild.id);
            }
          }, 30000);
        }
      }
    }
  } catch (e) {
    //console.log("An error occurred!");
    console.log(e);
  }
});

client.on(discord.Events.MessageCreate, async (message) => {
  try {
    if (message.author.bot) return;

    if (message.content.startsWith(prefix)) {
      const args = message.content.slice(prefix.length).trim().split(/ +/);

      switch (args.shift().toLowerCase()) {
        case "servers":
          if (message.author.id === "548120702373593090") {
            await message.reply({
              embeds: [make_simple_embed("Servers: (" + client.guilds.cache.size + ")\n - " + [...client.guilds.cache].join("\n - "))],
              allowedMentions: { repliedUser: false },
            });
          }
          break;
      }
    }
  } catch (e) {
    console.log(e);
  }
});

client.on(discord.Events.InteractionCreate, async (interaction) => {
  try {
    // Check if the interaction is valid
    if (interaction.replied || interaction.deferred) {
      console.log(
        "잘못된 상호작용! (replied: " + interaction.replied + ", deferred: " + interaction.deferred + ", channel: " + interaction.channel + ")"
      );
      return;
    }

    if (interaction.isChatInputCommand()) {
      await handleChatInputCommand(interaction);
    } else if (interaction.isButton()) {
      await handleButton(interaction);
    }
  } catch (e) {
    console.log(e);
  }
});

async function handleChatInputCommand(interaction) {
  if (!interaction.channel) {
    await interaction.reply({
      embeds: [make_simple_embed("You must be in a server to use this command!")],
      ephemeral: true,
    });
    return;
  }

  const execute = client.commands.get(interaction.commandName);
  if (!execute) {
    await interaction.reply({
      embeds: [make_simple_embed("There was an error while executing this command!")],
    });
    return;
  }

  await interaction.reply({ content: "Loading..." });

  try {
    await execute(interaction);
  } catch (error) {
    console.error(error);

    try {
      await interaction.channel.send({
        embeds: [make_simple_embed("There was an error while executing this command!")],
      });
    } catch (ignored) {}
  }
}

async function handleButton(interaction) {
  if (!(await is_same_vc_as(interaction.user.id, interaction.guildId))) {
    await interaction.reply({
      embeds: [make_simple_embed("같은 음성 채널에 입장해주세요!")],
      ephemeral: true,
    });
    return;
  }

  if (!any_audio_playing(interaction.guildId)) {
    await interaction.reply({
      embeds: [make_simple_embed("현재 재생중이 아닙니다!")],
      ephemeral: true,
    });
    return;
  }

  switch (interaction.customId) {
    case "pause":
      if (pause_audio(interaction.guildId) === 0) {
        await interaction.reply({
          embeds: [
            make_simple_embed("성공적으로 재생되었습니다!").setFooter({
              text: "by " + interaction.user.username + "#" + interaction.user.discriminator,
              iconURL: interaction.user.displayAvatarURL({ size: 16 }),
            }),
          ],
        });
      } else {
        await interaction.reply({
          embeds: [
            make_simple_embed("성공적으로 일시정지되었습니다!").setFooter({
              text: "by " + interaction.user.username + "#" + interaction.user.discriminator,
              iconURL: interaction.user.displayAvatarURL({ size: 16 }),
            }),
          ],
        });
      }
      break;
    case "stop":
      stop_audio(interaction.guildId);
      await interaction.reply({
        embeds: [
          make_simple_embed("성공적으로 정지되었습니다!").setFooter({
            text: "by " + interaction.user.username + "#" + interaction.user.discriminator,
            iconURL: interaction.user.displayAvatarURL({ size: 16 }),
          }),
        ],
      });
      break;
    case "loop":
      const guild_stream = client.streams.get(interaction.guildId);
      guild_stream.loop = !guild_stream.loop;
      await interaction.reply({
        embeds: [
          make_simple_embed(
            guild_stream.loop ? "Loop successfully **enabled** for current audio" : "Loop successfully **disabled** for current audio"
          ).setFooter({
            text: "by " + interaction.user.username + "#" + interaction.user.discriminator,
            iconURL: interaction.user.displayAvatarURL({ size: 16 }),
          }),
        ],
      });
      break;
  }
}

client.login(token).catch((e) => {
  console.log(token);
  console.error("토큰 아이디가 잘못되었습니다.\n" + e);
});