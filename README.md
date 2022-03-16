# girlfriend-as-my-pm

> What kind of experience is my girlfriend as my project manager.

## Features

1. Apply for business trip
2. Apply for approval

## Overall

Frontend: Vue3(SFC) + Vant

Backend: Express + Mysql2 + Sequelize

Server（Ali Cloud Server）: Centos + Nginx + PM2

## QuickStart

```sh
npm run dev

npm run build

npm start
```

## Deploy

`package.json`

```json
{
  "dependencies": {
    "@babel/runtime": "^7.16.3",
    "@babel/runtime-corejs3": "^7.16.3"
  },
  "devDependencies": {
    "@babel/cli": "^7.16.0",
    "@babel/core": "^7.0.0",
    "@babel/plugin-transform-runtime": "^7.16.4",
    "@babel/preset-env": "^7.16.4"
  }
}
```

`.babelrc`

```json
{
  "presets": [["@babel/preset-env", { "targets": { "node": true } }]],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      // 可选 false | 2 | 3
      { "corejs": 3 }
    ]
  ]
}
```
