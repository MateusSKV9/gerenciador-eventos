import styles from "./Select.module.css";

export function Select({ label, id, value, name, options, handleChange }) {
	return (
		<div className={styles.select_group}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			<select value={value} onChange={handleChange} className={styles.select} name={name} id={id}>
				<option value="">Selecione uma opção</option>
				{options.map((option) => (
					<option key={option.id} value={option.id}>
						{option.name}
					</option>
				))}
			</select>
		</div>
	);
}
