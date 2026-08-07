import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, SubmitButton } from "@/shared";
import { useCategories } from "@/hooks";
import {
	CategoryDataSchema,
	type CategoryData,
	type CategoryType,
} from "@/features/categories/schemas/category-schema";

type CategoryFormProps = {
	closeModal: () => void;
	categoryData?: CategoryType;
	textSubmitButton: string;
};

export function CategoryForm({ closeModal, categoryData, textSubmitButton }: CategoryFormProps) {
	const { createCategory, updateCategory } = useCategories();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<CategoryData>({
		resolver: zodResolver(CategoryDataSchema),
		defaultValues: categoryData || { name: "", color: "#000000" },
	});

	const handleOnSubmit = (data: CategoryData) => {
		if (categoryData?.id) updateCategory(categoryData?.id, { ...data });
		else createCategory({ id: crypto.randomUUID(), ...data });

		closeModal();
	};

	return (
		<Form onSubmit={handleSubmit(handleOnSubmit)}>
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
