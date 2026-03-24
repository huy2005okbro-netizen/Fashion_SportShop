import { useMemo, useState } from "react";
import "../admincss/ProductsPage.css";

type ProductStatus = "Còn hàng" | "Sắp hết" | "Hết hàng";

type Product = {
  id: number;
  image: string;
  sku: string;
  name: string;
  category: string;
  sport: string;
  brand: string;
  gender: string;
  size: string;
  color: string;
  material: string;
  price: number;
  stock: number;
  status: ProductStatus;
  description: string;
};

const initialProducts: Product[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=300&q=80",
    sku: "SPT-TSHIRT-001",
    name: "Áo thun tập gym nam Dry-Fit",
    category: "Áo thể thao",
    sport: "Gym",
    brand: "Nike",
    gender: "Nam",
    size: "L",
    color: "Đen",
    material: "Polyester co giãn 4 chiều",
    price: 299000,
    stock: 150,
    status: "Còn hàng",
    description: "Áo thấm hút mồ hôi tốt, phù hợp tập gym và chạy bộ.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=300&q=80",
    sku: "SPT-PANTS-002",
    name: "Quần jogger bóng đá nữ",
    category: "Quần thể thao",
    sport: "Bóng đá",
    brand: "Adidas",
    gender: "Nữ",
    size: "M",
    color: "Xanh navy",
    material: "Vải mè thoáng khí",
    price: 599000,
    stock: 80,
    status: "Còn hàng",
    description:
      "Quần co giãn nhẹ, thiết kế linh hoạt khi vận động cường độ cao.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80",
    sku: "SPT-DRESS-003",
    name: "Váy tennis nữ Pro Active",
    category: "Váy thể thao",
    sport: "Tennis",
    brand: "Yonex",
    gender: "Nữ",
    size: "S",
    color: "Trắng",
    material: "Polyester tái chế",
    price: 450000,
    stock: 5,
    status: "Sắp hết",
    description: "Thiết kế nhẹ, thoáng và có quần bảo hộ bên trong.",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=300&q=80",
    sku: "SPT-JACKET-004",
    name: "Áo khoác chạy bộ Wind Shield",
    category: "Áo khoác thể thao",
    sport: "Chạy bộ",
    brand: "Puma",
    gender: "Unisex",
    size: "XL",
    color: "Xám",
    material: "Nylon chống gió",
    price: 1200000,
    stock: 0,
    status: "Hết hàng",
    description: "Áo khoác mỏng nhẹ chống gió, thích hợp chạy sáng sớm.",
  },
];

const emptyForm: Omit<Product, "id" | "status"> = {
  image: "",
  sku: "",
  name: "",
  category: "Áo thể thao",
  sport: "Gym",
  brand: "",
  gender: "Unisex",
  size: "M",
  color: "",
  material: "",
  price: 0,
  stock: 0,
  description: "",
};

const formatCurrency = (value: number) => `${value.toLocaleString("vi-VN")}đ`;

