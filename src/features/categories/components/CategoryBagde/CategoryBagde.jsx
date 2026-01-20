import { useCategories } from "../../../../hooks/useCategories";
import styles from "./CategoryBagde.module.css";

export function CategoryBagde({ id }) {
	const { getCategory } = useCategories();
	const category = getCategory(id);

	return <div className={styles.category}>{category.name}</div>;
}
