import { SlashCommandBuilder } from "@discordjs/builders";
import { make_simple_embed } from "../utils/utils.js";

export const data = new SlashCommandBuilder()
    .setName("찾기")
    .setDescription("찾기")
    .addStringOption((option) => option.setName("unit").setDescription("유닛 이름").setRequired(false));

export async function execute(interaction) {
    const unit = interaction.options.getString("unit");
    const message = await interaction.channel.send({
        embeds: [
            await make_simple_embed(`${getCommand(unit)}`).setFooter({
                text: "by " + interaction.member.user.username + "#" + interaction.member.user.discriminator,
            }),
        ],
        allowedMentions: { repliedUser: true },
    });
}