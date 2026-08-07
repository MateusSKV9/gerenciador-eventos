import { isAfter, isValid, parseISO } from "date-fns";
import z from "zod";

export const EventSchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1, "Nome é obrigatório"),

	expirationDate: z
		.string()
		.min(1, "Data de expiração é obrigatória")
		.refine((date) => isValid(parseISO(date)), { message: "Data inválida" })
		.refine((date) => isAfter(parseISO(date), new Date()), { message: "A data deve ser futura" }),

	creationDate: z.string().min(1),

	categoryId: z.string().optional(),

	description: z.string().max(150, "Máximo de 150 caracteres").optional(),
});
export type EventType = z.infer<typeof EventSchema>;

export const EventDataSchema = EventSchema.omit({ id: true, creationDate: true });
export type EventData = z.infer<typeof EventDataSchema>;
