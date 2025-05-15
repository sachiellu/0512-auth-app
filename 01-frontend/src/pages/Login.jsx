import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://youtubeplayer-auth-api.fly.dev';
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const apiUrl = `${API_BASE_URL || ' fallback_if_vercel_env_missing '}/api/auth/login`;
      console.log("Requesting API at:", apiUrl);

  const response = await axios.post(apiUrl, {
        username,
        password,
      });

      // 存儲 token
      localStorage.setItem("token", response.data.token);
      console.log("登入成功");
      navigate("/dashboard");
    } catch (error) {
      console.error("登入錯誤:", error.response?.data?.error || error.message);
      alert("登入失敗，請檢查帳號或密碼！");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>登入 Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>帳號 : </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>密碼 : </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">登入</button>
      </form>
      <p>
        沒有帳號？ <Link to="/register">註冊</Link>
      </p>
    </div>
  );
}

export default Login;