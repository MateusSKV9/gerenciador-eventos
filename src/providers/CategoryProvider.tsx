import { useEffect, useState, type ReactNode } from "react";
import type { CategoryData, CategoryType } from "@/features/categories/schemas/category-schema";
import { CategoryContext } from "@/hooks/useCategories";

const initialCategories: CategoryType[] = [
	{ id: "1", name: "Importante", color: "#ff2424" },
	{ id: "2", name: "Trabalho", color: "#2432ff" },
	{ id: "3", name: "Aniversário", color: "#ff007b" },
];

type CategoryProviderProps = {
	children: ReactNode;
};

export function CategoryProvider({ children }: CategoryProviderProps) {
	const [categories, setCategories] = useState<CategoryType[]>(() => {
		const stored = localStorage.getItem("categories");
		return stored ? JSON.parse(stored) : initialCategories;
	});

	const getCategory = (id: string) => {
		return categories.find((category) => category.id === id);
	};

	const createCategory = (category: CategoryType) => {
		setCategories((prev) => [...prev, category]);
	};

	const updateCategory = (id: string, updatedCategory: CategoryData) => {
		setCategories((prev) =>
			prev.map((category) => (category.id === id ? { ...category, ...updatedCategory } : category))
		);
	};

	const deleteCategory = (id: string) => {
		setCategories((prev) => prev.filter((category) => category.id !== id));
	};

	useEffect(() => {
		localStorage.setItem("categories", JSON.stringify(categories));
	}, [categories]);

	const value = { categories, createCategory, updateCategory, deleteCategory, getCategory };

	return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
}
