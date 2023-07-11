const router = require("express").Router();
const {connection} = require("../Config/sqldb");
const moment = require("moment");
let getData = require("../Middleware/rangeData");

router.post("/totalpurchase", async (req, res) => {
  var sql =
    "select format(SUM(total_amount),0) as totalpurchase from fts_purchase_order_invoice_item_details WHERE created_date_time BETWEEN ? and  ?  ";
  res.send(await getData(sql, req.body.sd, req.body.ed));
});

router.post("/totalproducts", async (req, res) => {
  var sql =
    "SELECT COUNT(product_id) as totalproducts FROM fts_purchase_order_invoice_item_details WHERE created_date_time BETWEEN ? and  ? ";
  let data = await getData(sql, req.body.sd, req.body.ed);
  res.send(await data);
});
router.post("/totaldiscount", async (req, res) => {
  var sql =
    "SELECT FORMAT(SUM(discount),0) as totaldiscount FROM fts_purchase_order_invoice WHERE last_modified_date_time  BETWEEN ? and  ? ";
  let data = await getData(sql, req.body.sd, req.body.ed);
  res.send(await data);
});
router.post("/totaltax", async (req, res) => {
  let sql =
    "SELECT FORMAT(SUM(total_tax),0) as totaltax FROM fts_purchase_order_invoice where  last_modified_date_time  BETWEEN ? and  ? ";
  let data = await getData(sql, req.body.sd, req.body.ed);
  res.send(await data);
});
router.post("/dueamount", async (req, res) => {
  var sql =
    "SELECT Format(SUM(amount_due),0) as dueamount FROM fts_purchase_order_invoice where last_modified_date_time BETWEEN ? and  ?";
  res.send(await getData(sql, req.body.sd, req.body.ed));
});
router.post("/dueinvoice", async (req, res) => {
  var sql =
    "SELECT COUNT(id) as dueinvoice FROM fts_purchase_order_invoice WHERE amount_due>0 and last_modified_date_time BETWEEN ? and  ?";
  res.send(await getData(sql, req.body.sd, req.body.ed));
});
router.post("/totalinvoice", async (req, res) => {
  var sql =
    "SELECT COUNT(id) as totalinvoice FROM fts_purchase_order_invoice WHERE invoice_date BETWEEN ? and  ? ";
  res.send(await getData(sql, req.body.sd, req.body.ed));
});

router.post("/purchasechart", function (req, res) {
  
  let startDate = moment(req.body.sd).format("YYYY/MM/DD");
  let endDate = moment(req.body.ed).format("YYYY/MM/DD") + " 23:59:59";
  var query =    "SELECT SUM(total_amount) as amount,HOUR(created_date_time) as time from fts_purchase_order_invoice_item_details where created_date_time BETWEEN ? AND ? GROUP BY TIME(HOUR(created_date_time)) ORDER BY SUM(total_amount) desc";
  connection.query(query,[startDate,endDate], function (err, rows, fields) {
    if (err) {
      res.send(err);
    } else {
      formatData(rows);
      res.send(jsonArray);
    }
  });
});
router.post("/invoicelist", function (req, res) {
  var query ="SELECT id,sub_total,discount,total,amount_due,amount_paid FROM fts_purchase_order_invoice WHERE invoice_date BETWEEN ? and  ? GROUP BY id HAVING COUNT(id)>0";
  connection.query(query,[req.body.sd,req.body.ed], function (err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data);
    }
  });
});
router.post("/productlist", function (req, res) {
  var query ="SELECT product_id,discount_amount,total_amount,unit_price FROM fts_purchase_order_invoice_item_details WHERE created_date_time BETWEEN ? and  ? GROUP BY product_id HAVING COUNT(product_id)>0";
  connection.query(query,[req.body.sd,req.body.ed], function (err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data);
    }
  });
});
function formatData(dataArray) {
  var amount = [];
  var time = [];
  for (var i = 0; i < dataArray.length; i++) {
    amount[i] = dataArray[i].amount;
    time[i] = dataArray[i].time;
  }
  jsonArray = [amount, time];
 
}

module.exports = router;
