# 🔧 HƯỚNG DẪN MODULE CÀI ĐẶT

## Tổng quan

Module Cài đặt cho phép quản trị viên cấu hình toàn bộ hệ thống cửa hàng, bao gồm thông tin cơ bản, thanh toán, vận chuyển, email, thuế, bảo mật và thông báo.

---

## 📋 Các chức năng chính

### 1. 🏪 Thông tin cửa hàng

Cấu hình thông tin cơ bản của cửa hàng:

- **Tên cửa hàng**: Tên hiển thị trên website
- **Mô tả**: Giới thiệu ngắn về cửa hàng
- **Email**: Email liên hệ chính
- **Số điện thoại**: Hotline hỗ trợ khách hàng
- **Địa chỉ**: Địa chỉ cửa hàng/văn phòng
- **Logo**: URL logo cửa hàng
- **Tiền tệ**: VND (mặc định)
- **Múi giờ**: Asia/Ho_Chi_Minh
- **Ngôn ngữ**: Tiếng Việt

**Cách sử dụng:**

1. Nhập đầy đủ thông tin vào form
2. Click "💾 Lưu thay đổi"
3. Thông tin sẽ được lưu vào localStorage

---

### 2. 💳 Thanh toán

Quản lý các phương thức thanh toán:

#### Phương thức có sẵn:

1. **COD (Cash on Delivery)**
   - Thanh toán khi nhận hàng
   - Mặc định: Bật

2. **Chuyển khoản ngân hàng**
   - Thông tin tài khoản:
     - Ngân hàng: Vietcombank
     - Số tài khoản: 1234567890
     - Chủ tài khoản: FASHION STORE
   - Mặc định: Bật

3. **Ví MoMo**
   - Thanh toán qua ví điện tử MoMo
   - Mặc định: Bật

4. **VNPay**
   - Cổng thanh toán VNPay
   - Mặc định: Tắt

5. **Thẻ tín dụng/Ghi nợ**
   - Thanh toán bằng thẻ
   - Mặc định: Tắt

**Cách sử dụng:**

- Bật/tắt phương thức bằng toggle switch
- Thay đổi được lưu tự động

---

### 3. 🚚 Vận chuyển

Quản lý các phương thức giao hàng:

#### Phương thức có sẵn:

1. **Giao hàng tiêu chuẩn**
   - Phí cơ bản: 30,000đ
   - Miễn phí từ: 500,000đ
   - Thời gian: 3-5 ngày
   - Mặc định: Bật

2. **Giao hàng nhanh**
   - Phí cơ bản: 50,000đ
   - Miễn phí từ: 1,000,000đ
   - Thời gian: 1-2 ngày
   - Mặc định: Bật

3. **Giao hàng trong ngày**
   - Phí cơ bản: 80,000đ
   - Miễn phí từ: 2,000,000đ
   - Thời gian: Trong ngày
   - Mặc định: Tắt

**Cách sử dụng:**

- Bật/tắt phương thức bằng toggle switch
- Thay đổi được lưu tự động

---

### 4. 📧 Email

Cấu hình SMTP để gửi email tự động:

**Thông tin cần thiết:**

- **SMTP Host**: smtp.gmail.com (mặc định)
- **SMTP Port**: 587 (mặc định)
- **SMTP User**: Tài khoản email
- **SMTP Password**: Mật khẩu ứng dụng
- **From Email**: Email người gửi
- **From Name**: Tên người gửi

**Lưu ý:**

- Với Gmail, cần tạo "App Password" thay vì dùng mật khẩu thường
- Bật "Less secure app access" nếu cần

**Cách sử dụng:**

1. Nhập đầy đủ thông tin SMTP
2. Click "💾 Lưu cấu hình"
3. Test gửi email để kiểm tra

---

### 5. 💰 Thuế & Phí

Cấu hình thuế và phí xử lý:

**Các tùy chọn:**

- **Bật tính thuế**: Có/Không
- **Tên thuế**: VAT (mặc định)
- **Thuế suất**: 10% (mặc định)
- **Giá đã bao gồm thuế**: Có/Không
- **Phí xử lý**: 5,000đ (mặc định)

**Cách tính:**

- Nếu "Giá đã bao gồm thuế" = Không:
  - Tổng tiền = Giá sản phẩm + (Giá × Thuế suất) + Phí xử lý
- Nếu "Giá đã bao gồm thuế" = Có:
  - Tổng tiền = Giá sản phẩm + Phí xử lý

**Ví dụ:**

- Giá sản phẩm: 100,000đ
- Thuế 10%: 10,000đ
- Phí xử lý: 5,000đ
- **Tổng**: 115,000đ

---

### 6. 🔒 Bảo mật

Cấu hình các tính năng bảo mật:

**Các tùy chọn:**

1. **Xác thực 2 yếu tố (2FA)**
   - Bật/tắt 2FA
   - Mặc định: Tắt

2. **Thời gian phiên**
   - Thời gian tự động đăng xuất (phút)
   - Mặc định: 60 phút

3. **Số lần đăng nhập sai tối đa**
   - Khóa tài khoản sau X lần sai
   - Mặc định: 5 lần

4. **Độ dài mật khẩu tối thiểu**
   - Số ký tự tối thiểu
   - Mặc định: 8 ký tự

5. **Yêu cầu mật khẩu mạnh**
   - Bắt buộc chữ hoa, chữ thường, số, ký tự đặc biệt
   - Mặc định: Bật

