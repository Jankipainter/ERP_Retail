const router = require("express").Router();
const {connection} = require("../Config/sqldb");
const moment = require("moment");
let getData = require("../Middleware/rangeData");
const e = require("express");

function formatData(dataArray) {

  for (var i = 0; i < dataArray.length; i++) {
    amount[i] = dataArray[i].a;
    payment_mode[i] = dataArray[i].payment_mode;
    // gdp[i] = dataArray[i].transaction_type;
  }
  jsonArray = [amount, payment_mode];
}
function formatBusyHourData(dataArray) {
  var busyhour =[];
 var time=[]
  for(var i = 0; i < dataArray.length; i++) {
    busyhour[i] = dataArray[i].busyhour;
   time[i] = dataArray[i].time;
   // gdp[i] = dataArray[i].transaction_type;
  }
  jsonArray1 = [busyhour, time];
}
router.post("/totalcollection", async (req, res) => {
  var sql =
    "SELECT FORMAT(SUM(amount_received),0) as totalamount FROM fts_invoice WHERE invoice_date BETWEEN ? and  ?";
    res.send(await getData(sql,req.body.sd ,req.body.ed));
});
router.post("/newcustomers", async (req, res) => {
  var sql =
    "SELECT count(userid) as customers FROM fts_clients WHERE datecreated BETWEEN ? and  ?";
    res.send(await getData(sql,req.body.sd ,req.body.ed));
});
router.post("/cashpayment", async (req, res) => {
  var sql ="SELECT FORMAT(SUM(amount_received),0) as amount FROM fts_invoice WHERE payment_type=1 and invoice_date BETWEEN ? and  ? "
    res.send(await getData(sql,req.body.sd ,req.body.ed));
});
router.post("/cardpayment", async (req, res) => {
  var sql ="SELECT FORMAT(SUM(amount_received),0) as amount FROM fts_invoice WHERE   invoice_date BETWEEN ? and  ? and payment_type=8 OR payment_type=9"
    res.send(await getData(sql,req.body.sd ,req.body.ed));
});

router.post("/onlinepayment", async (req, res) => {
  var sql ="SELECT FORMAT(SUM(amount_received),0) as amount FROM fts_invoice WHERE payment_type=10 or payment_type=6 or payment_type=12 or payment_type=13   and invoice_date BETWEEN ? and  ? "
    res.send(await getData(sql,req.body.sd ,req.body.ed));
});

router.post("/transferproduct", async (req, res) => {
  var sql ="SELECT COUNT(product_id) as transferproduct FROM fts_transfer_order_item_details where created_date_time between ? and ? "
    res.send(await getData(sql,req.body.sd ,req.body.ed));
});
router.post("/paymenttype", (req, res) => {
  var query ="SELECT FORMAT(SUM(amount_received),0) as amount FROM fts_invoice GROUP BY payment_type";
  connection.query(query, function (err, result) {
    if (err) {
      throw err;
    } else {
      let data = JSON.parse(JSON.stringify(result));
      res.send(result);
    }
  });
});

router.post("/paymentmethod", function (req, res) {
  var amount = [],
    payment_mode = [];
  var query =
    "select Format(SUM(amount),0) as a,payment_mode,transaction_type from fts_transactions GROUP BY payment_mode;";

  connection.query(query, function (err, rows, fields) {
    if (err) {
      throw error;
    } else {
      formatData(rows);
      res.send(jsonArray);
    }
  });
});
router.post("/busychart",function(req,res){
  let startDate = moment(req.body.sd).format("YYYY/MM/DD");
  let endDate = moment(req.body.ed).format("YYYY/MM/DD") + " 23:59:59";
  var query = "SELECT COUNT(id) as busyhour,TIME(invoice_date)as time FROM fts_invoice where (invoice_date) BETWEEN ? AND ? GROUP BY HOUR(invoice_date)";
  connection.query(query,[startDate,endDate],function(err,rows,fields){
      if(err)
      {
          throw error;
      }
      else{
          formatBusyHourData(rows);
          res.send(jsonArray1);
      
      }
  })
  // res.render('index.html');
  });
router.post('/ptypechart', async (req, res) => {
  // let userId = req.params.userId;
  let startDate = req.body.sd;
  let endDate = req.body.ed;
  let endResult = []
  await connection.query("SELECT HOUR(invoice_date) as time,SUM(amount_received) as cashamount FROM fts_invoice where payment_type=1 AND invoice_date BETWEEN ? AND ? GROUP BY TIME(HOUR(invoice_date)) ",[startDate, endDate], async function(err, result1){
      if (err){
          console.log(err.message)
          res.send(null)
      }

    await connection.query("SELECT HOUR(invoice_date) as time,SUM(amount_received) as phnamount FROM fts_invoice where payment_type=13 AND invoice_date BETWEEN ? AND ? GROUP BY TIME(HOUR(invoice_date)) ",[startDate, endDate], async function(err, result2){
       if (err){
          console.log(err.message)
          res.send(null)
      }
      else {
           connection.query("SELECT HOUR(invoice_date) as time,SUM(amount_received) as creditamount FROM fts_invoice where payment_type=8 AND invoice_date BETWEEN ? AND ? GROUP BY TIME(HOUR(invoice_date)) ",[startDate, endDate],async function(err, result){
                  if (!err){
                      endResult.push(result,result1,result2)
                      res.send(endResult)
                  }
              })
      }
  })
})
})

module.exports = router;
