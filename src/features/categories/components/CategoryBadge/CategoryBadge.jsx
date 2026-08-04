import { useCategories } from "../../../../hooks";
import styles from "./CategoryBadge.module.css";

export function CategoryBadge({ id }) {
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
