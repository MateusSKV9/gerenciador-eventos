import styles from "./EventMenu.module.css";

export function EventMenu({ handleDelete }) {
	return (
		<ul className={styles.list}>
			<li className={styles.item}>
				<button className={styles.button} type="button">
					Editar
				</button>
			</li>
			<li className={styles.item}>
				<button onClick={handleDelete} className={styles.button} type="button">
					Apagar
				</button>
			</li>
		</ul>
	);
}
