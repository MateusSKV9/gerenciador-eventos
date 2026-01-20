import styles from "./SectionHeader.module.css";

export function SectionHeader({ title, children }) {
	return (
		<header className={styles.header}>
			<h1>{title}</h1>

			<div className={styles.container_buttons}>{children}</div>
		</header>
	);
}
