import { useState } from "react";
import HomePage from "./HomePage";
import "../customercss/CustomerDashboard.css";

interface CartItem {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  quantity: number;
  category: string;
}

function CustomerDashboard() {
  const [activeMenu, setActiveMenu] = useState("home");
  const [showTrendDropdown, setShowTrendDropdown] = useState(false);
  const [showMenDropdown, setShowMenDropdown] = useState(false);
  const [showWomenDropdown, setShowWomenDropdown] = useState(false);
  const [showKidsDropdown, setShowKidsDropdown] = useState(false);
  const [showAccessoriesDropdown, setShowAccessoriesDropdown] = useState(false);
  const [showBrandsDropdown, setShowBrandsDropdown] = useState(false);
  const [showSportsDropdown, setShowSportsDropdown] = useState(false);
  const [showDealsDropdown, setShowDealsDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setActiveMenu("category");
    setShowTrendDropdown(false);
    setShowMenDropdown(false);
    setShowWomenDropdown(false);
    setShowKidsDropdown(false);
    setShowAccessoriesDropdown(false);
    setShowBrandsDropdown(false);
    setShowSportsDropdown(false);
    setShowDealsDropdown(false);
  };

  const handleLogoClick = () => {
    setActiveMenu("home");
    setSelectedCategory("");
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
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
              <div
                className="nav-item-wrapper"
                onMouseEnter={() => setShowKidsDropdown(true)}
                onMouseLeave={() => setShowKidsDropdown(false)}
              >
                <button className={activeMenu === "kids" ? "active" : ""}>
                  Trẻ Em <span className="arrow">▼</span>
                </button>
                {showKidsDropdown && (
                  <div className="dropdown-menu dropdown-medium">
                    <div className="dropdown-container-medium">
                      <div className="dropdown-column">
                        <h4>Giày Dép</h4>
                        <p className="highlight-text">Hàng Mới</p>
                        <ul>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Giày Clog - Trẻ Em");
                              }}
                            >
                              Giày Clog
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Giày Sneaker - Trẻ Em");
                              }}
                            >
                              Giày Sneaker
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Dép / Sandals - Trẻ Em");
                              }}
                            >
                              Dép / Sandals
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Giày Đá Bóng - Trẻ Em");
                              }}
                            >
                              Giày Đá Bóng
                            </a>
                          </li>
                          <p className="highlight-text sale">Ưu Đãi</p>
                        </ul>
                      </div>
                      <div className="dropdown-column">
                        <h4>Quần Áo Bé Trai</h4>
                        <p className="highlight-text">Hàng Mới</p>
                        <ul>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Áo - Bé Trai");
                              }}
                            >
                              Áo
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Quần - Bé Trai");
                              }}
                            >
                              Quần
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Đồ Bơi - Bé Trai");
                              }}
                            >
                              Đồ Bơi
                            </a>
                          </li>
                          <p className="highlight-text sale">Ưu Đãi</p>
                        </ul>
                      </div>
                      <div className="dropdown-column">
                        <h4>Quần Áo Bé Gái</h4>
                        <p className="highlight-text">Hàng Mới</p>
                        <ul>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Áo - Bé Gái");
                              }}
                            >
                              Áo
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Quần / Váy - Bé Gái");
                              }}
                            >
                              Quần / Váy
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Đồ Bơi - Bé Gái");
                              }}
                            >
                              Đồ Bơi
                            </a>
                          </li>
                          <p className="highlight-text sale">Ưu Đãi</p>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="nav-item-wrapper"
                onMouseEnter={() => setShowAccessoriesDropdown(true)}
                onMouseLeave={() => setShowAccessoriesDropdown(false)}
              >
                <button
                  className={activeMenu === "accessories" ? "active" : ""}
                >
                  Phụ Kiện <span className="arrow">▼</span>
                </button>
                {showAccessoriesDropdown && (
                  <div className="dropdown-menu dropdown-medium">
                    <div className="dropdown-container-medium">
                      <div className="dropdown-column">
                        <h4>Phụ Kiện Thể Thao</h4>
                        <p className="highlight-text">Hàng Mới</p>
                        <ul>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Balo / Túi");
                              }}
                            >
                              Balo / Túi
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Tất / Vớ");
                              }}
                            >
                              Tất / Vớ
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Mũ / Nón");
                              }}
                            >
                              Mũ / Nón
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Găng Tay");
                              }}
                            >
                              Găng Tay
                            </a>
                          </li>
                          <p className="highlight-text sale">Ưu Đãi</p>
                        </ul>
                      </div>
                      <div className="dropdown-column">
                        <h4>Thiết Bị Thể Thao</h4>
                        <p className="highlight-text">Hàng Mới</p>
                        <ul>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Vợt Tennis / Pickleball");
                              }}
                            >
                              Vợt Tennis / Pickleball
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Bóng Đá");
                              }}
                            >
                              Bóng Đá
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Bóng Rổ");
                              }}
                            >
                              Bóng Rổ
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Thiết Bị Bơi Lội");
                              }}
                            >
                              Thiết Bị Bơi Lội
                            </a>
                          </li>
                          <p className="highlight-text sale">Ưu Đãi</p>
                        </ul>
                      </div>
                      <div className="dropdown-column">
                        <h4>Phụ Kiện Khác</h4>
                        <p className="highlight-text">Hàng Mới</p>
                        <ul>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Đồng Hồ Thể Thao");
                              }}
                            >
                              Đồng Hồ Thể Thao
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Kính Bơi");
                              }}
                            >
                              Kính Bơi
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Bình Nước");
                              }}
                            >
                              Bình Nước
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Khăn Thể Thao");
                              }}
                            >
                              Khăn Thể Thao
                            </a>
                          </li>
                          <p className="highlight-text sale">Ưu Đãi</p>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="nav-item-wrapper"
                onMouseEnter={() => setShowBrandsDropdown(true)}
                onMouseLeave={() => setShowBrandsDropdown(false)}
              >
                <button className={activeMenu === "brands" ? "active" : ""}>
                  Thương Hiệu <span className="arrow">▼</span>
                </button>
                {showBrandsDropdown && (
                  <div className="dropdown-menu dropdown-wide">
                    <div className="dropdown-container-wide">
                      <div className="dropdown-column">
                        <h4>Thương Hiệu Nổi Bật</h4>
                        <ul>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Nike");
                              }}
                            >
                              Nike
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Adidas");
                              }}
                            >
                              Adidas
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Puma");
                              }}
                            >
                              Puma
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Under Armour");
                              }}
                            >
                              Under Armour
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("New Balance");
                              }}
                            >
                              New Balance
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="dropdown-column">
                        <h4>Giày Chạy Bộ</h4>
                        <ul>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("HOKA");
                              }}
                            >
                              HOKA
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("On Running");
                              }}
                            >
                              On Running
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Asics");
                              }}
                            >
                              Asics
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Brooks");
                              }}
                            >
                              Brooks
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Saucony");
                              }}
                            >
                              Saucony
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="dropdown-column">
                        <h4>Thời Trang</h4>
                        <ul>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Crocs");
                              }}
                            >
                              Crocs
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Birkenstock");
                              }}
                            >
                              Birkenstock
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("TEVA");
                              }}
                            >
                              TEVA
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Vans");
                              }}
                            >
                              Vans
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Converse");
                              }}
                            >
                              Converse
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="dropdown-column">
                        <h4>Outdoor</h4>
                        <ul>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Columbia");
                              }}
                            >
                              Columbia
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("The North Face");
                              }}
                            >
                              The North Face
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Salomon");
                              }}
                            >
                              Salomon
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Merrell");
                              }}
                            >
                              Merrell
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Keen");
                              }}
                            >
                              Keen
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="dropdown-column">
                        <h4>Bơi Lội & Khác</h4>
                        <ul>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Speedo");
                              }}
                            >
                              Speedo
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Arena");
                              }}
                            >
                              Arena
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Reebok");
                              }}
                            >
                              Reebok
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Fila");
                              }}
                            >
                              Fila
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Skechers");
                              }}
                            >
                              Skechers
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="nav-item-wrapper"
                onMouseEnter={() => setShowSportsDropdown(true)}
                onMouseLeave={() => setShowSportsDropdown(false)}
              >
                <button className={activeMenu === "sports" ? "active" : ""}>
                  Thể Thao <span className="arrow">▼</span>
                </button>
                {showSportsDropdown && (
                  <div className="dropdown-menu dropdown-wide">
                    <div className="dropdown-container-wide">
                      <div className="dropdown-column">
                        <h4>Chạy Bộ</h4>
                        <p className="highlight-text">Hàng Mới</p>
                        <ul>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Giày Chạy Bộ");
                              }}
                            >
                              Giày Chạy Bộ
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Quần Áo Chạy Bộ");
                              }}
                            >
                              Quần Áo Chạy Bộ
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Phụ Kiện Chạy Bộ");
                              }}
                            >
                              Phụ Kiện Chạy Bộ
                            </a>
                          </li>
                          <p className="highlight-text sale">Ưu Đãi</p>
                        </ul>
                      </div>
                      <div className="dropdown-column">
                        <h4>Bóng Đá</h4>
                        <p className="highlight-text">Hàng Mới</p>
                        <ul>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Giày Đá Bóng");
                              }}
                            >
                              Giày Đá Bóng
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Quần Áo Đá Bóng");
                              }}
                            >
                              Quần Áo Đá Bóng
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Bóng & Phụ Kiện");
                              }}
                            >
                              Bóng & Phụ Kiện
                            </a>
                          </li>
                          <p className="highlight-text sale">Ưu Đãi</p>
                        </ul>
                      </div>
                      <div className="dropdown-column">
                        <h4>Tennis / Pickleball</h4>
                        <p className="highlight-text">Hàng Mới</p>
                        <ul>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Giày Tennis");
                              }}
                            >
                              Giày Tennis
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Vợt Tennis");
                              }}
                            >
                              Vợt Tennis
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Vợt Pickleball");
                              }}
                            >
                              Vợt Pickleball
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Quần Áo Tennis");
                              }}
                            >
                              Quần Áo Tennis
                            </a>
                          </li>
                          <p className="highlight-text sale">Ưu Đãi</p>
                        </ul>
                      </div>
                      <div className="dropdown-column">
                        <h4>Bơi Lội</h4>
                        <p className="highlight-text">Hàng Mới</p>
                        <ul>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Đồ Bơi Nam");
                              }}
                            >
                              Đồ Bơi Nam
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Đồ Bơi Nữ");
                              }}
                            >
                              Đồ Bơi Nữ
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Kính Bơi");
                              }}
                            >
                              Kính Bơi
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Phụ Kiện Bơi Lội");
                              }}
                            >
                              Phụ Kiện Bơi Lội
                            </a>
                          </li>
                          <p className="highlight-text sale">Ưu Đãi</p>
                        </ul>
                      </div>
                      <div className="dropdown-column">
                        <h4>Thể Thao Khác</h4>
                        <p className="highlight-text">Hàng Mới</p>
                        <ul>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Bóng Rổ");
                              }}
                            >
                              Bóng Rổ
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Golf");
                              }}
                            >
                              Golf
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Luyện Tập / Gym");
                              }}
                            >
                              Luyện Tập / Gym
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Hoạt Động Ngoài Trời");
                              }}
                            >
                              Hoạt Động Ngoài Trời
                            </a>
                          </li>
                          <p className="highlight-text sale">Ưu Đãi</p>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="nav-item-wrapper"
                onMouseEnter={() => setShowDealsDropdown(true)}
                onMouseLeave={() => setShowDealsDropdown(false)}
              >
                <button className="sale-btn">
                  Ưu Đãi <span className="arrow">▼</span>
                </button>
                {showDealsDropdown && (
                  <div className="dropdown-menu dropdown-medium">
                    <div className="dropdown-container-medium">
                      <div className="dropdown-column">
                        <h4 className="sale-title">Flash Sale</h4>
                        <ul>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Giảm Đến 50%");
                              }}
                            >
                              Giảm Đến 50%
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Giảm Đến 60%");
                              }}
                            >
                              Giảm Đến 60%
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Giảm Đến 70%");
                              }}
                            >
                              Giảm Đến 70%
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="dropdown-column">
                        <h4 className="sale-title">Ưu Đãi Đặc Biệt</h4>
                        <ul>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Độc Quyền Online");
                              }}
                            >
                              Độc Quyền Online
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Mua 1 Tặng 1");
                              }}
                            >
                              Mua 1 Tặng 1
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Freeship Toàn Quốc");
                              }}
                            >
                              Freeship Toàn Quốc
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="dropdown-column">
                        <h4 className="sale-title">Giá Tốt</h4>
                        <ul>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Dưới 500K");
                              }}
                            >
                              Dưới 500K
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Dưới 1 Triệu");
                              }}
                            >
                              Dưới 1 Triệu
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick("Dưới 1.5 Triệu");
                              }}
                            >
                              Dưới 1.5 Triệu
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            <div className="header-actions">
              <div className="search-box">
                <input type="text" placeholder="Bạn đang tìm gì..." />
                <button className="search-btn">🔍</button>
              </div>
              <button className="icon-btn">👤</button>
              <button
                className="icon-btn cart-btn"
                onClick={() => setActiveMenu("cart")}
              >
                🛒
                {getTotalItems() > 0 && (
                  <span className="cart-badge">{getTotalItems()}</span>
                )}
              </button>
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
                      <button
                        className="btn-add-cart"
                        onClick={() =>
                          handleAddToCart({
                            id: `${selectedCategory}-${item}`,
                            name: `${selectedCategory} - Sản phẩm ${item}`,
                            price: 2499000,
                            oldPrice: 3499000,
                            image: "👟",
                            quantity: 1,
                            category: selectedCategory,
                          })
                        }
                      >
                        Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeMenu === "cart" && (
          <div className="cart-page">
            <div className="cart-container">
              <h1 className="cart-title">Giỏ Hàng Của Bạn</h1>
              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <div className="empty-cart-icon">🛒</div>
                  <h2>Giỏ hàng trống</h2>
                  <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
                  <button
                    className="btn-continue-shopping"
                    onClick={() => setActiveMenu("home")}
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              ) : (
                <div className="cart-content">
                  <div className="cart-items">
                    {cartItems.map((item) => (
                      <div key={item.id} className="cart-item">
                        <div className="cart-item-image">
                          <div className="cart-image-placeholder">
                            {item.image}
                          </div>
                        </div>
                        <div className="cart-item-details">
                          <h3>{item.name}</h3>
                          <p className="cart-item-category">{item.category}</p>
                          <div className="cart-item-price">
                            <span className="current-price">
                              {item.price.toLocaleString("vi-VN")}đ
                            </span>
                            <span className="old-price">
                              {item.oldPrice.toLocaleString("vi-VN")}đ
                            </span>
                          </div>
                        </div>
                        <div className="cart-item-actions">
                          <div className="quantity-control">
                            <button
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              −
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                          <div className="cart-item-total">
                            {(item.price * item.quantity).toLocaleString(
                              "vi-VN",
                            )}
                            đ
                          </div>
                          <button
                            className="btn-remove"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="cart-summary">
                    <h2>Tóm Tắt Đơn Hàng</h2>
                    <div className="summary-row">
                      <span>Tạm tính ({getTotalItems()} sản phẩm)</span>
                      <span>{getTotalPrice().toLocaleString("vi-VN")}đ</span>
                    </div>
                    <div className="summary-row">
                      <span>Phí vận chuyển</span>
                      <span className="free-shipping">Miễn phí</span>
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-row total">
                      <span>Tổng cộng</span>
                      <span className="total-price">
                        {getTotalPrice().toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                    <button className="btn-checkout">Thanh Toán</button>
                    <button
                      className="btn-continue"
                      onClick={() => setActiveMenu("home")}
                    >
                      Tiếp tục mua sắm
                    </button>
                    <div className="payment-methods">
                      <p>Phương thức thanh toán</p>
                      <div className="payment-icons">
                        <span>💳</span>
                        <span>🏦</span>
                        <span>📱</span>
                        <span>💰</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
