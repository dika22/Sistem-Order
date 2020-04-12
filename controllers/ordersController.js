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
		if (!getToken || getToken.level == 2) {
			let newOrder = new Order(req.body)
			newOrder.status = 1 // 1 : on proses 2 : cancel 
			newOrder.save((err,respon)=>{
				if (!err) {
					res.json({
						"status" : 201,
						"message" : "Orderan Berhasil!"
					})
				}else{
					throw new Error(err)
				}
			})
		}else{
			// console.log(getToken.message)
			throw new Error(getToken.message)
		}
	}catch(err){
		res.json({
			"status" : 404,
			"message" : err.message
		})
	}
}

exports.cancelOrders = function(req,res) {
	let getToken = helpers.decodeToken(req.headers.authorization)
	if(!getToken){
		Order.findOneAndUpdate({_id : req.params.id},{ $set:
				{
					status : 2,
				}},(err,respon)=>{
				if (!err) {
					res.json({
						"status" : 200,
						"message" :"Success Cancel!"
					})
				}
		})
	}
}