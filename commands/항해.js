import { SlashCommandBuilder } from "@discordjs/builders";
import { make_simple_embed } from "../utils/utils.js";
import { getHanghaeSet } from "../utils/set.js";

export const data = new SlashCommandBuilder().setName("항해").setDescription("!항해");

export async function execute(interaction) {
  await interaction.channel.send({
    embeds: [
      make_simple_embed(`${getHanghaeSet()}`).setFooter({
        text: "by " + interaction.member.user.username + "#" + interaction.member.user.discriminator,
      }),
    ],
    allowedMentions: { repliedUser: true },
  });
}