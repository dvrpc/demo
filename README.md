# demo
Build, clean, deploy, and launch your app with one command

## Install
Run `npm i -g @dvrpc/demo`

## Use
1. Add `build` script to `package.json`
2. Run `demo` from your project root

## Configure
Create `demo.config.js` file in your project root
```js
module.exports = {
  srcDir: <string>,
  serverPath: <string>,
  serverRootUri: <string>,
  buildArgs: <string|Array>,
  projectName: <string>,
  clean: <boolean>
}
```
You can also use a JSON file (`demo.config.json`)

## CLI options
Options override settings defined in the configuration

`demo [<projectName> -s <srcDir> -d <serverPath> -u <serverRootUri> -b <buildArgs> --watch --disable-clean` 

## Watch
All files in the project (except for the output directory) are watched and the command will run again.

`demo --watch`

## Disable clean step
Overwrite all built files, but do not remove other files from the server.

`demo --disable-clean`
