import { useState } from "react";
import { CategoryCard, CreateCategoryModal } from "@/features/categories";
import { useModal, useCategories } from "@/hooks";
import { Button, SectionHeader } from "@/shared";
import styles from "./Categories.module.css";

export default function Categories() {
	const { categories } = useCategories();
	const { isCreateModalOpen, showModal, closeModal } = useModal();
	const [isMenuOpen, setIsMenuOpen] = useState<string | null>(null);

	return (
		<section>
			<SectionHeader title="Categorias">
				<Button onClick={showModal}>Nova categoria</Button>
			</SectionHeader>

			<div className={styles.container_categories}>
				{categories.map((category) => (
					<CategoryCard
						key={category.id}
						id={category.id}
						color={category.color}
						name={category.name}
						isMenuOpen={isMenuOpen === category.id}
						toggleMenu={() => setIsMenuOpen(isMenuOpen === category.id ? null : category.id)}
						closeMenu={() => setIsMenuOpen(null)}
						showModal={showModal}
					/>
				))}
			</div>

			{isCreateModalOpen && <CreateCategoryModal closeModal={closeModal} />}
		</section>
	);
}
