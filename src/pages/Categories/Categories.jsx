import { CategoryCard } from "../../features/categories/components/CategoryCard/CategoryCard";
import { useCategories } from "../../hooks/useCategories";
import { Button } from "../../shared/components/Button/Button";
import { SectionHeader } from "../../shared/components/SectionHeader/SectionHeader";
import styles from "./Categories.module.css";
import { useModal } from "../../hooks/useModal";
import { useState } from "react";
import { CreateCategoryModal } from "../../features/categories/components/CreateCategoryModal/CreateCategoryModal";

export function Categories() {
	const { isCreateModalOpen, showModal, closeModal } = useModal();
	const { categories } = useCategories();
	const [isMenuOpen, setIsMenuOpen] = useState(null);

	return (
		<section>
			<SectionHeader title="Categorias">
				<Button handleClick={showModal}>Nova categoria</Button>
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
