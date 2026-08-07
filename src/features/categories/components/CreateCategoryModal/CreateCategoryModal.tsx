import { CategoryForm } from "@/features/categories/components/CategoryForm/CategoryForm";
import { useCategories } from "@/hooks";
import { CreateModal } from "@/shared";
import { useSearchParams } from "react-router";

type CreateCategoryModalProps = {
	closeModal: () => void;
};

export function CreateCategoryModal({ closeModal }: CreateCategoryModalProps) {
	const { getCategory } = useCategories();
	const [searchParams, setSearchParams] = useSearchParams();
	const id = searchParams.get("category");
	const categoryData = id ? getCategory(id) : undefined;

	const handleClose = () => {
		closeModal();
		setSearchParams({});
	};

	return (
		<CreateModal close={closeModal}>
			<CategoryForm
				key={id || "new"}
				categoryData={categoryData}
				textSubmitButton={`${id ? "Salvar" : "Criar"}`}
				closeModal={handleClose}
			/>
		</CreateModal>
	);
}
