module.exports = {
  bot: {
    info: {
      prefix: ';',
      token: process.env.token,
      invLink: 'https://dsc.gg/antiwizz',
    },
    options: {
      founders: ['891214041391988757'],
      privateMode: false,
    },
    presence: {
      status: 'idle',
      activity: 'LISTENING',
      url: 'https://twitch.tv/pewdiepie',
      name: ';help'
    },
    credits: {
      developerId: '891214041391988757',
      developer: 'Sxlitude#8885',
      sourceCode: 'https://github.com/sxlitude/antinuke',
      supportServer: 'https://discord.gg/KMw8stwEuN'
    }
  }
}