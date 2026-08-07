import styles from "./Button.module.css";

type ButtonProps = React.ComponentProps<"button">;

export function Button({ children, ...props }: ButtonProps) {
	return (
		<button className={styles.button} type="button" {...props}>
			{children}
		</button>
	);
}
