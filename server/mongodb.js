const mongoose = require("mongoose");
mongoose
  .connect(`mongodb://localhost/${process.env.DB_NAME}`)
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// 1. Use mongoose to establish a connection to MongoDB
// 2. Set up any schema and models needed by the app
let reviewSchema = mongoose.Schema({
  reviewID:{
    type:Number,
    required:true
  },
  rating:Number,
  summary:String,
  recommend:Boolean,
  characteristics:{
    Size:{
      id:Number,
      value:Number
    },
    Width:{
      id:Number,
      value:Number
    },
    Fit:{
      id:Number,
      value:Number
    },
    Length:{
      id:Number,
      value:Number
    },
    Comfort:{
      id:Number,
      value:Number
    },
    Quality:{
      id:Number,
      value:Number
    }
  }
  response:String,
  body:String,
  addDate:Number,
  reviewer:String,
  email:String,
  helpfulness:Number,
  report:Boolean
})


let reviews = mongoose.model('reviews', reviewSchema);

// mongoimport -d RatingReview -c reviews --type csv --headerline --file='../reviewTest1.csv'