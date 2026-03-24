import { useState } from "react";
import DashboardPage from "./DashboardPage";
import UsersPage from "./UsersPage";
import ProductsPage from "./ProductsPage";
import CategoriesPage from "./CategoriesPage";
import InventoryPage from "./InventoryPage";
import OrdersPage from "./OrdersPage";
import FinancePage from "./FinancePage";
import ReportsPage from "./ReportsPage";
import "../admincss/AdminDashboard.css";

type MenuType =
  | "dashboard"
  | "users"
  | "products"
  | "categories"
  | "inventory"
  | "orders"
  | "finance"
  | "reports"
  | "marketing"
  | "coupons"
  | "settings";

function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState<MenuType>("dashboard");

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
            <span>Dashboard</span>
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
            <span>Đơn hàng</span>
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
            <span>Người dùng</span>
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
            className={activeMenu === "inventory" ? "active" : ""}
            onClick={() => setActiveMenu("inventory")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            <span>Kho hàng</span>
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
            className={activeMenu === "coupons" ? "active" : ""}
            onClick={() => setActiveMenu("coupons")}
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
            <span>Mã giảm giá</span>
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
          <span>Đăng xuất</span>
        </button>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <h1>
            {activeMenu === "dashboard"
              ? "Dashboard"
              : activeMenu === "users"
                ? "Quản lý người dùng"
                : activeMenu === "products"
                  ? "Quản lý sản phẩm"
                  : activeMenu === "categories"
                    ? "Quản lý danh mục"
                    : activeMenu === "inventory"
                      ? "Quản lý kho hàng"
                      : activeMenu === "orders"
                        ? "Quản lý đơn hàng"
                        : activeMenu === "finance"
                          ? "Quản lý tài chính"
                          : activeMenu === "reports"
                            ? "Báo cáo & thống kê"
                            : activeMenu === "marketing"
                              ? "Marketing"
                              : activeMenu === "coupons"
                                ? "Mã giảm giá"
                                : "Cài đặt"}
          </h1>
          <div className="user-info">
            <span>Admin</span>
            <div className="avatar">A</div>
          </div>
        </header>

        <div className="content">
          {activeMenu === "dashboard" && <DashboardPage />}
          {activeMenu === "users" && <UsersPage />}
          {activeMenu === "products" && <ProductsPage />}
          {activeMenu === "categories" && <CategoriesPage />}
          {activeMenu === "inventory" && <InventoryPage />}
          {activeMenu === "orders" && <OrdersPage />}
          {activeMenu === "finance" && <FinancePage />}
          {activeMenu === "reports" && <ReportsPage />}

          {![
            "dashboard",
            "users",
            "products",
            "categories",
            "inventory",
            "orders",
            "finance",
            "reports",
          ].includes(activeMenu) && (
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
