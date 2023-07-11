import React from "react";
import Collection from "./components/Collection";
import Dashboard from "./components/Dashboard";
import Purchase from "./components/Purchase";
import PurchaseInvoices from "./components/PurchaseInvoices";
import PurchaseProducts from "./components/PurchaseProducts";
import Sales from "./components/Sales";
import SalesInvoices from "./components/SalesInvoices";
import SalesProducts from "./components/SalesProducts";

const routes=[
    {path:'dashboard', element: Dashboard },
    {path:'dashboard/sales',element:Sales},
    {path:'dashboard/collection',element:Collection},
    {path:'dashboard/purchase',element:Purchase},
    {path:'sinvoices' ,element : SalesInvoices},
    {path:'pinvoices',element :PurchaseInvoices},
    {path:'sproducts',element:SalesProducts},
    {path:'purproducts',element:PurchaseProducts}
]
export default routes