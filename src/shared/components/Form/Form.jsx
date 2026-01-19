import styles from "./Form.module.css";

export function Form({ children, handleSubmit }) {
	return (
		<form onSubmit={handleSubmit} className={styles.form} autoComplete="false">
			{children}
		</form>
	);
}
