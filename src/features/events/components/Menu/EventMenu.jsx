import styles from "./EventMenu.module.css";

export function EventMenu({ innerRef, handleDelete, handleEdit }) {
	return (
		<ul ref={innerRef} className={styles.list}>
			<li className={styles.item}>
				<button onClick={handleEdit} className={styles.button} type="button">
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
