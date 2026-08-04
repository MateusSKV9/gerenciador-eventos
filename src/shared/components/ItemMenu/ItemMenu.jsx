import { Icon } from "../Icon/Icon";
import styles from "./ItemMenu.module.css";

export function ItemMenu({ innerRef, eventExpired, onDelete, onEdit }) {
	return (
		<ul ref={innerRef} className={`${styles.list} ${eventExpired && styles.expired}`}>
			<li className={styles.item}>
				<button onClick={onEdit} className={styles.button} type="button">
					<Icon variant="edit" width={24} /> Editar
				</button>
			</li>
			<li className={styles.item}>
				<button onClick={onDelete} className={styles.button} type="button">
					<Icon variant="remove" width={24} />
					Apagar
				</button>
			</li>
		</ul>
	);
}
