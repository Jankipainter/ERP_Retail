const express = require('express'); // Import express framework
const cors = require('cors'); // If client and server has different origin
require("dotenv").config(); // Import dotenv to use environment variables
const app = express() // Express object
const verify = require("./Middleware/jwt")
app.use(express.urlencoded({extended:true})); // Url middleware parse the incoming requestes based on body-parser
app.use(cors())
app.use(express.json())  // Parses incoming JSON requests and puts the parsed data in req.body

//Routers
app.use('/sales',verify,require('./Routes/SalesRoutes')) //Sales Router 
app.use('/purchase',verify,require('./Routes/PurchaseRoutes')) //Purchase Router
app.use('/collection',verify,require('./Routes/CollectionRoutes')) //Collection Router
app.use('/user',require('./Routes/UserRoutes')) //User Router

// Application will run on http://localhost:PORT
app.listen(process.env.port, () => {
  console.log(`Example app listening on port ${process.env.port}`);
})

 