const getStatusFromStock = (stock: number): ProductStatus => {
  if (stock <= 0) return "Hết hàng";
  if (stock <= 10) return "Sắp hết";
  return "Còn hàng";
};

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const nextId = useMemo(
    () =>
      products.length
        ? Math.max(...products.map((product) => product.id)) + 1
        : 1,
    [products],
  );

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: typeof reader.result === "string" ? reader.result : "",
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newProduct: Product = {
      id: nextId,
      ...formData,
      status: getStatusFromStock(formData.stock),
    };

    setProducts((prev) => [...prev, newProduct]);
    setFormData(emptyForm);
    setShowForm(false);
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Quản lý sản phẩm</h2>
        <button
          className="btn-primary"
          onClick={() => setShowForm((prev) => !prev)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {showForm ? "Đóng form" : "Thêm sản phẩm"}
        </button>
      </div>

      {showForm && (
        <div
          className="product-form-overlay"
          onClick={() => setShowForm(false)}
        >
          <form
            className="product-form-card"
            onSubmit={handleAddProduct}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="form-header">
              <div>
                <h3>Thêm sản phẩm đồ thể thao</h3>
                <p>
                  Nhập đầy đủ thuộc tính sản phẩm để quản lý kho và bán hàng dễ
                  hơn.
                </p>
              </div>
            </div>

            <div className="product-form-grid">
              <label className="full-width">
                Hình ảnh sản phẩm
                <div className="image-upload-box">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <span>Tải ảnh sản phẩm từ máy tính</span>
                </div>
                {formData.image ? (
                  <div className="image-preview-card">
                    <img src={formData.image} alt="Xem trước sản phẩm" />
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, image: "" }))
                      }
                    >
                      Xóa ảnh
                    </button>
                  </div>
                ) : (
                  <p className="image-helper-text">
                    Chưa có ảnh. Hãy tải ảnh để hiển thị trong danh sách sản
                    phẩm.
                  </p>
                )}
              </label>
              <label>
                SKU
                <input
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="VD: SPT-SHOE-005"
                  required
                />
              </label>
              <label>
                Tên sản phẩm
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="VD: Giày chạy bộ Air Zoom"
                  required
                />
              </label>
              <label>
                Danh mục
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option>Áo thể thao</option>
                  <option>Quần thể thao</option>
                  <option>Giày thể thao</option>
                  <option>Áo khoác thể thao</option>
                  <option>Phụ kiện thể thao</option>
                  <option>Váy thể thao</option>
                </select>
              </label>
              <label>
                Môn thể thao
                <select
                  name="sport"
                  value={formData.sport}
                  onChange={handleChange}
                >
                  <option>Gym</option>
                  <option>Chạy bộ</option>
                  <option>Bóng đá</option>
                  <option>Cầu lông</option>
                  <option>Tennis</option>
                  <option>Bóng rổ</option>
                  <option>Yoga</option>
                </select>
              </label>
              <label>
                Thương hiệu
                <input
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Nike, Adidas..."
                  required
                />
              </label>
              <label>
                Giới tính
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option>Nam</option>
                  <option>Nữ</option>
                  <option>Unisex</option>
                  <option>Trẻ em</option>
                </select>
              </label>
              <label>
                Kích thước
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                >
                  <option>XS</option>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                  <option>XXL</option>
                  <option>39</option>
                  <option>40</option>
                  <option>41</option>
                  <option>42</option>
                  <option>43</option>
                </select>
              </label>
              <label>
                Màu sắc
                <input
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="Đen, Trắng, Xanh..."
                  required
                />
              </label>
              <label>
                Chất liệu
                <input
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  placeholder="Polyester, cotton..."
                  required
                />
              </label>
              <label>
                Giá bán
                <input
                  name="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Tồn kho
                <input
                  name="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="full-width">
                Mô tả sản phẩm
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Mô tả ngắn về công năng, chất liệu, mục đích sử dụng..."
                  required
                />
              </label>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowForm(false)}
              >
                Hủy
              </button>
              <button type="submit" className="btn-primary">
                Lưu sản phẩm
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ảnh</th>
              <th>SKU</th>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Môn</th>
              <th>Thương hiệu</th>
              <th>Giới tính</th>
              <th>Size</th>
              <th>Màu</th>
              <th>Chất liệu</th>
              <th>Giá</th>
              <th>Tồn kho</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <div className="product-image-cell">
                    {product.image ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <span>Chưa có ảnh</span>
                    )}
                  </div>
                </td>
                <td>{product.sku}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.sport}</td>
                <td>{product.brand}</td>
                <td>{product.gender}</td>
                <td>{product.size}</td>
                <td>{product.color}</td>
                <td>{product.material}</td>
                <td>{formatCurrency(product.price)}</td>
                <td>{product.stock}</td>
                <td>
                  <span
                    className={`badge ${
                      product.status === "Còn hàng"
                        ? "badge-green"
                        : product.status === "Sắp hết"
                          ? "badge-orange"
                          : "badge-red"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="Sửa">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button className="btn-icon" title="Xóa">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsPage;
