import { useState, useEffect } from "react";
import "../customercss/HomePage.css";

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, image: "/images/banner1.jpg" },
    { id: 2, image: "/images/banner2.jpg" },
    { id: 3, image: "/images/banner3.jpg" },
    { id: 4, image: "/images/banner4.jpg" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="home-page">
      {/* Hero Banner Slider */}
      <section
        className="hero-slider-simple"
        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
      >
        <div className="slider-dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentSlide === index ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-container">
          <h2 className="section-title">DANH MỤC SẢN PHẨM</h2>
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-image">
                <img
                  src="/images/category-shoes.jpg"
                  alt="Giày thể thao"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const placeholder = e.currentTarget
                      .nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = "flex";
                  }}
                />
                <div className="image-placeholder" style={{ display: "none" }}>
                  👟
                </div>
              </div>
              <h3>Giày thể thao</h3>
            </div>
            <div className="category-card">
              <div className="category-image">
                <img
                  src="/images/category-shirts.jpg"
                  alt="Áo thể thao"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const placeholder = e.currentTarget
                      .nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = "flex";
                  }}
                />
                <div className="image-placeholder" style={{ display: "none" }}>
                  👕
                </div>
              </div>
              <h3>Áo thể thao</h3>
            </div>
            <div className="category-card">
              <div className="category-image">
                <img
                  src="/images/category-pants.jpg"
                  alt="Quần thể thao"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const placeholder = e.currentTarget
                      .nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = "flex";
                  }}
                />
                <div className="image-placeholder" style={{ display: "none" }}>
                  👖
                </div>
              </div>
              <h3>Quần thể thao</h3>
            </div>
            <div className="category-card">
              <div className="category-image">
                <img
                  src="/images/category-accessories.jpg"
                  alt="Phụ kiện"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const placeholder = e.currentTarget
                      .nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = "flex";
                  }}
                />
                <div className="image-placeholder" style={{ display: "none" }}>
                  🎒
                </div>
              </div>
              <h3>Phụ kiện</h3>
            </div>
            <div className="category-card">
              <div className="category-image">
                <img
                  src="/images/category-hats.jpg"
                  alt="Mũ & Nón"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const placeholder = e.currentTarget
                      .nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = "flex";
                  }}
                />
                <div className="image-placeholder" style={{ display: "none" }}>
                  🧢
                </div>
              </div>
              <h3>Mũ & Nón</h3>
            </div>
            <div className="category-card">
              <div className="category-image">
                <img
                  src="/images/category-gloves.jpg"
                  alt="Găng tay"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const placeholder = e.currentTarget
                      .nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = "flex";
                  }}
                />
                <div className="image-placeholder" style={{ display: "none" }}>
                  🧤
                </div>
              </div>
              <h3>Găng tay</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Categories Section */}
      <section className="sports-section">
        <div className="section-container-full">
          <h2 className="section-title">MÔN THỂ THAO YÊU THÍCH</h2>
          <div className="sports-wrapper">
            <button
              className="scroll-btn scroll-left"
              onClick={() => {
                const container = document.querySelector(
                  ".sports-scroll-container",
                );
                if (container) {
                  container.scrollBy({ left: -400, behavior: "smooth" });
                }
              }}
            >
              ‹
            </button>
            <div className="sports-scroll-container">
              <div className="sports-grid">
                <div className="sport-card">
                  <img
                    src="/images/sport-running.jpg"
                    alt="Chạy bộ"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const placeholder = e.currentTarget
                        .nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = "flex";
                    }}
                  />
                  <div
                    className="sport-placeholder"
                    style={{ display: "none" }}
                  >
                    🏃
                  </div>
                  <div className="sport-overlay">
                    <h3>CHẠY BỘ</h3>
                  </div>
                </div>
                <div className="sport-card">
                  <img
                    src="/images/sport-fashion.jpg"
                    alt="Thời trang thể thao"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const placeholder = e.currentTarget
                        .nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = "flex";
                    }}
                  />
                  <div
                    className="sport-placeholder"
                    style={{ display: "none" }}
                  >
                    👕
                  </div>
                  <div className="sport-overlay">
                    <h3>THỜI TRANG THỂ THAO</h3>
                  </div>
                </div>
                <div className="sport-card">
                  <img
                    src="/images/sport-training.jpg"
                    alt="Luyện tập"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const placeholder = e.currentTarget
                        .nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = "flex";
                    }}
                  />
                  <div
                    className="sport-placeholder"
                    style={{ display: "none" }}
                  >
                    💪
                  </div>
                  <div className="sport-overlay">
                    <h3>LUYỆN TẬP</h3>
                  </div>
                </div>
                <div className="sport-card">
                  <img
                    src="/images/sport-outdoor.jpg"
                    alt="Thể thao ngoài trời"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const placeholder = e.currentTarget
                        .nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = "flex";
                    }}
                  />
                  <div
                    className="sport-placeholder"
                    style={{ display: "none" }}
                  >
                    🏕️
                  </div>
                  <div className="sport-overlay">
                    <h3>THỂ THAO NGOÀI TRỜI</h3>
                  </div>
                </div>
                <div className="sport-card">
                  <img
                    src="/images/sport-soccer.jpg"
                    alt="Bóng đá"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const placeholder = e.currentTarget
                        .nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = "flex";
                    }}
                  />
                  <div
                    className="sport-placeholder"
                    style={{ display: "none" }}
                  >
                    ⚽
                  </div>
                  <div className="sport-overlay">
                    <h3>BÓNG ĐÁ</h3>
                  </div>
                </div>
                <div className="sport-card">
                  <img
                    src="/images/sport-swimming.jpg"
                    alt="Bơi lội"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const placeholder = e.currentTarget
                        .nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = "flex";
                    }}
                  />
                  <div
                    className="sport-placeholder"
                    style={{ display: "none" }}
                  >
                    🏊
                  </div>
                  <div className="sport-overlay">
                    <h3>BƠI LỘI</h3>
                  </div>
                </div>
                <div className="sport-card">
                  <img
                    src="/images/sport-basketball.jpg"
                    alt="Bóng rổ"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const placeholder = e.currentTarget
                        .nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = "flex";
                    }}
                  />
                  <div
                    className="sport-placeholder"
                    style={{ display: "none" }}
                  >
                    🏀
                  </div>
                  <div className="sport-overlay">
                    <h3>BÓNG RỔ</h3>
                  </div>
                </div>
                <div className="sport-card">
                  <img
                    src="/images/sport-tennis.jpg"
                    alt="Tennis"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const placeholder = e.currentTarget
                        .nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = "flex";
                    }}
                  />
                  <div
                    className="sport-placeholder"
                    style={{ display: "none" }}
                  >
                    🎾
                  </div>
                  <div className="sport-overlay">
                    <h3>TENNIS</h3>
                  </div>
                </div>
                <div className="sport-card">
                  <img
                    src="/images/sport-golf.jpg"
                    alt="Golf"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const placeholder = e.currentTarget
                        .nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = "flex";
                    }}
                  />
                  <div
                    className="sport-placeholder"
                    style={{ display: "none" }}
                  >
                    ⛳
                  </div>
                  <div className="sport-overlay">
                    <h3>GOLF</h3>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="scroll-btn scroll-right"
              onClick={() => {
                const container = document.querySelector(
                  ".sports-scroll-container",
                );
                if (container) {
                  container.scrollBy({ left: 400, behavior: "smooth" });
                }
              }}
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="brands-section">
        <div className="section-container">
          <h2 className="section-title">THƯƠNG HIỆU NỔI BẬT</h2>
          <div className="brands-grid">
            <div className="brand-card">
              <img
                src="/images/brand-nike.png"
                alt="NIKE"
                className="brand-image"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const placeholder = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  if (placeholder) placeholder.style.display = "block";
                }}
              />
              <div className="brand-logo" style={{ display: "none" }}>
                NIKE
              </div>
            </div>
            <div className="brand-card">
              <img
                src="/images/brand-adidas.png"
                alt="adidas"
                className="brand-image"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const placeholder = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  if (placeholder) placeholder.style.display = "block";
                }}
              />
              <div className="brand-logo" style={{ display: "none" }}>
                adidas
              </div>
            </div>
            <div className="brand-card">
              <img
                src="/images/brand-puma.png"
                alt="PUMA"
                className="brand-image"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const placeholder = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  if (placeholder) placeholder.style.display = "block";
                }}
              />
              <div className="brand-logo" style={{ display: "none" }}>
                PUMA
              </div>
            </div>
            <div className="brand-card">
              <img
                src="/images/brand-ua.png"
                alt="Under Armour"
                className="brand-image"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const placeholder = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  if (placeholder) placeholder.style.display = "block";
                }}
              />
              <div className="brand-logo" style={{ display: "none" }}>
                UA
              </div>
            </div>
            <div className="brand-card">
              <img
                src="/images/brand-nb.png"
                alt="New Balance"
                className="brand-image"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const placeholder = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  if (placeholder) placeholder.style.display = "block";
                }}
              />
              <div className="brand-logo" style={{ display: "none" }}>
                NB
              </div>
            </div>
            <div className="brand-card">
              <img
                src="/images/brand-asics.png"
                alt="ASICS"
                className="brand-image"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const placeholder = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  if (placeholder) placeholder.style.display = "block";
                }}
              />
              <div className="brand-logo" style={{ display: "none" }}>
                ASICS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="section-container">
          <h2 className="section-title">SẢN PHẨM BÁN CHẠY</h2>
          <div className="products-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="product-card">
                <div className="product-badge">-30%</div>
                <div className="product-image">
                  <div className="image-placeholder">👟</div>
                </div>
                <div className="product-info">
                  <h4>Giày Nike Air Max {item}</h4>
                  <div className="product-rating">
                    <span className="stars">⭐⭐⭐⭐⭐</span>
                    <span className="reviews">(128)</span>
                  </div>
                  <div className="product-price">
                    <span className="price-current">2,499,000đ</span>
                    <span className="price-old">3,499,000đ</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-promo">
            <div className="promo-item">
              <span className="promo-icon">🎁</span>
              <span>SUPERSPORTS LUÔN LẮNG NGHE BẠN</span>
              <button className="promo-btn">Đánh giá ngay</button>
            </div>
            <div className="promo-item">
              <span className="promo-icon">🎟️</span>
              <span>ĐĂNG KÝ NHẬN NGAY VOUCHER 150K</span>
              <button className="promo-btn">Đăng ký ngay</button>
            </div>
          </div>
        </div>

        <div className="footer-main">
          <div className="footer-container">
            <div className="footer-column">
              <h4>CÔNG TY TNHH MTV THƯƠNG MẠI THỜI TRANG</h4>
              <p>Văn phòng: Số 163, Phan Đăng Lưu</p>
              <p>Phường Cầu Kiều, TP. Hồ Chí Minh</p>
              <p>Tổng đài: 1900 63 64 01</p>
            </div>

            <div className="footer-column">
              <h4>VỀ SUPERSPORTS</h4>
              <ul>
                <li>
                  <a href="#">Giới thiệu</a>
                </li>
                <li>
                  <a href="#">Hệ thống cửa hàng</a>
                </li>
                <li>
                  <a href="#">Thông tin liên hệ</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>HỖ TRỢ KHÁCH HÀNG</h4>
              <ul>
                <li>
                  <a href="#">Chính sách giao hàng</a>
                </li>
                <li>
                  <a href="#">Chính sách đổi trả</a>
                </li>
                <li>
                  <a href="#">Hướng dẫn mua hàng</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Group Business</h4>
              <ul>
                <li>
                  <a href="#">GOJI Việt Nam</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>PHƯƠNG THỨC THANH TOÁN</h4>
              <div className="payment-methods">
                <div className="payment-icon">MOMO</div>
                <div className="payment-icon">ZaloPay</div>
                <div className="payment-icon">VNPay</div>
                <div className="payment-icon">VISA</div>
                <div className="payment-icon">ATM</div>
                <div className="payment-icon">COD</div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 SUPERSPORTS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
