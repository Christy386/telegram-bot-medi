const mysql = require('mysql');

// Create a connection object
const connection = mysql.createConnection({
    host: 'sql803.main-hosting.eu',
    user: 'u435283178_bd_hub_medi',
    password: 'Emedi3dpapae!',
    database: 'u435283178_bd_hub_medi'
});

// Connect to the MySQL database
connection.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL database:', error);
        return;
    }
    console.log('Connected to MySQL database!');
    let sqlReq = `
        SELECT * FROM 
            solicitacoes, 
            status_servicos, 
            usuarios, 
            tipo_impressoes, 
            tipo_material_impressao, 
            cor_impressoes 
        WHERE 
            solicitacoes.status_solicitacao = status_servicos.id_status_servico AND 
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
            solicitacoes.status_solicitacao != 4 AND
            solicitacoes.id_solicitacao = 1387

        ORDER BY data_solicitacao
    `;
    // Execute a query
    connection.query(sqlReq, (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            return;
        }
            console.log('Query results: \n', results);
            
            /*
            let selectedID = results.map((item) => {
                if(item.id_solicitacao == 1387){
                    return(item);
                }
                 
            });
            console.log(selectedID);//*/
    });//*/

  // End the connection
  connection.end();
});