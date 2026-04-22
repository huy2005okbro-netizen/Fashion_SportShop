import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import api from "../../services/api";

export type CategoryAttribute = {
  id: string;
  categoryId: number;
  name: string;
};

export type Category = {
  id: number;
  name: string;
  code: string;
  icon: string;
  parentId?: number | null;
  slug: string;
  description: string;
  productCount: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

interface CategoryContextType {
  categories: Category[];
  loading: boolean;
  error: string | null;
  addCategory: (category: Omit<Category, "id">) => Promise<void>;
  updateCategory: (id: number, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
  getCategoryById: (id: number) => Category | undefined;
  getCategoryAttributes: (categoryId: number) => CategoryAttribute[];
  addCategoryAttribute: (
    categoryId: number,
    attributeName: string,
  ) => Promise<void>;
  deleteCategoryAttribute: (
    categoryId: number,
    attributeId: string,
  ) => Promise<void>;
  refreshCategories: () => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined,
);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [attributes, setAttributes] = useState<
    Record<number, CategoryAttribute[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.categories.getAll();

      if (response.success && response.data) {
        // Map API response to Category type
        const mappedCategories = response.data.map((cat: any) => ({
          id: cat.id || cat.Id,
          name: cat.name || cat.Name,
          code: cat.code || cat.Code,
          icon: cat.icon || cat.Icon || "📁",
          parentId: cat.parentId || cat.ParentId,
          slug: cat.slug || createSlug(cat.name || cat.Name),
          description: cat.description || cat.Description || "",
          productCount: cat.productCount || 0,
          status: cat.status || cat.Status || "Hoạt động",
          createdAt: cat.createdAt || cat.CreatedAt,
          updatedAt: cat.updatedAt || cat.UpdatedAt,
        }));
        setCategories(mappedCategories);
      }
    } catch (err: any) {
      console.error("Error fetching categories:", err);
      setError(err.message || "Không thể tải danh mục");
    } finally {
      setLoading(false);
    }
  };

  // Fetch attributes for a category
  const fetchCategoryAttributes = async (categoryId: number) => {
    try {
      const response = await api.categories.getAttributes(categoryId);
      if (response.success && response.data) {
        setAttributes((prev) => ({
          ...prev,
          [categoryId]: response.data,
        }));
      }
    } catch (err) {
      console.error(
        `Error fetching attributes for category ${categoryId}:`,
        err,
      );
    }
  };

  // Load categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Load attributes for all categories
  useEffect(() => {
    categories.forEach((cat) => {
      if (!attributes[cat.id]) {
        fetchCategoryAttributes(cat.id);
      }
    });
  }, [categories]);

  const addCategory = async (newCategory: Omit<Category, "id">) => {
    try {
      const response = await api.categories.create({
        name: newCategory.name,
        code: newCategory.code,
        icon: newCategory.icon,
        parentId: newCategory.parentId || null,
        description: newCategory.description,
        status: newCategory.status,
      });

      if (response.success && response.data) {
        // Refresh categories list
        await fetchCategories();
      }
    } catch (err: any) {
      console.error("Error adding category:", err);
      alert(err.message || "Không thể thêm danh mục");
      throw err;
    }
  };

  const updateCategory = async (id: number, updates: Partial<Category>) => {
    try {
      const response = await api.categories.update(id, {
        name: updates.name,
        code: updates.code,
        icon: updates.icon,
        parentId: updates.parentId,
        description: updates.description,
        status: updates.status,
      });

      if (response.success) {
        // Refresh categories list
        await fetchCategories();
      }
    } catch (err: any) {
      console.error("Error updating category:", err);
      alert(err.message || "Không thể cập nhật danh mục");
      throw err;
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      const response = await api.categories.delete(id);

      if (response.success) {
        // Refresh categories list
        await fetchCategories();
      }
    } catch (err: any) {
      console.error("Error deleting category:", err);
      alert(err.message || "Không thể xóa danh mục");
      throw err;
    }
  };

  const getCategoryById = (id: number) => {
    return categories.find((cat) => cat.id === id);
  };

  const getCategoryAttributes = (categoryId: number) => {
    return attributes[categoryId] || [];
  };

  const addCategoryAttribute = async (
    categoryId: number,
    attributeName: string,
  ) => {
    try {
      const response = await api.categories.addAttribute(
        categoryId,
        attributeName,
      );

      if (response.success) {
        // Refresh attributes for this category
        await fetchCategoryAttributes(categoryId);
      }
    } catch (err: any) {
      console.error("Error adding attribute:", err);
      alert(err.message || "Không thể thêm thuộc tính");
      throw err;
    }
  };

  const deleteCategoryAttribute = async (
    categoryId: number,
    attributeId: string,
  ) => {
    try {
      const response = await api.categories.deleteAttribute(
        categoryId,
        attributeId,
      );

      if (response.success) {
        // Refresh attributes for this category
        await fetchCategoryAttributes(categoryId);
      }
    } catch (err: any) {
      console.error("Error deleting attribute:", err);
      alert(err.message || "Không thể xóa thuộc tính");
      throw err;
    }
  };

  const refreshCategories = async () => {
    await fetchCategories();
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        error,
        addCategory,
        updateCategory,
        deleteCategory,
        getCategoryById,
        getCategoryAttributes,
        addCategoryAttribute,
        deleteCategoryAttribute,
        refreshCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategories must be used within CategoryProvider");
  }
  return context;
}

// Helper function
function createSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
