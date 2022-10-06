let express = require('express');

const router = express.Router();

const RegistrationDB = require('../model/RegistrationDB');

const exec = require('./utils');

router.get('/',exec(async(request, response, next)=>{
    
    let registration = await registrationDB.getRegistration();

    response.json(registration);

}));

router.get('/:user_password(\\d+)', exec(async(request, response, next)=>{
    
    let user_password = request.params.user_password;

    let registration = await RegistrationDB.getRegistrationByPassword(user_password);

    response.json(registration);

}));

router.delete('/:user_password(//d+)', exec(async(request, response, next)=>{
    
    let user_password = request.params.user_password;

    let affectedRows = await RegistrationDB.deleteByPassword(user_password);

    response.json({msg: affectedRows > 0 ? "Senha deletada do usuario com sucesso. ": "Nenhum cliente excluido"});
    
}));

router.get('/:email', exec(async(request, response, next)=> {
    let email = request.params.email;
    
    let registration = await RegistrationDB.getRegistrationByEmail(email);
    
    response(registration);
    
}));

router.post('/', exec(async(request, response, next)=> {
    
    let registration = await RegistrationDB.save(request.body);
    
    response.json(registration);

}));

router.put('/', exec(async(request, response, next)=>{
    
    let registration = await RegistrationDB.update(request.body);

    response.json({msg: 'Carro atualizado com sucesso'});

}));

module.exports = router;