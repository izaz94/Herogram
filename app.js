const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require("./routes/auth");
const fileRoutes = require("./routes/file");

const app = express();



dotenv.config({ path: './config/config.env' });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/uploads', express.static('uploads'));

const DB = process.env.MONGO_URI;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DataBase connected Successfully'));

app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

const PORT = process.env.PORT || 8080;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);


