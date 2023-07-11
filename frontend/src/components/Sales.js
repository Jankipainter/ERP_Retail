import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import banknoteIcon from "../assets/images/banknote.png";
import invoiceIcon from "../assets/images/invoice.png";
import ratioIcon from "../assets/images/ratio.png";
import rupeeIcon from "../assets/images/rupee.png";
import billIcon from "../assets/images/bill.png";
import purchaseIcon from "../assets/images/purchased.png";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 0,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      // text: ' Chart',
    },
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: true,
          drawBorder: false,
          borderDash: [3, 3],
          zeroLineColor: "blue",
        },
        categoryPercentage: 0.7,
        barPercentage: 0.9,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    yAxes: [
      {
        display: false,
        gridLines: {
          display: false,
          zeroLineColor: "transparent",
        },
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};
const Sales = (props) => {
  const navigate = useNavigate();
  const [dueInvoices, setDueInvoice] = useState(0);
  const [totalsales, setTotalsales] = useState(0);
  const [totaltax, setTotaltax] = useState(0);
  const [totalDueAmount, setTotalDueAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalInvoice, setTotalInvoice] = useState(0);
  const [chartdata, setChartData] = useState({
    label: "Sale Chart",
    datasets: [
      {
        label: "Dataset 1",
        data: [],
        borderColor: "rgb(85,112,247,0.3)",
        backgroundColor: "rgba(85,112,247,0.3)",
      },
    ],
  });
  let url = "http://localhost:5000/sales";

  let fetchTotalInvoice = async () => {
    let bodydata = {
      sd: props.dates.startdate,
      ed: props.dates.enddate,
    };
    let response = await fetch(url + "/totalinvoice", {
      method: "POST",
      body: JSON.stringify(bodydata),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem('token')
      },
    });
    let data = await response.json();
    setTotalInvoice(data.totalinvoice);
  };
  let fetchDiscount = async () => {
    let bodydata = {
      sd: props.dates.startdate,
      ed: props.dates.enddate,
    };
    let response = await fetch(url + "/totaldiscount", {
      method: "POST",
      body: JSON.stringify(bodydata),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem('token')

      },
    });
    let data = await response.json();
    setTotalDiscount(data.totaldiscount);
  };
  let fetchTotalProducts = async () => {
    let bodydata = {
      sd: props.dates.startdate,
      ed: props.dates.enddate,
    };
    let response = await fetch(url + "/totalproducts", {
      method: "POST",
      body: JSON.stringify(bodydata),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem('token')

      },
    });
    let data = await response.json();
    setTotalProducts(data.totalproducts);
  };
  let fetTotalDueAmount = async () => {
    let bodydata = {
      sd: props.dates.startdate,
      ed: props.dates.enddate,
    };
    let response = await fetch(url + "/dueamount", {
      method: "POST",
      body: JSON.stringify(bodydata),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem('token')

      },
    });
    let data = await response.json();
    setTotalDueAmount(data.dueamount);
  };
  let fetchTotalTax = async () => {
    let bodydata = {
      sd: props.dates.startdate,
      ed: props.dates.enddate,
    };
    let response = await fetch(url + "/totaltax", {
      method: "POST",
      body: JSON.stringify(bodydata),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem('token')

      },
    });

    let data = await response.json();

    setTotaltax(data.totaltax);
  };
  let fetchDueIvoices = async () => {
    let bodydata = {
      sd: props.dates.startdate,
      ed: props.dates.enddate,
    };
    let response = await fetch(url + "/dueinvoice", {
      method: "POST",
      body: JSON.stringify(bodydata),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem('token')

      },
    });
    let data = await response.json();
    setDueInvoice(data.dueinvoice);
  };
  let fetchTotalSales = async () => {
    let bodydata = {
      sd: props.dates.startdate,
      ed: props.dates.enddate,
    };
    let response = await fetch(url + "/totalsale", {
      method: "POST",
      body: JSON.stringify(bodydata),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem('token')

      },
    });
    let data = await response.json();
    setTotalsales(data.totalsales);
    console.log(await totalsales);
  };

  const fetchChartData = async () => {
    const labelSet = [];
    const dataSet1 = [];
    let bodydata = {
      sd: props.dates.startdate,
      ed: props.dates.enddate,
    };
    await fetch(url + "/saleschart", {
      method: "POST",
      body: JSON.stringify(bodydata),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem('token')

      },
    })
      .then((data) => {
        console.log("Api data", data);
        const res = data.json();

        return res;
      })
      .then((res) => {
        console.log("ressss", res);

        for (let i of res[0]) {
          let j = parseInt(i);
          dataSet1.push(j);
        }

        for (let j of res[1]) {
          let x = parseInt(j);
          labelSet.push(x);
        }

        setChartData({
          labels: labelSet,

          datasets: [
            {
              label: "Sales",
              data: dataSet1,
              borderColor: "rgb(85,112,247,0.3)",
              backgroundColor: "rgba(85,112,247,0.3)",
            },
          ],
        });
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  useEffect(() => {
    fetchChartData();
    fetchTotalSales();
    fetchDiscount();
    fetchTotalTax();
    fetTotalDueAmount();
    fetchDueIvoices();
    fetchTotalInvoice();
    fetchTotalProducts();
  }, [props.dates.startdate, props.dates.enddate]);

  return (
    <div className="main-container" id="salesdiv">
      {/* sales container */}
      <div className="subtitles">Sales</div>
      <div className="data-container">
        <div className="chart-container">
          <div className="chart-head">Sales Revenue</div>

          <div className="chart-area">
            <Line data={chartdata} options={options} />
          </div>
        </div>
        <div className="state-container">
          <div className="state-boxes">
            <div className="state-outer">
              <img src={billIcon} className="statebox-imgs" />
              <div className="state-innerbox">
                <div className="state-amount">{totalInvoice} </div>
                <div className="state-name">No of generated invoices</div>
              </div>
            </div>
           <div className="link"><button className="viewbtn" onClick={()=>{navigate('/home/sinvoices' , {state:{props}})}}>View Invoices</button></div> 
          </div>
          <div className="state-boxes">
            <div className="state-outer">
              <img src={purchaseIcon} className="statebox-imgs" />
              <div className="state-innerbox">
                <div className="state-amount">{totalProducts}</div>
                <div className="state-name">No of products sold</div>
              </div>
            </div>
            <div className="link"> <button className="viewbtn" onClick={()=>{navigate('/home/sproducts', {state:{props}})}}>View Products</button></div>
          </div>
        </div>
      </div>
      <div className="other-states">
        <div className="small-statebox">
          <img src={rupeeIcon} className="otherbox-imgs" />
          <div>
            <div className="state-amount">&#x20B9; {totalsales}</div>
            <div className="state-name">Total Sales</div>
          </div>
        </div>
        <div className="small-statebox">
          <img src={ratioIcon} className="otherbox-imgs" />
          <div>
            <div className="state-amount">&#x20B9; {totalDiscount}</div>
            <div className="state-name">Discount Offered</div>
          </div>
        </div>
        <div className="small-statebox">
          <img src={banknoteIcon} className="otherbox-imgs" />
          <div>
            <div className="state-amount">&#x20B9; {totaltax}</div>
            <div className="state-name">Tax amount</div>
          </div>
        </div>
        <div className="small-statebox">
          <img src={rupeeIcon} className="otherbox-imgs" />
          <div>
            <div className="state-amount">&#x20B9; {totalDueAmount}</div>
            <div className="state-name">Due amount</div>
          </div>
        </div>
        <div className="small-statebox">
          <img src={invoiceIcon} className="otherbox-imgs" />
          <div>
            <div className="state-amount"> {dueInvoices}</div>
            <div className="state-name">Due invoice</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
