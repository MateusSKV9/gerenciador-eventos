import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { EventProvider } from "./EventProvider";
import { useEvents } from "@/hooks/useEvents";

const wrapper = ({ children }: { children: React.ReactNode }) => <EventProvider>{children}</EventProvider>;

describe("useEvents", () => {
	beforeEach(() => {
		localStorage.clear();
	});
	it("deve carregar os eventos iniciais quando não há dados no localStorage", () => {
		const { result } = renderHook(() => useEvents(), { wrapper });
		expect(result.current.events.length).toBe(3);
	});
	it("deve criar um novo evento", () => {
		const { result } = renderHook(() => useEvents(), { wrapper });
		act(() => {
			result.current.createEvent({
				name: "Novo Evento",
				categoryId: "1",
				description: "Teste",
				expirationDate: "2026-12-31",
			});
		});
		expect(result.current.events.length).toBe(4);
		expect(result.current.events[3].name).toBe("Novo Evento");
	});
	it("deve atualizar um evento existente", () => {
		const { result } = renderHook(() => useEvents(), { wrapper });
		act(() => {
			result.current.updateEvent("1", {
				name: "Evento Atualizado",
				categoryId: "1",
				description: "Atualizado",
				expirationDate: "2026-01-25",
			});
		});
		const updated = result.current.getEvent("1");
		expect(updated?.name).toBe("Evento Atualizado");
	});
	it("deve remover um evento", () => {
		const { result } = renderHook(() => useEvents(), { wrapper });
		act(() => {
			result.current.deleteEvent("1");
		});
		expect(result.current.events.length).toBe(2);
		expect(result.current.getEvent("1")).toBeUndefined();
	});
	it("deve persistir os eventos no localStorage", () => {
		const { result } = renderHook(() => useEvents(), { wrapper });
		act(() => {
			result.current.createEvent({
				name: "Persistido",
				categoryId: "1",
				description: "Teste",
				expirationDate: "2026-12-31",
			});
		});
		const stored = localStorage.getItem("events");
		const parsed = JSON.parse(stored!);
		expect(parsed.length).toBe(4);
		expect(parsed[3].name).toBe("Persistido");
	});
	it("deve sincronizar o estado com o localStorage na inicialização", () => {
		const mockEvents = [
			{
				id: "10",
				name: "Do Storage",
				categoryId: "1",
				description: "Teste",
				creationDate: "2026-01-01",
				expirationDate: "2026-01-10",
			},
		];
		localStorage.setItem("events", JSON.stringify(mockEvents));
		const { result } = renderHook(() => useEvents(), { wrapper });
		expect(result.current.events.length).toBe(1);
		expect(result.current.events[0].name).toBe("Do Storage");
	});
});
