import { SlashCommandBuilder } from "@discordjs/builders";
import { make_simple_embed } from "../utils/utils.js";
import { loadCode } from "../utils/notion.js";

export const data = new SlashCommandBuilder().setName("load").setDescription("Load the code");

export async function execute(interaction) {
  const message = await interaction.channel.send({
    embeds: [await make_simple_embed(`<a:loading:1032708714605592596>  load to code by ${interaction.member.user.username}...`)],
    allowedMentions: { repliedUser: false },
  });

  const code = await loadCode(interaction.member.user.username)
  if (code !== "데이터가 없습니다. 세이브를 해주세요." ) {
    await message.edit({
      embeds: [
        make_simple_embed(`${code}`).setFooter({
          text: "by " + interaction.member.user.username + "#" + interaction.member.user.discriminator,
        }),
      ],
      allowedMentions: { repliedUser: true },
    });
  } else {
    await message.edit({
      embeds: [make_simple_embed(`Failed load code...`)],
      allowedMentions: { repliedUser: true },
    });
  }
}
