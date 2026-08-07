import type { CategoryData, CategoryType } from "@/features/categories/schemas/category-schema";
import { createContext, useContext } from "react";

type CategoryContextType = {
	categories: CategoryType[];
	getCategory: (id: string) => CategoryType | undefined;
	createCategory: (category: CategoryType) => void;
	updateCategory: (id: string, updatedCategory: CategoryData) => void;
	deleteCategory: (id: string) => void;
};

export const CategoryContext = createContext<CategoryContextType | null>(null);

export const useCategories = () => {
	const context = useContext(CategoryContext);

	if (!context) {
		throw new Error("useCategories deve ser usado dentro de um CategoryProvider");
	}

	return context;
};
