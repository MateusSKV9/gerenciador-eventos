import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCategories } from "@/hooks/useCategories"; // Ajuste a importação para o seu hook
import { CategoryProvider } from "./CategoryProvider";

// Wrapper para disponibilizar o contexto de categorias durante a execução do renderHook
const wrapper = ({ children }: { children: React.ReactNode }) => <CategoryProvider>{children}</CategoryProvider>;

describe("CategoryProvider / useCategories", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it("deve carregar as categorias iniciais quando não há dados no localStorage", () => {
		const { result } = renderHook(() => useCategories(), { wrapper });

		expect(result.current.categories.length).toBe(3);
		expect(result.current.categories[0].name).toBe("Importante");
	});

	it("deve buscar uma categoria específica pelo ID (getCategory)", () => {
		const { result } = renderHook(() => useCategories(), { wrapper });

		const category = result.current.getCategory("2");

		expect(category).toBeDefined();
		expect(category?.name).toBe("Trabalho");
		expect(category?.color).toBe("#2432ff");
	});

	it("deve criar uma nova categoria", () => {
		const { result } = renderHook(() => useCategories(), { wrapper });

		const newCategory = {
			id: "4",
			name: "Estudos",
			color: "#00ff88",
		};

		act(() => {
			result.current.createCategory(newCategory);
		});

		expect(result.current.categories.length).toBe(4);
		expect(result.current.getCategory("4")).toEqual(newCategory);
	});

	it("deve atualizar uma categoria existente", () => {
		const { result } = renderHook(() => useCategories(), { wrapper });

		act(() => {
			result.current.updateCategory("1", {
				name: "Urgente",
				color: "#cc0000",
			});
		});

		const updated = result.current.getCategory("1");
		expect(updated?.name).toBe("Urgente");
		expect(updated?.color).toBe("#cc0000");
	});

	it("deve remover uma categoria", () => {
		const { result } = renderHook(() => useCategories(), { wrapper });

		act(() => {
			result.current.deleteCategory("3");
		});

		expect(result.current.categories.length).toBe(2);
		expect(result.current.getCategory("3")).toBeUndefined();
	});

	it("deve persistir as alterações no localStorage quando o estado mudar", () => {
		const { result } = renderHook(() => useCategories(), { wrapper });

		act(() => {
			result.current.deleteCategory("1");
		});

		const stored = localStorage.getItem("categories");
		const parsed = JSON.parse(stored!);

		expect(parsed.length).toBe(2);
		expect(parsed.find((c: { id: string }) => c.id === "1")).toBeUndefined();
	});

	it("deve inicializar com dados previamente salvos no localStorage", () => {
		const mockCategories = [{ id: "99", name: "Customizada", color: "#ffffff" }];

		localStorage.setItem("categories", JSON.stringify(mockCategories));

		const { result } = renderHook(() => useCategories(), { wrapper });

		expect(result.current.categories.length).toBe(1);
		expect(result.current.categories[0].name).toBe("Customizada");
	});
});
