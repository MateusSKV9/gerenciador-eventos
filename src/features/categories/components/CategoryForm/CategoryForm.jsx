import { Form } from "../../../../shared/components/Form/Form";
import { Input } from "../../../../shared/components/Input/Input";
import { useCategories } from "../../../../hooks/useCategories";
import { SubmitButton } from "../../../../shared/components/SubmitButton/SubmitButton";
import { useForm } from "react-hook-form";

export function CategoryForm({ closeModal, categoryData, textSubmitButton }) {
	const { createCategory, updateCategory } = useCategories();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({ defaultValues: categoryData || {} });

	const handleOnSubmit = (data) => {
		if (categoryData.id) {
			updateCategory(data);
		} else {
			createCategory({ ...data, id: crypto.randomUUID() });
		}
		closeModal();
	};

	return (
		<Form handleSubmit={handleSubmit(handleOnSubmit)}>
			<Input
				id="name"
				label="Nome da categoria"
				placeholder="Digite o nome da categoria"
				type="text"
				error={errors.name?.message}
				{...register("name", { required: "Nome é obrigatório" })}
			/>
			<Input
				id="color"
				label="Cor"
				type="color"
				error={errors.color?.message}
				{...register("color", { required: "Cor é obrigatória" })}
			/>
			<SubmitButton text={textSubmitButton} />
		</Form>
	);
}
