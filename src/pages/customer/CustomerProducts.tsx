import { useEffect, useState } from "react";
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
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

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
    ? customerProducts
        .filter((item) => item.id !== activeProduct.id)
        .slice(0, 3)
    : [];

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

  return (
    <div className="customer-products-page">
      <div className="customer-products-header">
        <div>
          <p className="customer-products-label">Danh mục sản phẩm</p>
          <h1>Khám phá sản phẩm nổi bật</h1>
          <p className="customer-products-subtitle">
            Chọn sản phẩm bạn muốn để xem thông tin chi tiết, giá bán và đánh
            giá.
          </p>
        </div>
        <button
          type="button"
          className="customer-products-back"
          onClick={onBackToLogin}
        >
          Quay lại đăng nhập
        </button>
      </div>

      <div className="customer-products-grid">
        {customerProducts.map((product) => (
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
                <span className="current">
                  {product.price.toLocaleString("vi-VN")}₫
                </span>
                <span className="original">
                  {product.originalPrice.toLocaleString("vi-VN")}₫
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
      </div>

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
                    {activeProduct.price.toLocaleString("vi-VN")}₫
                  </span>
                  <span className="original">
                    {activeProduct.originalPrice.toLocaleString("vi-VN")}₫
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
                        <span>{product.price.toLocaleString("vi-VN")}₫</span>
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
