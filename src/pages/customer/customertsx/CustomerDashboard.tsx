import { useState } from "react";
import HomePage from "./HomePage";
import "../customercss/CustomerDashboard.css";

function CustomerDashboard() {
  const [activeMenu, setActiveMenu] = useState("home");
  const [showTrendDropdown, setShowTrendDropdown] = useState(false);
  const [showMenDropdown, setShowMenDropdown] = useState(false);
  const [showWomenDropdown, setShowWomenDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setActiveMenu("category");
    setShowTrendDropdown(false);
    setShowMenDropdown(false);
    setShowWomenDropdown(false);
  };

  const handleLogoClick = () => {
    setActiveMenu("home");
    setSelectedCategory("");
  };

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
            <div
              className="logo"
              onClick={handleLogoClick}
              style={{ cursor: "pointer" }}
            >
              <div className="logo-icon">⚡</div>
              <span className="logo-text">SUPERSPORTS</span>
            </div>

            <nav className="main-nav">
              <div
                className="nav-item-wrapper"
                onMouseEnter={() => setShowTrendDropdown(true)}
                onMouseLeave={() => setShowTrendDropdown(false)}
              >
                <button className={activeMenu === "home" ? "active" : ""}>
                  Xu Hướng <span className="arrow">▼</span>
                </button>
                {showTrendDropdown && (
                  <div className="dropdown-menu">
                    <div className="dropdown-container">
                      <div className="dropdown-column">
                        <h4>Hàng Mới</h4>
                        <ul>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("NIKE Air Max");
                              }}
                            >
                              NIKE Air Max
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("COLUMBIA Trail Run");
                              }}
                            >
                              COLUMBIA Trail Run
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Vợt Pickleball JOOLA");
                              }}
                            >
                              Vợt Pickleball JOOLA
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("TEVA Hurricane XLT3");
                              }}
                            >
                              TEVA Hurricane XLT3
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("ADIDAS Supernova");
                              }}
                            >
                              ADIDAS Supernova
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="dropdown-column">
                        <h4>Nổi Bật</h4>
                        <ul>
                          <li>
                            <a href="#">Payday Giảm Đến 60%</a>
                          </li>
                          <li>
                            <a href="#">Độc Quyền Online</a>
                          </li>
                          <li>
                            <a href="#">Kiện Rơi Dưới 600k</a>
                          </li>
                          <li>
                            <a href="#">Giày Thời Trang Dưới 1.5 Triệu</a>
                          </li>
                          <li>
                            <a href="#">Giày Chạy Bộ Dưới 1.5 triệu</a>
                          </li>
                        </ul>
                      </div>
                      <div className="dropdown-column">
                        <h4>Sự Kiện</h4>
                        <ul>
                          <li>
                            <a href="#">Chính Phục Paytox</a>
                          </li>
                          <li>
                            <a href="#">Làm Chủ Pickleball</a>
                          </li>
                          <li>
                            <a href="#">Săn Săng Bơi Lội</a>
                          </li>
                          <li>
                            <a href="#">Nike Air Max Day</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="nav-item-wrapper"
                onMouseEnter={() => setShowMenDropdown(true)}
                onMouseLeave={() => setShowMenDropdown(false)}
              >
                <button className={activeMenu === "men" ? "active" : ""}>
                  Nam <span className="arrow">▼</span>
                </button>
                {showMenDropdown && (
                  <div className="dropdown-menu dropdown-wide">
                    <div className="dropdown-container-wide">
                      <div className="dropdown-column">
                        <h4>Giày Thể Thao</h4>
                        <p className="highlight-text">Hàng Mới</p>
                        <ul>
                          <li>
                            <a href="#">Chạy Bộ</a>
                          </li>
                          <li>
                            <a href="#">Chạy Trail</a>
                          </li>
                          <li>
                            <a href="#">Hoạt Động Ngoài Trời</a>
                          </li>
                          <li>
                            <a href="#">Luyện Tập</a>
                          </li>
                          <li>
                            <a href="#">Tennis / Pickleball</a>
                          </li>
                          <li>
                            <a href="#">Đá Bóng</a>
                          </li>
                          <li>
                            <a href="#">Bóng Rổ</a>
                          </li>
                          <li>
                            <a href="#">Golf</a>
                          </li>
                          <p className="highlight-text sale">Ưu Đãi</p>
                        </ul>
                      </div>
                      <div className="dropdown-column">
                        <h4>Giày Dép Thời Trang</h4>
                        <p className="highlight-text">Hàng Mới</p>
                        <ul>
                          <li>
                            <a href="#">Giày Sneaker</a>
                          </li>
                          <li>
                            <a href="#">Giày Sandals</a>
                          </li>
                          <li>
                            <a href="#">Giày Clog</a>
                          </li>
                          <li>
                            <a href="#">Dép Quai Ngang</a>
                          </li>
                          <li>
                            <a href="#">Dép Xỏ Ngón</a>
                          </li>
                          <p className="highlight-text sale">Ưu Đãi</p>
                        </ul>
                      </div>
                      <div className="dropdown-column">
                        <h4>Áo</h4>
                        <p className="highlight-text">Hàng Mới</p>
                        <ul>
                          <li>
                            <a href="#">Áo Thun</a>
                          </li>
                          <li>
                            <a href="#">Áo Polo</a>
                          </li>
                          <li>
                            <a href="#">Áo Khoác</a>
                          </li>
                          <li>
                            <a href="#">Áo Bộ dùng</a>
                          </li>
                          <li>
                            <a href="#">Áo Ba Lỗ</a>
                          </li>
                          <li>
                            <a href="#">Áo Sơ Mi</a>
                          </li>
                          <li>
                            <a href="#">Áo Hoodie</a>
                          </li>
                          <li>
                            <a href="#">Áo Bơi</a>
                          </li>
                          <p className="highlight-text sale">Ưu Đãi</p>
                        </ul>
                      </div>
                      <div className="dropdown-column">
                        <h4>Quần</h4>
                        <p className="highlight-text">Hàng Mới</p>
                        <ul>
                          <li>
                            <a href="#">Quần Ngắn</a>
                          </li>
                          <li>
                            <a href="#">Quần Dài</a>
                          </li>
                          <li>
                            <a href="#">Quần Lót</a>
                          </li>
                          <li>
                            <a href="#">Quần Bơi</a>
                          </li>
                          <li>
                            <a href="#">Quần Bó Thể Thao</a>
                          </li>
                          <p className="highlight-text sale">Ưu Đãi</p>
                        </ul>
                      </div>
                      <div className="dropdown-column">
                        <h4>Thương Hiệu Nổi Bật</h4>
                        <p className="highlight-text">Hàng Mới</p>
                        <ul>
                          <li>
                            <a href="#">HOKA</a>
                          </li>
                          <li>
                            <a href="#">Nike</a>
                          </li>
                          <li>
                            <a href="#">Under Armour</a>
                          </li>
                          <li>
                            <a href="#">Crocs</a>
                          </li>
                          <li>
                            <a href="#">Adidas</a>
                          </li>
                          <li>
                            <a href="#">Columbia</a>
                          </li>
                          <li>
                            <a href="#">Puma</a>
                          </li>
                          <li>
                            <a href="#">On Running</a>
                          </li>
                          <li>
                            <a href="#">Asics</a>
                          </li>
                          <li>
                            <a href="#">Speedo</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="nav-item-wrapper"
                onMouseEnter={() => setShowWomenDropdown(true)}
                onMouseLeave={() => setShowWomenDropdown(false)}
              >
                <button className={activeMenu === "women" ? "active" : ""}>
                  Nữ <span className="arrow">▼</span>
                </button>
                {showWomenDropdown && (
                  <div className="dropdown-menu dropdown-wide">
                    <div className="dropdown-container-wide">
                      <div className="dropdown-column">
                        <h4>Giày Thể Thao</h4>
                        <p className="highlight-text">Hàng Mới</p>
                        <ul>
                          <li>
                            <a href="#">Chạy Bộ</a>
                          </li>
                          <li>
                            <a href="#">Chạy Trail</a>
                          </li>
                          <li>
                            <a href="#">Tennis / Pickleball</a>
                          </li>
                          <li>
                            <a href="#">Hoạt Động Ngoài Trời</a>
                          </li>
                          <li>
                            <a href="#">Luyện Tập</a>
                          </li>
                          <p className="highlight-text sale">Ưu Đãi</p>
                        </ul>
                      </div>
                      <div className="dropdown-column">
                        <h4>Giày Dép Thời Trang</h4>
                        <p className="highlight-text">Hàng Mới</p>
                        <ul>
                          <li>
                            <a href="#">Giày Sneaker</a>
                          </li>
                          <li>
                            <a href="#">Giày Clog</a>
                          </li>
                          <li>
                            <a href="#">Giày Sandals</a>
                          </li>
                          <li>
                            <a href="#">Dép Quai Ngang</a>
                          </li>
                          <li>
                            <a href="#">Dép Xỏ Ngón</a>
                          </li>
                          <p className="highlight-text sale">Ưu Đãi</p>
                        </ul>
                      </div>
                      <div className="dropdown-column">
                        <h4>Áo</h4>
                        <p className="highlight-text">Hàng Mới</p>
                        <ul>
                          <li>
                            <a href="#">Áo Thun</a>
                          </li>
                          <li>
                            <a href="#">Áo Tập Nữ / Áo Bra</a>
                          </li>
                          <li>
                            <a href="#">Áo Ba Lỗ</a>
                          </li>
                          <li>
                            <a href="#">Áo Khoác</a>
                          </li>
                          <li>
                            <a href="#">Áo Sơ Mi</a>
                          </li>
                          <li>
                            <a href="#">Áo Hoodie</a>
                          </li>
                          <li>
                            <a href="#">Đồ Bơi</a>
                          </li>
                          <p className="highlight-text sale">Ưu Đãi</p>
                        </ul>
                      </div>
                      <div className="dropdown-column">
                        <h4>Quần / Váy</h4>
                        <p className="highlight-text">Hàng Mới</p>
                        <ul>
                          <li>
                            <a href="#">Quần Ngắn</a>
                          </li>
                          <li>
                            <a href="#">Quần Dài</a>
                          </li>
                          <li>
                            <a href="#">Quần Bó Thể Thao</a>
                          </li>
                          <li>
                            <a href="#">Chân Váy</a>
                          </li>
                          <li>
                            <a href="#">Quần Lót</a>
                          </li>
                          <li>
                            <a href="#">Quần Bơi</a>
                          </li>
                          <p className="highlight-text sale">Ưu Đãi</p>
                        </ul>
                      </div>
                      <div className="dropdown-column">
                        <h4>Thương Hiệu Nổi Bật</h4>
                        <p className="highlight-text">Hàng Mới</p>
                        <ul>
                          <li>
                            <a href="#">HOKA</a>
                          </li>
                          <li>
                            <a href="#">Crocs</a>
                          </li>
                          <li>
                            <a href="#">Nike</a>
                          </li>
                          <li>
                            <a href="#">Under Armour</a>
                          </li>
                          <li>
                            <a href="#">Adidas</a>
                          </li>
                          <li>
                            <a href="#">Speedo</a>
                          </li>
                          <li>
                            <a href="#">Puma</a>
                          </li>
                          <li>
                            <a href="#">Columbia</a>
                          </li>
                          <li>
                            <a href="#">On Running</a>
                          </li>
                          <li>
                            <a href="#">Asics</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button className={activeMenu === "kids" ? "active" : ""}>
                Trẻ Em <span className="arrow">▼</span>
              </button>
              <button className={activeMenu === "accessories" ? "active" : ""}>
                Phụ Kiện <span className="arrow">▼</span>
              </button>
              <button className={activeMenu === "brands" ? "active" : ""}>
                Thương Hiệu <span className="arrow">▼</span>
              </button>
              <button className={activeMenu === "sports" ? "active" : ""}>
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

        {activeMenu === "category" && (
          <div className="category-page">
            <div className="category-container">
              <h1 className="category-title">{selectedCategory}</h1>
              <div className="products-grid">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                  <div key={item} className="product-card">
                    <div className="product-badge">-30%</div>
                    <div className="product-image">
                      <div className="image-placeholder">👟</div>
                    </div>
                    <div className="product-info">
                      <h4>
                        {selectedCategory} - Sản phẩm {item}
                      </h4>
                      <div className="product-rating">
                        <span className="stars">⭐⭐⭐⭐⭐</span>
                        <span className="reviews">(128)</span>
                      </div>
                      <div className="product-price">
                        <span className="price-current">2,499,000đ</span>
                        <span className="price-old">3,499,000đ</span>
                      </div>
                      <button className="btn-add-cart">Thêm vào giỏ</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeMenu !== "home" && activeMenu !== "category" && (
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
