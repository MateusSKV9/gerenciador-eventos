import type React from "react";
import styles from "./Form.module.css";

type FormProps = React.ComponentProps<"form">;

export function Form({ children, onSubmit, ...props }: FormProps) {
	return (
		<form onSubmit={onSubmit} className={styles.form} autoComplete="false" {...props}>
			{children}
		</form>
	);
}
