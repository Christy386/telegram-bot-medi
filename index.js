/** qrcode reader imports */
//Importing jimp module
const Jimp = require("jimp");
// Importing filesystem module
//const fs = require('fs')
//import https module
const https = require('https');
const http = require('http');
// Importing qrcode-reader module
const qrCode = require('qrcode-reader');
/** //////////////////////////////////////////////////////////////////////////// */
 
/** bot telegram imports and constants */
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.BOT_KEY;
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
/** //////////////////////////////////////////////////////////////////////////// */

/** local JS imports*/
const DBControllerSQlite = require('./database/DBControllerSQLite');
const botActions = require('./utils/botActions');

/**///////////////////////////////////////////////////////////////////////////// */

/** Telegram bot events */
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const chatName = msg.chat.first_name;
    console.log(msg)
    if(msg.photo){
        /** GET URL from image */
        bot.getFileLink(msg.photo[3].file_id)
            .then((link) => {
                console.log(link);

                botActions.readQRWithBot(link, (err, value) => {
                    if (err) {
                        console.error(err);
                        bot.sendMessage(chatId,err);
                    }else if(value){// Printing the decrypted value
                        const productId = value.result;
                        console.log('Your qrcode is:' + productId);
                        bot.sendMessage(chatId, 'Your QRcode is: ' + productId);

                        botActions.currentStatus(productId, (data) => {//callbackDone function
                            //bot.sendMessage(chatId, data);
                            //console.log(data.id_solicitacao);
                            if(data){
                                switch(data.status_servico) {
                                    case 'Aguardando Aprovação'://go to "Solicitação Aprovada sem erros"
                                        botActions.go2approved(productId);
                                        console.log('Go to "Solicitação Aprovada sem erros"');
                                        bot.sendMessage(chatId, 'Go to "Solicitação Aprovada sem erros"');
                                        break;
                                    case 'Solicitação Aprovada sem erros'://go to "Em execução"
                                        botActions.go2StartPrint(productId);
                                        console.log('Go to "Em execução"');
                                        bot.sendMessage(chatId, 'Go to "Em execução"');
                                        break;
                                    case 'Em execução'://go to "Preparando embalagem"
                                        botActions.go2AfterProcess(productId);
                                        console.log('Go to "Preparando embalagem"');
                                        bot.sendMessage(chatId, 'Go to "Preparando embalagem"');
                                        break;
                                    case 'Preparando embalagem'://go to "Disponível para retirada"
                                        botActions.go2EndPrint(productId);
                                        console.log('Go to "Disponível para retirada"');
                                        bot.sendMessage(chatId, 'Go to "Disponível para retirada"');
                                        break;
                                    case 'Disponível para retirada'://go to "end product"
                                        botActions.go2delivery(productId);
                                        console.log('Go to "end product or error"');
                                        bot.sendMessage(chatId, 'Go to "end product or error"');
                                        break;
                                    
                                    default:
                                        console.log('Product with id: ' + productId + ' ended the production line and delivered or an error is occurred');
                                        bot.sendMessage(chatId, 'Product with id: ' + productId + ' ended the production line and delivered or an error is occurred');
                                        
                                }//*/ 
                            }else{
                                console.log('Product with id: ' + productId + ' ended the production line and delivered or an error is occurred');
                                bot.sendMessage(chatId, 'Product with id: ' + productId + ' ended the production line and delivered or an error is occurred');
                            }
                            
                
                            
                            
                        },(err) => {
                            console.error(err);  
                            bot.sendMessage(chatId,String(err));
                        });

                        DBControllerSQlite.newLog(chatName, chatId, 'next', productId, (err) => {
                            if (err) {
                                return console.error(err.message);
                            }else{
                                console.log('new log is created');
                                bot.sendMessage(chatId, 'Product resgistred to the next step');
                            }
                        });
                    }else{
                        bot.sendMessage(chatId, 'Qrcode error: Send another photo');
                    }
                    
                });

            });
        //console.log(msg);
    }else if(msg.text == "/myID"){// send chat ID to telegram user///////////////////////////////////////////////////////////////////
        console.log('Telegram ID is: ' + chatId)
        bot.sendMessage(chatId, 'Telegram ID is:');
        bot.sendMessage(chatId, chatId);
    }else if(msg.text.split(' ')[0] == "/newAdm"){// add in new Adm //////////////////////////////////////////////////////////////// 
        const textSplited = msg.text.split(' ')
        const admName = textSplited[1];
        const admId = textSplited[2];
        console.log(textSplited[1]);
        console.log(textSplited[2]);
        DBControllerSQlite.newAdm(admName, admId, (err) => {
            if (err) {
                return console.error(err.message);
            }else{
                console.log('new adm is created');
                bot.sendMessage(chatId, 'Added new adm with ID: \n' + admId + '\nAnd name: \n' + admName);
            }
        });
        
    }else if(msg.text == "/help"){//send all commands to user
        console.log('commands: \n /myID - return your ID\n /newADM - add new ADM\n /help - show commands\n')
        bot.sendMessage(chatId, 'commands: \n /myID - return your ID\n /newADM - add new ADM\n /help - show commands\n');
    }else if(msg.text.split(' ')[0] == "/next"){//next step of the product
        const textSplited = msg.text.split(' ')
        const productId = textSplited[1];
        botActions.currentStatus(productId, (data) => {//callbackDone function
            //bot.sendMessage(chatId, data);
            //console.log(data.id_solicitacao);
            if(data){
                switch(data.status_servico) {
                    case 'Aguardando Aprovação'://go to "Solicitação Aprovada sem erros"
                        botActions.go2approved(productId);
                        console.log('go to "Solicitação Aprovada sem erros"');
                        bot.sendMessage(chatId, 'go to "Solicitação Aprovada sem erros"');
                        break;
                    case 'Solicitação Aprovada sem erros'://go to "Em execução"
                        botActions.go2StartPrint(productId);
                        console.log('go to "Em execução"');
                        bot.sendMessage(chatId, 'go to "Em execução"');
                        break;
                    case 'Em execução'://go to "Preparando embalagem"
                        botActions.go2AfterProcess(productId);
                        console.log('go to "Preparando embalagem"');
                        bot.sendMessage(chatId, 'go to "Preparando embalagem"');
                        break;
                    case 'Preparando embalagem'://go to "Disponível para retirada"
                        botActions.go2EndPrint(productId);
                        console.log('go to "Disponível para retirada"');
                        bot.sendMessage(chatId, 'go to "Disponível para retirada"');
                        break;
                    case 'Disponível para retirada'://go to "end product"
                        botActions.go2delivery(productId);
                        console.log('go to "end product or error"');
                        bot.sendMessage(chatId, 'go to "end product or error"');
                        break;
                    
                    default:
                        console.log('Product with id: ' + productId + ' ended the production line and delivered or an error is occurred');
                        bot.sendMessage(chatId, 'Product with id: ' + productId + ' ended the production line and delivered or an error is occurred');
                        
                }//*/ 
            }else{
                console.log('Product with id: ' + productId + ' ended the production line and delivered or an error is occurred');
                bot.sendMessage(chatId, 'Product with id: ' + productId + ' ended the production line and delivered or an error is occurred');
            }
            

            
            
        },(err) => {
            console.error(err);
            bot.sendMessage(chatId, 'Erro');
        });
        
    }else{
        // send a message to the chat acknowledging receipt of their message
        bot.sendMessage(chatId, 'Received your message');
    }
  
    
  });
