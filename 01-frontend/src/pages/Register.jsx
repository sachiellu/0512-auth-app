import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://youtubeplayer-auth-api.fly.dev';
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // 發送註冊請求到後端
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        username,
        password,
      });

      console.log("註冊成功", response.data);

      // 註冊成功後跳轉到登入頁面
      navigate("/login");
    } catch (error) {
      // 檢查是否有 response
      if (error.response) {
        if (error.response.data.error === "已有此帳戶") {
          alert("已有此帳戶，請選擇其他帳號！");
        } else {
          alert("註冊失敗，請檢查輸入的資料！");
        }
        console.error("註冊錯誤:", error.response.data);
      } else if (error.request) {
        console.error("請求未收到回應:", error.request);
        alert("註冊失敗，伺服器沒有回應！");
      } else {
        console.error("錯誤:", error.message);
        alert("註冊失敗，發生未知錯誤！");
      }
    }
  };

  return (
    <div>
      <h2>註冊</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>使用者名稱:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>密碼:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">註冊</button>
      </form>
    </div>
  );
};

export default Register;