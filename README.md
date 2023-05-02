<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">telegram-bot-qrcode-reader</h3>

---

## 📝 Table of Contents

- [About](#about)
- [Instalation](#instalation)
- [Telegram Bot Service](#telegram-bot-service)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

---

## 🧐 About <a name = "about"></a>

This is a Telegram bot developed in Node.js that reads QR Codes from images and performs actions on a production line management system. The bot is integrated with a SQLite and MySQL database to register logs and read the product state on the production line.

---

## Executable Instalation <a name="instalation"></a>

For a easy installation, just type these commands.

1. Clone the repository:

```sh 
git clone "https://github.com/Christy386/telegram-bot-medi.git" 
```
2. Config file permissions:
```sh 
sudo chmod 777 ./install.sh
```
3. Executes the instalation file:
```sh 
sudo ./install.sh
```
---

## Manual Instalation <a name="instalation"></a>

To use this bot, you need to follow these steps:

1. Clone the repository:

```sh 
git clone "https://github.com/Christy386/telegram-bot-medi.git" 
```

2. Install the dependencies:
```sh  
npm install
```

3. Create a .env file in the root directory of the project and include your envoriment variables (Telegram API and MySQL login):

```s
BOT_KEY=<your_telegram_bot_API_key>
DB_HOST=<your_db_host>
DB_USER=<your_db_>
DB_PASSWORD=<your_db_password>
DB_DATABASE=<your_db_database>
```
4. Create a database file in the database folder with the name ``` telegramBotDB.db ```.

5. Run the project:

```sh 
node index 
```
---

## Usage

The bot listens to messages sent to it and performs different actions based on the message content.

### /myID

Returns the chat ID of the user who sent the message.

### /help

Displays all available commands.

### /next

Manege the product by id sending the command ``` /next <product id> ``` and the bot will return if the action is done and the next estep of the product or if ocurred an error.

### Send photo

If the telegram user sent an photo to telegram, the bot will altomatically read the image. If the bot can read a QR code, the bot will return the response of the ``` /next ``` command, if not, the bot will return an error.

---

## 🎈 Telegram Bot Service <a name="telegram-bot-service"></a>

### 🎈 Systemctl Commands <a name="Systemctl-Commands"></a>

Restart bot server:
```sh
systemctl restart telegram-bot
```
Start bot server:
```sh
systemctl start telegram-bot
```
Stop bot server:
```sh
systemctl stop telegram-bot
```

### 🔧 Systemctl Config File <a name="Config-File"></a>

In the file ``` /etc/systemd/system/telegram-bot.service ``` configure the systemctl to listen the telegram bot. This config manage the start of program in the Linux initialization. If not exists, create like this:

```sh
[Unit]
Description=Telegram Bot

[Service]
ExecStart=/usr/bin/node /root/telegram-bot-medi/index
Restart=always
User=root
Environment=PATH=/usr/bin:/usr/local/bin
WorkingDirectory=/root/telegram-bot-medi

[Install]
WantedBy=multi-user.target

```
---

## Bot Actions

The code exports an object named botActions that includes the following functions:

### <b>readQRWithBot(link, callback)</b>

This function takes in a `link` argument, which is a URL to an image containing a QR code, and a `callback` argument, which is a function that will be called with the decoded QR code data. It uses the `https` module to download the image data, then uses the `jimp` module to read the image and the `qrcode-reader` module to decode the QR code. An example usage of this function might look like this:

```js
botActions.readQRWithBot("https://example.com/qrcode.png", function(data) {
    console.log("Decoded QR code data:", data);
});
```

### <b>currentStatus(productId, callbackDone, callbackErr)</b>

This function takes in a `productId` argument, which is an identifier for the product whose status you want to check, as well as two callback functions: `callbackDone` and `callbackErr`. `callbackDone` will be called with the product status data if the status is successfully retrieved, while `callbackErr` will be called with an error message if there is an error retrieving the status. An example usage of this function might look like this:

```js
botActions.currentStatus("12345", (data) => {
    console.log("Product status data:", data);
}, (error) => {
    console.error("Error getting product status:", error);
});
```

### <b>go2approved(productId)</b> 

This function takes in a `productId` argument, which is an identifier for the product that you want to approve. It sends an HTTP GET request to a specific URL to approve the product. An example usage of this function might look like this:

```js
botActions.go2approved("12345");
```

### <b>go2StartPrint(productId)</b>

 This function takes in a `productId` argument, which is an identifier for the product that you want to start printing. It sends an HTTP GET request to a specific URL to start the printing process. An example usage of this function might look like this:

```js
botActions.go2StartPrint("12345");
```

### <b>go2AfterProcess(productId)</b>

This function takes in a `productId` argument, which is an identifier for the product that you want to mark as having completed processing. It sends an HTTP GET request to a specific URL to mark the product as processed. An example usage of this function might look like this:

```js
botActions.go2AfterProcess("12345");
```

### <b>go2EndPrint(productId)</b>

This function takes in a `productId` argument, which is an identifier for the product that you want to mark as having completed printing. It sends an HTTP GET request to a specific URL to mark the product as printed. An example usage of this function might look like this:

```js
botActions.go2EndPrint("12345");
```

### <b>go2delivery(productId)</b>

This function takes in a `productId` argument, which is an identifier for the product that you want to mark as delivered. It sends an HTTP GET request to a specific URL to mark the product as delivered. An example usage of this function might look like this:

```js
botActions.go2delivery("12345");
```
---

## 🏁 DBs (Database) <a name = "DBController"></a>

In the Telegram bot, we have 2 DBs: 

- SQLite DB with the log of all actions of all bot users.
- MySQL DB with the data of Medi server.

### SQLite DB

In the SQLite DB, the server can call functions to controll the DB. This functions will be imported coding like this being in the root of the main directory:

```js
const DBControllerSQlite = require('./database/DBControllerSQLite');
```

<b> createLogTable(callback) </b>

```createLogTable``` is responsible for creating the log table in the database. It takes a single parameter, which is a callback function that will be called when the table is created. The function opens a connection to the database, executes a SQL command to create the log table if it doesn't already exist, and then closes the database connection. If the table is created successfully, the callback function will be called without any errors. Otherwise, the callback function will be called with an error message. Usage example:

```js
createLogTable((err) => {// callback function
    if (err) {
        console.error(err.message);
    }else{
        console.log("The log table was created");
    }
});
```

<b> newLog(name, chatKey, command, productID, callback) </b>

```newLog``` is responsible for inserting a new row into the log table. It takes five parameters: name, chatKey, command, productID, and callback. name and chatKey represent the name and chatKey of the user who executed the command, respectively. command represents the command that was executed by the user. productID represents the ID of the product that was affected by the command (if applicable). callback is a function that will be called when the row is inserted. Usage example:

```js
newLog(name, chatKey, command, productID, (err) => {// callback function
    if (err) {
        console.error(err.message);
    }else{
        console.log("New log was created"); 
    }
});
```

<b> deleteLogTable(callback) </b>

```js
deleteLogTable((err) => {// callback function
    if (err) {
        return console.error(err.message);
    }else{
        console.log("Log table was deleted");
    }
});
```
### MySQL DB

In the MySQL DB, the server can call functions to controll the DB. This functions will be imported coding like this being in the root of the main directory:


```js
const DBControllerMySQL = require('./../database/DBControllerMySQL');
```

A MySQL database requires Telegram bot to connect to it using connection data like this:

```js
const mySQLCredentials = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}
```
For security, the variables ```js process.env.DB_* ``` are localized in the ```.env``` file as ambient variables. For more information see [Dotenv](#dotenv).

Below, the functions exemple usage:

<b>getSolicitacoesOperadorByID(id)</b>

This function retrieves data from the database for a specific ID. The function takes a single parameter, the ID of the record to be retrieved. It returns a Promise that resolves with an object representing the queried record or rejects with an error.

```js

const DBController = require('./DBController.js');

DBController.getSolicitacoesOperadorByID(1385)
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });

```
This will retrieve the record with ID 1385 from the database and log the data object to the console.

---

## 🚀 Dotenv <a name = "dotenv"></a>



## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [VueJs](https://vuejs.org/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@kylelobo](https://github.com/kylelobo) - Idea & Initial work

See also the list of [contributors](https://github.com/kylelobo/The-Documentation-Compendium/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- Inspiration
- References
