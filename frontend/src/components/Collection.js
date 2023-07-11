import React, { useEffect, useState } from "react";
import "../scss/dashboard.scss";
import Chart from "chart.js/auto";
import banknoteIcon from "../assets/images/banknote.png";
import invoiceIcon from "../assets/images/invoice.png";
import ratioIcon from "../assets/images/ratio.png";
import rupeeIcon from "../assets/images/rupee.png";
import { Line } from "react-chartjs-2";
import cashIcon from "../assets/images/cashicon.png";
import debitIcon from "../assets/images/debitcard.png";
import qrIcon from "../assets/images/qrscan.png";
import userIcon from "../assets/images/usericon.png";
import trasferIcon from "../assets/images/transfer.png";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const Collection = (props) => {
  let url = "http://localhost:5000/collection";
  const [totalCollection, setTotalCollection] = useState(0);
  const [cashPayment, setCashPayment] = useState(0);
  const [cardPayment, setCardPayment] = useState(0);
  const [onlinePayment, setOnlinePayment] = useState(0);
  const [transferProduct, setTransferProduct] = useState(0);
  const [newCustomer, setNewCustomer] = useState(0);
  const [busyChartData, setBusyChartData] = useState({
    label: "busyhour",
    datasets: [
      {
        label: "Dataset 1",
        data: [],
        borderColor: "rgb(85,112,247,0.3)",
        backgroundColor: "rgba(85,112,247,0.3)",
      },
    ],
  });
  const [data, setData] = useState({
    labels: ["9", "10", "11", "12", "13", "14", "15"],
    datasets: [
      {
        label: "Dataset 1",
        data: [],
        // borderColor: 'rgb(85,112,247)',
        // backgroundColor: 'rgba(85,112,247,1)',
      },
      {
        label: "Dataset 2",
        data: [],
        // borderColor: 'rgb(57,214,170)',
        // backgroundColor: 'rgba(57,214,170,1)',
      },
      {
        label: "Dataset 3",
        data: [],
        // borderColor: 'rgb(85,196,247)',
        // backgroundColor: 'rgba(85,196,247,1)',
      },
    ],
  });
  const options1 = {
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
  const options = {
    maintainAspectRatio: false,
    indexAxis: "x",
    elements: {
      bar: {
        borderWidth: 3,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: " Chart",
      },
    },
  };
  const fetchBusyChartData = async () => {
    const labelSet = [];
    const dataSet1 = [];
    let bodydata = {
      sd: props.dates.startdate,
      ed: props.dates.enddate,
    };
    await fetch(url + "/busychart", {
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

        setBusyChartData({
          labels: labelSet,

          datasets: [
            {
              label: "Busy-Hour",
              data: dataSet1,
              borderColor: "rgb(85,112,247,0.3)",
              backgroundColor: "rgba(85,112,247,0.3)",
            },
          ],
        });
        console.log("state Data ", data);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  const fetchChartData = async () => {
    const labelSet = [];
    const dataSet1 = [];
    const dataSet2 = [];
    const dataSet3 = [];
    let bodydata = {
      sd: props.dates.startdate,
      ed: props.dates.enddate,
    };
    await fetch(url + "/ptypechart", {
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
          let j = parseInt(i.creditamount);
          dataSet1.push(j);

          let z = parseInt(i.time);
          labelSet.push(z);
        }
        console.log(dataSet2);
        let templable =0;
        if(labelSet.length==0){
          templable=1;
        }
        for (let j of res[1]) {
          let x = parseInt(j.cashamount);
          dataSet2.push(x);
          if(templable ==1){
            let z = parseInt(j.time);
            labelSet.push(z);
          }   
          
        }
        
        for (let a of res[2]) {
          let y = parseInt(a.phnamount);
          dataSet3.push(y);
          if(templable==1){
            let z = parseInt(a.time);
            labelSet.push(z);
          }
        }
        
        setData({
          labels: labelSet,
          datasets: [
            {
              label: "Credit",
              data: dataSet1.length >0 ? dataSet1:[1],
              borderColor: "rgb(85,112,247)",
              backgroundColor: "rgba(85,112,247,1)",
            },
            {
              label: "Cash",
              data: dataSet2.length>0 ?dataSet2 : [1],
              borderColor: "rgb(57,214,170)",
              backgroundColor: "rgba(57,214,170,1)",
            },
            {
              label: "OnlinePayment",
              data: dataSet3.length >0 ?dataSet3 :[1],
              borderColor: "rgb(85,196,247)",
              backgroundColor: "rgba(85,196,247,1)",
            },
          ],
        });
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  let fetchNewCustomers = async () => {
    let bodydata = {
      sd: props.dates.startdate,
      ed: props.dates.enddate,
    };
    let response = await fetch(url + "/newcustomers", {
      method: "POST",
      body: JSON.stringify(bodydata),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem('token')

      },
    });
    let data = await response.json();
    setNewCustomer(data.customers);
  };
  let fetchTranferProduct = async () => {
    let bodydata = {
      sd: props.dates.startdate,
      ed: props.dates.enddate,
    };
    let response = await fetch(url + "/transferproduct", {
      method: "POST",
      body: JSON.stringify(bodydata),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem('token')

      },
    });
    let data = await response.json();
    setTransferProduct(data.transferproduct);
  };
  let fetchCashPayment = async () => {
    let bodydata = {
      sd: props.dates.startdate,
      ed: props.dates.enddate,
    };
    let response = await fetch(url + "/cashpayment", {
      method: "POST",
      body: JSON.stringify(bodydata),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem('token')

      },
    });
    let data = await response.json();
    setCashPayment(data.amount);
  };
  let fetchCardPayment = async () => {
    let bodydata = {
      sd: props.dates.startdate,
      ed: props.dates.enddate,
    };
    let response = await fetch(url + "/cardpayment", {
      method: "POST",
      body: JSON.stringify(bodydata),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem('token')

      },
    });
    let data = await response.json();
    setCardPayment(data.amount);
  };
  let fetchOnlinePayment = async () => {
    let bodydata = {
      sd: props.dates.startdate,
      ed: props.dates.enddate,
    };
    let response = await fetch(url + "/onlinepayment", {
      method: "POST",
      body: JSON.stringify(bodydata),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem('token')

      },
    });
    let data = await response.json();

    setOnlinePayment(data.amount);
  };
  let fetchTotalCollection = async () => {
    let bodydata = {
      sd: props.dates.startdate,
      ed: props.dates.enddate,
    };
    let response = await fetch(url + "/totalcollection", {
      method: "POST",
      body: JSON.stringify(bodydata),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem('token')

      },
    });
    let data = await response.json();
    setTotalCollection(data.totalamount);
  };

  useEffect(() => {
    fetchTotalCollection();
    fetchCardPayment();
    fetchTranferProduct();
    fetchCashPayment();
    fetchOnlinePayment();
    fetchNewCustomers();
    fetchBusyChartData();
    fetchChartData();
  }, [props.dates.startdate, props.dates.enddate]);

  return (
    <div className="main-container" id="collectiondiv">
      <div className="subtitles">Collection</div>
      <div className="col-data-container">
        <div className="chart-container" style={{ height: "25rem" }}>
          <div className="chart-head">Sales Collection</div>
          <div className="chart-area">
            <Bar data={data} options={options} width={100} height={45} />
          </div>
        </div>
        <div className="state-container">
          <div className="collection-state-boxes">
            <img src={cashIcon} className="otherbox-imgs" />
            <div>
              <div className="state-amount">&#x20B9; {totalCollection}</div>
              <div className="state-name">Total collection amount</div>
            </div>
          </div>
          <div className="collection-state-boxes">
            <img src={cashIcon} className="otherbox-imgs" />
            <div>
              <div className="state-amount">&#x20B9; {cashPayment}</div>
              <div className="state-name">Cash</div>
            </div>
          </div>
          <div className="collection-state-boxes">
            <img src={debitIcon} className="otherbox-imgs" />
            <div>
              <div className="state-amount">&#x20B9; {cardPayment}</div>
              <div className="state-name">Debit/Credit card</div>
            </div>
          </div>
          <div className="collection-state-boxes">
            <img src={qrIcon} className="otherbox-imgs" />
            <div>
              <div className="state-amount">&#x20B9; {onlinePayment}</div>
              <div className="state-name">Online Transaction</div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="data-container"
        style={{ margin: "0rem 0rem", height: "auto" }}
      >
        <div className="col-state-container">
          <div className="col-state-boxes">
            <img src={userIcon} className="statebox-imgs" />
            <div>
              <div className="state-amount">{newCustomer}</div>
              <div className="state-name">No of new customer added</div>
            </div>
          </div>
          <div className="col-state-boxes">
            <img src={trasferIcon} className="statebox-imgs" />
            <div>
              <div className="state-amount">{transferProduct}</div>
              <div className="state-name">No of transfer products</div>
            </div>
          </div>
        </div>
        <div className="col-chart-container">
          <div className="chart-head">Busy Hours</div>
          <div className="chart-area">
            <Bar data={busyChartData} options={options}  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
