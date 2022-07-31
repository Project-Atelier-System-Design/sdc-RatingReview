require("dotenv").config();
const {Client}=require('pg');

const {queryReviews,queryMetaData,updateHelpfulness,updateReport,newReview}=require('./queries.js');

//build connection
const client=new Client({
  host:"localhost",
  user:"admin",
  password:'',
  port:5432,
  database:`ratingreview`
});

client
  .connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack))

var testing=()=>{
  return client.query(`select * from reviews limit 5`)
}

var allReviews=(productID,sort,count,page)=>{
  if(sort==="relevant"){sort=`rew.date desc, rew.helpfulness desc`};
  if(sort==='helpfulness'){sort=`rew.helpfulness desc`};
  if(sort==='date'){sort=`rew.date desc`};

  return client.query(queryReviews(productID,sort,count,page));
}

var metaReviews=(productID)=>{
  return client.query(queryMetaData(productID));
}

var updateReviews=(action,reviewID)=>{
  if(action==='helpful'){
    return client.query(updateHelpfulness(reviewID));
  }else if(action==='report'){
    return client.query(updateReport(reviewID));
  }
}

var addReview=(productID,userInput)=>{
  return client.query(newReview(productID,userInput))
}

module.exports={
  testing,
  allReviews,
  metaReviews,
  updateReviews,
  addReview
}