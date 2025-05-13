const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("成功連接 MongoDB");

    // 伺服器開始監聽
    app.listen(port, '0.0.0.0', () => {
      console.log(`伺服器正在監聽 ${port} 端口，地址 0.0.0.0`);
    });
  })
  .catch((err) => {
    console.error("MongoDB 連接失敗:", err);
  });