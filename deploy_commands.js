import { REST, Routes } from "discord.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const token = process.env.DISCORD_TOKEN;

const rest = new REST({ version: "10" }).setToken(token);

const commands = [];

const command_files = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));

for await (const file of command_files) {
  const { data } = await import(`./commands/${file}`);

  commands.push(data.toJSON());
  console.log("Loaded command: " + data.name);
}

console.log("Loaded " + commands.length + " commands!\n");

console.log("Registering global commands...");

await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
  body: commands,
}).then((dat) => console.log(dat))
.catch(console.error);

console.log("Successfully registered global commands.");
