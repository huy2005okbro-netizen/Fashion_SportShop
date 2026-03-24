import { useState } from "react";
import "./SellerLogin.css";

interface SellerLoginProps {
  onLoginSuccess?: () => void;
}

function SellerLogin({ onLoginSuccess }: SellerLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Seller login:", { email, password });
    // Gọi callback khi đăng nhập thành công
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <div className="seller-login-container">
      <div className="seller-login-card">
        <div className="seller-login-header">
          <div className="icon-wrapper">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <h1>SELLER PORTAL</h1>
          <p className="tagline">Quản lý cửa hàng của bạn</p>
        </div>

        <form onSubmit={handleSubmit} className="seller-login-form">
          <div className="form-group">
            <label htmlFor="email">Email hoặc Tên cửa hàng</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seller@store.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Ghi nhớ đăng nhập</span>
            </label>
            <a href="#" className="forgot-password">
              Quên mật khẩu?
            </a>
          </div>

          <button type="submit" className="submit-btn">
            Đăng nhập
          </button>
        </form>

        <div className="seller-info">
          <div className="info-item">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>Quản lý sản phẩm dễ dàng</span>
          </div>
          <div className="info-item">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span>Theo dõi doanh thu realtime</span>
          </div>
          <div className="info-item">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>Hỗ trợ khách hàng 24/7</span>
          </div>
        </div>

        <div className="register-link">
          Chưa có tài khoản? <a href="#">Đăng ký bán hàng</a>
        </div>
      </div>
    </div>
  );
}

export default SellerLogin;
