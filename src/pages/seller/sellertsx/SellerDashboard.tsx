import { useState } from "react";
import OverviewPage from "./OverviewPage";
import ProductsPage from "./ProductsPage";
import "../sellercss/SellerDashboard.css";
import "../sellercss/SellerOverview.css";

type MenuType =
  | "overview"
  | "products"
  | "categories"
  | "orders"
  | "promotions"
  | "shipping"
  | "marketing"
  | "flashsale"
  | "reports"
  | "finance"
  | "settings";

function SellerDashboard() {
  const [activeMenu, setActiveMenu] = useState<MenuType>("overview");

  const handleLogout = () => {
    if (confirm("Bạn có chắc muốn đăng xuất?")) {
      window.location.reload();
    }
  };

  return (
    <div className="seller-dashboard">
      <aside className="seller-sidebar">
        <div className="seller-sidebar-header">
          <div className="seller-logo">
            <div className="logo-icon">S</div>
            <div className="logo-text">
              <h2>SellerHub</h2>
              <p>Kênh người bán</p>
            </div>
          </div>
        </div>

        <div className="menu-section">
          <div className="menu-label">QUẢN LÝ</div>
          <nav className="seller-sidebar-nav">
            <button
              className={activeMenu === "overview" ? "active" : ""}
              onClick={() => setActiveMenu("overview")}
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
              <span>Tổng quan</span>
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
              <span>Sản phẩm</span>
              <span className="badge-count">128</span>
            </button>

            <button
              className={activeMenu === "categories" ? "active" : ""}
              onClick={() => setActiveMenu("categories")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
              </svg>
              <span>Danh mục</span>
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
              </svg>
              <span>Đơn hàng</span>
              <span className="badge-count alert">12</span>
            </button>

            <button
              className={activeMenu === "promotions" ? "active" : ""}
              onClick={() => setActiveMenu("promotions")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
              <span>Khuyến mãi</span>
            </button>
          </nav>
        </div>

        <div className="menu-section">
          <div className="menu-label">VẬN HÀNH</div>
          <nav className="seller-sidebar-nav">
            <button
              className={activeMenu === "shipping" ? "active" : ""}
              onClick={() => setActiveMenu("shipping")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <span>Vận chuyển</span>
            </button>

            <button
              className={activeMenu === "marketing" ? "active" : ""}
              onClick={() => setActiveMenu("marketing")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 11l18-5v12L3 14v-3z" />
                <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
              </svg>
              <span>Marketing</span>
            </button>

            <button
              className={activeMenu === "flashsale" ? "active" : ""}
              onClick={() => setActiveMenu("flashsale")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span>Flash Sale</span>
            </button>
          </nav>
        </div>

        <div className="menu-section">
          <div className="menu-label">THIẾT LẬP</div>
          <nav className="seller-sidebar-nav">
            <button
              className={activeMenu === "reports" ? "active" : ""}
              onClick={() => setActiveMenu("reports")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
              <span>Báo cáo</span>
            </button>

            <button
              className={activeMenu === "finance" ? "active" : ""}
              onClick={() => setActiveMenu("finance")}
            >
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
              <span>Tài chính</span>
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
              <span>Cài đặt</span>
            </button>
          </nav>
        </div>

        <button className="seller-logout-btn" onClick={handleLogout}>
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
          <span>Đăng xuất</span>
        </button>
      </aside>

      <main className="seller-main-content">
        <header className="seller-top-bar">
          <div className="breadcrumb">
            <span>Seller Lab</span>
            <span className="separator">/</span>
            <span>Sản phẩm</span>
            <span className="separator">/</span>
            <span className="current">Sản phẩm</span>
          </div>
          <div className="top-bar-actions">
            <button className="icon-btn">
              <span className="search-icon">🔍</span>
              <span>Tìm kiếm sản phẩm, đơn hàng</span>
            </button>
            <button className="icon-btn notification">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="notification-badge">3</span>
            </button>
            <button className="icon-btn">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
            </button>
            <div className="user-menu">
              <span className="status-online">● Cửa hàng đang mở</span>
            </div>
          </div>
        </header>

        <div className="seller-content">
          {activeMenu === "overview" && <OverviewPage />}
          {activeMenu === "products" && <ProductsPage />}

          {!["overview", "products"].includes(activeMenu) && (
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

export default SellerDashboard;
