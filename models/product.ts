
import { timeStamp } from "console"
import mongoose, { models, Schema } from "mongoose"


const ProductSchema = new Schema( 
    {
        title:{

            type: String,
            required: true
        },
        description: String,
        price: {
            type: Number,
            required: true,
        },
          cutprice: {
            type: Number,
            required: true,
        },
        category:{
            type: String,
            required: true,
        },
             subcategory:{
            type: String,
            required: true,
        },
        sold: {
            type: Number,
            default: 0,

        },
        image :{
  type: [String],
required: true,
    },
},
{timestamps: true}

)

export const Product = models.Product || mongoose.model("Product",ProductSchema)

