import { SlashCommandBuilder } from "@discordjs/builders";
import { make_simple_embed } from "../utils/utils.js";
import { saveCode } from "../utils/notion.js";

export const data = new SlashCommandBuilder()
  .setName("save")
  .setDescription("Save the code")
  .addStringOption((option) => option.setName("code").setDescription("Save Code!").setRequired(true));

export async function execute(interaction) {
  const code = interaction.options.getString("code");

  const message = await interaction.channel.send({
    embeds: [await make_simple_embed(`<a:loading:1032708714605592596>  Saving to ${code}...`)],
    allowedMentions: { repliedUser: false },
  });

  if (saveCode(interaction.member.user.username, code)) {
    await message.edit({
      embeds: [make_simple_embed(`Success Save ${code} !!!`)],
      allowedMentions: { repliedUser: true },
    });
  } else {
    await message.edit({
      embeds: [make_simple_embed(`Failed Save ${code}...`)],
      allowedMentions: { repliedUser: true },
    });
  }
  // embeds: [
  //   make_simple_embed(`Audio successfully seeked to ${convert_seconds_to_minutes(seekTime)}!`).setFooter({
  //     text: "by " + interaction.member.user.username + "#" + interaction.member.user.discriminator,
  //     iconURL: interaction.member.user.displayAvatarURL({ size: 16 }),
  //   }),
  // ],
}
