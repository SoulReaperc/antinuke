const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js"),
  client = require("../../index"),
  db = require('../../core/db');

module.exports = {
  name: "list",
  aliases: ['l', 'trusted', 'whitelisted'],
  run: async (client, message, args) => {
    if (message.author.id !== message.guild.ownerId) {
      message.reply({ content: `:warning: this command is only for the server owner.` });
    } else {
      var enabled = await db.get(`${message.guild.id}_antinuke`);
      if (enabled === true) {
        const users = [];
        const Guild = message.guild.id;
        // Get all trusted users from a guild
        await db.list(`${message.guild.id}_wl_`).then(async array => {
          if (array.length > 0) {
            for (x in array) {
              const mentions = array[x],
                userId = mentions.split('_')[2],
                user = `<@${userId}> (${userId})`;
              users.push(user);
            }

            const trustedUsers = new MessageEmbed()
              .setDescription(`**__Whitelisted admins for this server__**\n\n${users.join('\n')}`)
              .setColor("PURPLE")

            const btn = new MessageActionRow().addComponents(
              new MessageButton()
                .setLabel("Clear List")
                .setStyle("DANGER")
                .setCustomId('clear')
            )
            message.channel.send({
              embeds: [trustedUsers],
              components: [btn]
            }).then(msg => {
              client.on('interactionCreate', async (interaction) => {
                if (interaction.user.id !== interaction.guild.ownerId) {
                  await interaction.followUp({
                    content: `This button is not for you`,
                    ephemeral: true
                  })
                } else {
                  const newButton = new MessageActionRow().addComponents(
                    new MessageButton()
                      .setLabel("Clear List")
                      .setStyle("DANGER")
                      .setCustomId('cleared')
                      .setDisabled(true)
                  );
                  msg.edit({
                    embeds: [trustedUsers],
                    components: [newButton]
                  });

                  await db.list(`${interaction.guild.id}_wl`).then(async (keys) => {
                    keys.forEach(async key => {
                      await db.delete(`${key}`)
                    })
                  })
                  interaction.reply({
                    content: `:thumbsup: unwhitelisted every admin from the list.`
                  })
                }
              });
            });
          } else {
            message.reply({ content: 'there are no whitelisted users in this server.' })
          }
        });
      } else {
        message.reply({ content: `:grey_question: you need to enable antinuke to run this command.` });
      }
    }
  },
};