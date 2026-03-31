import { useState } from "react";
import HomePage from "./HomePage";
import "../customercss/CustomerDashboard.css";

function CustomerDashboard() {
  const [activeMenu, setActiveMenu] = useState("home");

  return (
    <div className="customer-dashboard">
      <header className="customer-header">
        <div className="header-top">
          <div className="promo-banner">
            <span>🎉 LƯỢNG VỀ - GIẢM ĐẾN 50%</span>
            <button className="promo-btn">Xem ngay</button>
          </div>
        </div>

        <div className="header-main">
          <div className="header-container">
            <div className="logo">
              <div className="logo-icon">⚡</div>
              <span className="logo-text">SUPERSPORTS</span>
            </div>

            <nav className="main-nav">
              <button
                className={activeMenu === "home" ? "active" : ""}
                onClick={() => setActiveMenu("home")}
              >
                Xu Hướng <span className="arrow">▼</span>
              </button>
              <button
                className={activeMenu === "men" ? "active" : ""}
                onClick={() => setActiveMenu("men")}
              >
                Nam <span className="arrow">▼</span>
              </button>
              <button
                className={activeMenu === "women" ? "active" : ""}
                onClick={() => setActiveMenu("women")}
              >
                Nữ <span className="arrow">▼</span>
              </button>
              <button
                className={activeMenu === "kids" ? "active" : ""}
                onClick={() => setActiveMenu("kids")}
              >
                Trẻ Em <span className="arrow">▼</span>
              </button>
              <button
                className={activeMenu === "accessories" ? "active" : ""}
                onClick={() => setActiveMenu("accessories")}
              >
                Phụ Kiện <span className="arrow">▼</span>
              </button>
              <button
                className={activeMenu === "brands" ? "active" : ""}
                onClick={() => setActiveMenu("brands")}
              >
                Thương Hiệu <span className="arrow">▼</span>
              </button>
              <button
                className={activeMenu === "sports" ? "active" : ""}
                onClick={() => setActiveMenu("sports")}
              >
                Thể Thao <span className="arrow">▼</span>
              </button>
              <button className="sale-btn">
                Ưu Đãi <span className="arrow">▼</span>
              </button>
            </nav>

            <div className="header-actions">
              <div className="search-box">
                <input type="text" placeholder="Bạn đang tìm gì..." />
                <button className="search-btn">🔍</button>
              </div>
              <button className="icon-btn">👤</button>
              <button className="icon-btn">🛒</button>
              <button className="icon-btn">📍</button>
              <button className="lang-btn">🇻🇳 ▼</button>
            </div>
          </div>
        </div>

        <div className="header-bottom">
          <div className="info-bar">
            <div className="info-item">
              <span>📦</span> Miễn phí giao hàng đơn từ 699k
            </div>
            <div className="info-item">
              <span>🎁</span> Nhận phần quà trả đơn từ 30 ngày
            </div>
            <div className="info-item">
              <span>✓</span> Cam kết 100% chính hãng
            </div>
            <div className="info-item">
              <span>💰</span> Đăng ký nhận ngay 250K
            </div>
          </div>
        </div>
      </header>

      <main className="customer-content">
        {activeMenu === "home" && <HomePage />}

        {activeMenu !== "home" && (
          <div className="coming-soon">
            <h2>Trang {activeMenu} đang được phát triển</h2>
            <p>Vui lòng quay lại sau</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default CustomerDashboard;
