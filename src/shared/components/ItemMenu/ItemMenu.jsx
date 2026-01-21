import styles from "./ItemMenu.module.css";

export function ItemMenu({ innerRef, eventExpired, handleDelete, handleEdit }) {
	return (
		<ul ref={innerRef} className={`${styles.list} ${eventExpired && styles.expired}`}>
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
