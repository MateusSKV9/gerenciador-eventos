import { CategoryCard } from "../../features/categories/components/CategoryCard/CategoryCard";
import { useCategories } from "../../hooks/useCategories";
import { Button } from "../../shared/components/Button/Button";
import { SectionHeader } from "../../shared/components/SectionHeader/SectionHeader";
import styles from "./Categories.module.css";

export function Categories() {
	const { categories } = useCategories();

	return (
		<section>
			<SectionHeader title="Categorias">
				<Button>Nova categoria</Button>
			</SectionHeader>

			<div className={styles.container_categories}>
				{categories.map((category) => (
					<CategoryCard key={category.id} name={category.name} />
				))}
			</div>
		</section>
	);
}
