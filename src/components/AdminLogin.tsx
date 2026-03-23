import { useState } from "react";
import "./AdminLogin.css";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Giả lập đăng nhập thành công
    if (username && password && code) {
      onLoginSuccess();
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="icon-wrapper">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1>ADMIN PANEL</h1>
          <p className="tagline">Quản trị hệ thống</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
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

          <div className="form-group">
            <label htmlFor="code">Mã xác thực 2FA</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="000000"
              maxLength={6}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Đăng nhập quản trị
          </button>
        </form>

        <div className="security-notice">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <div>
            <strong>Bảo mật cao</strong>
            <p>Phiên đăng nhập được mã hóa và bảo vệ</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
