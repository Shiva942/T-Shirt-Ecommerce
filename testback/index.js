require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
var morgan = require('morgan');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors"); 

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentRoutes = require("./routes/payment");

mongoose
  .connect(process.env.DATABASE, 
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    })
  .then(() => {
    console.log("DB CONNECTED");
  });

  //Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan('combined'))


//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);

//Starting a server
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
