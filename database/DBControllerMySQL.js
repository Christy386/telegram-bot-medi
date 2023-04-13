const mysql = require('mysql');

const mySQLCredentials = {
    host: 'sql803.main-hosting.eu',
    user: 'u435283178_bd_hub_medi',
    password: 'Emedi3dpapae!',
    database: 'u435283178_bd_hub_medi'
}

function getSolicitacoesOperadorByID(id) {
    
    return new Promise((resolve, reject) => {
        // Create a connection object
        const connection = mysql.createConnection(mySQLCredentials);
        // Connect to the MySQL database
        connection.connect((error) => {
            if (error) {
                console.error('Error connecting to MySQL database:', error);
                reject(error);
            }else{
                console.log('Connected to MySQL database!');

                let sqlReq = `
                    SELECT * FROM 
                        solicitacoes, 
                        status_servicos, 
                        usuarios, 
                        tipo_impressoes, 
                        tipo_material_impressao, 
                        cor_impressoes,
                        enderecos_usuarios
                    WHERE 
                        (
                            (solicitacoes.status_solicitacao = status_servicos.id_status_servico AND 
                            solicitacoes.id_usuario_solicitante = usuarios.id_usuario AND 
                            solicitacoes.tipo_impressao_solicitacao = tipo_impressoes.id_tipo_imprepressao AND 
                            solicitacoes.tipo_material_solicitacao = tipo_material_impressao.id_material_impressao AND 
                            solicitacoes.cor_material_solicitacao = cor_impressoes.id_cor_impressao AND 
                            solicitacoes.status_solicitacao != 5 AND 
                            solicitacoes.status_solicitacao != 6 AND 
                            solicitacoes.status_solicitacao != 10 AND 
                            solicitacoes.status_solicitacao != 11  AND 
                            solicitacoes.status_solicitacao != 13 AND 
                            solicitacoes.status_solicitacao != 1 AND 
                            solicitacoes.status_solicitacao != 9 AND 
                            solicitacoes.status_solicitacao != 8 AND 
                            solicitacoes.status_solicitacao != 3 AND 
                            solicitacoes.status_solicitacao != 4) 
                        OR
                            (solicitacoes.status_solicitacao = status_servicos.id_status_servico AND 
                            solicitacoes.id_usuario_solicitante = usuarios.id_usuario AND 
                            solicitacoes.tipo_impressao_solicitacao = tipo_impressoes.id_tipo_imprepressao AND 
                            solicitacoes.tipo_material_solicitacao = tipo_material_impressao.id_material_impressao AND 
                            solicitacoes.cor_material_solicitacao = cor_impressoes.id_cor_impressao AND 
                            (solicitacoes.status_solicitacao =3 OR solicitacoes.status_solicitacao =8) AND
                            enderecos_usuarios.id_endereco = solicitacoes.entrega_solicitacao)
                        OR
                            (solicitacoes.status_solicitacao = status_servicos.id_status_servico AND 
                            solicitacoes.id_usuario_solicitante = usuarios.id_usuario AND 
                            solicitacoes.tipo_impressao_solicitacao = tipo_impressoes.id_tipo_imprepressao AND 
                            solicitacoes.tipo_material_solicitacao = tipo_material_impressao.id_material_impressao AND 
                            solicitacoes.cor_material_solicitacao = cor_impressoes.id_cor_impressao AND 
                            solicitacoes.status_solicitacao != 5 AND 
                            solicitacoes.status_solicitacao != 6 AND 
                            solicitacoes.status_solicitacao != 7 AND 
                            solicitacoes.status_solicitacao != 2  AND 
                            solicitacoes.status_solicitacao != 10 AND 
                            solicitacoes.status_solicitacao != 11 AND 
                            solicitacoes.status_solicitacao != 9 AND 
                            solicitacoes.status_solicitacao != 8 AND 
                            solicitacoes.status_solicitacao != 3 AND 
                            solicitacoes.status_solicitacao != 12)
                        ) AND
                        solicitacoes.id_solicitacao = ${id}
                    ORDER BY data_solicitacao
                `;
                // Execute a query
                connection.query(sqlReq, (error, results, fields) => {
                    if (error) {
                        console.error('Error executing query:', error);
                        reject(error);
                    }else{
                        //console.log('Query results: \n', results); // show the data in console server
                        resolve(results[0]);
                    }
                    
                });
                // End the connection
                connection.end();
            }
            
        });
    });
}

/*getSolicitacoesOperadorByID(1385)
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });//*/

const DBController = {//exportation object with all functions
    getSolicitacoesOperadorByID: getSolicitacoesOperadorByID,
};
console.log("DBController MySQL is inluded")
module.exports = DBController;