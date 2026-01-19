import { useCategories } from "../../../../hooks/useCategories";
import styles from "./Category.module.css";

export function Category({ id }) {
	const { getCategory } = useCategories();
	const category = getCategory(id);

	return <div className={styles.category}>{category.name}</div>;
}
