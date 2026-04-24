# 📊 Hướng dẫn sử dụng Module Báo cáo

## 📋 Tổng quan

Module Báo cáo cung cấp các báo cáo chi tiết về doanh thu, sản phẩm, đơn hàng và khách hàng, giúp Admin phân tích và đưa ra quyết định kinh doanh.

---

## 🎯 Tính năng

### 1. **Báo cáo Tổng quan**

- ✅ Thống kê tổng hợp: Doanh thu, Đơn hàng, Khách hàng
- ✅ Biểu đồ doanh thu theo ngày
- ✅ Top 5 sản phẩm bán chạy
- ✅ Đơn hàng theo trạng thái

### 2. **Báo cáo Sản phẩm**

- ✅ Top sản phẩm bán chạy nhất
- ✅ Sản phẩm sắp hết hàng
- ✅ Phân tích theo danh mục
- ✅ Tăng trưởng từng sản phẩm

### 3. **Báo cáo Đơn hàng**

- ✅ Phân tích theo trạng thái
- ✅ Tỷ lệ hoàn thành
- ✅ Doanh thu từ đơn hàng

### 4. **Báo cáo Khách hàng**

- ✅ Phân loại khách hàng
- ✅ Khách hàng mới
- ✅ Khách hàng thân thiết
- ✅ Doanh thu theo loại khách

---

## 🚀 Cách sử dụng

### Truy cập trang Báo cáo

1. Đăng nhập Admin
2. Click menu **"Báo cáo"** 📊 trên sidebar
3. Xem 4 thẻ thống kê tổng quan
4. Chọn khoảng thời gian: 7 ngày / 30 ngày / Tháng này / Tháng trước / Năm nay

---

## 📈 Tab Tổng quan

### Thống kê tổng hợp

**4 thẻ stats:**

1. **💰 Tổng doanh thu**
   - Tổng doanh thu trong khoảng thời gian
   - % tăng trưởng so với kỳ trước
   - Màu xanh: Tăng ↑
   - Màu đỏ: Giảm ↓

2. **📦 Tổng đơn hàng**
   - Số lượng đơn hàng
   - % tăng trưởng đơn hàng

3. **👥 Khách hàng**
   - Tổng số khách hàng
   - % tăng trưởng khách hàng mới

4. **📊 Giá trị đơn TB**
   - Giá trị trung bình mỗi đơn
   - Tỷ lệ hoàn thành đơn hàng

### Biểu đồ doanh thu

- Hiển thị doanh thu theo từng ngày
- Trục Y: Doanh thu (triệu đồng)
- Trục X: Ngày trong tháng
- Hover để xem chi tiết

### Top 5 sản phẩm bán chạy

Danh sách 5 sản phẩm có doanh thu cao nhất:

- Xếp hạng #1, #2, #3...
- Tên sản phẩm
- Danh mục
- Số lượng đã bán
- Doanh thu

### Đơn hàng theo trạng thái

Phân tích đơn hàng:

- **Đã giao**: 68.5% (856 đơn)
- **Đang giao**: 18.7% (234 đơn)
- **Đang xử lý**: 7.8% (98 đơn)
- **Đã hủy**: 5.0% (62 đơn)

Progress bar hiển thị tỷ lệ trực quan.

---

## 📦 Tab Sản phẩm

### Bảng sản phẩm bán chạy

Bảng chi tiết với các cột:

| Cột             | Mô tả                       |
| --------------- | --------------------------- |
| **Xếp hạng**    | #1, #2, #3...               |
| **Sản phẩm**    | Tên sản phẩm                |
| **Danh mục**    | Danh mục sản phẩm           |
| **Đã bán**      | Số lượng đã bán             |
| **Doanh thu**   | Tổng doanh thu              |
| **Tăng trưởng** | % tăng/giảm so với kỳ trước |
| **Tồn kho**     | Số lượng còn lại            |

**Màu sắc:**

- Tồn kho ≤ 10: Màu đỏ (cảnh báo)
- Tồn kho > 10: Màu xanh (OK)

### Sản phẩm sắp hết hàng

Danh sách sản phẩm có tồn kho ≤ 10:

- ⚠️ Cảnh báo màu vàng
- Hiển thị số lượng còn lại
- Sắp xếp từ ít đến nhiều

**Hành động:**

- Nhập thêm hàng
- Tạm dừng bán
- Liên hệ nhà cung cấp

### Sản phẩm theo danh mục

Thống kê theo từng danh mục:

- Tên danh mục
- Số lượng sản phẩm
- Tổng doanh thu

**Ví dụ:**

- Áo thể thao: 2 sản phẩm - 102.405.000đ
- Quần thể thao: 1 sản phẩm - 59.113.000đ
- Giày thể thao: 1 sản phẩm - 51.840.000đ

---

## 🛒 Tab Đơn hàng

### Bảng phân tích đơn hàng

| Trạng thái | Số lượng | Tỷ lệ | Doanh thu    | Biểu đồ          |
| ---------- | -------- | ----- | ------------ | ---------------- |
| Đã giao    | 856      | 68.5% | 102.720.000đ | ████████████████ |
| Đang giao  | 234      | 18.7% | 28.080.000đ  | ████             |
| Đang xử lý | 98       | 7.8%  | 11.760.000đ  | ██               |
| Đã hủy     | 62       | 5.0%  | 0đ           | █                |

### Phân tích

**Tỷ lệ hoàn thành:**

```
Tỷ lệ = (Đã giao / Tổng đơn) × 100%
      = (856 / 1250) × 100%
      = 68.5%
```

**Tỷ lệ hủy:**

```
Tỷ lệ = (Đã hủy / Tổng đơn) × 100%
      = (62 / 1250) × 100%
      = 5.0%
```

