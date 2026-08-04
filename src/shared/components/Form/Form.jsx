import styles from "./Form.module.css";

export function Form({ children, onSubmit }) {
	return (
		<form onSubmit={onSubmit} className={styles.form} autoComplete="false">
			{children}
		</form>
	);
}
