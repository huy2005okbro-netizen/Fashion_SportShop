import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Category = {
  id: number;
  name: string;
  code: string;
  icon: string;
  parentId: number | null;
  slug: string;
  description: string;
  productCount: number;
  status: string;
};

const LOCAL_STORAGE_CATEGORY_KEY = "btldata_categories";

const initialCategories: Category[] = [
  {
    id: 1,
    name: "Áo",
    code: "DM01",
    icon: "👕",
    parentId: null,
    slug: "ao",
    description: "Danh mục áo thể thao",
    productCount: 245,
    status: "Hoạt động",
  },
  {
    id: 2,
    name: "Quần",
    code: "DM02",
    icon: "👖",
    parentId: null,
    slug: "quan",
    description: "Danh mục quần thể thao",
    productCount: 189,
    status: "Hoạt động",
  },
  {
    id: 3,
    name: "Váy",
    code: "DM03",
    icon: "👗",
    parentId: null,
    slug: "vay",
    description: "Danh mục váy thể thao",
    productCount: 156,
    status: "Hoạt động",
  },
  {
    id: 4,
    name: "Giày",
    code: "DM04",
    icon: "👟",
    parentId: null,
    slug: "giay",
    description: "Danh mục giày thể thao",
    productCount: 312,
    status: "Hoạt động",
  },
  {
    id: 5,
    name: "Phụ kiện",
    code: "DM05",
    icon: "🎒",
    parentId: null,
    slug: "phu-kien",
    description: "Danh mục phụ kiện thể thao",
    productCount: 198,
    status: "Hoạt động",
  },
];

interface CategoryContextType {
  categories: Category[];
  addCategory: (category: Omit<Category, "id">) => void;
  updateCategory: (id: number, category: Partial<Category>) => void;
  deleteCategory: (id: number) => void;
  getCategoryById: (id: number) => Category | undefined;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined,
);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(() => {
    if (typeof window === "undefined") return initialCategories;

    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CATEGORY_KEY);
      if (!saved) return initialCategories;
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      // ignore parse errors
    }

    return initialCategories;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(
      LOCAL_STORAGE_CATEGORY_KEY,
      JSON.stringify(categories),
    );
  }, [categories]);

  const addCategory = (newCategory: Omit<Category, "id">) => {
    const id = categories.length
      ? Math.max(...categories.map((c) => c.id)) + 1
      : 1;
    setCategories((prev) => [...prev, { ...newCategory, id }]);
  };

  const updateCategory = (id: number, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, ...updates } : cat)),
    );
  };

  const deleteCategory = (id: number) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const getCategoryById = (id: number) => {
    return categories.find((cat) => cat.id === id);
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        getCategoryById,
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
