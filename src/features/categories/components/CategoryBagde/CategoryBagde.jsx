import { useCategories } from "../../../../hooks/useCategories";
import styles from "./CategoryBagde.module.css";

export function CategoryBagde({ id }) {
	const { getCategory } = useCategories();
	const category = getCategory(id);

	return (
		<>
			{category && (
				<div className={styles.category} style={{ backgroundColor: category?.color }}>
					{category?.name}
				</div>
			)}
		</>
	);
}
