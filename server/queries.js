var queryReviews=(product_id,sort,count,page)=>{
  return `
  select prod.productID as product,
  (
  select json_agg(item2)
    from(
      select rew.reviewID, rew.rating, rew.summary, rew.recommend, rew.response, rew.body, rew.date, rew.reviewer_name, rew.helpfulness,
      (
      select json_agg(item)
      from (
        select ph.photoID as id,ph.url
        from photos ph
        where rew.reviewID=ph.review_id
        ) item
      ) as photos
      from reviews rew
      where rew.product_id=${product_id}
      order by ${sort}
    )item2
  )as results
  from products prod
  where prod.productID=${product_id}
  limit ${count} offset ${page-1}
  `
}

var queryMetaData=(product_id)=>{
return `
  select prod.productID as product_id,ratrat.ratings, recrec.recommended, rchar.characteristic as characteristics
  from (select json_object_agg(rat.rating,rat.count) as ratings
      from (select rew.rating,count(*)
          from reviews rew
          where rew.product_id=${product_id}
          group by rew.rating
        ) rat)ratrat,
      (select json_object_agg(rec.recommend,rec.count) as recommended
      from (select rew.recommend, count(*)
          from reviews rew
          where rew.product_id=${product_id}
          group by rew.recommend
        )rec)recrec,
      (select json_object_agg(rrr.name,rrr.charr) as characteristic
        from(
          select  rr.name,json_build_object('id',rr.id,'value',rr.value) as charr
            from (select char.name,char.charid as id,avg(charRev.value) as value
                from characteristics char, characteristic_reviews charRev
                where char.charid=charRev.char_id and char.product_id=${product_id}
                group by char.charid,char.name
            ) rr
            group by rr.name,rr.id,rr.value)rrr)rchar,
      (select products.productID
        from products
        where products.productID=${product_id})prod
`
}

var updateHelpfulness=(review_id)=>{
  return`
    update reviews
    set helpfulness=helpfulness+1
    where reviews.reviewID=${review_id};
  `
}
var updateReport=(review_id)=>{
  return`
    update reviews
    set reported=true
    where reviews.reviewID=${review_id}
    returning *;
  `
}

var newReview=(product_id,userInput)=>{

  var char=JSON.stringify(userInput.characteristics);
  var ph=JSON.stringify(userInput.photos);
  return `
    WITH ins as(
    insert into reviews (rating, summary, recommend,body,date,reviewer_name,reviewer_email,product_id)
    values ('${userInput.rating}', '${userInput.summary}', '${userInput.recommend}','${userInput.body}',now(),'${userInput.name}',
    '${userInput.email}','${product_id}')
    RETURNING reviewID AS review_ID
    )
    ,ins2 AS(
      insert into characteristic_reviews (review_id,char_id,value)
      select ins.review_ID, jj.key::integer, jj.value::integer
      from ins, json_each_text('${char}'::JSON) as jj
      returning charRevID as charRevID
    )
    INSERT INTO photos (review_id, url)
    SELECT ins.review_ID, json_array_elements('${ph}'::JSON)
    FROM ins
    RETURNING *
    ;
  `
}

module.exports={
  queryReviews,
  queryMetaData,
  updateHelpfulness,
  updateReport,
  newReview
}