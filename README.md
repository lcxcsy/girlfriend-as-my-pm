# GirlFriend-As-My-Pm

> What kind of experience is my girlfriend as my project manager? She's in charge of making requests, and I'm in charge of completing them.By the way, the project is a full stack project for people management of small teams, but not necessarily for everyone.

## QuickStart

```bash
# init sql
mysql -uroot -p

source init.sql

cd server

# install dependencies
npm install

npm run dev

# or use pm2
npm run start

# project running address
http://localhost:3000/great-life/
https://localhost:11443/great-life/
```

## Overall

Frontend: Vue2(@components-api) + Vant

Backend: Express + Mysql2 + Sequelize

Ali Cloud Server: Centos + Nginx + PM2

## Features

1. JWT and router guard - [x]
2. Support http and https -[x]
3. Travel application - [x]
4. Travel approval - [x]
5. Attendance based on real-time location - [x]
6. Attendance Inquiry - [x]
7. Personnel management -[x]
8. Modify avatar and infos - []

## Todo

1. change the front-end codes to vue3-sfc-ts
