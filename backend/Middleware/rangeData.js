const moment = require("moment");
const{ connection} = require("../Config/sqldb");
const { promisify } = require("util");
let getData = async (SQL, SD, ED) => {
  return new Promise((resolve, reject) => {
    let startDate = moment(SD).format("YYYY/MM/DD");
    let endDate = moment(ED).format("YYYY/MM/DD") + " 23:59:59";
    connection.query(SQL, [startDate, endDate], (error, result, fields) => {
      if (error) {
        reject(error);
      }
      let data = JSON.parse(JSON.stringify(result[0]));
      resolve(data);
    });
  });
};

module.exports = getData;
