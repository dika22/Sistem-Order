'use strict';
const Product = require('./../models/products'),
	  helpers = require('./../utilities/helpers');

// Function Product Group
// Get All Product
exports.findProducts = function(req,res) {
	let getToken = helpers.decodeToken(req.headers.authorization)
	try{
		// level 1 = admin, level = users
		if (getToken.level == 1) {
			Product.find((err,respon)=>{
				if (!err) {
					res.json(respon)
				}
			})
		}else{
			throw new Error("Tidak Ada Akses!")
		}
	}catch(err){
		res.json({
			"status" : 404,
			"message" : err.message
		})
	}
}
// Create Product
exports.createProduct = (req,res)=>{
	let getToken = helpers.decodeToken(req.headers.authorization)
	try{
		let product = new Product(req.body);
		// level 1 = admin, level = users
		if (getToken.status == 1) {
			product.save((err,respon)=>{
				if (!err) {
					res.json({
						"status" : 201,
						"message" : "Sucess Create Product"
					})
				}
			})
		}else{
			throw new Error("Tidak ada Akses!")
		}

	}catch(err){
		res.json({
			"status" : 404,
			"message" : err.message
		})
	}
}
// Edit Product
exports.editProduct = (req,res) => {
	try{
		let getToken = helpers.decodeToken(req.headers.authorization)
		// level 1 = admin, level = users
		if(getToken.level == 1){
			Product.findOne({_id : req.params.id},(err,respon)=>{
				if (!err) {
					res.json(respon)
				}else{
					res.json(err)
				}
			})
		}else{
			throw new Error("Tidak Ada Akses!")
		}
	}catch(err){
		res.json({
			"status" : 404,
			"message" : err.message
		})
	}
}
// Update Product
exports.updateProduct = (req,res)=>{
	try{
		let getToken = helpers.decodeToken(req.headers.authorization)
		// level 1 = admin, level = users
		if (getToken.level == 1) {
			Product.findOneAndUpdate({_id : req.params.id},{$set : {
				nama  : req.body.nama,
				jenis : req.body.jenis,
				harga : req.body.harga,
				stock : req.body.stock
			}},(err,respon)=>{
				if (!err) {
					res.json({
						"status" : 200,
						"message" : "Sucess Update Product!"
					})
				}
			})
		}else{
			throw new Error("Tidak Ada Akses!")
		}
	}catch(err){
		res.json({
			"status" : 404,
			"message" : err.message
		})
	}
}

exports.deleteProduct = (req,res)=>{
	try{
		let getToken = helpers.decodeToken(req.headers.authorization)
		if (getToken.level == 1 && getToken) {
			Product.findOneAndRemove({_id : req.params.id}, (err,respon)=>{
				if (respon != null || !err) {
					res.json({
						"status" : 200,
						"message" : "Success Delete Product!"
					})
				}	
			})
		}else{
			throw new Error(err)
		}
	}catch(err){
		res.json({
			"status" : 404,
			"message" : err.message
		})
	}
}