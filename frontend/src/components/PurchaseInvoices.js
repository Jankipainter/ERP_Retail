import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
const PurchaseInvoices = () => {
    const [invoices, setInvoices] = useState([]);
let location =useLocation()
    let url = "http://localhost:5000/purchase";
    const fetchInvoices = async() => {
        let bodydata = {
            sd: location.state.props.dates.startdate,
            ed: location.state.props.dates.enddate,
          };
          let response = await fetch(url + "/invoicelist", {
            method: "POST",
            body: JSON.stringify(bodydata),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Authorization":"Bearer "+localStorage.getItem('token')

            },
          });
          let data = await response.json();
          setInvoices(data);
    }
  
    useEffect(() => {
      fetchInvoices();
    },[])
  
  return (
    
    <div className="invoiceList">
	<table className="styled-table">
    <thead>
		<tr>
		<th>ID</th>
		<th>Discount</th>
        <th>Sub Total</th>
		<th>Invoice Total</th>
        <th>Amount Due</th>
        <th>Amount Paid</th>
		</tr>
    </thead>
    <tbody>
		{invoices.map((val, key) => {
		return (
			<tr key={key}>
			<td>{val.id}</td>
			<td>{val.discount}</td>
			<td>{val.sub_total}</td>
            <td>{val.total}</td>
            <td>{val.amount_due}</td>
            <td>{val.amount_paid}</td>
			</tr>
		)
		})}
    </tbody>
	</table>
	</div>
  )
}

export default PurchaseInvoices