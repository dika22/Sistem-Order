const mongoose = require('mongoose'),
	  Schema = mongoose.Schema,
	  mongoosePaginate = require('mongoose-paginate');


const produkSchema = new Schema({
	nama : {
		type : String,
		required : true
	},
	jenis : {
		type : String,
		required : true
	},
	harga :{
		type : String,
		required : true
	},
	stock : {
		type : String,
		required : true
	}
})

produkSchema.plugin(mongoosePaginate)

const Product = mongoose.model("produks", produkSchema);
module.exports = Product;