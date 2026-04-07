import { useState } from "react";
import "../customercss/ProductDetailPage.css";

interface CartItem {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  quantity: number;
  category: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  category: string;
  brand?: string;
}

interface ProductDetailPageProps {
  onBack: () => void;
  onAddToCart: (item: CartItem) => void;
  onBuyNow: (items: CartItem[]) => void;
  product?: Product;
}

function ProductDetailPage({
  onBack,
  onAddToCart,
  onBuyNow,
  product: productProp,
}: ProductDetailPageProps) {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Đen");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Default product data nếu không có prop
  const defaultProduct = {
    id: "1",
    name: "Giày Chạy Bộ Nike Air Zoom Pegasus 40",
    price: 3290000,
    oldPrice: 4290000,
    rating: 4.8,
    reviews: 328,
    sold: 1250,
    brand: "Nike",
    category: "Giày chạy bộ",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80",
    ],
    colors: ["Đen", "Trắng", "Xanh Navy", "Đỏ"],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    description:
      "Giày chạy bộ Nike Air Zoom Pegasus 40 mang đến sự thoải mái và hiệu suất vượt trội cho mọi cự ly. Với công nghệ đệm Air Zoom tiên tiến, đế giày ReactX mới và upper Flyknit thoáng khí, đôi giày này sẽ giúp bạn chạy nhanh hơn, xa hơn và thoải mái hơn.",
    features: [
      "Công nghệ đệm Air Zoom phản hồi nhanh",
      "Đế giữa ReactX nhẹ và bền bỉ",
      "Upper Flyknit thoáng khí và ôm chân",
      "Đế ngoài cao su bền chắc",
      "Thiết kế năng động, phù hợp mọi địa hình",
    ],
    specifications: {
      "Trọng lượng": "280g (size 42)",
      "Độ cao đế": "10mm",
      "Chất liệu upper": "Flyknit",
      "Chất liệu đế": "ReactX + Cao su",
      "Công nghệ": "Air Zoom, ReactX",
      "Xuất xứ": "Việt Nam",
    },
  };

  // Sử dụng product từ prop hoặc default
  const product = productProp
    ? {
        ...defaultProduct,
        id: productProp.id,
        name: productProp.name,
        price: productProp.price,
        oldPrice: productProp.oldPrice,
        category: productProp.category,
        brand: productProp.brand || "Nike",
        images: [
          productProp.image,
          productProp.image,
          productProp.image,
          productProp.image,
        ],
      }
    : defaultProduct;

  const reviews = [
    {
      id: 1,
      user: "Nguyễn Văn A",
      rating: 5,
      date: "15/03/2026",
      comment:
        "Giày rất tốt, êm chân và nhẹ. Chạy 10km không thấy mỏi. Đáng đồng tiền bát gạo!",
      size: "42",
      color: "Đen",
    },
    {
      id: 2,
      user: "Trần Thị B",
      rating: 5,
      date: "12/03/2026",
      comment:
        "Mình đã dùng Pegasus 39 và giờ lên 40 thấy cải thiện rõ rệt. Đệm êm hơn, nhẹ hơn. Recommend!",
      size: "38",
      color: "Trắng",
    },
    {
      id: 3,
      user: "Lê Văn C",
      rating: 4,
      date: "10/03/2026",
      comment:
        "Giày đẹp, chất lượng tốt. Trừ 1 sao vì giá hơi cao. Nhưng nhìn chung vẫn đáng mua.",
      size: "43",
      color: "Xanh Navy",
    },
  ];

  const relatedProducts = [
    {
      id: 2,
      name: "Giày Nike React Infinity Run",
      price: 3590000,
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Giày Adidas Ultraboost 23",
      price: 4290000,
      image:
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      name: "Giày Asics Gel-Nimbus 25",
      price: 3890000,
      image:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      name: "Giày New Balance 1080v13",
      price: 3690000,
      image:
        "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const handleAddToCart = () => {
    onAddToCart({
      id: `product-${product.id}`,
      name: `${product.name} - ${selectedColor} - Size ${selectedSize}`,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.images[0],
      quantity: quantity,
      category: product.category,
    });
    alert(
      `Đã thêm ${quantity} sản phẩm vào giỏ hàng!\nSize: ${selectedSize}\nMàu: ${selectedColor}`,
    );
  };

  const handleBuyNow = () => {
    const item = {
      id: `product-${product.id}`,
      name: `${product.name} - ${selectedColor} - Size ${selectedSize}`,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.images[0],
      quantity: quantity,
      category: product.category,
    };
    onBuyNow([item]);
  };

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <button onClick={onBack}>Trang chủ</button>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span className="current">{product.name}</span>
      </div>

      {/* Product Main Info */}
      <div className="product-main">
        {/* Images Gallery */}
        <div className="product-gallery">
          <div className="main-image">
            <div className="image-container">
              <span className="discount-badge">-23%</span>
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="thumbnail-list">
            {product.images.map((img, index) => (
              <div
                key={index}
                className={`thumbnail ${selectedImage === index ? "active" : ""}`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={img}
                  alt={`${product.name} - Ảnh ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info-section">
          <div className="product-brand">{product.brand}</div>
          <h1 className="product-title">{product.name}</h1>

          <div className="product-meta">
            <div className="rating-section">
              <span className="rating-stars">⭐ {product.rating}</span>
              <span className="rating-count">({product.reviews} đánh giá)</span>
              <span className="divider">|</span>
              <span className="sold-count">Đã bán {product.sold}</span>
            </div>
          </div>

          <div className="price-section">
            <span className="current-price">
              {product.price.toLocaleString()}đ
            </span>
            <span className="old-price">
              {product.oldPrice.toLocaleString()}đ
            </span>
            <span className="discount-percent">-23%</span>
          </div>

          {/* Color Selection */}
          <div className="selection-group">
            <label>
              Màu sắc: <strong>{selectedColor}</strong>
            </label>
            <div className="color-options">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`color-btn ${selectedColor === color ? "active" : ""}`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="selection-group">
            <label>
              Kích thước: <strong>{selectedSize}</strong>
            </label>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <button className="size-guide-btn">📏 Hướng dẫn chọn size</button>
          </div>

          {/* Quantity */}
          <div className="selection-group">
            <label>Số lượng:</label>
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
              />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="btn-add-cart" onClick={handleAddToCart}>
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
              </svg>
              Thêm Vào Giỏ
            </button>
            <button className="btn-buy-now" onClick={handleBuyNow}>
              Mua Ngay
            </button>
          </div>

          {/* Policies */}
          <div className="policies">
            <div className="policy-item">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <span>Miễn phí vận chuyển cho đơn từ 500k</span>
            </div>
            <div className="policy-item">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              <span>Đổi trả trong 7 ngày nếu lỗi</span>
            </div>
            <div className="policy-item">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Bảo hành chính hãng 12 tháng</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="product-details">
        <div className="tabs">
          <button className="tab active">Mô tả sản phẩm</button>
          <button className="tab">Thông số kỹ thuật</button>
          <button className="tab">Đánh giá ({product.reviews})</button>
        </div>

        <div className="tab-content">
          {/* Description */}
          <div className="description-section">
            <h3>Mô Tả Sản Phẩm</h3>
            <p>{product.description}</p>

            <h4>Đặc Điểm Nổi Bật:</h4>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <h4>Thông Số Kỹ Thuật:</h4>
            <table className="specs-table">
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key}>
                    <td className="spec-label">{key}</td>
                    <td className="spec-value">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Reviews */}
          <div className="reviews-section">
            <h3>Đánh Giá Từ Khách Hàng</h3>
            <div className="reviews-summary">
              <div className="rating-overview">
                <div className="rating-score">{product.rating}</div>
                <div className="rating-stars-large">⭐⭐⭐⭐⭐</div>
                <div className="rating-text">{product.reviews} đánh giá</div>
              </div>
            </div>

            <div className="reviews-list">
              {reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div className="reviewer-avatar">{review.user[0]}</div>
                    <div className="reviewer-info">
                      <div className="reviewer-name">{review.user}</div>
                      <div className="review-meta">
                        <span className="review-stars">
                          {"⭐".repeat(review.rating)}
                        </span>
                        <span className="review-date">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="review-content">
                    <div className="review-variant">
                      Phân loại: {review.color}, Size {review.size}
                    </div>
                    <p>{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="related-products">
        <h3>Sản Phẩm Tương Tự</h3>
        <div className="related-grid">
          {relatedProducts.map((item) => (
            <div key={item.id} className="related-product-card">
              <div className="related-image">
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <h4>{item.name}</h4>
              <p className="related-price">{item.price.toLocaleString()}đ</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
