import { SlashCommandBuilder } from "@discordjs/builders";
import { make_simple_embed } from "../utils/utils.js";
import { getCharRandomSet } from "../utils/set.js";

export const data = new SlashCommandBuilder().setName("녜힁").setDescription("!녜힁");

export async function execute(interaction) {
  const message = await interaction.channel.send({
    embeds: [
      await make_simple_embed(`${getCharRandomSet()}`).setFooter({
        text: "by " + interaction.member.user.username + "#" + interaction.member.user.discriminator,
      }),
    ],
    allowedMentions: { repliedUser: true },
  });
}
