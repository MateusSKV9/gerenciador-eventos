import { forwardRef } from "react";
import styles from "./Input.module.css";

export const Input = forwardRef(({ label, error, ...props }, ref) => {
	return (
		<div className={styles.input_group}>
			<label className={styles.label} htmlFor={props.id}>
				{label}
			</label>
			<input ref={ref} className={styles.input} {...props} />

			{error && (
				<span>
					<span className={styles.error}>*</span> {error}
				</span>
			)}
		</div>
	);
});
