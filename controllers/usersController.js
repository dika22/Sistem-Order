'use strict';

const User = require('./../models/users'),
	  helpers = require('./../utilities/helpers'),
	  bcrypt = require('bcrypt'),
	  saltRounds = 10;

// Welcome in My App
exports.index = function(req, res) {
    res.json({"message": "Welcome My app"});
};

// Function Users Group
// Get All Users
exports.findUsers = function(req,res) {
	try{
		let getToken = helpers.decodeToken(req.headers.authorization)
		if(!getToken ||  getToken.level == 1){
			User.find((err,respon)=>{
				if (!err) {
					res.json(respon)
				}else{
					throw new Error(err)
				}
			})
		}else{
			throw new Error(getToken.message)
		}
	}catch(err){
		res.json({
			"status"  : 404,
			"message" : err.message 
		})
	}
}

// Register User
exports.createUser = function(req,res){
	try{
		if (helpers.checkEmail(req.body.email)) {
			User.findOne({email: req.body.email}, function (err, respon) {
				let string_password = req.body.password;
			    let password = bcrypt.hashSync(string_password, saltRounds);
				if (respon == null) {
					req.body.password = password
					let newUser = new User(req.body)
						// set token null 
						newUser.token = "";
						//default user 
						newUser.as = 2 
					newUser.save(function(err,respon){
						if (err) {
							console.log(err)
						}
						res.json(respon)
					})
				}else{
					res.json({
						"status" : 200,
						"message" : "Email Sudah terdaftar"
					})
				}
			});
		}else{
			throw new Error("Email Wrong!");
		}
	}catch(err){
		res.json({
			"status"  : 404,
			"message" : err.message 
		})
	}
}


// Edit User
exports.editUser = function(req,res){
	try{
		let decode = helpers.decodeToken(req.headers.authorization)
		if(decode.level == 1){
			User.findById(req.params.id,(err,respon)=>{
				if (!err) {
					res.json(respon)
				}else{
					throw new Error(err)
				}
			})
		}else{
			throw new Error(err)
		}
	}catch(err){
		res.json({
			"status"  : 404,
			"message" : err.message 
		})
	}
}
// Update User
exports.updateUser = (req,res) =>{
	try{
		let decode = helpers.decodeToken(req.headers.authorization)
		if(decode.level == 1){
			if (helpers.checkEmail(req.body.email)) {
				let string_password = req.body.password;
				let password = bcrypt.hashSync(string_password, saltRounds);
				User.findOneAndUpdate({_id : req.params.id}, { $set:
				{
					fullname : req.body.fullname,
					email    : req.body.email,
					birthdate: req.body.birthdate,
					username : req.body.username,
					password : password,
					token    : req.body.token,
					as       : 1

				}},(err,respon)=>{
					if (!err) {
						res.json({
							"status"  : 200,
							"message" : "Berhasil Diupdate!"
						})
					}else{
						res.json({"status" : 404, "message" : "Gagal Di Update!"})
					}
				})
			}else{
				throw new Error("Email Wrong!")
			}
		}else{
			throw new Error("Tidak Ada Akses")
		}
	}catch(err){
		res.json({"status": 404, "message": err.message})
	}
}

exports.deleteUser = (req,res)=>{
	try{
		let decode = helpers.decodeToken(req.headers.authorization)
		if (decode.level == 1 && decode) {
			User.findOneAndRemove({_id : req.params.id}, (err,respon)=>{
				if (respon != null || !err) {
					res.json({
						"status" : 200,
						"message" : "Success Delete User!"
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

// Login 
exports.login = (req,res)=>{
	try{
		let password = req.body.password;
		let username = req.body.username;
		let criteria = (username.indexOf('@') === -1) ? {username: req.body.username} : {email: req.body.username};
			User.findOne(criteria, function (err, respon) {
				if (!err && respon != null) {
					let hashPassword 	= respon.password;
		        	let valid 	= bcrypt.compareSync(password, hashPassword);
		        	if (valid) {
		        		let token = helpers.generateToken(respon);
		        		res.json({
		        			"status" : 200,
		        			"message" : "Berhasil Login",
		        			"token" : token
		        		})
		        	}
				}else{
					res.json({
						"status" : 504,
						"message" : "Email Atau Username Belum Terdaftar!"
					})
				}
			})
	}catch(err){
		res.json({"status": 404, "message": err.message})
	}
}