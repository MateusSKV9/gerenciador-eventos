import { describe, it, expect } from "vitest";
import { EventSchema, EventDataSchema } from "./eventSchema";

describe("Schemas - EventSchema", () => {
	it("deve validar com sucesso um evento completo", () => {
		const validEvent = {
			id: "event-123",
			name: "Conferência de React",
			categoryId: "cat-1",
			description: "Evento presencial sobre React e TypeScript",
			creationDate: "2026-08-01",
			expirationDate: "2027-10-15", // Data bem no futuro
		};

		const result = EventSchema.safeParse(validEvent);
		expect(result.success).toBe(true);
	});

	it("deve validar com sucesso os dados do formulário (EventDataSchema)", () => {
		// Se você usa o EventDataSchema no formulário (sem id e creationDate):
		const validFormData = {
			name: "Conferência de React",
			categoryId: "cat-1",
			description: "Descrição do evento",
			expirationDate: "2027-10-15",
		};

		const result = EventDataSchema.safeParse(validFormData);
		expect(result.success).toBe(true);
	});

	it("deve falhar se a data de expiração não for futura", () => {
		const pastEvent = {
			id: "event-123",
			name: "Evento Antigo",
			creationDate: "2020-01-01",
			expirationDate: "2020-01-02", // Data no passado
		};

		const result = EventSchema.safeParse(pastEvent);
		expect(result.success).toBe(false);
	});
});
