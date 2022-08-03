require("dotenv").config();
const {Client,Pool}=require('pg');

const {queryReviews,queryMetaData,updateHelpfulness,updateReport,newReview}=require('./queries.js');

//build connection
const client=new Client({
  host:process.env.HOST,
  user:`${process.env.USER}`,
  password:`${process.env.PASSWORD}`,
  port:5432,
  database:`${process.env.DB_NAME}`
});

client
  .connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack))

var testing=()=>{
  return client.query(`select * from reviews limit 5`)
}

var allReviews=(req,res)=>{
  var page=0;//i don't see this pass in from front end;
  var sort=req.query.sort||'relevant:asc';
  var count=req.query.count||5;
  sort=sort.slice(0,sort.indexOf(':'));

  if(sort==="relevant"){sort=`rew.date desc, rew.helpfulness desc`};
  if(sort==='helpfulness'){sort=`rew.helpfulness desc`};
  if(sort==='date'){sort=`rew.date desc`};

  return client.query(queryReviews(req.params.product_id,sort,count,page)).then((result)=>{
    var output=result.rows[0];
    output.page=page;
    output.count=count;
    res.json(output)
  });

}

var metaReviews=(req,res)=>{
  return client.query(queryMetaData(req.params.product_id)).then((result)=>{res.json(result.rows[0])});
}

var updateReviews=(req,res)=>{
  var action=req.params.action;
  if(action==='helpful'){
    console.log('am i herrrrre')
    return client.query(updateHelpfulness(req.params.review_id)).then(()=>{res.sendStatus(204);});
  }else if(action==='report'){
    return client.query(updateReport(req.params.review_id)).then(()=>{res.sendStatus(204);});
  }
}

var addReview=(req,res)=>{
  return client.query(newReview(req.params.product_id,req.body)).then((result)=>{res.status(201);res.json(result)});
}

module.exports={
  testing,
  allReviews,
  metaReviews,
  updateReviews,
  addReview
}



// var allReviews=(productID,sort,count,page)=>{
//   if(sort==="relevant"){sort=`rew.date desc, rew.helpfulness desc`};
//   if(sort==='helpfulness'){sort=`rew.helpfulness desc`};
//   if(sort==='date'){sort=`rew.date desc`};

//   return client.query(queryReviews(productID,sort,count,page));
// }

// var metaReviews=(productID)=>{
//   return client.query(queryMetaData(productID));
// }

// var updateReviews=(action,reviewID)=>{
//   if(action==='helpful'){
//     return client.query(updateHelpfulness(reviewID));
//   }else if(action==='report'){
//     return client.query(updateReport(reviewID));
//   }
// }

// var addReview=(productID,userInput)=>{
//   return client.query(newReview(productID,userInput))
// }