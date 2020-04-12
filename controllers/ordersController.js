'use strict';

const Order = require('./../models/order'),
	  helpers = require('./../utilities/helpers');

// Function Orders Group
// Get All Orders
exports.findOrders = function(req,res) {
	try{
		let getToken = helpers.decodeToken(req.headers.authorization)
		if (getToken.level == 1) {
			Order.find((err,respon)=>{
				if (!err) {
					res.json(respon)
				}else{
					res.status(404).json(err)
				}
			})
		}
	}catch(err){
		res.json({
			"status" : 404,
			"message" : err.message
		})
	}
}
// Create Order
exports.createOrder = (req,res)=>{
	try{
	let getToken = helpers.decodeToken(req.headers.authorization)
		if (getToken.level == 2) {
			let newOrder = new Order(req.body)
			newOrder.status = 1 // 1 : on proses 2 : cancel 
			newOrder.save((err,respon)=>{
				if (!err) {
					res.json({
						"status" : 201,
						"message" : "Orderan Berhasil!"
					})
				}else{
					console.log(err)
				}
			})
		}
	}catch(err){
		res.json({
			"status" : 404,
			"message" : err.message
		})
	}
}