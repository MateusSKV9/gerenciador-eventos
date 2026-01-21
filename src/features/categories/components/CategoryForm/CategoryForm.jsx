import { useSearchParams } from "react-router";
import { Form } from "../../../../shared/components/Form/Form";
import { Input } from "../../../../shared/components/Input/Input";
import styles from "./CategoryForm.module.css";
import { useCategories } from "../../../../hooks/useCategories";
import { useEffect, useState } from "react";

export function CategoryForm({ textSubmitButton }) {
	const { createCategory, updateCategory, getCategory } = useCategories();
	const [searchParamns] = useSearchParams();

	const id = searchParamns.get("category")?.toLowerCase();
	const categoryData = id ? getCategory(id) : {};

	const [category, setCategory] = useState({});

	const handleSubmit = (e) => {
		try {
			e.preventDefault();

			if (id) {
				updateCategory(category);
			} else {
				createCategory({ id: crypto.randomUUID(), ...category });
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = (e) => {
		setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	return (
		<Form handleSubmit={handleSubmit}>
			<Input
				value={categoryData ? categoryData.name : ""}
				id="name"
				handleChange={handleChange}
				label="Nome da categoria"
				name="name"
				placeholder="Digite o nome da categoria"
				type="text"
			/>
			<Input
				handleChange={handleChange}
				value={categoryData ? categoryData.color : ""}
				id="color"
				label="Cor"
				name="color"
				type="color"
			/>
			<input className={styles.submitButton} type="submit" value={textSubmitButton} />
		</Form>
	);
}
