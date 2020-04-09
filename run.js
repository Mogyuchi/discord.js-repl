const { resolve, join } = require('path')

module.exports = (version, token) => {
  const path = join(__dirname, 'node_modules/discord.js-' + version)
  require('module-alias').addAlias('discord.js', path)
  process.env.DISCORD_TOKEN = token

  const Discord = require('discord.js')

  console.log(`Node.js ${process.version}, Discord.js ${Discord.version}`)

  const file = process.argv.slice(2).find(arg =>
    arg !== 'run' || arg.startsWith('-'),
  )

  require(resolve(file))
}
