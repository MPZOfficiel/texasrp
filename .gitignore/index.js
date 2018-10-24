//package
const Discord = require("discord.js");
const economy = require("discord-eco");
const fs = require("fs");
const ms = require("ms");

const bot = new Discord.Client({disableEveryone: true});

//JSON files
let userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

//connection du bot
bot.on("ready", async () => {
  console.log(`${bot.user.username} est connecté !`);
  bot.channels.get("484724627764019203").send("Prêt à travailler !");
  bot.user.setActivity("TexasRP | t!help", {type: "PLAYING"});
});

//base des commandes
bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = ("t!");
  let sender = message.author;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  //let cont = message.content.slice(prefix.lenght).split(" ");

  if(bot.user.id === message.author.id) {return}

//evenement
  let userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));
  if(!userData[sender.id + message.guild.id]) userData[sender.id + message.guild.id] = {}
  if(!userData[sender.id + message.guild.id].money) userData[sender.id + message.guild.id].money = 20000;

  fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
    if(err) console.log(err);
  })

//commande
  if(cmd === `${prefix}armureriePistolet`){
    return message.channel.send("```Pistolet:\n -P2000(pistolet de combat) :9000€\n -M9 beretta(pistolet) :8500€\n -Colt SCAMP(pistolet performant) :11 000€\n -Desert Eagle (pistolet cal.50) :10 000€\n -Colt Junior25(pétoire) :2000€\n -Wide Body1911(pistolet lourd) :9000€\n -FN 1910(pistolet Vintage) :4200€\n -Thompson CC(pistolet de précision) :7500€\n -Taurus Raging bull (revolver Lourd) :12 500€```");
  }

  if(cmd === `${prefix}armurerieAccessoires`){
     return message.channel.send("```Accessoires d'armes:\n -Poignet allongée : 1500€\n -Lampe torche: 200€\n -Chargeur grande capacité : 2500€\n -Chargeur tambour: 5000€\n -Silencieux :1000€\n ⬆️⬆️OBLIGATOIRE⬆️⬆️```")
  }

  if(cmd === `${prefix}armurerieChargeur`){
    return message.channel.send("```-Prix pistolet:50€ le chargeur\n-Prix pistolet mitrailleur:100€ le chargeur\n-Prix fusil d'assaut :200€ le chargeur\n-Prix fusil à pompe :150€ les cartouches\n-Prix fusil de précision :50€ la balles ou 500 le chargeur\n-[Pour tout achat obligé de payer une boîte de munitions si non vous n’utiliserez pas  l armes]```")
  }

  if(cmd === `${prefix}armurerieMessage`){
    return message.channel.send("**Pour un achats d arme il me faut des preuves et des droits (accord du gouvernements,par la police avec un permis d'arme tous ça est obligatoire)**")
  }

  if(cmd === `${prefix}concessVelo`){
    return message.channel.send("```Prix velos (6) :\n -Whippet Race Bike : 800$\n -Tri-Cycles Race Bike : 700$\n -Scorcher : 1 500$\n -Endurex Race Bike : 1 000$\n -Cruiser : 600$\n -BMX : 500$```")
  }

  if(cmd === `${prefix}concessCamionette`){
    return message.channel.send("```Camionnettes (7) :\n -Bison par Bravado : 35 000$\n -Bobcat X L par Vapid : 21 000$\n -Burrito (V3) par Declasse : 21 000$\n -Camper par Brute : 7000$\n -Journey par Zirconium : 5000$\n -Minivan par Vapid : 21 000$\n -Youga par Bravado : 15 000$```")
  }

  if(cmd === `${prefix}concessSUV`){
    return message.channel.send("```SUV (5) :\n -Baller LE: 200 000\n -Dubsta de Benefactor : 300k\n -Sandking XL: 60 000\n -Trophy Truck: 250 000\n -Buggy raid: 470 000```")
  }

  if(cmd === `${prefix}debutrp`){
    let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    return message.channel.send(`Le rp a commencer, rejoignez ${dUser} !`);
  }

  if(cmd === `${prefix}repriserp`){
    let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    return message.channel.send(`Reprise du rp, rejoignez ${dUser} !`)
  }

  if(cmd === `${prefix}finrp`){
    return message.channel.send("Le rp est terminer à la prochaine.");
  }

  if(cmd === `${prefix}Patch`){
    return message.channel.send("```Système du bot:\n-Système de banque virtuelle\n-Système de transaction\n-Système pour signaler le début et la fin des sessions```");
  }

  if(cmd === `${prefix}warn`){
    let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

    //if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Tu n'as pas la permission de faire sa !");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.reply("Cet utilisateur existe pas !");
    //if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n'as pas la permission.");
    let reason = args.join(" ").slice(22);

    if(!warns[wUser.id]) warns[wUser.id] = {
      warns: 0
    };

    warns[wUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
      if(err) console.log(err);
    });

    let warn_embed = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setDescription("Warns")
    .setAuthor(message.author.username)
    .addField("Warned User", `<@${wUser.id}>`)
    .addField("Warned in", message.channel)
    .addField("Number of Warnings", warns[wUser.id].warns)
    .addField("Reason", reason)
    .setFooter("Texas RP")
    .setTimestamp();

    let warnchannel = message.guild.channels.find(x => x.name === "logs");
    if(!warnchannel) return message.reply("Le salon 'logs' n'existe pas.");

    warnchannel.send(warn_embed);

    if(warns[wUser.id].warns == 2){
      let muterole = message.guild.roles.find(x => x.name === "muted");
      if(!muterole) return message.reply("Le role 'muted' n'existe pas.");

      let mutetime = "10s";
      await(wUser.addRole(muterole.id));
      message.channel.send(`<@${wUser.id}> a été mute temporairement`);

      setTimeout(function(){
        wUser.removeRole(muterole.id)
        message.reply(`<@${wUser.id}> a été démute !`);
      }, ms(mutetime))
    }
    if(warns[wUser.id].warns == 3){
      message.guild.member(wUser).ban(reason);
      message.reply(`<@${wUser.id}> a été ban !`);
    }
  }

  if(cmd === `${prefix}banque`){
    economy.fetchBalance(message.author.id + message.guild.id).then((i) => {

       let banque_embed = new Discord.RichEmbed()
       .setColor("#69ff31")
       .setTitle("Texas RP - Banque")
       .addField("Titulaire du compte", message.author.username)
       .addField("Solde", i.money)
       .setTimestamp();

       message.channel.send(banque_embed);
    })
  }

  if(cmd === `${prefix}transaction`){
    if(!args[0]){
      message.channel.send(`**Vous devez préciser le montant de la transaction**`);
      return;
    }

    if(isNaN(args[0])){
      message.channel.send(`**Le montant doit être un nombre.**`);
      return;
    }

    let defineduser = '';
    if(!args[1]){
      defineduser = message.author.id;
    }else{
      let firstMentioned = message.mentions.users.first();
      defineduser = firstMentioned.id;
    }

    economy.updateBalance(defineduser + message.guild.id, parseInt(args[0])).then((i) => {
      message.channel.send(`**La transaction des ${args[0]}$ a bien été effectué !**`)
    });
  }

  if(cmd === `${prefix}help`){

    let channel2_embed = new Discord.RichEmbed()
    .setColor("#f3ff00")
    .setDescription(":white_check_mark: Vous avez reçu le menu help en dm !");

    message.channel.send(channel2_embed);

    let help_embed = new Discord.RichEmbed()
    .setColor("#46ff00")
    .setTitle("Texas RP - Help")
    .addField("t!banque", "Voici votre banque virtuelle")
    .addField("t!transaction {montant} @utilisateur", "Vous pouvez effectuer une transaction directement sur le compte d'une autre personne")
    .setFooter("Texas RP")
    .setTimestamp();

    message.author.send(help_embed);
  }

  if(cmd === `${prefix}modo`){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n'as pas la permission de faire sa !");

    let channel_embed = new Discord.RichEmbed()
    .setColor("#f3ff00")
    .setDescription(":white_check_mark: Vous avez reçu le menu modération en dm !");

    message.channel.send(channel_embed);

    let modo_embed = new Discord.RichEmbed()
    .setColor("#46ff00")
    .setTitle("Texas RP - Modération")
    .addField("t!warn @utilisateur {raison}", "Vous pouvez warn une personne (2 warns = mute, 3 warns = ban)")
    .addField("t!debutrp @utilisateur", "Signaler le début du rp, mentionner la personne qui est l'hôte de la session")
    .addField("t!repriserp @utilisateur", "Signaler la reprise du rp, mentionner la personne qui est l'hôte de la session")
    .addField("t!finrp", "Signaler la fin du rp")
    .setFooter("Texas RP")
    .setTimestamp();

    message.author.send(modo_embed);
  }
});

bot.login("NTA0MjMzNzI1NjM5MzkzMjgw.DrIsuQ.fIBnPefu7ASy_1wt3_XkKqJkiWY");
