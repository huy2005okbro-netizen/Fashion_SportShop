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

function CustomerProducts({ onBackToLogin: _onBackToLogin }: CustomerProductsProps) {
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
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeNavItem, setActiveNavItem] = useState("");
  const [activeProductMenu, setActiveProductMenu] = useState("VỢT CẦU LÔNG");
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [selectedCategoryProduct, setSelectedCategoryProduct] = useState<Product | null>(null);

  const visibleProducts = useMemo(
    () => customerProducts.filter((product) => product.id !== 4),
    [],
  );

  const productMenuItems = [
    "VỢT CẦU LÔNG",
    "GIÀY CẦU LÔNG",
    "BALO CẦU LÔNG",
    "BAO VỢT CẦU LÔNG",
    "PHỤ KIỆN CẦU LÔNG",
    "TENNIS, BÓNG ĐÁ, BƠI",
    "VỢT PICKLEBALL",
  ];

  const productBrandColumns = [
    {
      title: "VỢT CẦU LÔNG YONEX",
      items: ["Dòng vợt Nanoflare", "Dòng vợt Astrox", "Dòng vợt Duora", "Dòng vợt Nanoray", "Dòng vợt Voltric", "Dòng vợt ArcSaber"],
    },
    {
      title: "VỢT CẦU LÔNG LINING",
      items: ["Dòng vợt Aeronaut", "Dòng vợt Tectonic", "Dòng vợt Windstorm", "Dòng vợt Calibar", "Dòng vợt Halbertec", "Dòng vợt Axforce"],
    },
    {
      title: "VỢT CẦU LÔNG VICTOR",
      items: ["Dòng vợt DriveX", "Dòng vợt Hypernano", "Dòng vợt Brave Sword", "Dòng vợt Meteor X", "Dòng vợt Thruster K", "Dòng vợt Jetspeed"],
    },
    {
      title: "VỢT CẦU LÔNG MIZUNO",
      items: ["Speedflex", "Carbo Pro", "Promax", "Caliber", "JPX", "Fortius"],
    },
    {
      title: "VỢT CẦU LÔNG KUMPOO",
      items: ["Dòng vợt A", "Dòng vợt B", "Dòng vợt C"],
    },
    {
      title: "VỢT CẦU LÔNG PROACE",
      items: ["Dòng vợt M", "Dòng vợt N", "Dòng vợt P"],
    },
    {
      title: "VỢT CẦU LÔNG ASHAWAY",
      items: ["Dòng vợt Q", "Dòng vợt R", "Dòng vợt S"],
    },
    {
      title: "VỢT CẦU LÔNG ADIDAS",
      items: ["Dòng vợt T", "Dòng vợt U", "Dòng vợt V"],
    },
  ];

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
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              className={`customer-nav-item ${activeNavItem === item ? "active" : ""}`}
              onClick={() => setActiveNavItem(item)}
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

      {activeNavItem === "SẢN PHẨM" && (
        <section className="customer-category-section">
        <h2 className="customer-category-title">DANH MỤC SẢN PHẨM</h2>
        <div className="customer-category-grid">
          <div className="customer-category-menu">
            {productMenuItems.map((menuItem) => (
              <button
                type="button"
                key={menuItem}
                className={`customer-category-menu-item ${activeProductMenu === menuItem ? "active" : ""}`}
                onClick={() => setActiveProductMenu(menuItem)}
              >
                {menuItem}
              </button>
            ))}
          </div>

          <div className="customer-category-list">
            <div className="customer-category-current">
              <h3>{activeProductMenu}</h3>
              <div className="customer-category-current-items">
                {visibleProducts
                  .filter((prod) =>
                    activeProductMenu === "VỢT CẦU LÔNG"
                      ? prod.category.toLowerCase().includes("vợt")
                      : true,
                  )
                  .map((prod) => (
                    <button
                      key={prod.id}
                      type="button"
                      className={`customer-category-current-item ${selectedCategoryProduct?.id === prod.id ? "active" : ""}`}
                      onClick={() => {
                        setSelectedCategoryProduct(prod);
                        openProductDetail(prod);
                      }}
                    >
                      {prod.name}
                    </button>
                  ))}
              </div>
            </div>

            {productBrandColumns.map((group) => (
              <div key={group.title} className="customer-category-group">
                <h3 className="customer-category-group-title">{group.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {selectedCategoryProduct && (
          <section className="customer-inline-product-detail">
            <h3>Thông tin sản phẩm được chọn</h3>
            <div className="customer-inline-product-card">
              <img src={selectedCategoryProduct.image} alt={selectedCategoryProduct.name} />
              <div>
                <h4>{selectedCategoryProduct.name}</h4>
                <p>{selectedCategoryProduct.description}</p>
                <p>
                  <strong>Giá: </strong> {formatPrice(selectedCategoryProduct.price)}{' '}
                  {selectedCategoryProduct.originalPrice > selectedCategoryProduct.price && (
                    <span className="original">{formatPrice(selectedCategoryProduct.originalPrice)}</span>
                  )}
                </p>
                <p>
                  <strong>Thương hiệu:</strong> {selectedCategoryProduct.brand}
                </p>
                <p>
                  <strong>Kho:</strong> Còn {selectedCategoryProduct.stock}
                </p>
                <button
                  type="button"
                  className="customer-product-detail-btn"
                  onClick={() => setActiveProduct(selectedCategoryProduct)}
                >
                  Xem chi tiết đầy đủ
                </button>
              </div>
            </div>
          </section>
        )}
      </section>
      )}

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
