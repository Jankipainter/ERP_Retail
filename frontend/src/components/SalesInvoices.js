import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import "../scss/views.scss"
const SalesInvoices = () => {
  let location =useLocation()
    const [invoices, setInvoices] = useState([]);
    let url = "http://localhost:5000/sales";
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
	<table className='styled-table'>
    <thead>
		<tr>
		<th>ID</th>
		<th>Invoice Date</th>
		<th>Invoice Total</th>
        <th>Amount receive</th>
        <th>Amount due</th>
		</tr>
    </thead>
    <tbody>
		{invoices.map((val, key) => {
		return (
			<tr key={key}>
			<td>{val.id}</td>
			<td>{val.invoice_date}</td>
			<td>{val.invoice_total}</td>
            <td>{val.amount_received}</td>
            <td>{val.amount_due}</td>
			</tr>
		)
		})}
    </tbody>
	</table>
	</div>
  )
}

export default SalesInvoices