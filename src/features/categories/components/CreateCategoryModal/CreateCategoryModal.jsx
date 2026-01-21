import { useSearchParams } from "react-router";
import { useCategories } from "../../../../hooks/useCategories";
import { CreateModal } from "../../../../shared/components/CreateModal/CreateModal";
import { CategoryForm } from "../CategoryForm/CategoryForm";

export function CreateCategoryModal({ closeModal }) {
	const { getCategory } = useCategories();
	const [searchParams] = useSearchParams();
	const id = searchParams.get("category");
	const categoryData = id ? getCategory(id) : { name: "", color: "#000000" };

	return (
		<CreateModal close={closeModal}>
			<CategoryForm
				key={id || "new"}
				categoryData={categoryData}
				textSubmitButton={`${id ? "Salvar" : "Criar"}`}
				closeModal={closeModal}
			/>
		</CreateModal>
	);
}
