const jwt = require('jsonwebtoken');
// Check email
exports.checkEmail = (email)=>{
	// Variable Regex Email
	let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (reg.test(email)) {
		return true;
	}else{
		return false;
	}
}
// Generate Token
exports.generateToken = (res)=>{
	let token = jwt.sign({
			  exp: Math.floor(Date.now() / 1000) + (60 * 60), // example expired on 1 hour
			  level : res.as 
			}, process.env.KEY);
	
	return token;
}
// Decode Token
exports.decodeToken = (token)=>{
	try {
	  let newtoken = token.replace("Bearer ", "")
	  let decoded = jwt.verify(newtoken, process.env.KEY);
	  return decoded;
	} catch(err) {
	  return err
	}
}