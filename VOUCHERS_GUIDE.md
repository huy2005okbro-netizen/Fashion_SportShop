# 🎫 Hướng dẫn sử dụng Module Mã giảm giá

## 📋 Tổng quan

Module Mã giảm giá (Vouchers) cho phép Admin tạo và quản lý các mã giảm giá cho khách hàng. Khách hàng có thể sử dụng mã này khi thanh toán để được giảm giá.

---

## 🎯 Tính năng

### Admin

- ✅ Tạo/Sửa/Xóa mã giảm giá
- ✅ 2 loại giảm giá: Phần trăm (%) hoặc Số tiền cố định (đ)
- ✅ Điều kiện áp dụng: Giá trị đơn hàng tối thiểu
- ✅ Giới hạn số lần sử dụng
- ✅ Thời gian hiệu lực (từ ngày - đến ngày)
- ✅ Áp dụng cho: Tất cả / Danh mục cụ thể / Sản phẩm cụ thể
- ✅ Trạng thái: Hoạt động / Hết hạn / Tạm dừng
- ✅ Thống kê: Số lượt sử dụng, trạng thái

### Customer (Sẽ tích hợp)

- ✅ Nhập mã giảm giá khi thanh toán
- ✅ Xem danh sách mã khả dụng
- ✅ Tự động tính giảm giá

---

## 🚀 Cách sử dụng

### 1. Truy cập trang Mã giảm giá

1. Đăng nhập Admin
2. Click menu **"Mã giảm giá"** 🎫 trên sidebar
3. Xem danh sách mã giảm giá hiện có

### 2. Thêm mã giảm giá mới

1. Click nút **"➕ Thêm mã giảm giá"**
2. Điền thông tin:

#### Thông tin cơ bản

- **Mã giảm giá\*** (VD: `SUMMER2026`, `WELCOME10`)
  - Tự động chuyển thành chữ IN HOA
  - Không được trùng với mã đã có
- **Tên mã\*** (VD: "Giảm giá mùa hè 2026")
  - Tên hiển thị cho khách hàng
- **Mô tả** (Tùy chọn)
  - Mô tả chi tiết về chương trình

#### Cấu hình giảm giá

- **Loại giảm giá\***
  - **Phần trăm (%)**: Giảm theo % giá trị đơn hàng
  - **Số tiền cố định (đ)**: Giảm số tiền cố định

- **Giá trị giảm\***
  - Nếu chọn %, nhập số từ 1-100
  - Nếu chọn số tiền, nhập số tiền (VD: 50000)

- **Đơn hàng tối thiểu** (Tùy chọn)
  - Giá trị đơn hàng tối thiểu để áp dụng mã
  - Để 0 = không giới hạn

- **Giảm tối đa** (Chỉ cho loại %)
  - Số tiền giảm tối đa
  - VD: Giảm 10% nhưng tối đa 100.000đ

#### Giới hạn sử dụng

- **Số lần sử dụng tối đa**
  - Nhập 0 = không giới hạn
  - Nhập số > 0 = giới hạn số lần

#### Thời gian hiệu lực

- **Ngày bắt đầu\*** (VD: 2026-01-01)
- **Ngày kết thúc\*** (VD: 2026-12-31)

#### Áp dụng cho

- **Tất cả sản phẩm**: Áp dụng cho mọi sản phẩm
- **Danh mục cụ thể**: Chỉ áp dụng cho sản phẩm trong danh mục đã chọn
- **Sản phẩm cụ thể**: Chỉ áp dụng cho sản phẩm đã chọn (Coming soon)

3. Click **"Thêm mới"**

### 3. Sửa mã giảm giá

1. Click nút **⋮** ở cột "Thao tác"
2. Chọn **"✏️ Sửa"**
3. Cập nhật thông tin
4. Click **"Cập nhật"**

### 4. Tạm dừng / Kích hoạt mã

