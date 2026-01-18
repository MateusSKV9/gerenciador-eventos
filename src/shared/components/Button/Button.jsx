import styles from "./Button.module.css";

export function Button({ children, handleClick }) {
	return (
		<button onClick={handleClick} className={styles.button} type="button">
			{children}
		</button>
	);
}
