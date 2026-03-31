import { useState, useEffect } from "react";
import "../customercss/HomePage.css";

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/images/banner1.jpg",
    },
    {
      id: 2,
      image: "/images/banner2.jpg",
    },
    {
      id: 3,
      image: "/images/banner3.jpg",
    },
    {
      id: 4,
      image: "/images/banner4.jpg",
    },
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
      {/* Hero Banner Slider - Chỉ hiển thị ảnh */}
      <section
        className="hero-slider-simple"
        style={{
          backgroundImage: `url(${slides[currentSlide].image})`,
        }}
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
                    e.currentTarget.nextElementSibling.style.display = "flex";
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
                    e.currentTarget.nextElementSibling.style.display = "flex";
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
                    e.currentTarget.nextElementSibling.style.display = "flex";
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
                    e.currentTarget.nextElementSibling.style.display = "flex";
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
                    e.currentTarget.nextElementSibling.style.display = "flex";
                  }}
                />
                <div className="image-placeholder" style={{ display: "none" }}>
                  �
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
                    e.currentTarget.nextElementSibling.style.display = "flex";
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

      {/* Brands Section */}
      <section className="brands-section">
        <div className="section-container">
          <h2 className="section-title">THƯƠNG HIỆU NỔI BẬT</h2>
          <div className="brands-grid">
            <div className="brand-card">
              <div className="brand-logo">NIKE</div>
            </div>
            <div className="brand-card">
              <div className="brand-logo">adidas</div>
            </div>
            <div className="brand-card">
              <div className="brand-logo">PUMA</div>
            </div>
            <div className="brand-card">
              <div className="brand-logo">UA</div>
            </div>
            <div className="brand-card">
              <div className="brand-logo">NB</div>
            </div>
            <div className="brand-card">
              <div className="brand-logo">ASICS</div>
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
                  <div className="image-placeholder">�</div>
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
    </div>
  );
}

export default HomePage;
