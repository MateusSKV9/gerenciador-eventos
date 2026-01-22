import styles from "./Input.module.css";

export function Input({ label, type, name, value, id, placeholder, handleChange }) {
	return (
		<div className={styles.input_group}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			<input
				onChange={handleChange}
				value={value}
				className={styles.input}
				type={type}
				name={name}
				id={id}
				maxLength={45}
				placeholder={placeholder}
				required
			/>
		</div>
	);
}
