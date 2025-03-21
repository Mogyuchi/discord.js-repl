#!/usr/bin/env node
const Preferences = require('preferences')
const inquirer = require('inquirer').default
const discord = require('./discord')
const run = require('./run')

const prefs = new Preferences('discord.js-repl')

!(async () => {
  setup()

  const isRun = process.argv.includes('run')
  const isSelect = process.argv.includes('--select')
  const version = process.argv.includes('-11')
    ? 'v11'
    : process.argv.includes('-12')
      ? 'v12'
      : process.argv.includes('-13')
        ? 'v13'
        : 'v14'
  const restVersion = process.argv.includes('-r6')
    ? '6'
    : process.argv.includes('-r8')
      ? '8'
      : process.argv.includes('-r9')
        ? '9'
        : '10'

  if (prefs.last && !isSelect)
    return start(isRun, version, restVersion, prefs.last)

  let token = await selectAccount()
  if (token === 'new') token = await askToken()
  prefs.last = token
  start(isRun, version, restVersion, token)
})()

function start(isRun, version, restVersion, token) {
  if (isRun) run(version, token)
  else discord(version, restVersion, token, prefs)
}

async function selectAccount() {
  const accounts = Object.entries(prefs.tokens)
    .map(([value, name]) => ({ name, value }))

  const { token } = await inquirer.prompt({
    type: 'list',
    name: 'token',
    message: 'Select account to log in',
    choices: [...accounts, { name: 'Register new account', value: 'new' }],
  })
  return token
}

async function askToken() {
  const { token } = await inquirer.prompt({
    type: 'input',
    name: 'token',
    message: 'Enter your Discord token',
    validate: val => val ? true : 'Please enter your Discord token',
  })
  return token
}

process.on('unhandledRejection', error => {
  if (error.message === 'Incorrect login details were provided.')
    return console.error('Invalid token were provided.')
  else console.error(error)
})

function setup() {
  if (!prefs.tokens) prefs.tokens = {}

  // migration
  const oldAccounts = Object.entries(prefs)
    .filter(([key]) => !['tokens', 'last'].includes(key))

  oldAccounts.forEach(([name, token]) => {
    prefs.tokens[token] = name
    delete prefs[name]
  })
}