**Khuyến nghị:**

- Bật 2FA cho tài khoản admin
- Đặt thời gian phiên ngắn cho bảo mật cao
- Yêu cầu mật khẩu mạnh

---

### 7. 🔔 Thông báo

Cấu hình các loại thông báo tự động:

#### Email:

- ✅ Gửi email khi có đơn hàng mới
- ✅ Gửi email khi trạng thái đơn hàng thay đổi
- ✅ Gửi email khi sản phẩm sắp hết hàng
- ⬜ Gửi email khi có khách hàng mới

#### SMS:

- ⬜ Gửi SMS khi có đơn hàng mới

#### Push Notification:

- ✅ Gửi thông báo đẩy khi có đơn hàng mới

#### Ngưỡng cảnh báo:

- **Ngưỡng hết hàng**: 10 sản phẩm (mặc định)

**Cách sử dụng:**

1. Chọn các loại thông báo muốn bật
2. Đặt ngưỡng cảnh báo hết hàng
3. Click "💾 Lưu cấu hình"

---

## 🔄 Xuất/Nhập cài đặt

### Xuất cài đặt:

1. Click "📥 Xuất cài đặt" ở góc trên
2. File JSON sẽ được tải về
3. Lưu file để backup

### Nhập cài đặt:

1. Chuẩn bị file JSON hợp lệ
2. Sử dụng chức năng import (đang phát triển)
3. Cài đặt sẽ được khôi phục

---

## 🔄 Khôi phục mặc định

**Cảnh báo:** Thao tác này sẽ xóa TẤT CẢ cài đặt hiện tại!

**Cách thực hiện:**

1. Click "🔄 Khôi phục mặc định"
2. Xác nhận trong popup
3. Tất cả cài đặt về giá trị mặc định

**Khuyến nghị:**

- Xuất cài đặt trước khi khôi phục
- Chỉ dùng khi cần thiết

---

## 💾 Lưu trữ dữ liệu

**Phương thức:** localStorage
**Key:** `fashion-store-settings`

**Cấu trúc dữ liệu:**

```json
{
  "store": { ... },
  "payment": { ... },
  "shipping": { ... },
  "email": { ... },
  "tax": { ... },
  "security": { ... },
  "notifications": { ... }
}
```

**Lưu ý:**

- Dữ liệu được lưu tự động khi thay đổi
- Không cần backend
- Dữ liệu lưu trên trình duyệt

---

## 🎯 Best Practices

### 1. Thông tin cửa hàng

- ✅ Cập nhật đầy đủ thông tin liên hệ
- ✅ Sử dụng email chính thức
- ✅ Kiểm tra số điện thoại hoạt động

### 2. Thanh toán

- ✅ Bật ít nhất 2 phương thức thanh toán
- ✅ Luôn bật COD cho khách hàng mới
- ✅ Cập nhật thông tin tài khoản ngân hàng chính xác

### 3. Vận chuyển

- ✅ Cung cấp nhiều lựa chọn giao hàng
- ✅ Đặt ngưỡng freeship hợp lý
- ✅ Tính phí ship dựa trên khoảng cách thực tế

### 4. Email

- ✅ Test gửi email sau khi cấu hình
- ✅ Sử dụng email chuyên nghiệp
- ✅ Bật thông báo email quan trọng

### 5. Thuế & Phí

- ✅ Tuân thủ quy định thuế địa phương
- ✅ Hiển thị rõ ràng cách tính thuế
- ✅ Cập nhật thuế suất khi có thay đổi

### 6. Bảo mật

- ✅ Bật 2FA cho tài khoản admin
- ✅ Yêu cầu mật khẩu mạnh
- ✅ Giới hạn số lần đăng nhập sai
- ✅ Đặt thời gian phiên hợp lý

### 7. Thông báo

- ✅ Bật thông báo đơn hàng mới
- ✅ Bật cảnh báo hết hàng
- ✅ Không spam khách hàng

---

## 🐛 Xử lý lỗi

### Lỗi không lưu được:

- Kiểm tra localStorage có đầy không
- Xóa cache trình duyệt
- Thử trình duyệt khác

### Lỗi email không gửi được:

- Kiểm tra thông tin SMTP
- Kiểm tra kết nối internet
- Kiểm tra tài khoản email có bị khóa

### Lỗi mất cài đặt:

- Khôi phục từ file backup
- Hoặc cấu hình lại từ đầu

---

## 📱 Responsive Design

Module Cài đặt được tối ưu cho:

- ✅ Desktop (1920px+)
- ✅ Laptop (1024px - 1919px)
- ✅ Tablet (768px - 1023px)
- ✅ Mobile (< 768px)

---

## 🔐 Bảo mật

**Lưu ý quan trọng:**

- ⚠️ Không chia sẻ thông tin SMTP
- ⚠️ Không lưu mật khẩu dạng plain text trong production
- ⚠️ Sử dụng HTTPS khi deploy
- ⚠️ Mã hóa dữ liệu nhạy cảm

---

## 📞 Hỗ trợ

Nếu gặp vấn đề:

1. Kiểm tra console log
2. Xem localStorage data
3. Thử khôi phục mặc định
4. Liên hệ support team

---

**Cập nhật lần cuối:** 24/04/2026
**Phiên bản:** 1.0.0
