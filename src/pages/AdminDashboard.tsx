import { useState } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const handleLogout = () => {
    if (confirm("Bạn có chắc muốn đăng xuất?")) {
      window.location.reload();
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>ADMIN PANEL</h2>
        </div>
        <nav className="sidebar-nav">
          <button
            className={activeMenu === "dashboard" ? "active" : ""}
            onClick={() => setActiveMenu("dashboard")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            Dashboard
          </button>
          <button
            className={activeMenu === "products" ? "active" : ""}
            onClick={() => setActiveMenu("products")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
            Sản phẩm
          </button>
          <button
            className={activeMenu === "orders" ? "active" : ""}
            onClick={() => setActiveMenu("orders")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Đơn hàng
          </button>
          <button
            className={activeMenu === "users" ? "active" : ""}
            onClick={() => setActiveMenu("users")}
          >
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
            Người dùng
          </button>
          <button
            className={activeMenu === "sellers" ? "active" : ""}
            onClick={() => setActiveMenu("sellers")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            Người bán
          </button>
          <button
            className={activeMenu === "settings" ? "active" : ""}
            onClick={() => setActiveMenu("settings")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H1m18.2 5.2l-4.2-4.2m0-6l4.2-4.2" />
            </svg>
            Cài đặt
          </button>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Đăng xuất
        </button>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <h1>
            {activeMenu === "dashboard"
              ? "Dashboard"
              : activeMenu === "products"
                ? "Quản lý sản phẩm"
                : activeMenu === "orders"
                  ? "Quản lý đơn hàng"
                  : activeMenu === "users"
                    ? "Quản lý người dùng"
                    : activeMenu === "sellers"
                      ? "Quản lý người bán"
                      : "Cài đặt"}
          </h1>
          <div className="user-info">
            <span>Admin</span>
            <div className="avatar">A</div>
          </div>
        </header>

        <div className="content">
          {activeMenu === "dashboard" && (
            <div className="dashboard-grid">
              <div className="stat-card">
                <div className="stat-icon blue">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="stat-info">
                  <h3>Doanh thu</h3>
                  <p className="stat-value">125,000,000đ</p>
                  <span className="stat-change positive">+12.5%</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon green">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                  </svg>
                </div>
                <div className="stat-info">
                  <h3>Đơn hàng</h3>
                  <p className="stat-value">1,234</p>
                  <span className="stat-change positive">+8.2%</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon purple">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                </div>
                <div className="stat-info">
                  <h3>Khách hàng</h3>
                  <p className="stat-value">8,456</p>
                  <span className="stat-change positive">+15.3%</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon orange">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>
                </div>
                <div className="stat-info">
                  <h3>Sản phẩm</h3>
                  <p className="stat-value">567</p>
                  <span className="stat-change negative">-2.1%</span>
                </div>
              </div>
            </div>
          )}

          {activeMenu !== "dashboard" && (
            <div className="placeholder">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <h2>Trang {activeMenu} đang được phát triển</h2>
              <p>Chức năng này sẽ sớm được cập nhật</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
