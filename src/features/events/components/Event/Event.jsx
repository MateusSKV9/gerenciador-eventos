import { useState } from "react";
import { Category } from "../../../categories/components/Category/Category";
import { EventMenu } from "../Menu/EventMenu";
import styles from "./Event.module.css";
import { useEvents } from "../../../../hooks/useEvents";

export function Event({ id, name, description, categoryId, expirationDate, daysRemaining, daysElapsed }) {
	const { deleteEvent } = useEvents();
	const [showEventMenu, setShowEventMenu] = useState(false);

	const toggleShowEventMenu = () => setShowEventMenu((prev) => !prev);

	const handleDelete = () => deleteEvent(id);

	return (
		<article className={styles.event}>
			<header className={styles.header}>
				<div className={styles.wrapper_col}>
					<h3 className={styles.name}>{name}</h3>
					<Category id={categoryId} />
				</div>
				<button
					className={`${styles.button_menu} ${showEventMenu && styles.active}`}
					onClick={toggleShowEventMenu}
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
				{showEventMenu && <EventMenu handleDelete={handleDelete} />}
			</header>
			<div className={styles.body}>
				<p className={styles.description}>{description}</p>
				<div className={styles.wrapper}>
					<div className={styles.wrapper_col}>
						<span className={styles.date}>{expirationDate}</span>
						<span className={styles.duration}>{daysRemaining} Dias</span>
					</div>

					<div className={styles.container_select}>
						<select className={styles.durationType} name="durationType" id="durationType">
							<option value="dias">Dias</option>
						</select>

						<svg className={styles.select_icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
							<path
								fill="currentColor"
								d="M297.4 438.6C309.9 451.1 330.2 451.1 342.7 438.6L502.7 278.6C515.2 266.1 515.2 245.8 502.7 233.3C490.2 220.8 469.9 220.8 457.4 233.3L320 370.7L182.6 233.4C170.1 220.9 149.8 220.9 137.3 233.4C124.8 245.9 124.8 266.2 137.3 278.7L297.3 438.7z"
							/>
						</svg>
					</div>
				</div>
				<progress value={daysElapsed} min="00" max="100" className={styles.progress} />
			</div>
		</article>
	);
}
