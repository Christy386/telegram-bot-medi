//import sqlite3
const sqlite3 = require('sqlite3');

// Create a new USERS table
function createUsersTable(callback){
    //open database connection
    const db = new sqlite3.Database('./database/telegramBotDB.db');
    
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, chatKey TEXT)', callback);

    // Close the database connection
    db.close();
}

// Create a new LOG table
function createLogTable(callback){
    //open database connection
    const db = new sqlite3.Database('./database/telegramBotDB.db');

    db.run('CREATE TABLE IF NOT EXISTS log (id INTEGER PRIMARY KEY, name TEXT, chatKey TEXT, command TEXT, productID INTEGER)', callback);

    // Close the database connection
    db.close();
}

// Create a new ADM table
function createAdmTable(callback){
    //open database connection
    const db = new sqlite3.Database('./database/telegramBotDB.db');

    db.run('CREATE TABLE IF NOT EXISTS adm (id INTEGER PRIMARY KEY, name TEXT, chatKey TEXT)', callback);

    // Close the database connection
    db.close();
}

// Insert new ADM
function newAdm(name, chatKey, callback){
    //open database connection
    const db = new sqlite3.Database('./database/telegramBotDB.db');

    db.run('INSERT INTO adm (name, chatKey) VALUES (?, ?)', [name, chatKey], callback);

    // Close the database connection
    db.close();

}

// Insert new log
function newLog(name, chatKey, command, productID, callback){
    //open database connection
    const db = new sqlite3.Database('./database/telegramBotDB.db');

    db.run('INSERT INTO log (name, chatKey, command, productID) VALUES (?, ?, ?, ?)', [name, chatKey, command, productID], callback);

    // Close the database connection
    db.close();

}


// Insert new user
function newUser(name, chatKey, callback){
    //open database connection
    const db = new sqlite3.Database('./database/telegramBotDB.db');

    db.run('INSERT INTO users (name, chatKey) VALUES (?, ?)', [name, chatKey], callback);

    // Close the database connection
    db.close();

}

function getAllUsers(callback){
    //open database connection
    const db = new sqlite3.Database('./database/telegramBotDB.db');

    db.all('SELECT * FROM users', callback);

    // Close the database connection
    db.close();

}

function getUserByID(id2search,callback){
    //open database connection
    const db = new sqlite3.Database('./database/telegramBotDB.db');

    db.all('SELECT * FROM users WHERE id ='+id2search, callback);

    // Close the database connection
    db.close();

}

function searchByName(search, callback){
    //open database connection
    const db = new sqlite3.Database('./database/telegramBotDB.db');

    db.all("SELECT * FROM users WHERE name LIKE '%"+search+"'", callback);

    // Close the database connection
    db.close();
}

function deleteUsersTable(callback){
    //open database connection
    const db = new sqlite3.Database('./database/telegramBotDB.db');

    db.run('DROP TABLE users', callback);

    // Close the database connection
    db.close();
}

function deleteLogTable(callback){
    //open database connection
    const db = new sqlite3.Database('./database/telegramBotDB.db');

    db.run('DROP TABLE log', callback);

    // Close the database connection
    db.close();
}

//SINGLE COMMAND EXEMPLE 1 | USABLE IN : createUserTabel, createLogTabel and newUser 
/* 
function(<parameters if exists>, (err) => {// callback function
    if (err) {
        return console.error(err.message);
    }else{
        <commands>
    }
}

//SINGLE COMMAND EXEMPLE 2 | USABLE IN : getAllUsers, getUserByID and searchByName 
/* 
function(<parameters if exists>, (err, rows) => {// callback function
    if (err) {
        return console.error(err.message);
    }else{
        <commands using 'rows' variable>
    }
}
*/
//MULTIPLE COMMANDS EXEMPLE
/*createUsersTable((err) => {
    if (err) {
        return console.error(err.message);
    }else{
        console.log(`A new user table has been created if not exists`);

        newUser('test', 'test@test', (err) => {
            if (err) {
                return console.error(err.message);
            }else{
                console.log(`A new user has been inserted with ID ${this.lastID}`);
                getAllUsers((err, rows) => {
                    if (err) {
                        return console.error(err.message);
                    }else{
                        console.log(rows);

                    }
                });
            }
        });
    }
    
});*/

//TESTS

/*newAdm((err) => {
    if (err) {
        return console.error(err.message);
    }else{
        console.log("created new ADM table");

    }
});*/


const DBController = {//exportation object with all functions
    createUsersTable: createUsersTable,
    newUser: newUser,
    getAllUsers: getAllUsers,
    getUserByID: getUserByID,
    searchByName: searchByName,
    deleteUsersTable: deleteUsersTable,
    createLogTable: createLogTable,
    newLog: newLog,
    createAdmTable: createAdmTable,
    newAdm: newAdm,
};
console.log("DBControllerSQLite is inluded")
module.exports = DBController;
