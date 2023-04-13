const http = require('http');

const urlVerification = "http://labpronto.com.br/hub/indexOperador.php";



    //let index = fruits.indexOf("Apple");
    http.get(urlVerification, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            let splitedData = data.split("<tr>");
            //console.log(data);
            //let index = splitedData[3].indexOf("1386");

            let idLocation = -1;//location of product id
            let idData;

            for(i=0; i<splitedData.length;i++){
                idLocation = splitedData[i].indexOf("1387")

                if(idLocation != -1){
                    idData = splitedData[i];
                    break;
                }
            }
            //console.log(idData.length);/*
            
            if(idData[5].indexOf("Solicitação aprovada sem erros") != -1){
                console.log("state: Solicitação aprovada sem erros") ;
            }else if(idData[5].indexOf("Em execução") != -1){
                console.log("state: Em execução");
            }else if(idData[5].indexOf("Em processamento") != -1){
                console.log("state: Em processamento");
            }//*/

        });
    }).on('error', (err) => {
        console.error(`Error: ${err.message}`);
    });