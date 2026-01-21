import { Form } from "../../../../shared/components/Form/Form";
import { Input } from "../../../../shared/components/Input/Input";
import { useCategories } from "../../../../hooks/useCategories";
import { useState } from "react";
export function CategoryForm({ closeModal, categoryData, textSubmitButton }) {
	const { createCategory, updateCategory } = useCategories();
	const [category, setCategory] = useState(categoryData);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (category.id) {
			updateCategory(category);
		} else {
			createCategory({ ...category, id: crypto.randomUUID() });
		}
		closeModal();
	};

	const handleChange = (e) => {
		setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	return (
		<Form handleSubmit={handleSubmit}>
			<Input
				id="name"
				name="name"
				value={category.name || ""}
				handleChange={handleChange}
				label="Nome da categoria"
				placeholder="Digite o nome da categoria"
				type="text"
			/>
			<Input
				id="color"
				name="color"
				value={category.color || "#000000"}
				handleChange={handleChange}
				label="Cor"
				type="color"
			/>
			<input type="submit" value={textSubmitButton} />
		</Form>
	);
}