**Đánh giá:**

- ✅ Tỷ lệ hoàn thành > 60%: Tốt
- ⚠️ Tỷ lệ hủy > 10%: Cần cải thiện
- ✅ Tỷ lệ hủy < 10%: Tốt

---

## 👥 Tab Khách hàng

### Bảng phân tích khách hàng

| Loại khách hàng       | Số lượng | Tỷ lệ | Doanh thu   | Biểu đồ      |
| --------------------- | -------- | ----- | ----------- | ------------ |
| Khách hàng mới        | 1,208    | 45.2% | 48.320.000đ | ████████████ |
| Khách hàng thân thiết | 856      | 32.0% | 85.600.000đ | ████████     |
| Khách hàng quay lại   | 432      | 16.2% | 34.560.000đ | ████         |
| Khách không hoạt động | 178      | 6.6%  | 0đ          | █            |

### Phân tích

**Khách hàng mới (45.2%)**

- Chiếm tỷ lệ cao nhất
- Doanh thu trung bình: 40.000đ/khách
- **Hành động:** Chương trình chào mừng, ưu đãi lần đầu

**Khách hàng thân thiết (32.0%)**

- Doanh thu cao nhất: 100.000đ/khách
- **Hành động:** Chương trình VIP, ưu đãi đặc biệt

**Khách hàng quay lại (16.2%)**

- Doanh thu trung bình: 80.000đ/khách
- **Hành động:** Email marketing, khuyến mãi

**Khách không hoạt động (6.6%)**

- Không mua hàng trong 3 tháng
- **Hành động:** Chiến dịch kích hoạt lại

---

## 📥 Xuất báo cáo

### Cách xuất

1. Chọn khoảng thời gian
2. Chọn tab báo cáo cần xuất
3. Click nút **"📥 Xuất báo cáo"**
4. Chọn định dạng:
   - **CSV**: Dữ liệu bảng, mở bằng Excel
   - **PDF**: Báo cáo đẹp, in ấn
   - **Excel**: Đầy đủ tính năng

### Nội dung xuất

**CSV/Excel:**

- Tất cả dữ liệu trong bảng
- Có thể filter, sort, tính toán

**PDF:**

- Bao gồm biểu đồ
- Logo công ty
- Thông tin thời gian
- Chữ ký (nếu cần)

---

## 📊 Các chỉ số quan trọng

### 1. Doanh thu trung bình (Average Revenue)

```
Doanh thu TB = Tổng doanh thu / Số ngày
```

### 2. Giá trị đơn hàng trung bình (AOV)

```
AOV = Tổng doanh thu / Số đơn hàng
```

### 3. Tỷ lệ chuyển đổi (Conversion Rate)

```
Conversion Rate = (Số đơn / Số khách) × 100%
```

### 4. Tỷ lệ hoàn thành (Completion Rate)

```
Completion Rate = (Đơn đã giao / Tổng đơn) × 100%
```

### 5. Tăng trưởng (Growth Rate)

```
Growth = ((Kỳ này - Kỳ trước) / Kỳ trước) × 100%
```

---

## 💡 Phân tích & Hành động

### Doanh thu giảm

**Nguyên nhân:**

- Mùa vụ
- Cạnh tranh
- Chất lượng sản phẩm
- Giá cả

**Hành động:**

- Khuyến mãi
- Marketing mạnh hơn
- Cải thiện sản phẩm
- Điều chỉnh giá

### Tồn kho cao

**Nguyên nhân:**

- Nhập quá nhiều
- Sản phẩm không hấp dẫn
- Giá cao

**Hành động:**

- Flash sale
- Bundle deals
- Giảm giá
- Ngừng nhập thêm

### Tỷ lệ hủy cao

**Nguyên nhân:**

- Giao hàng chậm
- Sản phẩm không đúng mô tả
- Giá cao
- Dịch vụ kém

**Hành động:**

- Cải thiện giao hàng
- Mô tả chính xác
- Chính sách đổi trả tốt
- Đào tạo nhân viên

---

## 🎯 Best Practices

### 1. Xem báo cáo thường xuyên

- Hàng ngày: Doanh thu, đơn hàng
- Hàng tuần: Sản phẩm, khách hàng
- Hàng tháng: Tổng quan, xu hướng

### 2. So sánh các kỳ

- Tuần này vs tuần trước
- Tháng này vs tháng trước
- Năm nay vs năm trước

### 3. Tập trung vào KPIs

- Doanh thu
- Số đơn hàng
- Giá trị đơn TB
- Tỷ lệ hoàn thành

### 4. Hành động dựa trên dữ liệu

- Không đoán mò
- Dựa vào số liệu thực tế
- Test và đo lường

### 5. Chia sẻ báo cáo

- Team sales
- Team marketing
- Ban giám đốc

---

## 💾 Dữ liệu

Module sử dụng dữ liệu từ:

- **Orders**: Đơn hàng
- **Products**: Sản phẩm
- **Customers**: Khách hàng
- **Inventory**: Kho hàng

Dữ liệu được tính toán real-time từ localStorage.

---

## 🐛 Troubleshooting

### Số liệu không chính xác

- Kiểm tra khoảng thời gian
- Refresh trang
- Xóa cache browser

### Biểu đồ không hiển thị

- Kiểm tra có dữ liệu không
- Thử khoảng thời gian khác

### Không xuất được báo cáo

- Chức năng đang phát triển
- Sẽ có trong phiên bản sau

---

## 🎉 Hoàn tất!

Module Báo cáo đã sẵn sàng sử dụng!

**Next steps:**

- Thêm biểu đồ Line, Pie
- Export CSV/PDF thật
- Báo cáo tùy chỉnh
- Dashboard widgets

---

**Made with ❤️ for Fashion Store**
