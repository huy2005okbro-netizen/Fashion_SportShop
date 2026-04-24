import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

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

const STORAGE_KEY = "fashion-store-categories";
const ATTRIBUTES_STORAGE_KEY = "fashion-store-category-attributes";

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [attributes, setAttributes] = useState<
    Record<number, CategoryAttribute[]>
  >({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCategories(JSON.parse(stored));
      } else {
        // Initialize with sample data
        const initialCategories: Category[] = [
          {
            id: 1,
            name: "Giày thể thao",
            code: "GIAY",
            icon: "👟",
            slug: "giay-the-thao",
            description: "Các loại giày thể thao chuyên dụng",
            productCount: 0,
            status: "Hoạt động",
          },
          {
            id: 2,
            name: "Áo thể thao",
            code: "AO",
            icon: "👕",
            slug: "ao-the-thao",
            description: "Áo tập luyện và thi đấu",
            productCount: 0,
            status: "Hoạt động",
          },
          {
            id: 3,
            name: "Quần thể thao",
            code: "QUAN",
            icon: "👖",
            slug: "quan-the-thao",
            description: "Quần tập luyện và thi đấu",
            productCount: 0,
            status: "Hoạt động",
          },
          {
            id: 4,
            name: "Phụ kiện",
            code: "PHU-KIEN",
            icon: "🎒",
            slug: "phu-kien",
            description: "Các phụ kiện thể thao",
            productCount: 0,
            status: "Hoạt động",
          },
        ];
        setCategories(initialCategories);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCategories));
      }

      const storedAttrs = localStorage.getItem(ATTRIBUTES_STORAGE_KEY);
      if (storedAttrs) {
        setAttributes(JSON.parse(storedAttrs));
      } else {
        // Initialize with sample attributes
        const initialAttributes: Record<number, CategoryAttribute[]> = {
          1: [
            { id: "attr_1", categoryId: 1, name: "Kích cỡ" },
            { id: "attr_2", categoryId: 1, name: "Màu sắc" },
            { id: "attr_3", categoryId: 1, name: "Chất liệu" },
          ],
          2: [
            { id: "attr_4", categoryId: 2, name: "Size áo" },
            { id: "attr_5", categoryId: 2, name: "Màu sắc" },
          ],
        };
        setAttributes(initialAttributes);
        localStorage.setItem(
          ATTRIBUTES_STORAGE_KEY,
          JSON.stringify(initialAttributes),
        );
      }
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  }, []);

  // Save to localStorage whenever categories change
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    }
  }, [categories]);

  // Save to localStorage whenever attributes change
  useEffect(() => {
    localStorage.setItem(ATTRIBUTES_STORAGE_KEY, JSON.stringify(attributes));
  }, [attributes]);

  const addCategory = async (newCategory: Omit<Category, "id">) => {
    try {
      const maxId = categories.reduce((max, cat) => Math.max(max, cat.id), 0);
      const category: Category = {
        ...newCategory,
        id: maxId + 1,
        slug: createSlug(newCategory.name),
        productCount: 0,
      };
      setCategories([...categories, category]);
    } catch (err: any) {
      console.error("Error adding category:", err);
      throw err;
    }
  };

  const updateCategory = async (id: number, updates: Partial<Category>) => {
    try {
      setCategories(
        categories.map((cat) =>
          cat.id === id
            ? {
                ...cat,
                ...updates,
                slug: updates.name ? createSlug(updates.name) : cat.slug,
              }
            : cat,
        ),
      );
    } catch (err: any) {
      console.error("Error updating category:", err);
      throw err;
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      // Check if has children
      const hasChildren = categories.some((cat) => cat.parentId === id);
      if (hasChildren) {
        throw new Error("Không thể xóa danh mục có danh mục con");
      }
      setCategories(categories.filter((cat) => cat.id !== id));
      // Also delete attributes
      const newAttributes = { ...attributes };
      delete newAttributes[id];
      setAttributes(newAttributes);
    } catch (err: any) {
      console.error("Error deleting category:", err);
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
      const categoryAttrs = attributes[categoryId] || [];
      const maxId = Object.values(attributes)
        .flat()
        .reduce((max, attr) => {
          const num = parseInt(attr.id.replace("attr_", ""));
          return Math.max(max, num);
        }, 0);

      const newAttribute: CategoryAttribute = {
        id: `attr_${maxId + 1}`,
        categoryId,
        name: attributeName,
      };

      setAttributes({
        ...attributes,
        [categoryId]: [...categoryAttrs, newAttribute],
      });
    } catch (err: any) {
      console.error("Error adding attribute:", err);
      throw err;
    }
  };

  const deleteCategoryAttribute = async (
    categoryId: number,
    attributeId: string,
  ) => {
    try {
      const categoryAttrs = attributes[categoryId] || [];
      setAttributes({
        ...attributes,
        [categoryId]: categoryAttrs.filter((attr) => attr.id !== attributeId),
      });
    } catch (err: any) {
      console.error("Error deleting attribute:", err);
      throw err;
    }
  };

  const refreshCategories = async () => {
    // No-op for localStorage version
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
