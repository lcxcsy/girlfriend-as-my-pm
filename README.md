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

- [x] JWT and router guard
- [x] Support http and https
- [x] Travel application
- [x] Travel approval
- [x] Attendance based on real-time location
- [x] Attendance Inquiry
- [x] Personnel management
- [ ] Modify avatar and infos

## Todo

1. change the front-end codes to vue3-sfc-ts
