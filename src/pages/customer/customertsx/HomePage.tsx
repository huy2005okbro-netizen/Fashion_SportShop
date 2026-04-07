import { useState, useEffect } from "react";
import "../customercss/HomePage.css";

interface CartItem {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  quantity: number;
  category: string;
}

interface HomePageProps {
  onAddToCart: (item: CartItem) => void;
  onProductClick: (product: CartItem) => void;
}

const arrivalImageUrls: Record<number, string> = {
  1: "https://images.unsplash.com/photo-1506629905607-d9c297d3d1f2?auto=format&fit=crop&w=900&q=80",
  2: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  3: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=900&q=80",
  4: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80",
  5: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
  6: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  7: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  8: "https://images.unsplash.com/photo-1506629905607-d9c297d3d1f2?auto=format&fit=crop&w=900&q=80",
};

const bestsellerImageUrls: Record<number, string> = {
  1: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  2: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80",
  3: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80",
  4: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=900&q=80",
  5: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=900&q=80",
  6: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=80",
  7: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80",
  8: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
};

function HomePage({ onAddToCart, onProductClick }: HomePageProps) {
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
        <div className="section-container-full">
          <h2 className="section-title">DANH MỤC SẢN PHẨM</h2>
          <div className="categories-wrapper">
            <button
              className="scroll-btn scroll-left"
              onClick={() => {
                const container = document.querySelector(
                  ".categories-scroll-container",
                );
                if (container) {
                  container.scrollBy({ left: -400, behavior: "smooth" });
                }
              }}
            >
              ‹
            </button>
            <div className="categories-scroll-container">
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
                    <div
                      className="image-placeholder"
                      style={{ display: "none" }}
                    >
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
                    <div
                      className="image-placeholder"
                      style={{ display: "none" }}
                    >
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
                    <div
                      className="image-placeholder"
                      style={{ display: "none" }}
                    >
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
                    <div
                      className="image-placeholder"
                      style={{ display: "none" }}
                    >
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
                    <div
                      className="image-placeholder"
                      style={{ display: "none" }}
                    >
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
                    <div
                      className="image-placeholder"
                      style={{ display: "none" }}
                    >
                      🧤
                    </div>
                  </div>
                  <h3>Găng tay</h3>
                </div>
                <div className="category-card">
                  <div className="category-image">
                    <img
                      src="/images/category-socks.jpg"
                      alt="Tất / Vớ"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const placeholder = e.currentTarget
                          .nextElementSibling as HTMLElement;
                        if (placeholder) placeholder.style.display = "flex";
                      }}
                    />
                    <div
                      className="image-placeholder"
                      style={{ display: "none" }}
                    >
                      🧦
                    </div>
                  </div>
                  <h3>Tất / Vớ</h3>
                </div>
                <div className="category-card">
                  <div className="category-image">
                    <img
                      src="/images/category-bags.jpg"
                      alt="Balo / Túi"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const placeholder = e.currentTarget
                          .nextElementSibling as HTMLElement;
                        if (placeholder) placeholder.style.display = "flex";
                      }}
                    />
                    <div
                      className="image-placeholder"
                      style={{ display: "none" }}
                    >
                      🎒
                    </div>
                  </div>
                  <h3>Balo / Túi</h3>
                </div>
              </div>
            </div>
            <button
              className="scroll-btn scroll-right"
              onClick={() => {
                const container = document.querySelector(
                  ".categories-scroll-container",
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

      {/* News Section */}
      <section className="news-section">
        <div className="section-container">
          <h2 className="section-title">TIN TỨC THỜI TRANG & THỂ THAO</h2>
          <div className="news-tabs">
            <button className="news-tab active">Tin nổi bật</button>
            <button className="news-tab">Tin thương hiệu</button>
            <button className="news-tab">Mạng lưới cửa hàng</button>
          </div>
          <div className="news-grid">
            <div className="news-card">
              <div className="news-image">
                <img
                  src="/images/news-1.jpg"
                  alt="News 1"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const placeholder = e.currentTarget
                      .nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = "flex";
                  }}
                />
                <div className="news-placeholder" style={{ display: "none" }}>
                  📰
                </div>
              </div>
              <div className="news-content">
                <h3>
                  Supersports x JOOLA: Gặp Gỡ Và Ký Tặng Cùng Bọn Johns Tại
                  Lotte Malt Tây Hồ
                </h3>
                <p className="news-excerpt">
                  Sự kiện đặc biệt với sự tham gia của các vận động viên hàng
                  đầu...
                </p>
                <a href="#" className="news-link">
                  Xem thêm →
                </a>
              </div>
            </div>
            <div className="news-card">
              <div className="news-image">
                <img
                  src="/images/news-2.jpg"
                  alt="News 2"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const placeholder = e.currentTarget
                      .nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = "flex";
                  }}
                />
                <div className="news-placeholder" style={{ display: "none" }}>
                  📰
                </div>
              </div>
              <div className="news-content">
                <h3>
                  Nike Air Max Day 2024 Tại Supersports Crescent Mall - Sự Kiện
                  Toàn Cầu Thể Bỏ Lỡ
                </h3>
                <p className="news-excerpt">
                  Tham gia sự kiện Nike Air Max Day với nhiều ưu đãi hấp dẫn...
                </p>
                <a href="#" className="news-link">
                  Xem thêm →
                </a>
              </div>
            </div>
            <div className="news-card">
              <div className="news-image">
                <img
                  src="/images/news-3.jpg"
                  alt="News 3"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const placeholder = e.currentTarget
                      .nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = "flex";
                  }}
                />
                <div className="news-placeholder" style={{ display: "none" }}>
                  📰
                </div>
              </div>
              <div className="news-content">
                <h3>
                  Nhận Ngay 1 Vợt Joola Pro V Khi Đăng Ký Mua Thường Hiệu Joola
                  Tại Supersports!
                </h3>
                <p className="news-excerpt">
                  Chương trình khuyến mãi đặc biệt dành cho người yêu thể
                  thao...
                </p>
                <a href="#" className="news-link">
                  Xem thêm →
                </a>
              </div>
            </div>
            <div className="news-card">
              <div className="news-image">
                <img
                  src="/images/news-4.jpg"
                  alt="News 4"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const placeholder = e.currentTarget
                      .nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = "flex";
                  }}
                />
                <div className="news-placeholder" style={{ display: "none" }}>
                  📰
                </div>
              </div>
              <div className="news-content">
                <h3>
                  HYROX Là Gì? Hướng Dẫn Tham Gia Tập HYROX Cho Người Mới Bắt
                  Đầu
                </h3>
                <p className="news-excerpt">
                  Khám phá xu hướng thể thao mới đang gây sốt toàn cầu...
                </p>
                <a href="#" className="news-link">
                  Xem thêm →
                </a>
              </div>
            </div>
          </div>
          <div className="news-view-all">
            <button className="btn-view-all">Xem tất cả</button>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="new-arrivals-section">
        <div className="section-container-full">
          <div className="section-header-with-link">
            <h2 className="section-title">HÀNG MỚI VỀ</h2>
            <a href="#" className="view-all-link">
              XEM TẤT CẢ
            </a>
          </div>
          <div className="arrivals-wrapper">
            <button
              className="scroll-btn scroll-left"
              onClick={() => {
                const container = document.querySelector(
                  ".arrivals-scroll-container",
                );
                if (container) {
                  container.scrollBy({ left: -400, behavior: "smooth" });
                }
              }}
            >
              ‹
            </button>
            <div className="arrivals-scroll-container">
              <div className="arrivals-grid">
                {[
                  {
                    id: 1,
                    name: "Quần Dài Thể Thao Nam Columbia Scotch Spring™ - Xám",
                    brand: "COLUMBIA",
                    price: 1999000,
                    image: "👖",
                    badge: "-20%",
                    colors: 3,
                  },
                  {
                    id: 2,
                    name: "Giày Chạy Trail Nữ Columbia Konos™ Trx Outdry™ - Xanh Dương",
                    brand: "COLUMBIA",
                    price: 3399000,
                    image: "👟",
                    badge: "-15%",
                    colors: 4,
                  },
                  {
                    id: 3,
                    name: "Giày Chạy Trail Nam Columbia Konos™ Trx Outdry™ - Xám",
                    brand: "COLUMBIA",
                    price: 3399000,
                    image: "👟",
                    badge: "-15%",
                    colors: 2,
                  },
                  {
                    id: 4,
                    name: "Áo Khoác Nam Columbia Trailborne™ 2.5L Shell - Cam",
                    brand: "COLUMBIA",
                    price: 3899000,
                    image: "🧥",
                    badge: "-25%",
                    colors: 3,
                  },
                  {
                    id: 5,
                    name: "Áo Khoác Nữ Columbia Trailborne™ 2.5L Shell - Xanh Dương",
                    brand: "COLUMBIA",
                    price: 3899000,
                    image: "🧥",
                    badge: "-25%",
                    colors: 2,
                  },
                  {
                    id: 6,
                    name: "Giày Nike Air Max 2024 - Đen",
                    brand: "NIKE",
                    price: 2999000,
                    image: "👟",
                    badge: "NEW",
                    colors: 5,
                  },
                  {
                    id: 7,
                    name: "Áo Thun Thể Thao Nam Adidas - Trắng",
                    brand: "ADIDAS",
                    price: 899000,
                    image: "👕",
                    badge: "-30%",
                    colors: 4,
                  },
                  {
                    id: 8,
                    name: "Quần Short Chạy Bộ Nữ Puma - Đen",
                    brand: "PUMA",
                    price: 799000,
                    image: "🩳",
                    badge: "-20%",
                    colors: 3,
                  },
                ].map((product) => (
                  <div
                    key={product.id}
                    className="arrival-card"
                    onClick={() =>
                      onProductClick({
                        id: `arrival-${product.id}`,
                        name: product.name,
                        price: product.price,
                        oldPrice: Math.round(product.price * 1.3),
                        image: arrivalImageUrls[product.id] ?? product.image,
                        quantity: 1,
                        category: "Hàng mới về",
                      })
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <div className="arrival-badge">{product.badge}</div>
                    <div className="arrival-image">
                      <img
                        src={arrivalImageUrls[product.id]}
                        alt={product.name}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const placeholder = e.currentTarget
                            .nextElementSibling as HTMLElement;
                          if (placeholder) placeholder.style.display = "flex";
                        }}
                      />
                      <div
                        className="arrival-placeholder"
                        style={{ display: "none" }}
                      >
                        {product.image}
                      </div>
                    </div>
                    <div className="arrival-info">
                      <p className="arrival-brand">{product.brand}</p>
                      <h4>{product.name}</h4>
                      <div className="arrival-colors">
                        {Array.from({ length: product.colors }).map((_, i) => (
                          <span key={i} className="color-dot"></span>
                        ))}
                        <span className="color-count">+{product.colors}</span>
                      </div>
                      <div className="arrival-price">
                        {product.price.toLocaleString("vi-VN")}đ
                      </div>
                      <button
                        className="btn-add-to-cart"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart({
                            id: `arrival-${product.id}`,
                            name: product.name,
                            price: product.price,
                            oldPrice: Math.round(product.price * 1.3),
                            image:
                              arrivalImageUrls[product.id] ?? product.image,
                            quantity: 1,
                            category: "Hàng mới về",
                          });
                        }}
                      >
                        🛒 Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="scroll-btn scroll-right"
              onClick={() => {
                const container = document.querySelector(
                  ".arrivals-scroll-container",
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
            {[
              {
                id: 1,
                name: "Giày Nike Air Max 2024",
                price: 2499000,
                oldPrice: 3499000,
                image: "👟",
              },
              {
                id: 2,
                name: "Giày Adidas Ultraboost",
                price: 2799000,
                oldPrice: 3999000,
                image: "👟",
              },
              {
                id: 3,
                name: "Giày Puma RS-X",
                price: 1899000,
                oldPrice: 2699000,
                image: "👟",
              },
              {
                id: 4,
                name: "Giày New Balance 574",
                price: 2199000,
                oldPrice: 3199000,
                image: "👟",
              },
              {
                id: 5,
                name: "Giày HOKA Clifton 9",
                price: 3299000,
                oldPrice: 4299000,
                image: "👟",
              },
              {
                id: 6,
                name: "Giày On Running Cloud",
                price: 3499000,
                oldPrice: 4499000,
                image: "👟",
              },
              {
                id: 7,
                name: "Giày Asics Gel-Kayano",
                price: 2999000,
                oldPrice: 3999000,
                image: "👟",
              },
              {
                id: 8,
                name: "Giày Brooks Ghost 15",
                price: 2899000,
                oldPrice: 3899000,
                image: "👟",
              },
            ].map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() =>
                  onProductClick({
                    id: `product-${product.id}`,
                    name: product.name,
                    price: product.price,
                    oldPrice: product.oldPrice,
                    image: bestsellerImageUrls[product.id] ?? product.image,
                    quantity: 1,
                    category: "Sản phẩm bán chạy",
                  })
                }
                style={{ cursor: "pointer" }}
              >
                <div className="product-badge">-30%</div>
                <div className="product-image">
                  <img
                    src={bestsellerImageUrls[product.id]}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const placeholder = e.currentTarget
                        .nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = "flex";
                    }}
                  />
                  <div
                    className="image-placeholder"
                    style={{ display: "none" }}
                  >
                    {product.image}
                  </div>
                </div>
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <div className="product-rating">
                    <span className="stars">⭐⭐⭐⭐⭐</span>
                    <span className="reviews">(128)</span>
                  </div>
                  <div className="product-price">
                    <span className="price-current">
                      {product.price.toLocaleString("vi-VN")}đ
                    </span>
                    <span className="price-old">
                      {product.oldPrice.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                  <button
                    className="btn-add-to-cart"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart({
                        id: `product-${product.id}`,
                        name: product.name,
                        price: product.price,
                        oldPrice: product.oldPrice,
                        image: bestsellerImageUrls[product.id] ?? product.image,
                        quantity: 1,
                        category: "Sản phẩm bán chạy",
                      });
                    }}
                  >
                    🛒 Thêm vào giỏ
                  </button>
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
