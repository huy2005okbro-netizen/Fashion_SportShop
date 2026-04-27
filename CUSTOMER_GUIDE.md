# 👤 HƯỚNG DẪN PHẦN KHÁCH HÀNG

## Tổng quan

Phần khách hàng cung cấp trải nghiệm mua sắm trực tuyến hoàn chỉnh với đầy đủ chức năng từ xem sản phẩm, thêm giỏ hàng, thanh toán đến quản lý đơn hàng.

---

## 🎯 Các chức năng chính

### 1. 🏠 Trang chủ (HomePage)

**Chức năng:**

- Banner slider tự động chuyển (5 giây/slide)
- Danh mục sản phẩm với scroll ngang
- Môn thể thao yêu thích
- Tin tức thời trang & thể thao
- Hàng mới về
- Sản phẩm bán chạy

**Cách sử dụng:**

1. Xem banner quảng cáo tự động chuyển
2. Click vào danh mục để xem sản phẩm
3. Scroll ngang để xem thêm sản phẩm
4. Click vào sản phẩm để xem chi tiết

---

### 2. 🛍️ Chi tiết sản phẩm (ProductDetailPage)

**Chức năng:**

- Xem thông tin chi tiết sản phẩm
- Chọn size, màu sắc
- Chọn số lượng
- Thêm vào giỏ hàng
- Thêm vào wishlist (yêu thích)
- Xem đánh giá của khách hàng
- Viết đánh giá
- Sản phẩm liên quan

**Thông tin hiển thị:**

- Tên sản phẩm
- Giá (có giá gốc nếu đang giảm)
- Thương hiệu
- Đánh giá (sao + số lượng review)
- Mô tả chi tiết
- Sizes có sẵn
- Màu sắc có sẵn
- Tình trạng kho

**Cách sử dụng:**

1. Chọn size phù hợp
2. Chọn màu sắc yêu thích
3. Chọn số lượng (mặc định: 1)
4. Click "Thêm vào giỏ hàng" hoặc "Mua ngay"
5. Click ❤️ để thêm vào wishlist

---

### 3. 🛒 Giỏ hàng (Cart)

**Chức năng:**

- Xem danh sách sản phẩm trong giỏ
- Cập nhật số lượng
- Xóa sản phẩm
- Xem tổng tiền
- Áp dụng mã giảm giá
- Tính phí vận chuyển
- Thanh toán

**Tính năng đặc biệt:**

- Tự động tính tổng tiền
- Hiển thị phí ship (30,000đ)
- Miễn phí ship cho đơn từ 500,000đ
- Hiển thị số tiền cần mua thêm để freeship
- Lưu giỏ hàng trong localStorage

**Cách sử dụng:**

1. Xem sản phẩm trong giỏ
2. Tăng/giảm số lượng bằng nút +/-
3. Xóa sản phẩm không cần
4. Nhập mã giảm giá (nếu có)
5. Click "Thanh toán" để đặt hàng

---

### 4. 💳 Thanh toán (CheckoutPage)

**Chức năng:**

- Nhập thông tin giao hàng
- Chọn phương thức thanh toán
- Xem tóm tắt đơn hàng
- Xác nhận đặt hàng

**Thông tin cần nhập:**

- Họ và tên \*
- Số điện thoại \*
- Email \*
- Địa chỉ \*
- Tỉnh/Thành phố \*
- Quận/Huyện \*
- Phường/Xã \*
- Ghi chú (tùy chọn)

**Phương thức thanh toán:**

1. **COD (Thanh toán khi nhận hàng)**
   - Thanh toán bằng tiền mặt
   - Kiểm tra hàng trước khi thanh toán

2. **Chuyển khoản ngân hàng**
   - VNPay
   - MoMo
   - ZaloPay

**Validation:**

- Kiểm tra tất cả trường bắt buộc
- Validate số điện thoại (10 số)
- Validate email (format đúng)
- Hiển thị lỗi rõ ràng

**Cách sử dụng:**

1. Điền đầy đủ thông tin giao hàng
2. Chọn phương thức thanh toán
3. Kiểm tra lại đơn hàng
4. Click "Đặt Hàng"
5. Nhận thông báo đặt hàng thành công

---

### 5. 📦 Quản lý đơn hàng (OrdersPage)

**Chức năng:**

- Xem danh sách đơn hàng
- Lọc theo trạng thái
- Xem chi tiết đơn hàng
- Theo dõi vận đơn
- Yêu cầu hoàn trả
- Hủy đơn hàng

**Trạng thái đơn hàng:**

1. **Chờ xác nhận** (pending)
   - Đơn mới tạo
   - Chờ shop xác nhận
   - Có thể hủy

