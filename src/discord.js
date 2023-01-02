const repl = require('repl')

module.exports = (version, token, prefs) => {
  const Discord = require('discord.js-' + version)
  const client =
    version === 'v14'
      ? new Discord.Client({
          intents: Object.values(Discord.GatewayIntentBits).filter(
            Number.isInteger
          ),
        })
      : version === 'v13'
      ? new Discord.Client({
          intents: Object.values(Discord.Intents.FLAGS),
        })
      : new Discord.Client()

  console.log(`Node.js ${process.version}, Discord.js ${Discord.version}`)

  const refs = { onceMessage: null, onMessage: null }

  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    prefs.tokens[token] = client.user.tag
    const r = repl.start()
    r.context.client = client
    r.context.onceMsg = onceMsg
    r.context.onMsg = onMsg
    r.context.offMsg = offMsg
    r.context.Discord = Discord
    r.on('exit', () => process.exit())
  })

  client.on('message', (message) => {
    if (refs.onMessage) refs.onMessage(message)
    if (refs.onceMessage) {
      refs.onceMessage(message)
      refs.onceMessage = null
    }
  })

  client.login(token)

  const onceMsg = (callback) => (refs.onceMessage = callback)
  const onMsg = (callback) => (refs.onMessage = callback)
  const offMsg = () => (refs.onMessage = null)
}
