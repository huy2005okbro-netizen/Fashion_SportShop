import { useMemo, useState } from "react";
import { useCategories, type Category } from "../CategoryContext";
import "../admincss/CategoriesPage.css";

function createSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function CategoriesPage() {
  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryAttributes,
    addCategoryAttribute,
    deleteCategoryAttribute,
  } = useCategories();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryCode, setCategoryCode] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("🏷️");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null,
  );
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [showAttributeModal, setShowAttributeModal] = useState(false);
  const [selectedCategoryForAttributes, setSelectedCategoryForAttributes] =
    useState<Category | null>(null);
  const [newAttributeName, setNewAttributeName] = useState("");

  const handleCloseForm = () => {
    setShowForm(false);
    setCategoryName("");
    setCategoryCode("");
    setCategoryIcon("🏷️");
    setCategoryDescription("");
    setEditingCategoryId(null);
  };

  const handleOpenAddForm = () => {
    setEditingCategoryId(null);
    setCategoryName("");
    setShowForm(true);
  };

  const handleOpenEditForm = (category: Category) => {
    setEditingCategoryId(category.id);
    setCategoryName(category.name);
    setCategoryCode(category.code);
    setCategoryIcon(category.icon);
    setCategoryDescription(category.description);
    setShowForm(true);
  };

  const handleSaveCategory = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = categoryName.trim();

    if (!name) {
      return;
    }

    const isDuplicate = categories.some(
      (category) =>
        category.name.toLowerCase() === name.toLowerCase() &&
        category.id !== editingCategoryId,
    );

    if (isDuplicate) {
      window.alert("Danh mục đã tồn tại.");
      return;
    }

    if (editingCategoryId !== null) {
      updateCategory(editingCategoryId, {
        name,
        code: categoryCode,
        icon: categoryIcon,
        description: categoryDescription,
        slug: createSlug(name),
      });
      handleCloseForm();
      return;
    }

    addCategory({
      name,
      code:
        categoryCode || `DM${String(categories.length + 1).padStart(2, "0")}`,
      icon: categoryIcon || "🏷️",
      description: categoryDescription,
      slug: createSlug(name),
      productCount: 0,
      status: "Hoạt động",
    });

    handleCloseForm();
  };

  const filteredCategories = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    if (!keyword) return categories;

    return categories.filter((category) => {
      const text =
        `${category.name} ${category.code} ${category.description}`.toLowerCase();
      return text.includes(keyword);
    });
  }, [categories, searchTerm]);

  const handleDeleteCategory = (categoryId: number) => {
    const category = categories.find((item) => item.id === categoryId);

    if (!category) {
      return;
    }

    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa danh mục "${category.name}" không?`,
    );

    if (!confirmed) {
      return;
    }

    deleteCategory(categoryId);
    setOpenMenuId(null);
  };

  const handleManageAttributes = (category: Category) => {
    setSelectedCategoryForAttributes(category);
    setShowAttributeModal(true);
    setOpenMenuId(null);
  };

  const handleCloseAttributeModal = () => {
    setShowAttributeModal(false);
    setSelectedCategoryForAttributes(null);
    setNewAttributeName("");
  };

  const handleAddAttribute = () => {
    if (!selectedCategoryForAttributes || !newAttributeName.trim()) {
      return;
    }

    addCategoryAttribute(
      selectedCategoryForAttributes.id,
      newAttributeName.trim(),
    );
    setNewAttributeName("");
  };

  const handleDeleteAttribute = (attributeId: string) => {
    if (!selectedCategoryForAttributes) return;
    deleteCategoryAttribute(selectedCategoryForAttributes.id, attributeId);
  };

  const formTitle =
    editingCategoryId !== null ? "Sửa danh mục" : "Thêm danh mục mới";
  const formDescription =
    editingCategoryId !== null
      ? "Cập nhật thông tin danh mục trong hệ thống."
      : "Tạo danh mục mới cho hệ thống bán đồ thể thao.";
  const submitLabel =
    editingCategoryId !== null ? "Lưu thay đổi" : "Lưu danh mục";

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Quản lý danh mục</h2>
        <div className="category-search-wrapper">
          <input
            type="text"
            placeholder="Tìm danh mục theo tên, mã, mô tả..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setSearchTerm("")}
            >
              Xóa
            </button>
          )}
        </div>
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
          Thêm danh mục
        </button>
      </div>

      {showForm && (
        <div className="category-form-overlay" onClick={handleCloseForm}>
          <form
            className="category-form-card"
            onSubmit={handleSaveCategory}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="category-form-header">
              <div>
                <h3>{formTitle}</h3>
                <p>{formDescription}</p>
              </div>
            </div>

            <label className="category-form-field">
              Tên danh mục
              <input
                type="text"
                value={categoryName}
                onChange={(event) => setCategoryName(event.target.value)}
                placeholder="VD: Giày chạy bộ"
                required
                autoFocus
              />
            </label>

            <div className="two-col-row">
              <label className="category-form-field">
                Mã danh mục
                <input
                  type="text"
                  value={categoryCode}
                  onChange={(event) => setCategoryCode(event.target.value)}
                  placeholder="VD: DM01"
                />
              </label>

              <label className="category-form-field">
                Icon (emoji)
                <input
                  type="text"
                  value={categoryIcon}
                  onChange={(event) => setCategoryIcon(event.target.value)}
                  placeholder="VD: 👟"
                />
              </label>
            </div>

            <label className="category-form-field">
              Mô tả
              <textarea
                rows={3}
                value={categoryDescription}
                onChange={(event) => setCategoryDescription(event.target.value)}
                placeholder="Nhập mô tả chi tiết về danh mục..."
              />
            </label>

            <div className="category-slug-preview">
              <span>Slug xem trước:</span>
              <strong>
                {categoryName.trim() ? createSlug(categoryName) : "..."}
              </strong>
            </div>

            <div className="category-form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={handleCloseForm}
              >
                Hủy
              </button>
              <button type="submit" className="btn-primary">
                {submitLabel}
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
              <th>Tên danh mục</th>
              <th>Mã</th>
              <th>Icon</th>
              <th>Mô tả</th>
              <th>Slug</th>
              <th>Số sản phẩm</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.code}</td>
                <td>{category.icon}</td>
                <td>{category.description}</td>
                <td>
                  <code>{category.slug}</code>
                </td>
                <td>{category.productCount}</td>
                <td>
                  <span className="badge badge-green">{category.status}</span>
                </td>
                <td>
                  <div className="action-buttons category-action-menu">
                    <button
                      className="btn-menu"
                      onClick={() =>
                        setOpenMenuId(
                          openMenuId === category.id ? null : category.id,
                        )
                      }
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <circle cx="12" cy="5" r="2" />
                        <circle cx="12" cy="12" r="2" />
                        <circle cx="12" cy="19" r="2" />
                      </svg>
                    </button>

                    {openMenuId === category.id && (
                      <div className="dropdown-menu">
                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={() => {
                            handleOpenEditForm(category);
                            setOpenMenuId(null);
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
                          Chính sửa
                        </button>

                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={() => handleManageAttributes(category)}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="1" />
                            <path d="M4.22 4.22a10 10 0 0 1 15.56 0M1.07 12a11 11 0 0 1 21.86 0M4.22 19.78a10 10 0 0 1 15.56 0" />
                          </svg>
                          Quản lý thuộc tính
                        </button>
                        <button
                          type="button"
                          className="dropdown-item dropdown-item-danger"
                          onClick={() => handleDeleteCategory(category.id)}
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
                          Xóa danh mục
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAttributeModal && (
        <div
          className="attribute-modal-overlay"
          onClick={handleCloseAttributeModal}
        >
          <div
            className="attribute-modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="attribute-modal-header">
              {selectedCategoryForAttributes ? (
                <>
                  <h3>
                    Quản lý thuộc tính - {selectedCategoryForAttributes.name}
                  </h3>
                  <p>Thêm hoặc chỉnh sửa thuộc tính cho danh mục này</p>
                </>
              ) : (
                <>
                  <h3>Chọn danh mục để quản lý thuộc tính</h3>
                  <p>Nhấn vào danh mục để xem và thêm thuộc tính.</p>
                </>
              )}
              <button
                className="modal-close-btn"
                onClick={handleCloseAttributeModal}
              >
                ✕
              </button>
            </div>
            {selectedCategoryForAttributes ? (
              <>
                <div className="attribute-input-section">
                  <input
                    type="text"
                    placeholder="Tên thuộc tính mới..."
                    value={newAttributeName}
                    onChange={(event) =>
                      setNewAttributeName(event.target.value)
                    }
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        handleAddAttribute();
                      }
                    }}
                  />
                  <button
                    className="btn-add-attribute"
                    onClick={handleAddAttribute}
                  >
                    + Thêm
                  </button>
                </div>

                <div className="attribute-list-section">
                  <h4>Thuộc tính hiện có</h4>
                  {getCategoryAttributes(selectedCategoryForAttributes.id)
                    .length === 0 ? (
                    <p className="no-attributes">
                      Chưa có thuộc tính nào. Hãy thêm thuộc tính mới.
                    </p>
                  ) : (
                    <div className="attribute-list">
                      {getCategoryAttributes(
                        selectedCategoryForAttributes.id,
                      ).map((attr) => (
                        <div key={attr.id} className="attribute-item">
                          <span>{attr.name}</span>
                          <button
                            className="btn-delete-attribute"
                            onClick={() => handleDeleteAttribute(attr.id)}
                            title="Xóa"
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="attribute-modal-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setSelectedCategoryForAttributes(null)}
                  >
                    Chọn danh mục khác
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={handleCloseAttributeModal}
                  >
                    Đóng
                  </button>
                </div>
              </>
            ) : (
              <div className="attribute-category-list">
                <h4>Danh sách danh mục</h4>
                {categories.length === 0 ? (
                  <p>Chưa có danh mục nào.</p>
                ) : (
                  <div className="category-list">
                    {categories.map((category) => (
                      <button
                        type="button"
                        key={category.id}
                        className="category-select-button"
                        onClick={() =>
                          setSelectedCategoryForAttributes(category)
                        }
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                )}
                <div className="attribute-modal-actions">
                  <button
                    className="btn-secondary"
                    onClick={handleCloseAttributeModal}
                  >
                    Đóng
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoriesPage;