2. **Đã xác nhận** (confirmed)
   - Shop đã xác nhận
   - Đang chuẩn bị hàng
   - Không thể hủy

3. **Đang giao** (shipping)
   - Đơn đang được vận chuyển
   - Có mã vận đơn
   - Theo dõi được

4. **Đã giao** (delivered)
   - Đã nhận hàng thành công
   - Có thể đánh giá
   - Có thể yêu cầu hoàn trả (trong 7 ngày)

5. **Đã hủy** (cancelled)
   - Đơn đã bị hủy
   - Không thể thao tác

6. **Đã hoàn trả** (returned)
   - Đã hoàn trả hàng
   - Chờ hoàn tiền

**Thông tin đơn hàng:**

- Mã đơn hàng
- Ngày đặt
- Trạng thái
- Sản phẩm (tên, số lượng, giá)
- Tổng tiền
- Địa chỉ giao hàng
- Phương thức thanh toán
- Mã vận đơn (nếu có)

**Cách sử dụng:**

1. Chọn tab trạng thái để lọc
2. Click "Xem chi tiết" để xem thông tin đầy đủ
3. Click "Yêu cầu hoàn trả" (nếu đã giao)
4. Click "Hủy đơn" (nếu chờ xác nhận)

---

### 6. ❤️ Danh sách yêu thích (Wishlist)

**Chức năng:**

- Lưu sản phẩm yêu thích
- Xem danh sách wishlist
- Thêm vào giỏ hàng từ wishlist
- Xóa khỏi wishlist

**Cách sử dụng:**

1. Click ❤️ ở trang chi tiết sản phẩm
2. Vào "Yêu thích" để xem danh sách
3. Click "Thêm vào giỏ" để mua
4. Click 🗑️ để xóa

---

### 7. 👤 Thông tin tài khoản

**Chức năng:**

- Xem thông tin cá nhân
- Cập nhật thông tin
- Đổi mật khẩu
- Xem lịch sử mua hàng

**Thông tin lưu trữ:**

- Họ tên
- Email
- Số điện thoại
- Địa chỉ mặc định
- Lịch sử đơn hàng

---

### 8. ⭐ Đánh giá sản phẩm (Reviews)

**Chức năng:**

- Xem đánh giá của khách khác
- Viết đánh giá sau khi mua
- Đánh giá sao (1-5 sao)
- Viết nhận xét
- Đánh dấu review hữu ích

**Điều kiện đánh giá:**

- Phải mua sản phẩm
- Đơn hàng đã giao thành công
- Mỗi sản phẩm chỉ đánh giá 1 lần

**Cách viết đánh giá:**

1. Vào trang chi tiết sản phẩm đã mua
2. Scroll xuống phần "Đánh giá"
3. Chọn số sao (1-5)
4. Viết nhận xét
5. Click "Gửi đánh giá"

---

## 🎨 Giao diện

### Header

- Logo SUPERSPORTS
- Menu điều hướng với dropdown
- Thanh tìm kiếm
- Icon giỏ hàng (hiển thị số lượng)
- Icon wishlist
- Icon tài khoản

### Navigation Menu

**Xu Hướng:**

- Hàng Mới
- Nổi Bật
- Sự Kiện

**Nam:**

- Giày Thể Thao
- Giày Dép Thời Trang
- Áo
- Quần
- Thương Hiệu Nổi Bật

**Nữ:**

- Giày Thể Thao
- Giày Dép Thời Trang
- Áo
- Quần / Váy
- Thương Hiệu Nổi Bật

**Trẻ Em:**

- Giày Dép
- Quần Áo Bé Trai
- Quần Áo Bé Gái

**Phụ Kiện:**

- Balo / Túi
- Tất / Vớ
- Mũ / Nón
- Găng tay
- Kính

---

## 💾 Dữ liệu lưu trữ

**localStorage Keys:**

- `fashion-store-cart` - Giỏ hàng
- `fashion-store-wishlist` - Danh sách yêu thích
- `fashion-store-customer-orders` - Đơn hàng
- `fashion-store-reviews` - Đánh giá
- `fashion-store-customer-info` - Thông tin khách hàng

**Dữ liệu mẫu:**

- 1 đơn hàng đã giao
- Giỏ hàng trống (ban đầu)
- Wishlist trống (ban đầu)

---

## 🔄 Luồng mua hàng

### Luồng chuẩn:

1. **Xem sản phẩm** → Trang chủ / Danh mục
2. **Chi tiết sản phẩm** → Chọn size, màu, số lượng
3. **Thêm giỏ hàng** → Click "Thêm vào giỏ"
4. **Xem giỏ hàng** → Kiểm tra sản phẩm
5. **Thanh toán** → Nhập thông tin
6. **Xác nhận** → Đặt hàng thành công
7. **Theo dõi** → Xem trạng thái đơn hàng

