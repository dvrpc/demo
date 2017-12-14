#! /usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs-extra')
const opn = require('opn')
const path = require('path')
const watch = require('chokidar').watch
let config = require('./demo.config')

try {
  const userConfig = require(path.join(process.cwd(), 'demo.config'))
  Object.assign(config, userConfig)
} catch (e) { console.warn('No user demo.config.js found. Using default config') }

if (!config.projectName.length) {
  config.projectName = path.basename(process.cwd())
}

const build = () => new Promise(resolve => {
  console.log('building')
  console.log(execSync(`npm run build ${config.buildArgs}`))
  console.log('done building')
  resolve()
})

const clean = () => new Promise(resolve => {
  console.log('cleaning')
  config.clean && fs.emptyDirSync(`${config.serverPath}${config.projectName}`)
  console.log('done cleaning')
  resolve()
})

const deploy = () => new Promise(resolve => {
  console.log('copying')
  fs.copySync(path.join(process.cwd(), config.srcDir), `${config.serverPath}${config.projectName}`)
  console.log('done copying')
  resolve()
})

const launch = () => new Promise(resolve => {
  console.log('opening')
  opn(`${config.serverRootUri}${config.projectName}`, {wait: false})
  console.log('done opening')
  resolve()
})

function debounce (func, wait) {
  let timeout
  return function (...args) {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), wait)
  }
}

const watcher = watch('**/*', {ignored: `${config.srcDir}/**`, ignoreInitial: true})
let watchHandler

const init = async () => {
  console.time('Demo')
  for (const fn of [build, clean, deploy, launch]) {
    await fn()
  }
  console.timeEnd('Demo')

  if (config.watch && !watchHandler) {
    watchHandler = watcher.on('all', debounce((_, filename) => {
      console.log(`File was updated: ${filename}\nStarting build...`)
      init()
    }), 1000)
    console.log('Now watching...')
  }

  config.watch || process.exit()
}

init()
