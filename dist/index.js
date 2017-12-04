#! /usr/bin/env node

const { exec } = require('child_process')
const fs = require('fs-extra')
let config = require('./launch.config')

try {
  const userConfig = require(path.join(process.cwd(), 'launch.config'))
  Object.assign(config, userConfig)
} catch (e) {}

if (!config.projectName.length) {
  config.projectName = path.dirname(process.cwd()).split(path.sep).pop()
}

const build = () => exec(`npm run build ${config.buildArgs}`, (err, stdout, stderr) => {
  if (err) {
    process.exitCode = 1
    return console.error(err)
  }
}).stdout.pipe(process.stdout)

const clean = () => config.clean && fs.emptyDir(`${config.serverPath}${config.projectName}`)

const deploy = () => fs.copy(path.join(process.cwd(), config.srcDir), `${config.serverPath}${config.projectName}`)

const launch = () => opn(opts.outHost, {wait: false})

for (const fn of [build, clean, deploy, launch]) {
  await fn()
}
