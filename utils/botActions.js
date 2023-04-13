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
const DBControllerMySQL = require('./../database/DBControllerMySQL');




function readQRWithBot(link, callback){
   
    https.get(link, (res) => {//GET image data
        const imageData = [];
      
        res.on('data', (chunk) => {
            imageData.push(chunk);
        });
      
        res.on('end', () => {
            const buffer = Buffer.concat(imageData);
          
            Jimp.read(buffer, function(err, image) {
                if (err) {
                    console.error(err);
                }
                // Creating an instance of qrcode-reader module
                let qrcode = new qrCode();
                qrcode.callback = callback;
                // Decoding the QR code
                qrcode.decode(image.bitmap);
            });

        });
    }).on('error', (err) => {
        console.error(err);
    });

}

function currentStatus(productId, callbackDone, callbackErr){//2 callbacks, the 1st executes if the process is done, 
                                                             //and the 2nd executes if the process is an error

    DBControllerMySQL.getSolicitacoesOperadorByID(productId)//serch by the info
    .then(callbackDone)
        /*(data) => {
        
        console.log(data);
    })//*/
    .catch(callbackErr);
        /*(error) => {
        console.error(error);
    });//*/

    
}

function go2approved(productId){
    const url = "http://labpronto.com.br/hub/indexProjMedi.php?func=aprova&id="+productId;

    http.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log("Approved");
        });
    }).on('error', (err) => {
        console.error(`Error: ${err.message}`);
    });
}

function go2StartPrint(productId){
    const url = "http://labpronto.com.br/hub/indexOperador.php?func=executa&id="+productId;

    http.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log("printing");
        });
    }).on('error', (err) => {
        console.error(`Error: ${err.message}`);
    });
}

function go2AfterProcess(productId){
    const url = "http://labpronto.com.br/hub/indexOperador.php?func=finaliza&id="+productId+"&envio=%27processamento%27";

    http.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log("After Processing");
        });
    }).on('error', (err) => {
        console.error(`Error: ${err.message}`);
    });
}

function go2EndPrint(productId){
    const url = "http://labpronto.com.br/hub/indexOperador.php?func=finaliza&id="+productId+"&envio=1";

    http.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log("Ended print");
        });
    }).on('error', (err) => {
        console.error(`Error: ${err.message}`);
    });
}

function go2delivery(productId){
    const url = "http://labpronto.com.br/hub/solicitacoesAbertoOp.php?func=finaliza&id="+productId+"&envio=%27fim%27";

    http.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log("delivered");
        });
    }).on('error', (err) => {
        console.error(`Error: ${err.message}`);
    });
}

console.log('botActions is included');

const botActions = {
    readQRWithBot: readQRWithBot,
    currentStatus: currentStatus,
    go2approved: go2approved,
    go2StartPrint: go2StartPrint,
    go2AfterProcess: go2AfterProcess,
    go2EndPrint: go2EndPrint,
    go2delivery: go2delivery
}

//export default readQRWithBot;
module.exports = botActions;