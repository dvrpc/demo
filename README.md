# demo
Build, deploy, and test all in one command

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
