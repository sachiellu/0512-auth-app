const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");  // 載入 User 模型
const authenticateToken = require("../middleware/auth");  // 載入認證中介軟體

const router = express.Router();

// 用來保護需要登入的路由
router.get("/dashboard", authenticateToken, (req, res) => {
  res.json({ message: `歡迎使用者 ${req.user.id} 訪問後台！` });
});

// 註冊 API
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  console.log("正在檢查帳號:", username);

  try {
    // 檢查是否有重複的帳號
    const existingUser = await User.findOne({ username });
    console.log("是否找到現有帳號:", existingUser); 

    if (existingUser) {
      return res.status(400).json({ error: "已有此帳戶" });
    }

    // 密碼加密
    const hash = await bcrypt.hash(password, 10);

    // 創建新用戶
    const newUser = new User({
      username,
      password: hash,
    });

    // 儲存新用戶到資料庫
    await newUser.save();
    res.status(201).json({ message: "註冊成功" });
  } catch (err) {
    console.error("註冊錯誤:", err);
    res.status(500).json({ error: "註冊失敗" });
  }
});

// 登入 API
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "帳號或密碼錯誤" });
    }

    // 生成 JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    console.error("登入錯誤:", err);
    res.status(500).json({ error: "登入失敗" });
  }
});

module.exports = router;