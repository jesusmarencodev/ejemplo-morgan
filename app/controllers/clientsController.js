'use strict';
const clientModel =  require('../models/clientsModel');
const logger = require('../../utils/logger');



var controllers = {
	//controller that is responsible for creating a clients
	save : (req, res) => {
		let body = req.body;
		console.log(body)
		if (body.name && body.email && body.password ) {
			let client = new clientModel();

			client.name = body.name;
            client.email = body.email;
			client.password = body.password;
			logger.error(`Error Client could not be created code 404`);
			client
				.save()
				.then((clientCreated) => {
					logger.info(`Client created successfully code 200`);
					return res.status(200).json({ clientCreated });
				})
				.catch((err) => {
					logger.error(`Error Client could not be created code 404`);
					return res.status(404).json({ TheError: err });
				});
		}else{
			return res.status(400).json({message:"Complete the required fields"});
		}
	},

	//Controller responsible for obtaining all categories
	get : async (req, res) =>{
		let clients = await clientModel.find({});
		logger.info(`Client List code 200`);
		return res.status(200).json({clients});
	},

	//Controller responsible for update all clients
	edit : async (req, res) =>{
		let body = req.body;
		let client = await clientModel.findById({_id:body.id});
		console.log(client)
		if(!client){
			logger.warn(`Client not Found code 404`);
			return res.status(404).json({message:'Not found results'})
		}

		client.name = body.name;
		client.email = body.email;
		client.password = body.password;
		
		client.save()
				.then((clientUpdate)=>{
					logger.warn(`Client Edit Successfully code 200`);  
					return res.status(200).json({clientUpdate});
				})
				.catch((err)=> {
					logger.error(`Request error in clientEdit request code 500 `);
					return res.status(500).json({err});
				})
	},
	//Controller responsible for delete one client
	delete :  (req, res) =>{
		let id = req.params.id;

		//usemos callbacks
		clientModel.findByIdAndRemove({_id:id}).exec((err, clientDelete)=>{
			if(err){
				logger.error(`Server error client could not be removedcode 500 `);
				return;
			}
			if(!clientDelete){
				logger.warn(`Client not found code 404 `);
			}
			logger.info(`Client delete succefully code 200 `);
			return res.status(200).send({clientDelete:clientDelete});
		})
	}
};

module.exports = controllers;
