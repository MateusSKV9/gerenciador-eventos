import styles from "./Category.module.css"

export function Category({ name }) {
	return <div className={styles.category}>{name}</div>;
}
