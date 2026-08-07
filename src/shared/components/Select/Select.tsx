import styles from "./Select.module.css";

type OptionType = {
	id: string;
	name: string;
};

type SelectProps = {
	label: string;
	options: OptionType[];
} & React.ComponentProps<"select">;

export function Select({ label, options, ref, ...props }: SelectProps) {
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
