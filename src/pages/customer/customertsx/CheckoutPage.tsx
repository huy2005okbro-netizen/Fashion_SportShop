import { useState } from "react";
import "../customercss/CheckoutPage.css";

interface CartItem {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  quantity: number;
  category: string;
}

interface CheckoutPageProps {
  items: CartItem[];
  onBack: () => void;
  onOrderComplete: () => void;
}

function CheckoutPage({ items, onBack, onOrderComplete }: CheckoutPageProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    note: "",
    paymentMethod: "cod",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ tên";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ";
    }

    if (!formData.city) {
      newErrors.city = "Vui lòng chọn tỉnh/thành phố";
    }

    if (!formData.district) {
      newErrors.district = "Vui lòng chọn quận/huyện";
    }

    if (!formData.ward) {
      newErrors.ward = "Vui lòng chọn phường/xã";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Simulate order processing
      alert(
        `Đặt hàng thành công!\n\nThông tin đơn hàng:\nHọ tên: ${formData.fullName}\nSĐT: ${formData.phone}\nĐịa chỉ: ${formData.address}, ${formData.ward}, ${formData.district}, ${formData.city}\nTổng tiền: ${getTotalPrice().toLocaleString()}đ\nPhương thức: ${formData.paymentMethod === "cod" ? "Thanh toán khi nhận hàng" : "Chuyển khoản"}`,
      );
      onOrderComplete();
    }
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getShippingFee = () => {
    return getSubtotal() >= 500000 ? 0 : 30000;
  };

  const getTotalPrice = () => {
    return getSubtotal() + getShippingFee();
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <button className="btn-back" onClick={onBack}>
            ← Quay lại
          </button>
          <h1>Thanh Toán</h1>
        </div>

        <div className="checkout-content">
          {/* Form thông tin */}
          <div className="checkout-form-section">
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <h2>Thông Tin Giao Hàng</h2>

                <div className="form-group">
                  <label>
                    Họ và tên <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Nhập họ và tên"
                    className={errors.fullName ? "error" : ""}
                  />
                  {errors.fullName && (
                    <span className="error-message">{errors.fullName}</span>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>
                      Số điện thoại <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Nhập số điện thoại"
                      className={errors.phone ? "error" : ""}
                    />
                    {errors.phone && (
                      <span className="error-message">{errors.phone}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Nhập email"
                      className={errors.email ? "error" : ""}
                    />
                    {errors.email && (
                      <span className="error-message">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    Địa chỉ <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Số nhà, tên đường"
                    className={errors.address ? "error" : ""}
                  />
                  {errors.address && (
                    <span className="error-message">{errors.address}</span>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>
                      Tỉnh/Thành phố <span className="required">*</span>
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? "error" : ""}
                    >
                      <option value="">Chọn tỉnh/thành phố</option>
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="Hải Phòng">Hải Phòng</option>
                      <option value="Cần Thơ">Cần Thơ</option>
                    </select>
                    {errors.city && (
                      <span className="error-message">{errors.city}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      Quận/Huyện <span className="required">*</span>
                    </label>
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className={errors.district ? "error" : ""}
                    >
                      <option value="">Chọn quận/huyện</option>
                      <option value="Quận 1">Quận 1</option>
                      <option value="Quận 2">Quận 2</option>
                      <option value="Quận 3">Quận 3</option>
                      <option value="Quận 4">Quận 4</option>
                      <option value="Quận 5">Quận 5</option>
                    </select>
                    {errors.district && (
                      <span className="error-message">{errors.district}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      Phường/Xã <span className="required">*</span>
                    </label>
                    <select
                      name="ward"
                      value={formData.ward}
                      onChange={handleInputChange}
                      className={errors.ward ? "error" : ""}
                    >
                      <option value="">Chọn phường/xã</option>
                      <option value="Phường 1">Phường 1</option>
                      <option value="Phường 2">Phường 2</option>
                      <option value="Phường 3">Phường 3</option>
                      <option value="Phường 4">Phường 4</option>
                      <option value="Phường 5">Phường 5</option>
                    </select>
                    {errors.ward && (
                      <span className="error-message">{errors.ward}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label>Ghi chú</label>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    placeholder="Ghi chú về đơn hàng (tùy chọn)"
                    rows={3}
                  />
                </div>
              </div>

              <div className="form-section">
                <h2>Phương Thức Thanh Toán</h2>

                <div className="payment-methods">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleInputChange}
                    />
                    <div className="payment-info">
                      <span className="payment-icon">💵</span>
                      <div>
                        <strong>Thanh toán khi nhận hàng (COD)</strong>
                        <p>Thanh toán bằng tiền mặt khi nhận hàng</p>
                      </div>
                    </div>
                  </label>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={formData.paymentMethod === "bank"}
                      onChange={handleInputChange}
                    />
                    <div className="payment-info">
                      <span className="payment-icon">🏦</span>
                      <div>
                        <strong>Chuyển khoản ngân hàng</strong>
                        <p>Chuyển khoản qua VNPay, MoMo, ZaloPay</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <button type="submit" className="btn-place-order">
                Đặt Hàng
              </button>
            </form>
          </div>

          {/* Order summary */}
          <div className="order-summary">
            <h2>Đơn Hàng Của Bạn</h2>

            <div className="order-items">
              {items.map((item) => (
                <div key={item.id} className="order-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p className="item-quantity">Số lượng: {item.quantity}</p>
                    <p className="item-price">
                      {(item.price * item.quantity).toLocaleString()}đ
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="total-row">
                <span>Tạm tính:</span>
                <span>{getSubtotal().toLocaleString()}đ</span>
              </div>
              <div className="total-row">
                <span>Phí vận chuyển:</span>
                <span className={getShippingFee() === 0 ? "free" : ""}>
                  {getShippingFee() === 0
                    ? "Miễn phí"
                    : `${getShippingFee().toLocaleString()}đ`}
                </span>
              </div>
              {getSubtotal() < 500000 && (
                <div className="shipping-note">
                  Mua thêm {(500000 - getSubtotal()).toLocaleString()}đ để được
                  miễn phí vận chuyển
                </div>
              )}
              <div className="total-row total">
                <span>Tổng cộng:</span>
                <span className="total-price">
                  {getTotalPrice().toLocaleString()}đ
                </span>
              </div>
            </div>

            <div className="order-policies">
              <div className="policy-item">
                <span>✓</span>
                <span>Miễn phí vận chuyển cho đơn từ 500k</span>
              </div>
              <div className="policy-item">
                <span>✓</span>
                <span>Đổi trả trong 7 ngày</span>
              </div>
              <div className="policy-item">
                <span>✓</span>
                <span>Bảo hành chính hãng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