### Luồng mua nhanh:

1. **Chi tiết sản phẩm** → Chọn size, màu
2. **Mua ngay** → Click "Mua ngay"
3. **Thanh toán** → Nhập thông tin
4. **Xác nhận** → Đặt hàng thành công

---

## 🎯 Tính năng đặc biệt

### 1. Tự động lưu giỏ hàng

- Giỏ hàng được lưu trong localStorage
- Không mất khi refresh trang
- Không mất khi đóng trình duyệt

### 2. Tính phí ship thông minh

- Tự động tính phí ship: 30,000đ
- Miễn phí ship cho đơn từ 500,000đ
- Hiển thị số tiền cần mua thêm

### 3. Validation form

- Kiểm tra tất cả trường bắt buộc
- Validate số điện thoại (10 số)
- Validate email (format đúng)
- Hiển thị lỗi rõ ràng

### 4. Responsive Design

- Hoạt động tốt trên Desktop
- Tối ưu cho Tablet
- Responsive trên Mobile

### 5. Trải nghiệm mượt mà

- Smooth scroll
- Hover effects
- Loading states
- Success/Error messages

---

## 📱 Responsive Breakpoints

- **Desktop**: 1920px+
- **Laptop**: 1024px - 1919px
- **Tablet**: 768px - 1023px
- **Mobile**: < 768px

---

## 🎨 Design System

### Colors:

- Primary: `#667eea` (Purple)
- Secondary: `#764ba2` (Dark Purple)
- Success: `#10b981` (Green)
- Warning: `#fbbf24` (Yellow)
- Danger: `#ef4444` (Red)
- Text: `#1a1a1a` (Dark Gray)

### Typography:

- Font Family: System fonts
- Headings: Bold, 24-32px
- Body: Regular, 14-16px
- Small: 12-13px

### Spacing:

- Small: 8px
- Medium: 16px
- Large: 24px
- XLarge: 32px

---

## 🔐 Bảo mật

**Lưu ý:**

- Không lưu thông tin thẻ tín dụng
- Không lưu mật khẩu dạng plain text
- Validate tất cả input từ user
- Sanitize dữ liệu trước khi lưu

---

## 🐛 Xử lý lỗi

### Lỗi thường gặp:

**1. Giỏ hàng trống:**

- Hiển thị: "Giỏ hàng trống"
- Action: "Tiếp tục mua sắm"

**2. Sản phẩm hết hàng:**

- Hiển thị: "Hết hàng"
- Disable nút "Thêm vào giỏ"

**3. Lỗi thanh toán:**

- Hiển thị thông báo lỗi
- Giữ nguyên thông tin đã nhập
- Cho phép thử lại

**4. Lỗi mạng:**

- Hiển thị: "Lỗi kết nối"
- Nút "Thử lại"

---

## 📊 Thống kê

**Metrics theo dõi:**

- Số lượt xem sản phẩm
- Tỷ lệ thêm vào giỏ
- Tỷ lệ hoàn thành đơn hàng
- Giá trị đơn hàng trung bình
- Sản phẩm bán chạy
- Sản phẩm được yêu thích nhiều

---

## 🚀 Performance

**Tối ưu hóa:**

- Lazy load images
- Code splitting
- Minimize re-renders
- Optimize bundle size
- Cache localStorage data

---

## ♿ Accessibility

**WCAG Compliance:**

- Semantic HTML
- Alt text cho images
- Keyboard navigation
- Focus indicators
- ARIA labels
- Color contrast

---

## 📝 Best Practices

### Cho khách hàng:

1. ✅ Đọc kỹ mô tả sản phẩm
2. ✅ Chọn đúng size
3. ✅ Kiểm tra thông tin giao hàng
4. ✅ Lưu mã đơn hàng
5. ✅ Đánh giá sau khi mua

### Cho developer:

1. ✅ Validate tất cả input
2. ✅ Handle errors gracefully
3. ✅ Test trên nhiều devices
4. ✅ Optimize performance
5. ✅ Follow design system

---

## 🔗 Tích hợp

**Modules đã tích hợp:**

- ✅ CustomerContext - Quản lý state
- ✅ VoucherContext - Mã giảm giá
- ✅ MarketingContext - Banners
- ✅ SettingsContext - Cấu hình

**APIs (placeholder):**

- Products API
- Orders API
- Reviews API
- Payment API

---

## 📞 Hỗ trợ

**Khi gặp vấn đề:**

1. Kiểm tra console log
2. Xem localStorage data
3. Clear cache và thử lại
4. Liên hệ support team

**Hotline:** 0123456789
**Email:** support@fashionstore.vn

---

**Cập nhật lần cuối:** 27/04/2026
**Phiên bản:** 1.0.0
