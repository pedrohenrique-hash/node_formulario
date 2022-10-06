const { rejects } = require('assert');
let mysql = require('mysql');

class RegistrationDB{
    static connect(){
         let connection = mysql.createConnection({
            host : "172.19.0.2",
            user: "root",
            password: "s3cret",
            database: "registration"
         });


         connection.connect();
         
         return connection;
    }
    static getRegistration(){

        return new Promise(function(error, results){

            let connection = RegistrationDB.connect();

            let sql = "select * from registration_client";

            connection.query(sql, function(error,results,fields ){ 
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        });
        connection.end();
    });

    }

    static getRegistrationByName(client_name){
        return new Promise(function(resolve,reject){
            let connection = RegistrationDB.connect();

            let sql = "select client_name, email  from registration_client where client_name = '"+client_name+"'";

            connection.query(sql, function(error, results, fields){
                if(error){
                    reject(error);
                }else{
                    resolve(error);
                }
            });
            connection.end();
        });
    }

    static getRegistrationByPassword(user_password){
       return new Promise(function(resolve,reject){
            
            let connection =RegistrationDB.connect();
            
            let sql = "select * from registration_client where user_password = ?";
            
            connection.query(sql ,user_password ,function(error, results, fields){
            
                if(error){
            
                    reject(error);
            
                }else{
            
                    if(results.length == 0){
            
                        reject(Error("Não encontrado "));
            
                        return
                    }
                    let registration_client = results[0];

                    resolve(registration_client);
                }
            });
            connection.end();
        }); 
    }

    static save(registration_client){
        
        return new Promise(function(resolve, reject){
            
            let connection =RegistrationDB.connect();

            let sql = "insert into  registration_client set ?";

            connection.query(sql, function(error, results, fields){
                if(error){
                    reject(error);
                }else{
                    registration_client.user_password = results.insertId();

                    resolve(registration_client);
                }
            });
            connection.end();

        });
    }

    static update(registration_client){
        
        return new Promise(function(resolve, reject){
            
            let connection =RegistrationDB.connect();
            
            let sql = "update registration_client set ? where user_password = ?";

            let user_password = registration_client.user.password;

            connection.query(sql, [registration_client, user_password], function(error, results, fields){
                if(error){
                    reject(error);
                }
                else{
                    resolve(carro);
                }
            });

            connection.end();
        });
    }

    static delete(registration_client){
        return new Promise(function(resolve, reject){
            
            let sql = "delete from registration_client where user_password = ?";

            let user_password = registration_client.user_password;

            connection.query(sql, user_password, function(error, results, fields){
              
                if(error){

                    reject(error);    
                
                }else{
                
                    resolve(registration_client); 
                
                }
            });
            connection.end();

        });
    }

    static deleteByPassword(user_password){
        return new Promise(function(resolve, reject){
        let connection =RegistrationDB.connect();
        
        let sql = "delete from registration_client where user_password = ?";

        connection.query(sql, user_password, function(error, results){
            if(error){
                reject(error);
            }
            else{
                resolve(results.affectedRows);
            }

        });

        connection.end();
    });

    }

}

module.exports = RegistrationDB;