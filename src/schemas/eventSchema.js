import { isAfter, isValid, parseISO } from "date-fns";
import z from "zod";

export const EventSchema = z.object({
	name: z.string().min(1, "Nome é obrigatório"),

	expirationDate: z
		.string()
		.min(1, "Data de expiração é obrigatória")
		.refine((date) => isValid(parseISO(date)), { message: "Data inválida" })
		.refine((date) => isAfter(parseISO(date), new Date()), { message: "A data deve ser futura" }),

	categoryId: z.string().optional(),

	description: z.string().max(150, "Máximo de 150 caracteres").optional(),
});
