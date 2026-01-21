import { useEffect, useState } from "react";
import { CategoryContext } from "../hooks/useCategories";

const initialCategories = [
	{ id: "1", name: "Importante", color: "#ff2424" },
	{ id: "2", name: "Trabalho", color: "#2432ff" },
	{ id: "3", name: "Aniversário", color: "#ff007b" },
];

export function CategoryProvider({ children }) {
	const [categories, setCategories] = useState(() => {
		const stored = localStorage.getItem("categories");
		return stored ? JSON.parse(stored) : initialCategories;
	});

	const createCategory = (category) => {
		setCategories((prev) => [...prev, category]);
	};

	const getCategory = (id) => {
		return categories.find((category) => category.id === id);
	};

	const updateCategory = (updatedCategory) => {
		setCategories((prev) => prev.map((category) => (category.id === updatedCategory.id ? updatedCategory : category)));
	};

	const deleteCategory = (id) => {
		setCategories((prev) => prev.filter((category) => category.id !== id));
	};

	useEffect(() => {
		localStorage.setItem("categories", JSON.stringify(categories));
	}, [categories]);

	const value = { categories, createCategory, updateCategory, deleteCategory, getCategory };

	return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
}
