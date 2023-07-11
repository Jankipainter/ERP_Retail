const router = require("express").Router();
const { connection } = require("../Config/sqldb");
const moment = require("moment");
let getData = require("../Middleware/rangeData");

function formatData(dataArray) {
  var amount = [];
  var time = [];
  for (var i = 0; i < dataArray.length; i++) {
    amount[i] = dataArray[i].amount;
    time[i] = dataArray[i].time;
    // gdp[i] = dataArray[i].transaction_type;
  }
  jsonArray = [amount, time];
}

router.post("/totalsale", async (req, res) => {
  let sql = `SELECT Format(SUM(invoice_total),0) AS totalsales FROM fts_invoice WHERE invoice_date BETWEEN ? and  ? and is_paid=1 `;
  res.send(await getData(sql, req.body.sd, req.body.ed));
});
router.post("/totalproducts", async (req, res) => {
  var sql =
    "SELECT COUNT(invoice_item_id)as totalproducts FROM fts_itemable WHERE created_date_time BETWEEN ? and  ? ";
  res.send(await getData(sql, req.body.sd, req.body.ed));
});

router.post("/dueinvoice", async (req, res) => {
  var sql =
    "SELECT COUNT(id) as dueinvoice from fts_invoice where amount_due>0 and invoice_date BETWEEN ? and  ? ";
  res.send(await getData(sql, req.body.sd, req.body.ed));
});
router.post("/totalinvoice", async (req, res) => {
  var sql =
    "SELECT COUNT(id) as totalinvoice FROM fts_invoice WHERE invoice_date BETWEEN ? and  ?  ";
  res.send(await getData(sql, req.body.sd, req.body.ed));
});

router.post("/totaldiscount", async (req, res) => {
  var sql =
    "SELECT Format(sum(total_discount),0) as totaldiscount from fts_invoice,fts_clients c where c.userid=customer_id and invoice_date BETWEEN ? and  ? ";
  res.send(await getData(sql, req.body.sd, req.body.ed));
});

router.post("/dueamount", async (req, res) => {
  var sql =
    "select Format(SUM(amount_due),0) as dueamount from fts_invoice where invoice_date BETWEEN ? and  ? ";
  res.send(await getData(sql, req.body.sd, req.body.ed));
});

router.post("/customerdue", async (req, res) => {
  var sql =
    "SELECT customer_id,amount_due,payment_type from fts_invoice where payment_type = 5 GROUP BY amount_due ORDER BY customer_id and  invoice_date BETWEEN ? and  ?  ";
  res.send(await getData(sql, req.body.sd, req.body.ed));
});

router.post("/totaltax", async (req, res) => {
  var sql =
    "SELECT FORMAT(SUM(total_tax_amount),0) as totaltax FROM fts_invoice where  invoice_date BETWEEN ? and  ? ";
  res.send(await getData(sql, req.body.sd, req.body.ed));
});

router.post("/walletbalance", async (req, res) => {
  var query =
    "SELECT Format(sum(total_balance),0) FROM 'fts_wallet' where last_modified_data  BETWEEN ? and  ? ";
  res.send(await getData(sql, req.body.sd, req.body.ed));
});

router.post("/rating", function (req, res) {
  var query =
    "SELECT COUNT(average_rating) as averagerating from fts_ratings where DATE(last_modified_date_time) = CURDATE()";

  connection.query(query, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.post("/totalstaff", async (req, res) => {
  var query =
    "SELECT COUNT(staffid),fts_staff.staffid,fts_roles.name from fts_staff INNER JOIN fts_roles on fts_roles.roleid = fts_staff.role GROUP BY role";

  connection.query(query, function (err, result) {
    if (err) {
      throw err;
    } else {
      let data = JSON.parse(JSON.stringify(result));

      res.send(result);
    }
  });
});
router.post("/saleschart", async function (req, res) {
  let startDate = moment(req.body.sd).format("YYYY/MM/DD");
  let endDate = moment(req.body.ed).format("YYYY/MM/DD") + " 23:59:59";
  let sql =
    "SELECT HOUR(invoice_date) as time,SUM(invoice_total) as amount from fts_invoice WHERE invoice_date BETWEEN '" +
    startDate +
    "' AND '" +
    endDate +
    "' GROUP BY HOUR(invoice_date)";

  connection.query(sql, (error, result) => {
    if (error) {
      res.send(error);
    }
    formatData(result);
    res.send(jsonArray);
  });
});
router.post("/invoicelist", function (req, res) {
  var query ="SELECT id,invoice_date,invoice_total,amount_received,amount_due FROM fts_invoice WHERE  invoice_date BETWEEN ? AND ? GROUP BY id HAVING COUNT(id)> 0 ";
  connection.query(query,[req.body.sd,req.body.ed], function (err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data);
    }
  });
});
router.post("/productlist", function (req, res) {
  var query ="SELECT invoice_item_id,description,discount,total FROM fts_itemable WHERE created_date_time BETWEEN ? and  ? GROUP BY invoice_item_id HAVING COUNT(invoice_item_id)>0";
  connection.query(query,[req.body.sd,req.body.ed], function (err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
