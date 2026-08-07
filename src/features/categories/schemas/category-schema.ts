import z from "zod";

export const CategorySchema = z.object({
	id: z.string(),
	name: z.string().min(1, "Nome é obrigatório").max(45, "Máximo de 45 caracteres"),
	color: z.string().min(1, "Cor é obrigatória"),
});
export type CategoryType = z.infer<typeof CategorySchema>;

export const CategoryDataSchema = CategorySchema.omit({ id: true });
export type CategoryData = z.infer<typeof CategoryDataSchema>;
