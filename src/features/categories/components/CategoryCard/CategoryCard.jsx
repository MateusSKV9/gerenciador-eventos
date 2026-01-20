import { Input } from "../../../../shared/components/Input/Input";
import styles from "./CategoryCard.module.css";

export function CategoryCard({ name }) {
	return (
		<div className={styles.card}>
			<div className={styles.wrapper}>
				<h3>{name}</h3>
				<button
					className={`${styles.button_menu}`}
					onClick={(e) => {
						e.stopPropagation();
						// toggleMenu();
					}}
					type="button"
				>
					<svg className={styles.icon_menu} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
						<path
							width={35}
							fill="currentColor"
							d="M96 320C96 289.1 121.1 264 152 264C182.9 264 208 289.1 208 320C208 350.9 182.9 376 152 376C121.1 376 96 350.9 96 320zM264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320zM488 264C518.9 264 544 289.1 544 320C544 350.9 518.9 376 488 376C457.1 376 432 350.9 432 320C432 289.1 457.1 264 488 264z"
						/>
					</svg>
				</button>
			</div>
			<div className={styles.wrapper}>
				<span>Cor:</span>
				<div className={styles.box_color}></div>
			</div>
		</div>
	);
}
