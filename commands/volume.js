import { SlashCommandBuilder } from "@discordjs/builders";
import { is_same_vc_as, make_simple_embed } from "../utils/utils.js";
import { any_audio_playing, control_volume } from "../utils/audio.js";
import { client } from "../index.js";

export const data = new SlashCommandBuilder()
  .setName("volume")
  .setDescription("Control volume current audio")
  .addNumberOption((option) => option.setName("volume").setDescription("volume (1~100)").setRequired(true));

export async function execute(interaction) {
  if (!(await is_same_vc_as(interaction.member.id, interaction.guildId))) {
    await interaction.channel.send({
      embeds: [make_simple_embed("You are not in the same voice channel!")],
    });
    return;
  }

  if (!any_audio_playing(interaction.guildId)) {
    await interaction.channel.send({
      embeds: [make_simple_embed("No audio is currently playing")],
    });
    return;
  }

  const volume = interaction.options.getNumber("volume");

  if (volume / 100 <= 1 && volume / 100 >= 0) {
    control_volume(interaction.guildId, volume);
  }

  console.log(client.streams.get(interaction.guildId).volume);

  await interaction.channel.send({
    embeds: [
      make_simple_embed(`Audio volume set ${volume}!`).setFooter({
        text: "by " + interaction.member.user.username + "#" + interaction.member.user.discriminator,
        iconURL: interaction.member.user.displayAvatarURL({ size: 16 }),
      }),
    ],
    allowedMentions: { repliedUser: false },
  });
}

