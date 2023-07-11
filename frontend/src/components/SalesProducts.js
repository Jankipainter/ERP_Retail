import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../scss/views.scss";
const SalesProducts = () => {
  const [products, setProducts] = useState([]);
  let location = useLocation();
  let url = "http://localhost:5000/sales";
  const fetchProducts = async () => {
    let bodydata = {
      sd: location.state.props.dates.startdate,
      ed: location.state.props.dates.enddate,
    };
    let response = await fetch(url + "/productlist", {
      method: "POST",
      body: JSON.stringify(bodydata),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem('token')

      },
    });
    let data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="invoiceList">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Description</th>
            <th>Discount</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {products.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.invoice_item_id}</td>
                <td>{val.description}</td>
                <td>{val.discount}</td>
                <td>{val.total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SalesProducts;
