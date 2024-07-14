# BookTrack
An E-Commerce application specializing in books and e-books, allows you to find a specific book (tracks location) in a specific location and shows every kind of store that is selling the specific book that you are looking for, Users can also post books that they want to sell.

## Technologies
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

## Database Tables:
1. **Accounts**
2. **books**
3. **books_sell**
4. **books_sold**
5. **history**
6. **transaction**
7. **notification_contents**
8. **favourites**
9. **messages**
10. **unread_messages**

## Functionalities:
1. **C.R.U.D.F.**
2. **Real Time Messaging**
3. **Authentication and Session**
4. **Node Mailer**
5. **Bulk Data Upload Through CSV**

## Install Dependencies:
```
npm install @supabase/supabase-js
npm install create-router-dom
npm install @supabase/auth-helpers-react
npm install date-fns
npm install axios
npm install uuid

-- Set Up Node Mailer -- 
npm init
npm install nodemailer express cors nodemon
npm install -g nodemon
cd ./Controller/ nodemon Nodemailer.js

-- Open windows Powershell if Denied --
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser (Enter Yes)
```