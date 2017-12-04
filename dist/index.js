#! /usr/bin/env node

const { exec } = require('child_process')
const fs = require('fs-extra')
const opn = require('opn')
const path = require('path')
let config = require('./launch.config')

try {
  const userConfig = require(path.join(process.cwd(), 'launch.config'))
  Object.assign(config, userConfig)
} catch (e) { console.warn('No user launch.config.js found. Using default config') }

if (!config.projectName.length) {
  config.projectName = path.basename(process.cwd())
}

const build = () => exec(`npm run build ${config.buildArgs}`, err => {
  if (err) {
    process.exitCode = 1
    return console.error(err)
  }
}).stdout.pipe(process.stdout)

const clean = () => config.clean && fs.emptyDir(`${config.serverPath}${config.projectName}`)

const deploy = () => fs.copy(path.join(process.cwd(), config.srcDir), `${config.serverPath}${config.projectName}`)

const launch = () => opn(`${config.serverRootUri}${config.projectName}`, {wait: false})

const init = async () => {
  console.time('Launch')
  for (const fn of [build, clean, deploy, launch]) {
    await fn()
  }
  console.timeEnd('Launch')
}

init()
