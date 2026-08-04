import styles from "./Select.module.css";

export function Select({ label, options, ref, ...props }) {
	return (
		<div className={styles.select_group}>
			<label className={styles.label} htmlFor={props.id}>
				{label}
			</label>

			<select ref={ref} className={styles.select} {...props}>
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
