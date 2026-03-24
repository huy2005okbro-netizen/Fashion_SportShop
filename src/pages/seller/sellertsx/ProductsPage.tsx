import "../sellercss/SellerProducts.css";

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: string;
  stock: number;
  sold: number;
  status: "active" | "inactive" | "out-of-stock";
}

function ProductsPage() {
  const products: Product[] = [
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB",
      sku: "IH15PM-256-BK",
      category: "Điện thoại",
      price: "34.090.000đ",
      stock: 23,
      sold: 156,
      status: "active",
    },
    {
      id: 2,
      name: "MacBook Air M3 2024",
      sku: "MBA-M3-256-SG",
      category: "Laptop",
      price: "27.990.000đ",
      stock: 15,
      sold: 89,
      status: "active",
    },
    {
      id: 3,
      name: "Apple Watch Ultra 2",
      sku: "AWU2-49-TI",
      category: "Đồng hồ",
      price: "21.990.000đ",
      stock: 0,
      sold: 45,
      status: "out-of-stock",
    },
  ];

  return (
    <div className="products-page">
      <div className="page-header">
        <div className="header-left">
          <h1>Quản lý sản phẩm</h1>
          <p className="subtitle">
            Theo dõi danh sách sản phẩm đang có trong cửa hàng
          </p>
        </div>
        <button className="btn-add-product">
          <svg
            width="20"
            height="20"
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

      <div className="filter-bar">
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
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input type="text" placeholder="Tìm kiếm theo tên, SKU" />
        </div>
        <div className="filter-group">
          <select className="filter-select">
            <option>Tất cả danh mục</option>
            <option>Điện thoại</option>
            <option>Laptop</option>
            <option>Đồng hồ</option>
          </select>
          <select className="filter-select">
            <option>Tất cả trạng thái</option>
            <option>Đang bán</option>
            <option>Hết hàng</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="seller-table">
          <thead>
            <tr>
              <th>SẢN PHẨM</th>
              <th>SKU</th>
              <th>DANH MỤC</th>
              <th>GIÁ BÁN</th>
              <th>KHO</th>
              <th>ĐÃ BÁN</th>
              <th>TRẠNG THÁI</th>
              <th>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="product-name">{product.name}</td>
                <td className="sku">{product.sku}</td>
                <td>{product.category}</td>
                <td className="price">{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.sold}</td>
                <td>
                  <span className={`status-badge ${product.status}`}>
                    {product.status === "active"
                      ? "Đang bán"
                      : product.status === "out-of-stock"
                        ? "Hết hàng"
                        : "Ngừng bán"}
                  </span>
                </td>
                <td>
                  <button className="action-btn">...</button>
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
