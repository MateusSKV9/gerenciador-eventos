import styles from "./SubmitButton.module.css";

export function SubmitButton({ text }) {
	return <input className={styles.submitButton} type="submit" value={text} />;
}
