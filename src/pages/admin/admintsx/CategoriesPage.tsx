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
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [showAttributeModal, setShowAttributeModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [newAttributeName, setNewAttributeName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    icon: "📁",
    parentId: "",
    description: "",
    status: "Hoạt động",
  });

  const filteredCategories = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    if (!keyword) return categories;

    return categories.filter((category) => {
      const text =
        `${category.name} ${category.code} ${category.description}`.toLowerCase();
      return text.includes(keyword);
    });
  }, [categories, searchTerm]);

  const parentOptions = useMemo(() => {
    if (!editingCategory) {
      return categories;
    }

    return categories.filter((category) => category.id !== editingCategory.id);
  }, [categories, editingCategory]);

  const currentAttributes = useMemo(() => {
    if (!selectedCategory) {
      return [];
    }

    return getCategoryAttributes(selectedCategory.id);
  }, [getCategoryAttributes, selectedCategory]);

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      icon: "📁",
      parentId: "",
      description: "",
      status: "Hoạt động",
    });
    setEditingCategory(null);
  };

  const handleOpenAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  const handleCloseForm = () => {
    resetForm();
    setShowForm(false);
  };

  const handleOpenEditForm = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      code: category.code,
      icon: category.icon,
      parentId:
        category.parentId !== undefined && category.parentId !== null
          ? String(category.parentId)
          : "",
      description: category.description,
      status: category.status,
    });
    setOpenMenuId(null);
    setShowForm(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = formData.name.trim();
    const code = formData.code.trim().toUpperCase();
    const description = formData.description.trim();

    if (!name || !code || !description) {
      window.alert("Vui lòng nhập đầy đủ tên, mã và mô tả danh mục.");
      return;
    }

    const payload = {
      name,
      code,
      icon: formData.icon.trim() || "📁",
      parentId: formData.parentId ? Number(formData.parentId) : null,
      slug: createSlug(name),
      description,
      productCount: editingCategory?.productCount ?? 0,
      status: formData.status,
    };

    if (editingCategory) {
      updateCategory(editingCategory.id, payload);
    } else {
      addCategory(payload);
    }

    handleCloseForm();
  };

  const handleDeleteCategory = (categoryId: number) => {
    const confirmed = window.confirm(
      "Bạn có chắc muốn xóa danh mục này không?",
    );
    if (!confirmed) {
      return;
    }

    deleteCategory(categoryId);
    setOpenMenuId(null);
  };

  const handleManageAttributes = (category: Category) => {
    setSelectedCategory(category);
    setNewAttributeName("");
    setOpenMenuId(null);
    setShowAttributeModal(true);
  };

  const handleAddAttribute = () => {
    if (!selectedCategory) {
      return;
    }

    const attributeName = newAttributeName.trim();
    if (!attributeName) {
      return;
    }

    addCategoryAttribute(selectedCategory.id, attributeName);
    setNewAttributeName("");
  };

  const handleCloseAttributeModal = () => {
    setShowAttributeModal(false);
    setSelectedCategory(null);
    setNewAttributeName("");
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Danh mục sản phẩm</h2>
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
          <button
            type="button"
            className="btn-primary"
            onClick={handleOpenAddForm}
          >
            <span>+</span>
            Thêm danh mục
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên danh mục</th>
              <th>Mã</th>
              <th>Icon</th>
              <th>Mô tả</th>
              <th>Số sản phẩm</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length === 0 ? (
              <tr>
                <td colSpan={8}>Không tìm thấy danh mục phù hợp.</td>
              </tr>
            ) : (
              filteredCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.code}</td>
                  <td>{category.icon}</td>
                  <td>{category.description}</td>
                  <td>{category.productCount}</td>
                  <td>
                    <span
                      className={`badge ${
                        category.status === "Hoạt động"
                          ? "badge-green"
                          : "badge-red"
                      }`}
                    >
                      {category.status}
                    </span>
                  </td>
                  <td>
                    <div className="category-action-menu">
                      <button
                        type="button"
                        className="btn-menu"
                        onClick={() =>
                          setOpenMenuId((currentId) =>
                            currentId === category.id ? null : category.id,
                          )
                        }
                        aria-label={`Tùy chọn cho ${category.name}`}
                      >
                        <span>⋯</span>
                      </button>

                      {openMenuId === category.id && (
                        <div className="dropdown-menu">
                          <button
                            type="button"
                            className="dropdown-item"
                            onClick={() => handleOpenEditForm(category)}
                          >
                            <span>✏️</span>
                            Chỉnh sửa
                          </button>
                          <button
                            type="button"
                            className="dropdown-item"
                            onClick={() => handleManageAttributes(category)}
                          >
                            <span>⚙️</span>
                            Quản lý thuộc tính
                          </button>
                          <button
                            type="button"
                            className="dropdown-item dropdown-item-danger"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <span>🗑️</span>
                            Xóa danh mục
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="category-form-overlay" onClick={handleCloseForm}>
          <div
            className="category-form-card"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="category-form-header">
              <h3>
                {editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
              </h3>
              <p>
                Điền thông tin danh mục để hiển thị trong hệ thống quản trị.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="two-col-row">
                <label className="category-form-field">
                  Tên danh mục
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Ví dụ: Áo thể thao"
                  />
                </label>

                <label className="category-form-field">
                  Mã danh mục
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        code: event.target.value,
                      }))
                    }
                    placeholder="Ví dụ: DM06"
                  />
                </label>
              </div>

              <div className="two-col-row">
                <label className="category-form-field">
                  Icon
                  <input
                    type="text"
                    name="icon"
                    value={formData.icon}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        icon: event.target.value,
                      }))
                    }
                    placeholder="Ví dụ: 👕"
                  />
                </label>

                <label className="category-form-field">
                  Danh mục cha
                  <select
                    name="parentId"
                    value={formData.parentId}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        parentId: event.target.value,
                      }))
                    }
                  >
                    <option value="">Không có</option>
                    {parentOptions.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="category-form-field">
                Mô tả
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: event.target.value,
                    }))
                  }
                  placeholder="Nhập mô tả ngắn cho danh mục"
                />
              </label>

              <label className="category-form-field">
                Trạng thái
                <select
                  name="status"
                  value={formData.status}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: event.target.value,
                    }))
                  }
                >
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Tạm dừng">Tạm dừng</option>
                </select>
              </label>

              <div className="category-slug-preview">
                <span>Slug tự động:</span>
                <strong>{createSlug(formData.name || "danh-muc-moi")}</strong>
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
                  {editingCategory ? "Lưu thay đổi" : "Thêm danh mục"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
              <h3>Quản lý thuộc tính danh mục</h3>
              <p>
                Chọn danh mục ở bên trái rồi thêm thuộc tính cho danh mục đó.
              </p>
              <button
                type="button"
                className="modal-close-btn"
                onClick={handleCloseAttributeModal}
              >
                ✕
              </button>
            </div>

            <div className="attribute-management-layout">
              <div className="attribute-category-panel">
                <h4>Danh mục hiện có</h4>
                <div className="attribute-category-list">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      className={`attribute-category-item ${
                        selectedCategory?.id === category.id ? "active" : ""
                      }`}
                      onClick={() => {
                        setSelectedCategory(category);
                        setNewAttributeName("");
                      }}
                    >
                      <span className="attribute-category-icon">
                        {category.icon}
                      </span>
                      <span className="attribute-category-info">
                        <strong>{category.name}</strong>
                        <small>{category.code}</small>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="attribute-content-panel">
                {selectedCategory ? (
                  <>
                    <div className="attribute-selected-category">
                      <span>Đang chọn danh mục</span>
                      <strong>
                        {selectedCategory.icon} {selectedCategory.name}
                      </strong>
                    </div>

                    <div className="attribute-input-section">
                      <input
                        type="text"
                        value={newAttributeName}
                        onChange={(event) =>
                          setNewAttributeName(event.target.value)
                        }
                        placeholder="Ví dụ: Chất liệu, Kiểu dáng, Độ co giãn..."
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            handleAddAttribute();
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="btn-add-attribute"
                        onClick={handleAddAttribute}
                      >
                        Thêm thuộc tính
                      </button>
                    </div>

                    <div className="attribute-list-section">
                      <h4>Danh sách thuộc tính</h4>

                      {currentAttributes.length === 0 ? (
                        <div className="no-attributes">
                          Chưa có thuộc tính nào cho danh mục này.
                        </div>
                      ) : (
                        <div className="attribute-list">
                          {currentAttributes.map((attribute) => (
                            <div key={attribute.id} className="attribute-item">
                              <span>{attribute.name}</span>
                              <button
                                type="button"
                                className="btn-delete-attribute"
                                onClick={() =>
                                  deleteCategoryAttribute(
                                    selectedCategory.id,
                                    attribute.id,
                                  )
                                }
                                aria-label={`Xóa thuộc tính ${attribute.name}`}
                              >
                                <span>✕</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="no-attributes no-category-selected">
                    Hãy chọn một danh mục để bắt đầu thêm thuộc tính.
                  </div>
                )}
              </div>
            </div>

            <div className="attribute-modal-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={handleCloseAttributeModal}
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

export default CategoriesPage;
