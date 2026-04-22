import { useEffect, useMemo, useState } from "react";
import "../admincss/InventoryPage.css";

interface InventoryItem {
  id: number;
  productId: number;
  productName: string;
  sku: string;
  warehouse: string;
  stock: number;
  reserved: number;
  available: number;
  minStock: number;
  status: string;
  lastUpdated: string;
}

interface StockTransaction {
  id: number;
  type: "NHAP" | "XUAT" | "KIEM_KE" | "DIEU_CHINH";
  productId: number;
  productName: string;
  sku: string;
  warehouse: string;
  quantity: number;
  beforeStock: number;
  afterStock: number;
  reason: string;
  note: string;
  createdBy: string;
  createdAt: string;
}

function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem("btldata_inventory");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [transactions, setTransactions] = useState<StockTransaction[]>(() => {
    const saved = localStorage.getItem("btldata_stock_transactions");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [selectedWarehouse, setSelectedWarehouse] = useState("Tất cả kho");
  const [searchTerm, setSearchTerm] = useState("");
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(
    null,
  );

  const [transactionForm, setTransactionForm] = useState({
    type: "NHAP" as "NHAP" | "XUAT" | "KIEM_KE" | "DIEU_CHINH",
    productId: 0,
    warehouse: "Kho Hà Nội",
    quantity: 0,
    reason: "",
    note: "",
  });

  const warehouses = ["Kho Hà Nội", "Kho Hồ Chí Minh", "Kho Đà Nẵng"];

  // Load products from localStorage and sync with inventory
  useEffect(() => {
    const productsData = localStorage.getItem("btldata_products");
    if (productsData) {
      try {
        const products = JSON.parse(productsData);

        // Sync inventory with products
        const updatedInventory = products.flatMap((product: any) => {
          return warehouses.map((warehouse) => {
            const existingItem = inventory.find(
              (item) =>
                item.productId === product.id && item.warehouse === warehouse,
            );

            if (existingItem) {
              return existingItem;
            }

            return {
              id: inventory.length + Math.random(),
              productId: product.id,
              productName: product.name,
              sku: product.sku,
              warehouse,
              stock: 0,
              reserved: 0,
              available: 0,
              minStock: 10,
              status: "Hết hàng",
              lastUpdated: new Date().toISOString(),
            };
          });
        });

        setInventory(updatedInventory);
      } catch (error) {
        console.error("Error syncing inventory:", error);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("btldata_inventory", JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem(
      "btldata_stock_transactions",
      JSON.stringify(transactions),
    );
  }, [transactions]);

  const filteredInventory = useMemo(() => {
    let filtered = inventory;

    if (selectedWarehouse !== "Tất cả kho") {
      filtered = filtered.filter(
        (item) => item.warehouse === selectedWarehouse,
      );
    }

    if (searchTerm) {
      const keyword = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.productName.toLowerCase().includes(keyword) ||
          item.sku.toLowerCase().includes(keyword),
      );
    }

    return filtered;
  }, [inventory, selectedWarehouse, searchTerm]);

  const getStatusFromStock = (stock: number, minStock: number) => {
    if (stock === 0) return "Hết hàng";
    if (stock <= minStock) return "Sắp hết";
    return "Đủ hàng";
  };

  const handleOpenTransactionForm = (
    type: "NHAP" | "XUAT" | "KIEM_KE" | "DIEU_CHINH",
    item?: InventoryItem,
  ) => {
    setTransactionForm({
      type,
      productId: item?.productId || 0,
      warehouse: item?.warehouse || "Kho Hà Nội",
      quantity: 0,
      reason: "",
      note: "",
    });
    setSelectedProduct(item || null);
    setShowTransactionForm(true);
  };

  const handleCloseTransactionForm = () => {
    setShowTransactionForm(false);
    setSelectedProduct(null);
    setTransactionForm({
      type: "NHAP",
      productId: 0,
      warehouse: "Kho Hà Nội",
      quantity: 0,
      reason: "",
      note: "",
    });
  };

  const handleSubmitTransaction = (e: React.FormEvent) => {
    e.preventDefault();

    const item = inventory.find(
      (inv) =>
        inv.productId === transactionForm.productId &&
        inv.warehouse === transactionForm.warehouse,
    );

    if (!item) {
      alert("Không tìm thấy sản phẩm trong kho!");
      return;
    }

    const beforeStock = item.stock;
    let afterStock = beforeStock;

    switch (transactionForm.type) {
      case "NHAP":
        afterStock = beforeStock + transactionForm.quantity;
        break;
      case "XUAT":
        if (transactionForm.quantity > item.available) {
          alert("Số lượng xuất vượt quá số lượng khả dụng!");
          return;
        }
        afterStock = beforeStock - transactionForm.quantity;
        break;
      case "KIEM_KE":
        afterStock = transactionForm.quantity;
        break;
      case "DIEU_CHINH":
        afterStock = beforeStock + transactionForm.quantity;
        break;
    }

    // Create transaction record
    const newTransaction: StockTransaction = {
      id: transactions.length + 1,
      type: transactionForm.type,
      productId: item.productId,
      productName: item.productName,
      sku: item.sku,
      warehouse: transactionForm.warehouse,
      quantity: transactionForm.quantity,
      beforeStock,
      afterStock,
      reason: transactionForm.reason,
      note: transactionForm.note,
      createdBy: "Admin",
      createdAt: new Date().toISOString(),
    };

    setTransactions([newTransaction, ...transactions]);

    // Update inventory
    setInventory(
      inventory.map((inv) => {
        if (
          inv.productId === item.productId &&
          inv.warehouse === item.warehouse
        ) {
          const newStock = afterStock;
          const newAvailable = newStock - inv.reserved;
          return {
            ...inv,
            stock: newStock,
            available: newAvailable,
            status: getStatusFromStock(newStock, inv.minStock),
            lastUpdated: new Date().toISOString(),
          };
        }
        return inv;
      }),
    );

    alert("Ghi nhận giao dịch kho thành công!");
    handleCloseTransactionForm();
  };

  const handleShowHistory = (item: InventoryItem) => {
    setSelectedProduct(item);
    setShowHistoryModal(true);
  };

  const productTransactions = useMemo(() => {
    if (!selectedProduct) return [];
    return transactions.filter(
      (t) =>
        t.productId === selectedProduct.productId &&
        t.warehouse === selectedProduct.warehouse,
    );
  }, [transactions, selectedProduct]);

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case "NHAP":
        return "Nhập kho";
      case "XUAT":
        return "Xuất kho";
      case "KIEM_KE":
        return "Kiểm kê";
      case "DIEU_CHINH":
        return "Điều chỉnh";
      default:
        return type;
    }
  };

  const getTransactionTypeClass = (type: string) => {
    switch (type) {
      case "NHAP":
        return "badge-green";
      case "XUAT":
        return "badge-red";
      case "KIEM_KE":
        return "badge-blue";
      case "DIEU_CHINH":
        return "badge-orange";
      default:
        return "badge-gray";
    }
  };

  const summaryStats = useMemo(() => {
    const filtered =
      selectedWarehouse === "Tất cả kho"
        ? inventory
        : inventory.filter((i) => i.warehouse === selectedWarehouse);

    return {
      totalProducts: filtered.length,
      totalStock: filtered.reduce((sum, item) => sum + item.stock, 0),
      totalAvailable: filtered.reduce((sum, item) => sum + item.available, 0),
      lowStock: filtered.filter(
        (item) => item.status === "Sắp hết" || item.status === "Hết hàng",
      ).length,
    };
  }, [inventory, selectedWarehouse]);

  return (
    <div className="page-content inventory-page">
      <div className="page-header">
        <h2>Quản lý kho hàng</h2>
        <button
          className="btn-primary"
          onClick={() => handleOpenTransactionForm("NHAP")}
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
          Nhập kho
        </button>
      </div>

      {/* Summary Cards */}
      <div className="inventory-summary">
        <div className="summary-card">
          <div className="summary-icon blue">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
          </div>
          <div className="summary-content">
            <span className="summary-label">Tổng sản phẩm</span>
            <strong className="summary-value">
              {summaryStats.totalProducts}
            </strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon green">
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
          </div>
          <div className="summary-content">
            <span className="summary-label">Tổng tồn kho</span>
            <strong className="summary-value">{summaryStats.totalStock}</strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon purple">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div className="summary-content">
            <span className="summary-label">Khả dụng</span>
            <strong className="summary-value">
              {summaryStats.totalAvailable}
            </strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon orange">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div className="summary-content">
            <span className="summary-label">Cảnh báo tồn kho</span>
            <strong className="summary-value text-orange">
              {summaryStats.lowStock}
            </strong>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="inventory-toolbar">
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
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên sản phẩm, SKU..."
          />
        </div>

        <select
          className="filter-select"
          value={selectedWarehouse}
          onChange={(e) => setSelectedWarehouse(e.target.value)}
        >
          <option>Tất cả kho</option>
          {warehouses.map((wh) => (
            <option key={wh}>{wh}</option>
          ))}
        </select>
      </div>

      {/* Inventory Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Sản phẩm</th>
              <th>SKU</th>
              <th>Kho</th>
              <th>Tồn kho</th>
              <th>Đã đặt</th>
              <th>Khả dụng</th>
              <th>Tồn tối thiểu</th>
              <th>Trạng thái</th>
              <th>Cập nhật</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.length > 0 ? (
              filteredInventory.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.productName}</td>
                  <td>
                    <code>{item.sku}</code>
                  </td>
                  <td>{item.warehouse}</td>
                  <td>
                    <strong>{item.stock}</strong>
                  </td>
                  <td>{item.reserved}</td>
                  <td>
                    <strong className="text-green">{item.available}</strong>
                  </td>
                  <td>{item.minStock}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === "Đủ hàng"
                          ? "badge-green"
                          : item.status === "Sắp hết"
                            ? "badge-orange"
                            : "badge-red"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    {new Date(item.lastUpdated).toLocaleDateString("vi-VN")}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-action btn-action-success"
                        title="Nhập kho"
                        onClick={() => handleOpenTransactionForm("NHAP", item)}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="12" y1="19" x2="12" y2="5" />
                          <polyline points="5 12 12 5 19 12" />
                        </svg>
                        <span>Nhập</span>
                      </button>
                      <button
                        className="btn-action btn-action-danger"
                        title="Xuất kho"
                        onClick={() => handleOpenTransactionForm("XUAT", item)}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <polyline points="19 12 12 19 5 12" />
                        </svg>
                        <span>Xuất</span>
                      </button>
                      <button
                        className="btn-action btn-action-info"
                        title="Lịch sử"
                        onClick={() => handleShowHistory(item)}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>Lịch sử</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11}>
                  <div className="empty-state">
                    <h3>Không có dữ liệu kho hàng</h3>
                    <p>Hãy thêm sản phẩm và nhập kho để bắt đầu quản lý.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Transaction Form Modal */}
      {showTransactionForm && (
        <div className="modal-overlay" onClick={handleCloseTransactionForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{getTransactionTypeLabel(transactionForm.type)}</h3>
              <button
                className="modal-close"
                onClick={handleCloseTransactionForm}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmitTransaction}>
              <div className="modal-body">
                <div className="form-grid">
                  <label>
                    Loại giao dịch
                    <select
                      value={transactionForm.type}
                      onChange={(e) =>
                        setTransactionForm({
                          ...transactionForm,
                          type: e.target.value as any,
                        })
                      }
                      required
                    >
                      <option value="NHAP">Nhập kho</option>
                      <option value="XUAT">Xuất kho</option>
                      <option value="KIEM_KE">Kiểm kê</option>
                      <option value="DIEU_CHINH">Điều chỉnh</option>
                    </select>
                  </label>

                  <label>
                    Sản phẩm
                    <select
                      value={transactionForm.productId}
                      onChange={(e) =>
                        setTransactionForm({
                          ...transactionForm,
                          productId: Number(e.target.value),
                        })
                      }
                      required
                    >
                      <option value={0}>-- Chọn sản phẩm --</option>
                      {inventory
                        .filter(
                          (item, index, self) =>
                            index ===
                            self.findIndex(
                              (t) => t.productId === item.productId,
                            ),
                        )
                        .map((item) => (
                          <option key={item.productId} value={item.productId}>
                            {item.productName} ({item.sku})
                          </option>
                        ))}
                    </select>
                  </label>

                  <label>
                    Kho
                    <select
                      value={transactionForm.warehouse}
                      onChange={(e) =>
                        setTransactionForm({
                          ...transactionForm,
                          warehouse: e.target.value,
                        })
                      }
                      required
                    >
                      {warehouses.map((wh) => (
                        <option key={wh} value={wh}>
                          {wh}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    {transactionForm.type === "KIEM_KE"
                      ? "Số lượng thực tế"
                      : "Số lượng"}
                    <input
                      type="number"
                      min="0"
                      value={transactionForm.quantity}
                      onChange={(e) =>
                        setTransactionForm({
                          ...transactionForm,
                          quantity: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </label>

                  <label className="full-width">
                    Lý do
                    <input
                      type="text"
                      value={transactionForm.reason}
                      onChange={(e) =>
                        setTransactionForm({
                          ...transactionForm,
                          reason: e.target.value,
                        })
                      }
                      placeholder="VD: Nhập hàng từ nhà cung cấp, Xuất bán cho khách..."
                      required
                    />
                  </label>

                  <label className="full-width">
                    Ghi chú
                    <textarea
                      value={transactionForm.note}
                      onChange={(e) =>
                        setTransactionForm({
                          ...transactionForm,
                          note: e.target.value,
                        })
                      }
                      rows={3}
                      placeholder="Ghi chú thêm về giao dịch..."
                    />
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCloseTransactionForm}
                >
                  Hủy
                </button>
                <button type="submit" className="btn-primary">
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && selectedProduct && (
        <div
          className="modal-overlay"
          onClick={() => setShowHistoryModal(false)}
        >
          <div
            className="modal-content modal-large"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h3>Lịch sử xuất nhập kho</h3>
                <p>
                  {selectedProduct.productName} - {selectedProduct.warehouse}
                </p>
              </div>
              <button
                className="modal-close"
                onClick={() => setShowHistoryModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="history-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Ngày giờ</th>
                      <th>Loại</th>
                      <th>Số lượng</th>
                      <th>Trước</th>
                      <th>Sau</th>
                      <th>Lý do</th>
                      <th>Ghi chú</th>
                      <th>Người thực hiện</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productTransactions.length > 0 ? (
                      productTransactions.map((trans) => (
                        <tr key={trans.id}>
                          <td>
                            {new Date(trans.createdAt).toLocaleString("vi-VN")}
                          </td>
                          <td>
                            <span
                              className={`badge ${getTransactionTypeClass(trans.type)}`}
                            >
                              {getTransactionTypeLabel(trans.type)}
                            </span>
                          </td>
                          <td>
                            <strong
                              className={
                                trans.type === "NHAP" ||
                                trans.type === "DIEU_CHINH"
                                  ? "text-green"
                                  : "text-red"
                              }
                            >
                              {trans.type === "NHAP" ||
                              trans.type === "DIEU_CHINH"
                                ? "+"
                                : "-"}
                              {trans.quantity}
                            </strong>
                          </td>
                          <td>{trans.beforeStock}</td>
                          <td>
                            <strong>{trans.afterStock}</strong>
                          </td>
                          <td>{trans.reason}</td>
                          <td>{trans.note || "-"}</td>
                          <td>{trans.createdBy}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8}>
                          <div className="empty-state">
                            <p>Chưa có giao dịch nào</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setShowHistoryModal(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InventoryPage;
