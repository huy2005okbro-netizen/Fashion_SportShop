import { useState } from "react";
import "./CustomerLogin.css";

interface CustomerLoginProps {
  onViewProductDetail?: () => void;
}

function CustomerLogin({ onViewProductDetail }: CustomerLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Vui lòng điền đầy đủ email và mật khẩu.");
      return;
    }

    if (isLogin) {
      // TODO: thay bằng xác thực backend thực tế (API)
      if (!email.includes("@")) {
        alert("Email không hợp lệ, vui lòng nhập đúng định dạng.");
        return;
      }

      alert("Đăng nhập thành công! Đang chuyển đến danh mục sản phẩm...");
      onViewProductDetail?.();
    } else {
      // Đăng ký thử nghiệm
      alert("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
      setIsLogin(true);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="customer-login-container">
      <div className="customer-login-card">
        <div className="customer-login-header">
          <div className="icon-wrapper">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h1>FASHION STORE</h1>
          <p className="tagline">Chào mừng khách hàng</p>
        </div>

        <div className="customer-login-tabs">
          <button
            className={isLogin ? "tab active" : "tab"}
            onClick={() => setIsLogin(true)}
          >
            Đăng nhập
          </button>
          <button
            className={!isLogin ? "tab active" : "tab"}
            onClick={() => setIsLogin(false)}
          >
            Đăng ký
          </button>
        </div>

        <form onSubmit={handleSubmit} className="customer-login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
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

          {isLogin && (
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Ghi nhớ đăng nhập</span>
              </label>
              <a href="#" className="forgot-password">
                Quên mật khẩu?
              </a>
            </div>
          )}

          <button type="submit" className="submit-btn">
            {isLogin ? "Đăng nhập" : "Đăng ký"}
          </button>
        </form>

        {onViewProductDetail && (
          <button
            type="button"
            className="view-products-btn"
            onClick={onViewProductDetail}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Xem danh mục sản phẩm
          </button>
        )}

        <div className="divider">
          <span>hoặc</span>
        </div>

        <div className="social-login">
          <button className="social-btn google">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M19.8 10.2c0-.7-.1-1.4-.2-2H10v3.8h5.5c-.2 1.2-1 2.2-2 2.9v2.5h3.2c1.9-1.7 3-4.3 3-7.2z"
                fill="#4285F4"
              />
              <path
                d="M10 20c2.7 0 4.9-.9 6.6-2.4l-3.2-2.5c-.9.6-2 .9-3.4.9-2.6 0-4.8-1.8-5.6-4.1H1v2.6C2.7 17.9 6.1 20 10 20z"
                fill="#34A853"
              />
              <path
                d="M4.4 12c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V5.4H1C.4 6.6 0 8.3 0 10s.4 3.4 1 4.6l3.4-2.6z"
                fill="#FBBC05"
              />
              <path
                d="M10 4c1.5 0 2.8.5 3.8 1.5l2.9-2.9C15 1 12.7 0 10 0 6.1 0 2.7 2.1 1 5.4l3.4 2.6C5.2 5.8 7.4 4 10 4z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>
          <button className="social-btn facebook">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M20 10c0-5.5-4.5-10-10-10S0 4.5 0 10c0 5 3.7 9.1 8.4 9.9v-7H5.9V10h2.5V7.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V10h2.8l-.4 2.9h-2.3v7C16.3 19.1 20 15 20 10z" />
            </svg>
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerLogin;
