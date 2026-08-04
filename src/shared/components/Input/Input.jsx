import styles from "./Input.module.css";

export function Input({ label, error, ref, ...props }) {
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
}
