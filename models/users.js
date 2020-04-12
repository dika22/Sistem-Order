const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;
	  // mongoosePaginate = require('mongoose-paginate');


const userSchema = new Schema({
	fullname : {
		type : String,
		required : true
	},
	email : {
		type : String,
		required : true
	},
	birthdate : {
		type : String,
		required : true
	},
	username : {
		type : String,
		required : true
	},
	password : {
		type : String,
		required : true
	},
	handphone : {
		type : String,
		required : true
	},
	token : {
		type : String
	},
	as :{  // Alias 1 : Admin 1 : Users
		type : String
	}
})

// userSchema.plugin(mongoosePaginate)

const User = mongoose.model("user", userSchema);
module.exports = User;