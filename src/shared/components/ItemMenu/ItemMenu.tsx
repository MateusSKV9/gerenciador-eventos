import { Icon } from "../Icon/Icon";
import styles from "./ItemMenu.module.css";

type ItemMenuProps = {
	eventExpired?: boolean;
	onDelete: () => void;
	onEdit: () => void;
} & React.ComponentProps<"ul">;

export function ItemMenu({ eventExpired, onDelete, onEdit, ref }: ItemMenuProps) {
	return (
		<ul ref={ref} className={`${styles.list} ${eventExpired && styles.expired}`}>
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
