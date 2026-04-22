import { useEffect, useMemo, useState } from "react";
import {
  getStatusFromStock,
  initialProducts,
  sportBrands,
  sportColors,
} from "../adminData";
import type { Product } from "../adminData";
import { useCategories } from "../CategoryContext";
import "../admincss/ProductsPage.css";

const formatCurrency = (value: number) => `${value.toLocaleString("vi-VN")}đ`;

function ProductsPage() {
  const { categories, getCategoryAttributes } = useCategories();
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window === "undefined") {
      return initialProducts;
    }

    try {
      const saved = localStorage.getItem("btldata_products");
      if (saved) {
        const parsed = JSON.parse(saved) as Product[];
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // ignore invalid JSON
    }

    return initialProducts;
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<
    Omit<Product, "id" | "status"> & { attributes?: Record<string, string> }
  >({
    image: "",
    sku: "",
    name: "",
    category: categories[0]?.name ?? "",
    sport: "Gym",
    brand: "",
    gender: "Unisex",
    size: "M",
    color: "",
    material: "",
    price: 0,
    stock: 0,
    description: "",
    attributes: {},
  });
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categoryOptions = useMemo(
    () => categories.filter((category) => category.status === "Hoạt động"),
    [categories],
  );

  const selectedCategory = useMemo(
    () => categories.find((category) => category.name === formData.category),
    [categories, formData.category],
  );

  const selectedCategoryAttributes = useMemo(
    () => (selectedCategory ? getCategoryAttributes(selectedCategory.id) : []),
    [selectedCategory, getCategoryAttributes],
  );

  const nextId = useMemo(
    () =>
      products.length
        ? Math.max(...products.map((product) => product.id)) + 1
        : 1,
    [products],
  );

  const filteredProducts = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    if (!keyword) {
      return products;
    }

    return products.filter((product) =>
      [
        product.sku,
        product.name,
        product.category,
        product.sport,
        product.brand,
        product.gender,
        product.color,
      ].some((value) => value.toLowerCase().includes(keyword)),
    );
  }, [products, searchTerm]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    if (name === "category") {
      const category = categories.find((cat) => cat.name === value);
      const newAttributes: Record<string, string> = {};

      if (category) {
        getCategoryAttributes(category.id).forEach((attr) => {
          newAttributes[attr.name] = "";
        });
      }

      setFormData((prev) => ({
        ...prev,
        category: value,
        attributes: newAttributes,
      }));
      return;
    }

    if (name.startsWith("attr_")) {
      const attrId = name.replace("attr_", "");
      const attribute = selectedCategoryAttributes.find(
        (attr) => attr.id === attrId,
      );
      if (!attribute) return;

      setFormData((prev) => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          [attribute.name]: value,
        },
      }));
      return;
    }

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

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProductId(null);
    setFormData({
      image: "",
      sku: "",
      name: "",
      category: categories[0]?.name ?? "",
      sport: "Gym",
      brand: "",
      gender: "Unisex",
      size: "M",
      color: "",
      material: "",
      price: 0,
      stock: 0,
      description: "",
      attributes: {},
    });
  };

  const handleOpenDetail = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  const handleOpenAddForm = () => {
    setEditingProductId(null);
    setFormData({
      image: "",
      sku: "",
      name: "",
      category: categories[0]?.name ?? "",
      sport: "Gym",
      brand: "",
      gender: "Unisex",
      size: "M",
      color: "",
      material: "",
      price: 0,
      stock: 0,
      description: "",
      attributes: {},
    });
    setShowForm(true);
  };

  const handleOpenEditForm = (product: Product) => {
    setEditingProductId(product.id);
    setFormData({
      image: product.image,
      sku: product.sku,
      name: product.name,
      category: product.category,
      sport: product.sport,
      brand: product.brand,
      gender: product.gender,
      size: product.size,
      color: product.color,
      material: product.material,
      price: product.price,
      stock: product.stock,
      description: product.description,
      attributes: product.attributes || {},
    });
    setShowForm(true);
  };

  const handleDeleteProduct = (productId: number) => {
    const confirmed = window.confirm(
      "Bạn có chắc muốn xóa sản phẩm này không?",
    );

    if (!confirmed) {
      return;
    }

    setProducts((prev) => prev.filter((product) => product.id !== productId));
    setSelectedProduct((prev) => (prev?.id === productId ? null : prev));
  };

  const handleAddProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editingProductId !== null) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingProductId
            ? {
                ...product,
                ...formData,
                status: getStatusFromStock(formData.stock),
              }
            : product,
        ),
      );
    } else {
      const newProduct: Product = {
        id: nextId,
        ...formData,
        status: getStatusFromStock(formData.stock),
      };

      setProducts((prev) => [...prev, newProduct]);
    }

    handleCloseForm();
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("btldata_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    if (!selectedProduct && !showForm) {
      document.body.style.overflow = "";
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      if (showForm) {
        handleCloseForm();
        return;
      }

      handleCloseDetail();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedProduct, showForm]);

  useEffect(() => {
    if (!selectedProduct) {
      return;
    }

    const latestSelectedProduct = products.find(
      (product) => product.id === selectedProduct.id,
    );

    if (!latestSelectedProduct) {
      setSelectedProduct(null);
      return;
    }

    if (latestSelectedProduct !== selectedProduct) {
      setSelectedProduct(latestSelectedProduct);
    }
  }, [products, selectedProduct]);

  return (
    <div className="page-content products-page">
      <div className="page-header">
        <h2>Quản lý sản phẩm</h2>
        <button className="btn-primary" onClick={handleOpenAddForm}>
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
          Thêm sản phẩm
        </button>
      </div>

      <div className="products-toolbar">
        <div className="search-box">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Tìm theo tên, SKU, danh mục, thương hiệu..."
          />
        </div>

        <div className="toolbar-summary">
          <span>
            Hiển thị <strong>{filteredProducts.length}</strong> /{" "}
            {products.length} sản phẩm
          </span>
          {searchTerm && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setSearchTerm("")}
            >
              Xóa tìm kiếm
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <div className="product-form-overlay" onClick={handleCloseForm}>
          <form
            className="product-form-card"
            onSubmit={handleAddProduct}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="form-header">
              <div>
                <h3>
                  {editingProductId !== null
                    ? "Chỉnh sửa sản phẩm"
                    : "Thêm sản phẩm đồ thể thao"}
                </h3>
                <p>
                  {editingProductId !== null
                    ? "Cập nhật đầy đủ thông tin để quản lý sản phẩm chính xác hơn."
                    : "Nhập đầy đủ thuộc tính sản phẩm để quản lý kho và bán hàng dễ hơn."}
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
                  required
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categoryOptions.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
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
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Chọn thương hiệu --</option>
                  {sportBrands.map((brandName) => (
                    <option key={brandName} value={brandName}>
                      {brandName}
                    </option>
                  ))}
                </select>
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
                <select
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Chọn màu --</option>
                  {sportColors.map((colorName) => (
                    <option key={colorName} value={colorName}>
                      {colorName}
                    </option>
                  ))}
                </select>
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
              {selectedCategoryAttributes.length > 0 && (
                <div className="dynamic-attributes">
                  {selectedCategoryAttributes.map((attribute) => (
                    <label key={attribute.id}>
                      {attribute.name}
                      <input
                        name={`attr_${attribute.id}`}
                        value={formData.attributes?.[attribute.name] ?? ""}
                        onChange={handleChange}
                        placeholder={`Nhập ${attribute.name.toLowerCase()}...`}
                      />
                    </label>
                  ))}
                </div>
              )}
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
                onClick={handleCloseForm}
              >
                Hủy
              </button>
              <button type="submit" className="btn-primary">
                {editingProductId !== null
                  ? "Cập nhật sản phẩm"
                  : "Lưu sản phẩm"}
              </button>
            </div>
          </form>
        </div>
      )}

      {selectedProduct && (
        <div className="product-detail-overlay" onClick={handleCloseDetail}>
          <div
            className="product-detail-card"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="product-detail-header">
              <div>
                <span className="product-detail-label">Chi tiết sản phẩm</span>
                <h3>{selectedProduct.name}</h3>
                <p>
                  Mã SKU: <strong>{selectedProduct.sku}</strong>
                </p>
              </div>
              <button
                type="button"
                className="product-detail-close"
                onClick={handleCloseDetail}
                aria-label="Đóng chi tiết sản phẩm"
              >
                ×
              </button>
            </div>

            <div className="product-detail-body">
              <div className="product-detail-image-wrap">
                {selectedProduct.image ? (
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="product-detail-image"
                  />
                ) : (
                  <div className="product-detail-image-empty">Chưa có ảnh</div>
                )}
              </div>

              <div className="product-detail-info">
                <div className="product-detail-price-row">
                  <strong>{formatCurrency(selectedProduct.price)}</strong>
                  <span
                    className={`badge ${
                      selectedProduct.status === "Còn hàng"
                        ? "badge-green"
                        : selectedProduct.status === "Sắp hết"
                          ? "badge-orange"
                          : "badge-red"
                    }`}
                  >
                    {selectedProduct.status}
                  </span>
                </div>

                <div className="product-detail-grid">
                  <div>
                    <span>Danh mục</span>
                    <strong>{selectedProduct.category}</strong>
                  </div>
                  <div>
                    <span>Môn thể thao</span>
                    <strong>{selectedProduct.sport}</strong>
                  </div>
                  <div>
                    <span>Thương hiệu</span>
                    <strong>{selectedProduct.brand}</strong>
                  </div>
                  <div>
                    <span>Giới tính</span>
                    <strong>{selectedProduct.gender}</strong>
                  </div>
                  <div>
                    <span>Size</span>
                    <strong>{selectedProduct.size}</strong>
                  </div>
                  <div>
                    <span>Màu sắc</span>
                    <strong>{selectedProduct.color}</strong>
                  </div>
                  <div>
                    <span>Chất liệu</span>
                    <strong>{selectedProduct.material}</strong>
                  </div>
                  <div>
                    <span>Tồn kho</span>
                    <strong>{selectedProduct.stock} sản phẩm</strong>
                  </div>
                </div>

                {selectedProduct.attributes &&
                  Object.keys(selectedProduct.attributes).length > 0 && (
                    <div className="product-detail-attributes">
                      <h4>Thuộc tính sản phẩm</h4>
                      <ul>
                        {Object.entries(selectedProduct.attributes).map(
                          ([key, val]) => (
                            <li key={key}>
                              <strong>{key}:</strong>{" "}
                              {val || "(chưa thiết lập)"}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}

                <div className="product-detail-description">
                  <span>Mô tả sản phẩm</span>
                  <p>{selectedProduct.description}</p>
                </div>

                <div className="product-detail-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={handleCloseDetail}
                  >
                    Đóng
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      handleCloseDetail();
                      handleOpenEditForm(selectedProduct);
                    }}
                  >
                    Sửa sản phẩm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="products-table-container">
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
              <th>Thuộc tính</th>
              <th>Giá</th>
              <th>Tồn kho</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="product-row"
                  onClick={() => handleOpenDetail(product)}
                >
                  <td>{product.id}</td>
                  <td>
                    <div className="product-image-cell product-image-clickable">
                      {product.image ? (
                        <img src={product.image} alt={product.name} />
                      ) : (
                        <span>Chưa có ảnh</span>
                      )}
                    </div>
                  </td>
                  <td>{product.sku}</td>
                  <td>
                    <button
                      type="button"
                      className="product-name-button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleOpenDetail(product);
                      }}
                    >
                      {product.name}
                    </button>
                  </td>
                  <td>{product.category}</td>
                  <td>{product.sport}</td>
                  <td>{product.brand}</td>
                  <td>{product.gender}</td>
                  <td>{product.size}</td>
                  <td>{product.color}</td>
                  <td>{product.material}</td>
                  <td>
                    {product.attributes &&
                    Object.keys(product.attributes).length > 0
                      ? Object.entries(product.attributes)
                          .map(
                            ([key, value]) =>
                              `${key}: ${value || "(chưa thiết lập)"}`,
                          )
                          .join("; ")
                      : "-"}
                  </td>
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
                      <button
                        type="button"
                        className="btn-action btn-action-edit"
                        title="Sửa"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleOpenEditForm(product);
                        }}
                      >
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
                        <span>Sửa</span>
                      </button>
                      <button
                        type="button"
                        className="btn-action btn-action-delete"
                        title="Xóa"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDeleteProduct(product.id);
                        }}
                      >
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
                        <span>Xóa</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={16}>
                  <div className="empty-state">
                    <h3>Không tìm thấy sản phẩm phù hợp</h3>
                    <p>
                      Hãy thử từ khóa khác hoặc xóa bộ lọc tìm kiếm hiện tại.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsPage;
