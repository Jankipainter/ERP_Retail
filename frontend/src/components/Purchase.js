import React, { useEffect, useState } from "react";
import "../scss/dashboard.scss";
import { useNavigate} from "react-router-dom";
import banknoteIcon from "../assets/images/banknote.png";
import invoiceIcon from "../assets/images/invoice.png";
import ratioIcon from "../assets/images/ratio.png";
import rupeeIcon from "../assets/images/rupee.png";
import { Line } from "react-chartjs-2";
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
// import faker from 'faker';

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
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    chart: {
      height: 350,
      type: "area",
    },
    stroke: {
      curve: "smooth",
      lineCap: "butt",
    },
    title: {
      display: true,
      // text: 'Chart.js Line Chart',
    },
  },
};

const Purchase = (props) => {
  const navigate = useNavigate();

  let url = "http://localhost:5000/purchase";
  const [totalPurchase, setTotalPurchase] = useState(0);
  const [dueInvoices, setDueInvoice] = useState(0);
  const [totalTax, setTotaltax] = useState(0);
  const [totalDueAmount, setTotalDueAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalInvoice, setTotalInvoice] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        fill: true,
        curve: "smooth",
        label: "Dataset 1",
        data: [],
        borderColor: "rgba(85, 112, 247, 0.31)",
        // backgroundColor: ('rgba(85, 112, 247, 0.31)',' rgba(85, 112, 247, 0)'),
        background: "239,242,246,1",
      },
    ],
  });

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
  let fetchTotalPurchase = async () => {
    let bodydata = {
      sd: props.dates.startdate,
      ed: props.dates.enddate,
    };
    let response = await fetch(url + "/totalpurchase", {
      method: "POST",
      body: JSON.stringify(bodydata),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem('token')

      },
    });
    let data = await response.json();
    setTotalPurchase(data.totalpurchase);
  };
  const fetchChartData = async () => {
    const labelSet = [];
    const dataSet1 = [];
    let bodydata = {
      sd: props.dates.startdate,
      ed: props.dates.enddate,
    };
    await fetch(url + "/purchasechart", {
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
          i = parseInt(i);
          dataSet1.push(i);
          //  labelSet.push(i)
        }
        for (let j of res[1]) {
          let z = parseInt(j);
          labelSet.push(z);
        }
        setChartData({
          labels: labelSet,
          datasets: [
            {
              position: "absolute",
              fill: true,
              curve: true,
              label: "purchase",
              data: dataSet1,
              borderColor: " rgba(85, 112, 247, 0.31)",
              background:
                ("rgba(85, 112, 247, 0.31)", " rgba(85, 112, 247, 0)"),
              // backgroundColor: 'rgba(85,112,247,1)',
            },
          ],
        });
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  useEffect(() => {
    fetchTotalPurchase();
    fetchDiscount();
    fetchTotalProducts();
    fetchTotalTax();
    fetTotalDueAmount();
    fetchDueIvoices();
    fetchTotalInvoice();
    fetchChartData();
  }, [props.dates.startdate, props.dates.enddate]);

  return (
    <div className="main-container" id="purchasediv">
      <div className="subtitles">Purchase</div>
      <div className="data-container">
        <div className="chart-container">
          <div className="chart-head">Purchase Revenue</div>
          <div className="chart-area">
            <Line options={options} data={chartData} />
          </div>
        </div>
        <div className="state-container">
          <div className="state-boxes">
            <div className="state-outer">
              <img src={billIcon} className="statebox-imgs" />
              <div className="state-innerbox">
                <div className="state-amount"> {totalInvoice}</div>
                <div className="state-name"> No of purchase invoices generated</div>
              </div>
            </div>
            <div className="link"><button className="viewbtn" onClick={()=>{navigate('/home/pinvoices',  {state:{props}})}}>View Invoices</button></div> 
          </div>
          <div className="state-boxes">
            <div className="state-outer">
              <img src={purchaseIcon} className="statebox-imgs" />
              <div className="state-innerbox">
                <div className="state-amount"> {totalProducts}</div>
                <div className="state-name">No of purchase product</div>
              </div>
            </div>
            <div className="link"> <button className="viewbtn" onClick={()=>{navigate('/home/purproducts',  {state:{props}})}}>View Products</button></div>
          </div>
        </div>
      </div>
      <div className="other-states">
        <div className="small-statebox">
          <img src={rupeeIcon} className="otherbox-imgs" />

          <div>
            <div className="state-amount">&#x20B9;{totalPurchase} </div>
            <div className="state-name">Total Purchase</div>
          </div>
        </div>
        <div className="small-statebox">
          <img src={ratioIcon} className="otherbox-imgs" />
          <div>
            <div className="state-amount">&#x20B9; {totalDiscount}</div>
            <div className="state-name">Discount offered</div>
          </div>
        </div>
        <div className="small-statebox">
          <img src={banknoteIcon} className="otherbox-imgs" />
          <div>
            <div className="state-amount">&#x20B9; {totalTax}</div>
            <div className="state-name">Tax amount</div>
          </div>
        </div>
        <div className="small-statebox">
          <img src={rupeeIcon} className="otherbox-imgs" />
          <div>
            <div className="state-amount">&#x20B9;{totalDueAmount} </div>
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

export default Purchase;
