import { useEffect, useState } from "react";

const initialCategories = [
	{ id: "1", name: "Importante" },
	{ id: "2", name: "Trabalho" },
];

export function useCategories() {
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
		setCategories((prev) => prev.map((category) => category.id !== id));
	};

	useEffect(() => {
		localStorage.setItem("categories", JSON.stringify(categories));
	}, [categories]);

	return { categories, createCategory, updateCategory, deleteCategory, getCategory };
}
