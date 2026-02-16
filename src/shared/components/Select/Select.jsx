import { forwardRef } from "react";
import styles from "./Select.module.css";

export const Select = forwardRef(({ label, options, ...props }, ref) => {
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
});
