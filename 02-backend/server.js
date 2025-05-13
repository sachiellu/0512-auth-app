const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const cors = require("cors");

console.log("--- DEBUG INFO ---");
console.log("process.env.PORT as seen by Node.js:", process.env.PORT);
console.log("process.env.MONGODB_URI (length):", process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 'undefined');
console.log("--- END DEBUG INFO ---");

const app = express();
const port = parseInt(process.env.PORT || "5001", 10);

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("成功連接 MongoDB");
    app.listen(port, '0.0.0.0', () => {
      console.log(`伺服器正在監聽 ${port} 端口，地址 0.0.0.0`);
    });
  })
  .catch((err) => {
    console.error("MongoDB 連接失敗:", err);
    process.exit(1);
  });