import { useEffect, useMemo, useState } from "react";
import {
  customerProducts,
  reviewsByProductId,
  type Product,
} from "./customerData";
import "./CustomerProducts.css";

type CustomerProductsProps = {
  onBackToLogin: () => void;
};

function CustomerProducts({ onBackToLogin }: CustomerProductsProps) {
  const heroGallery = [
    {
      image:
        "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80",
      title: "Vợt cầu lông chính hãng",
      subtitle: "Bộ sưu tập hot từ Yonex, Victor, Lining, Mizuno",
    },
    {
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80",
      title: "Trang phục thể thao mới",
      subtitle: "Thoải mái vận động với chất liệu cao cấp",
    },
    {
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
      title: "Giày luyện tập nổi bật",
      subtitle: "Thiết kế thời thượng, bám sân, êm nhẹ",
    },
  ];

  const navItems = [
    "TRANG CHỦ",
    "SẢN PHẨM",
    "CỬA HÀNG",
    "ĐÀO TẠO",
    "GIẢM GIÁ",
    "TIN TỨC",
    "TUYỂN DỤNG",
    "LIÊN HỆ",
  ];

  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả danh mục");
  const [heroIndex, setHeroIndex] = useState(0);

  const visibleProducts = useMemo(
    () => customerProducts.filter((product) => product.id !== 4),
    [],
  );

  const categories = useMemo(
    () => [
      "Tất cả danh mục",
      ...new Set(visibleProducts.map((product) => product.category)),
    ],
    [visibleProducts],
  );

  const spotlightProducts = visibleProducts.slice(0, 5);
  const brandLogos = [
    "Li-Ning",
    "Yonex",
    "Victor",
    "Mizuno",
    "Adidas",
    "Flypower",
  ];

  const filteredProducts = visibleProducts.filter((product) => {
    const matchesKeyword =
      product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      product.category.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tất cả danh mục" ||
      product.category === selectedCategory;

    return matchesKeyword && matchesCategory;
  });

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setHeroIndex((currentIndex) => (currentIndex + 1) % heroGallery.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [heroGallery.length]);

  useEffect(() => {
    if (!activeProduct) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProduct(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [activeProduct]);

  const openProductDetail = (product: Product) => {
    setActiveProduct(product);
    setSelectedImage(0);
    setSelectedSize("");
    setQuantity(1);
  };

  const closeProductDetail = () => {
    setActiveProduct(null);
  };

  const reviews = activeProduct
    ? (reviewsByProductId[activeProduct.id] ?? [])
    : [];

  const relatedProducts = activeProduct
    ? visibleProducts.filter((item) => item.id !== activeProduct.id).slice(0, 3)
    : [];

  const currentHero = heroGallery[heroIndex];

  const renderRating = (rating: number) => (
    <div className="customer-detail-rating-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={star <= Math.round(rating) ? "currentColor" : "none"}
          stroke="currentColor"
          className={star <= Math.round(rating) ? "filled" : ""}
        >
          <polygon points="12 2 15.09 10.26 24 10.35 17.77 16.01 20.16 24.02 12 18.35 3.84 24.02 6.23 16.01 0 10.35 8.91 10.26 12 2" />
        </svg>
      ))}
    </div>
  );

  const handleAddToCart = () => {
    if (!activeProduct) {
      return;
    }

    if (!selectedSize) {
      alert("Vui lòng chọn kích thước trước khi thêm vào giỏ hàng!");
      return;
    }

    alert(
      `Đã thêm ${quantity} sản phẩm vào giỏ hàng! (Kích thước: ${selectedSize})`,
    );
  };

  const formatPrice = (price: number) => `${price.toLocaleString("vi-VN")}₫`;

  return (
    <div className="customer-products-page">
      <header className="customer-topbar">
        <div className="customer-topbar-inner">
          <button type="button" className="customer-logo">
            FB
          </button>

          <div className="customer-topbar-search">
            <input
              type="text"
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
            />
            <button type="button">Tìm kiếm</button>
          </div>

          <div className="customer-topbar-actions">
            <button type="button" className="icon-btn">
              ♡
            </button>
            <button type="button" className="icon-btn">
              👤
            </button>
            <button type="button" className="icon-btn cart-btn">
              🛒
              <span>0</span>
            </button>
          </div>
        </div>

        <div className="customer-navbar">
          {navItems.map((item, index) => (
            <button
              key={item}
              type="button"
              className={`customer-nav-item ${index === 0 ? "active" : ""}`}
            >
              {item}
            </button>
          ))}
        </div>
      </header>

      <section className="customer-hero-section">
        <button
          type="button"
          className="hero-arrow left"
          onClick={() =>
            setHeroIndex(
              (heroIndex - 1 + heroGallery.length) % heroGallery.length,
            )
          }
        >
          ‹
        </button>

        <div
          className="customer-hero-main"
          style={{ backgroundImage: `url(${currentHero.image})` }}
        >
          <div className="customer-hero-overlay">
            <div className="customer-hero-content">
              <h1>{currentHero.title}</h1>
              <p>{currentHero.subtitle}</p>

              <div className="customer-brand-badges">
                {brandLogos.map((brand) => (
                  <span key={brand}>{brand}</span>
                ))}
              </div>
            </div>

            <div className="customer-hero-side-grid">
              {spotlightProducts.slice(0, 4).map((product) => (
                <button
                  key={product.id}
                  type="button"
                  className="customer-hero-side-card"
                  onClick={() => openProductDetail(product)}
                >
                  <img src={product.image} alt={product.name} />
                  <div>
                    <strong>{product.brand}</strong>
                    <span>{product.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="hero-arrow right"
          onClick={() => setHeroIndex((heroIndex + 1) % heroGallery.length)}
        >
          ›
        </button>
      </section>

      <section className="customer-search-panel">
        <div className="customer-search-title">
          <h2>Bạn đang tìm gì?</h2>
          <p>Chọn danh mục và từ khóa để lọc nhanh sản phẩm</p>
        </div>

        <div className="customer-search-controls">
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={searchKeyword}
            onChange={(event) => setSearchKeyword(event.target.value)}
            placeholder="Nhập từ khóa"
          />

          <button type="button">Tìm kiếm</button>
        </div>
      </section>

      <section className="customer-products-section">
        <div className="customer-products-header">
          <div>
            <p className="section-label">Sản phẩm nổi bật</p>
            <h3>Danh sách sản phẩm dành cho khách hàng</h3>
          </div>

          <button
            type="button"
            className="back-login-btn"
            onClick={onBackToLogin}
          >
            Quay lại đăng nhập
          </button>
        </div>

        <div className="customer-products-grid">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="customer-product-card"
              onClick={() => openProductDetail(product)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openProductDetail(product);
                }
              }}
            >
              <div className="customer-product-image">
                <img src={product.image} alt={product.name} />
                <span className="customer-product-category">
                  {product.category}
                </span>
              </div>

              <div className="customer-product-content">
                <h2>{product.name}</h2>
                <p className="customer-product-brand">
                  {product.brand} • {product.sport}
                </p>

                <div className="customer-product-price">
                  <span className="current">{formatPrice(product.price)}</span>
                  <span className="original">
                    {formatPrice(product.originalPrice)}
                  </span>
                </div>

                <div className="customer-product-meta">
                  <span>⭐ {product.rating}</span>
                  <span>{product.reviewCount} đánh giá</span>
                  <span>Còn {product.stock}</span>
                </div>

                <button
                  type="button"
                  className="customer-product-detail-btn"
                  onClick={(event) => {
                    event.stopPropagation();
                    openProductDetail(product);
                  }}
                >
                  Xem chi tiết
                </button>
              </div>
            </article>
          ))}

          {filteredProducts.length === 0 && (
            <div className="customer-empty-state">
              Không tìm thấy sản phẩm phù hợp với bộ lọc hiện tại.
            </div>
          )}
        </div>
      </section>

      {activeProduct && (
        <div className="customer-product-overlay" onClick={closeProductDetail}>
          <div
            className="customer-product-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="customer-product-modal-close"
              onClick={closeProductDetail}
            >
              ×
            </button>

            <div className="customer-product-modal-grid">
              <div className="customer-product-modal-gallery">
                <div className="customer-product-modal-main-image">
                  <img
                    src={
                      activeProduct.images[selectedImage] || activeProduct.image
                    }
                    alt={activeProduct.name}
                  />
                </div>

                <div className="customer-product-modal-thumbnails">
                  {[activeProduct.image, ...activeProduct.images]
                    .slice(0, 4)
                    .map((img, idx) => (
                      <button
                        key={`${activeProduct.id}-${idx}`}
                        type="button"
                        className={`customer-product-modal-thumb ${selectedImage === idx ? "active" : ""}`}
                        onClick={() => setSelectedImage(idx)}
                      >
                        <img src={img} alt={`Ảnh ${idx + 1}`} />
                      </button>
                    ))}
                </div>
              </div>

              <div className="customer-product-modal-info">
                <p className="customer-product-modal-category">
                  {activeProduct.category}
                </p>
                <h2>{activeProduct.name}</h2>

                <div className="customer-product-modal-rating">
                  {renderRating(activeProduct.rating)}
                  <span>{activeProduct.rating}</span>
                  <span>({activeProduct.reviewCount} đánh giá)</span>
                </div>

                <div className="customer-product-modal-price">
                  <span className="current">
                    {formatPrice(activeProduct.price)}
                  </span>
                  <span className="original">
                    {formatPrice(activeProduct.originalPrice)}
                  </span>
                </div>

                <p className="customer-product-modal-description">
                  {activeProduct.description}
                </p>

                <div className="customer-product-modal-meta">
                  <span>
                    <strong>Thương hiệu:</strong> {activeProduct.brand}
                  </span>
                  <span>
                    <strong>Môn:</strong> {activeProduct.sport}
                  </span>
                  <span>
                    <strong>Màu:</strong> {activeProduct.color}
                  </span>
                  <span>
                    <strong>Chất liệu:</strong> {activeProduct.material}
                  </span>
                  <span>
                    <strong>Kho:</strong> Còn {activeProduct.stock} sản phẩm
                  </span>
                </div>

                <div className="customer-product-modal-sizes">
                  <p>Chọn kích thước</p>
                  <div>
                    {activeProduct.size.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`customer-product-size-btn ${selectedSize === size ? "selected" : ""}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="customer-product-modal-actions">
                  <div className="customer-product-quantity">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      −
                    </button>
                    <input type="number" value={quantity} readOnly />
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="customer-product-add-cart"
                    onClick={handleAddToCart}
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>

            <div className="customer-product-modal-extra">
              <div className="customer-product-modal-block">
                <h3>Thông số sản phẩm</h3>
                <ul>
                  <li>SKU: {activeProduct.sku}</li>
                  <li>Giới tính: {activeProduct.gender}</li>
                  <li>Kích thước: {activeProduct.size.join(", ")}</li>
                </ul>
              </div>

              <div className="customer-product-modal-block">
                <h3>Đánh giá</h3>
                {reviews.map((review) => (
                  <div key={review.id} className="customer-product-review-item">
                    <div className="customer-product-review-top">
                      <strong>{review.author}</strong>
                      <span>{review.date}</span>
                    </div>
                    {renderRating(review.rating)}
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>

              <div className="customer-product-modal-block">
                <h3>Sản phẩm liên quan</h3>
                <div className="customer-product-related-list">
                  {relatedProducts.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      className="customer-product-related-item"
                      onClick={() => openProductDetail(product)}
                    >
                      <img src={product.image} alt={product.name} />
                      <div>
                        <strong>{product.name}</strong>
                        <span>{formatPrice(product.price)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerProducts;
