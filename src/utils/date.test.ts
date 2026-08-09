import { describe, it, expect } from "vitest";
import { getDaysRemaining, getRemainingProgressPercentage } from "./date";

describe("Utils - date.ts", () => {
	const MOCK_TODAY = "2026-08-07";

	describe("getDaysRemaining", () => {
		it("deve calcular corretamente os dias restantes para uma data futura", () => {
			const expirationDate = "2026-08-12";
			expect(getDaysRemaining(expirationDate, MOCK_TODAY)).toBe(5);
		});

		it("deve retornar 0 para evento no mesmo dia", () => {
			expect(getDaysRemaining(MOCK_TODAY, MOCK_TODAY)).toBe(0);
		});

		it("deve retornar valor negativo para evento expirado", () => {
			const pastDate = "2026-08-02";
			expect(getDaysRemaining(pastDate, MOCK_TODAY)).toBe(-5);
		});

		it("deve calcular corretamente na virada de ano", () => {
			const base = "2026-12-30";
			const expiration = "2027-01-02";
			expect(getDaysRemaining(expiration, base)).toBe(3);
		});

		it("deve calcular corretamente em ano bissexto (fevereiro com 29 dias)", () => {
			const leapYearBase = "2028-02-28";
			const expiration = "2028-03-01";
			expect(getDaysRemaining(expiration, leapYearBase)).toBe(2);
		});

		it("deve retornar NaN ao passar uma data inválida", () => {
			expect(getDaysRemaining("data-invalida", MOCK_TODAY)).toBeNaN();
		});
	});

	describe("getRemainingProgressPercentage", () => {
		it("deve calcular a porcentagem restante no meio do ciclo do evento", () => {
			const creationDate = "2026-08-01";
			const expirationDate = "2026-08-11"; // total: 10 dias
			const current = "2026-08-06"; // decorridos: 5 dias (50%)

			// A função retorna 100 - percentage (100 - 50 = 50)
			expect(getRemainingProgressPercentage(creationDate, expirationDate, current)).toBe(50);
		});

		it("deve retornar 100 se o evento ainda não começou (progresso zerado)", () => {
			const creationDate = "2026-08-10";
			const expirationDate = "2026-08-20";
			const current = "2026-08-05";

			expect(getRemainingProgressPercentage(creationDate, expirationDate, current)).toBe(100);
		});

		it("deve retornar 0 se o evento já expirou totalmente", () => {
			const creationDate = "2026-08-01";
			const expirationDate = "2026-08-10";
			const current = "2026-08-15";

			expect(getRemainingProgressPercentage(creationDate, expirationDate, current)).toBe(0);
		});

		it("deve retornar 100 se totalDays for menor ou igual a 0", () => {
			const creationDate = "2026-08-10";
			const expirationDate = "2026-08-10";

			expect(getRemainingProgressPercentage(creationDate, expirationDate, MOCK_TODAY)).toBe(100);
		});
	});
});