1. Click nút **⋮** ở cột "Thao tác"
2. Chọn:
   - **"⏸️ Tạm dừng"**: Tạm dừng mã (không thể sử dụng)
   - **"▶️ Kích hoạt"**: Kích hoạt lại mã

### 5. Xóa mã giảm giá

1. Click nút **⋮** ở cột "Thao tác"
2. Chọn **"🗑️ Xóa"**
3. Xác nhận xóa

### 6. Tìm kiếm & Lọc

- **Tìm kiếm**: Nhập mã, tên, hoặc mô tả vào ô tìm kiếm
- **Lọc theo trạng thái**: Chọn trạng thái trong dropdown
  - Tất cả trạng thái
  - Hoạt động
  - Hết hạn
  - Tạm dừng

---

## 📊 Thống kê

Trang hiển thị 4 thẻ thống kê:

1. **Đang hoạt động** 🎫
   - Số mã đang hoạt động

2. **Hết hạn** ⏰
   - Số mã đã hết hạn

3. **Tạm dừng** ⏸️
   - Số mã đang tạm dừng

4. **Lượt sử dụng** 📊
   - Tổng số lượt đã sử dụng

---

## 💡 Ví dụ thực tế

### Ví dụ 1: Mã giảm giá cho khách hàng mới

```
Mã: WELCOME10
Tên: Giảm 10% cho khách hàng mới
Loại: Phần trăm
Giá trị: 10%
Đơn tối thiểu: 0đ
Giảm tối đa: 100.000đ
Số lần: 100
Thời gian: 01/01/2026 - 31/12/2026
Áp dụng: Tất cả sản phẩm
```

### Ví dụ 2: Mã giảm giá mùa hè

```
Mã: SUMMER50K
Tên: Giảm 50K mùa hè
Loại: Số tiền cố định
Giá trị: 50.000đ
Đơn tối thiểu: 500.000đ
Số lần: 50
Thời gian: 01/04/2026 - 30/06/2026
Áp dụng: Tất cả sản phẩm
```

### Ví dụ 3: Mã giảm giá cho giày thể thao

```
Mã: SHOES20
Tên: Giảm 20% giày thể thao
Loại: Phần trăm
Giá trị: 20%
Đơn tối thiểu: 200.000đ
Giảm tối đa: 200.000đ
Số lần: 0 (không giới hạn)
Thời gian: 01/01/2026 - 31/12/2026
Áp dụng: Danh mục "Giày thể thao"
```

### Ví dụ 4: Mã giảm giá Tết

```
Mã: NEWYEAR2026
Tên: Tết 2026 - Giảm 15%
Loại: Phần trăm
Giá trị: 15%
Đơn tối thiểu: 300.000đ
Giảm tối đa: 150.000đ
Số lần: 200
Thời gian: 01/01/2026 - 15/02/2026
Áp dụng: Tất cả sản phẩm
```

---

## 🔍 Quy tắc nghiệp vụ

### Trạng thái mã giảm giá

Mã giảm giá tự động chuyển trạng thái dựa trên:

1. **Hoạt động**:
   - Trong thời gian hiệu lực
   - Chưa hết lượt sử dụng
   - Không bị tạm dừng

2. **Hết hạn**:
   - Ngoài thời gian hiệu lực
   - Hoặc đã hết lượt sử dụng

3. **Tạm dừng**:
   - Admin chủ động tạm dừng

### Validation khi áp dụng mã

Khi khách hàng nhập mã, hệ thống kiểm tra:

1. ✅ Mã có tồn tại không?
2. ✅ Mã có đang hoạt động không?
3. ✅ Đơn hàng có đủ giá trị tối thiểu không?
4. ✅ Mã còn lượt sử dụng không?
5. ✅ Sản phẩm có thuộc danh mục/sản phẩm áp dụng không?

Nếu tất cả đều OK → Áp dụng giảm giá ✅

### Tính toán giảm giá

#### Loại Phần trăm (%)

