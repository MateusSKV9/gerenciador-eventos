import styles from "./SubmitButton.module.css";

type SubmitButtonProps = {
	text: string;
};

export function SubmitButton({ text }: SubmitButtonProps) {
	return <input className={styles.submitButton} type="submit" value={text} />;
}
