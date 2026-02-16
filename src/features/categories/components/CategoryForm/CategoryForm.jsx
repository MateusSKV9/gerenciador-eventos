import { Form } from "../../../../shared/components/Form/Form";
import { Input } from "../../../../shared/components/Input/Input";
import { useCategories } from "../../../../hooks/useCategories";
import { SubmitButton } from "../../../../shared/components/SubmitButton/SubmitButton";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const categorySchema = z.object({
	name: z.string().min(1, "Nome é obrigatório").max(45, "Máximo de 45 caracteres"),
	color: z.string().min(1, "Cor é obrigatória"),
});

export function CategoryForm({ closeModal, categoryData, textSubmitButton }) {
	const { createCategory, updateCategory } = useCategories();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({ resolver: zodResolver(categorySchema), defaultValues: categoryData || {} });

	const handleOnSubmit = (data) => {
		if (categoryData?.id) {
			updateCategory({ id: categoryData.id, ...data });
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
				{...register("name")}
			/>
			<Input id="color" label="Cor" type="color" error={errors.color?.message} {...register("color")} />
			<SubmitButton text={textSubmitButton} />
		</Form>
	);
}
