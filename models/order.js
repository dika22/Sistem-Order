const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;
	  // mongoosePaginate = require('mongoose-paginate');


const orderSchema = new Schema({
	nama : {
		type : String,
		required : true
	},
	idProduct : {
		type : String,
		required : true
	},
	jumlah :{
		type : String,
		required : true
	},
	orderdate : {
		type : String,
		required : true
	},
	pay :{
		type : String,
		required : true
	},
	status : {
		type :String // 1 : VA 2 : CC 3 : paylater 
	}
})

// order.Schema.plugin(mongoosePaginate)

const Order = mongoose.model("order", orderSchema);
module.exports = Order;