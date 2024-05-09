import { SlashCommandBuilder } from "@discordjs/builders";
import { make_simple_embed } from "../utils/utils.js";
import { getNightmareSet } from "../utils/set.js";

export const data = new SlashCommandBuilder()
  .setName("악몽")
  .setDescription("악몽");

export async function execute(interaction) {
  const message = await interaction.channel.send({
    components: [row],
    embeds: [
      await make_simple_embed(`${getNightmareSet()}`),
    ],
  });
}


