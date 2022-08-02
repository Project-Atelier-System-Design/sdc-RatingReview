require("dotenv").config();
const newrelic=require('newrelic')
const express=require('express');
const path=require('path');
const cors=require('cors')

const controller=require('./postgres.js');

const app=express();
// app.use(express.static(path.join(__dirname,'../../supernova-retail-app/dist')))
app.use(express.json());
app.use(cors());

app.get('/reviews/:product_id/list',controller.allReviews);

app.get('/reviews/:product_id/meta',controller.metaReviews);

app.put('/reviews/:action/:review_id',controller.updateReviews)

app.post('/reviews/:product_id',controller.addReview)

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);

//for testing purpose
// app.get('*',(req,res)=>{
//   testing().then((result)=>{res.json(result.rows)})
// });

// app.get('/reviews/:id/list',(req,res)=>{
//   var page=1;//i don't see this pass in from front end;
//   var sort=req.query.sort||'relevant:asc';
//   var count=req.query.count||5;
//   sort=sort.slice(0,sort.indexOf(':'));

//   allReviews(req.params.id,sort,count,page)
//   .then((result)=>{
//     var output=result.rows[0];
//     output.page=page;
//     output.count=count;
//     res.json(output)
//   })
// });

// app.get('/reviews/:product_id/meta',(req,res)=>{
//   metaReviews(req.params.product_id).then((result)=>{res.json(result.rows[0])})
// });

// app.put('/reviews/:action/:review_id',(req,res)=>{
//   updateReviews(req.params.action,req.params.review_id).then((result)=>{res.json(result.rows[0])})
// })

// app.post('/reviews/:product_id',(req,res)=>{
//   addReview(req.params.product_id,req.body).then((result)=>{res.json(result)})
// })