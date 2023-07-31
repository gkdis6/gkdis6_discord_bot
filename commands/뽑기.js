import { SlashCommandBuilder } from "@discordjs/builders";
import { make_simple_embed } from "../utils/utils.js";
import { getRandomSet } from "../utils/set.js";

export const data = new SlashCommandBuilder().setName("뽑기").setDescription("!뽑기 초불영제");

export async function execute(interaction) {
  const message = await interaction.channel.send({
    embeds: [
      await make_simple_embed(`${getRandomSet()}`).setFooter({
        text: "by " + interaction.member.user.username + "#" + interaction.member.user.discriminator,
      }),
    ],
    allowedMentions: { repliedUser: true },
  });
}