```
Giảm giá = Giá trị đơn hàng × (% / 100)

Nếu có "Giảm tối đa":
  Giảm giá = min(Giảm giá, Giảm tối đa)

Ví dụ:
- Đơn hàng: 1.000.000đ
- Giảm: 10%
- Giảm tối đa: 50.000đ
→ Giảm giá = min(100.000đ, 50.000đ) = 50.000đ
```

#### Loại Số tiền cố định

```
Giảm giá = Giá trị cố định

Ví dụ:
- Đơn hàng: 600.000đ
- Giảm: 50.000đ
→ Giảm giá = 50.000đ
```

---

## 💾 Lưu trữ dữ liệu

Dữ liệu mã giảm giá được lưu trong **localStorage**:

- Key: `fashion-store-vouchers`
- Format: JSON array

### Cấu trúc dữ liệu

```typescript
{
  id: number;
  code: string;              // Mã giảm giá (IN HOA)
  name: string;              // Tên mã
  description: string;       // Mô tả
  type: "PERCENTAGE" | "FIXED_AMOUNT";
  value: number;             // Giá trị giảm
  minOrderValue: number;     // Đơn tối thiểu
  maxDiscount?: number;      // Giảm tối đa (cho %)
  usageLimit: number;        // Giới hạn sử dụng
  usedCount: number;         // Đã sử dụng
  startDate: string;         // Ngày bắt đầu
  endDate: string;           // Ngày kết thúc
  status: "Hoạt động" | "Hết hạn" | "Tạm dừng";
  applicableType: "ALL" | "CATEGORY" | "PRODUCT";
  applicableIds: number[];   // IDs áp dụng
  createdAt: string;
  updatedAt: string;
}
```

---

## 🎨 Giao diện

### Màu sắc trạng thái

- **Hoạt động**: Xanh lá 🟢
- **Hết hạn**: Đỏ 🔴
- **Tạm dừng**: Vàng 🟡

### Màu sắc loại giảm giá

- **Phần trăm**: Xanh dương 🔵
- **Số tiền**: Tím 🟣

---

## 🔧 Tích hợp với Checkout (Coming soon)

Khi tích hợp vào trang thanh toán:

```typescript
import { useVouchers } from "../admin/VoucherContext";

const { validateVoucher, applyVoucher } = useVouchers();

// Validate mã
const result = validateVoucher(
  code, // Mã khách nhập
  orderValue, // Giá trị đơn hàng
  productIds, // IDs sản phẩm trong giỏ
  categoryIds, // IDs danh mục của sản phẩm
);

if (result.valid) {
  // Áp dụng giảm giá
  const discount = result.discount;
  const finalPrice = orderValue - discount;

  // Tăng số lượt sử dụng
  await applyVoucher(code);
}
```

---

## 📝 Lưu ý

1. **Mã giảm giá phải UNIQUE**: Không được trùng mã
2. **Ngày kết thúc phải sau ngày bắt đầu**
3. **Giá trị % phải từ 1-100**
4. **Số tiền phải > 0**
5. **Xóa mã sẽ mất dữ liệu vĩnh viễn** (không thể khôi phục)
6. **Tạm dừng mã**: Khách hàng không thể sử dụng nhưng dữ liệu vẫn giữ nguyên

---

## 🐛 Troubleshooting

### Mã không hiển thị

- Kiểm tra localStorage: `fashion-store-vouchers`
- Refresh trang

### Không thêm được mã

- Kiểm tra mã có trùng không
- Kiểm tra các trường bắt buộc (\*)

### Mã tự động chuyển "Hết hạn"

- Kiểm tra ngày hiện tại có trong khoảng thời gian không
- Kiểm tra số lượt sử dụng

---

## 🎉 Hoàn tất!

Module Mã giảm giá đã sẵn sàng sử dụng!

**Next steps:**

- Tích hợp vào trang Checkout
- Hiển thị danh sách mã cho Customer
- Thêm thống kê chi tiết hơn
- Export báo cáo sử dụng mã

---

**Made with ❤️ for Fashion Store**
