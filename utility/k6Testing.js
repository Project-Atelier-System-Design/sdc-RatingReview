import http from 'k6/http';
import { sleep, check } from 'k6';


var product_id = 1;
var action = 'helpful';//or 'report'
var review_id = 5774958;
var port = 3000;

const getAllReviews = `http://localhost:${port}/reviews/${product_id}/list`;
const getMetaData = `http://localhost:${port}/reviews/${product_id}/meta`;
const updateURL = `http://localhost:${port}/reviews/${action}/${review_id}`;
const insertURL = `http://localhost:${port}/reviews/${product_id}`;

var insertBody = {
  "rating": 3,
  "summary": "just some summary",
  "body": "some reviews some reviews some reviews some reviews",
  "recommend": false,
  "name": "tommy",
  "email": "tom@gmail.com",
  "photos": ["https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688?k=20&m=517188688&s=612x612&w=0&h=i38qBm2P-6V4vZVEaMy_TaTEaoCMkYhvLCysE7yJQ5Q="],
  "characteristics": { "1": 3, "2": 4, "3": 2, "4": 3 }
};

//load testing
export let options = {
  vus: 1,
  duration: '10s'
};


export default function () {
  // const resReviews = http.get(getAllReviews);
  // const resMeta = http.get(getMetaData);
  const resUpdate = http.put(updateURL,null,{header: { 'Content-Type': 'application/json' }});
  // const resInsert = http.post(insertURL,JSON.stringify(insertBody), {
  //   headers: { 'Content-Type': 'application/json' },
  // });
  // sleep(1)
  var loadReviews = {
    'AllReview status was 200': r => r.status === 200,
    'AllReview time< 200ms': r => r.timings.duration < 200,
    'AllReview time< 500ms': r => r.timings.duration < 500,
    'AllReview time< 1000ms': r => r.timings.duration < 1000,
    'AllReview time< 2000ms': r => r.timings.duration < 2000
  };
  var loadMeta = {
    'MetaReview status was 200': r => r.status === 200,
    'MetaReview time< 200ms': r => r.timings.duration < 200,
    'MetaReview time< 500ms': r => r.timings.duration < 500,
    'MetaReview time< 1000ms': r => r.timings.duration < 1000,
    'MetaReview time< 2000ms': r => r.timings.duration < 2000
  };
  var updateReview = {
    'UpdateReview status was 204': r => r.status === 204,
    'UpdateReview time< 200ms': r => r.timings.duration < 200,
    'UpdateReview time< 500ms': r => r.timings.duration < 500,
    'UpdateReview time< 1000ms': r => r.timings.duration < 1000,
    'UpdateReview time< 2000ms': r => r.timings.duration < 2000
  };
  var insertReview = {
    'InsertReview status was 201': r => r.status === 201,
    'InsertReview time< 200ms': r => r.timings.duration < 200,
    'InsertReview time< 500ms': r => r.timings.duration < 500,
    'InsertReview time< 1000ms': r => r.timings.duration < 1000,
    'InsertReview time< 2000ms': r => r.timings.duration < 2000
  };

  // check(resReviews, loadReviews);
  // check(resMeta,loadMeta);
  check(resUpdate,updateReview);
  // check(resInsert,insertReview);
}





// export default function () {
//   http.get(getAllReviews);
//   sleep(0.1);
// }




// export let options={
//   stages:[
//     {duration:'5m',target:100},
//     {duration:'10m',target:100},
//     {duration:'5m',target:0}
//   ],
//   thresholds:{
//     http_req_duration:['p(99)<150']
//   }
// }
// export default function () {
//   let response=http.get(getAllReviews);
//   sleep(1);
// }


// //stress testing (reliablity)
// export let options={
//   stages:[
//     {duration:'2m',target:100},
//     {duration:'2m',target:200}
//   ]
// }

// export default ()=>{
//   http.batch([
//     ['GET',getAllReviews],
//     ['GET',getMetaData]
//   ]);
//   sleep(1)
// }
// //spike testing
// export let options={
//   tages:[
//     {duration:'10s',target:100},
//     {duration:'1m',target:100},
//     {duration:'10s',target:1400},
//     {duration:'3m',target:1400},
//     {duration:'10s',target:100},
//     {duration:'3m',target:100},
//     {duration:'10s',target:0}
//   ]
// };

// export default ()=>{
//   http.batch([
//     ['GET','http://localhost:3000/reviews/1/list'],
//     ['GET','http://localhost:3000/reviews/1/meta']
//   ]);
//   sleep(1)
// }

// //soak testing
// export let options={
//   tages:[
//     {duration:'2m',target:400},
//     {duration:'3h',target:400},
//     {duration:'2m',target:0}
//   ]
// };

// export default ()=>{
//   http.batch([
//     ['GET','http://localhost:3000/reviews/1/list'],
//     ['GET','http://localhost:3000/reviews/1/meta']
//   ]);
//   sleep(1)
// }
