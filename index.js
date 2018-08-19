
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity(`Bots maken`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Bots maken`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Bots maken`);
});
client.on('message', message => {
 if (message.channel.id === "480756809771253770") {
      message.react("👍");
      message.react("👎");
  }
});


client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();



  if(command === "staff") {
	var embed = new Discord.RichEmbed()
	   .setColor("4286f4")
	   .setDescription("staff")
     .addField("Eigenaar", "<@432052898432679936>")
     .addField("Manager", "<@303107222026584064>")
	return message.channel.sendEmbed(embed);
  }
    if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
  }
  if(command === "help") {
  var embed = new Discord.RichEmbed()
     .setColor("4286f4")
     .setDescription("Help pagina")
     .addField("!staff", "laat het staffteam zien")
  return message.channel.send(embed);
  }
  if(command === "ban") {
  if(!message.member.roles.some(r=>["STAFFTEAM"].includes(r.name)) )
    return message.reply("Sorry, jij kan dit niet doen");

  let member = message.mentions.members.first();
  if(!member)
    return message.reply("Geef een goede gebruiker aan met @mention");
  if(!member.bannable)
    return message.reply("Sorry deze persoon kan ik niet bannen");

  let reason = args.slice(1).join(' ');
  if(!reason) reason = "Geen reden aangegeven";

  await member.ban(reason)
    .catch(error => message.reply(`Sorry ${message.author} i kan hem niet bannen : ${error}`));
  message.channel.send(`${member.user.tag} is geband door: ${message.author.tag} omdat: ${reason}`);
}

});

client.login(config.token);
