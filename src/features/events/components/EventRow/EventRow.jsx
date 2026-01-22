import styles from "./EventRow.module.css";
import { CategoryBagde } from "../../../categories/components/CategoryBagde/CategoryBagde";
import { ItemMenu } from "../../../../shared/components/ItemMenu/ItemMenu";

import basedStyles from "./../EventBase/EventBase.module.css";

export function EventRow({
	name,
	categoryId,
	description,
	expirationDate,
	daysRemaining,
	daysElapsed,
	isMenuOpen,
	toggleMenu,
	menuRef,
	handleChange,
	handleEdit,
	handleDelete,
	viewType,
	getDurationText,
	displayDate,
}) {
	return (
		<article className={`${basedStyles.event} ${styles.event} ${daysRemaining <= 0 && basedStyles.event_expired}`}>
			<div className={styles.wrapper_content}>
				<header className={basedStyles.header}>
					<div className={basedStyles.wrapper_col}>
						<h3 className={basedStyles.name}>{name}</h3>
						{categoryId && <CategoryBagde id={categoryId} />}
					</div>
				</header>
				<div className={`${basedStyles.body} ${styles.body}`}>
					<div className={basedStyles.wrapper}>
						<div className={basedStyles.wrapper_col}>
							<span className={basedStyles.date}>{displayDate(expirationDate)}</span>
							<span className={basedStyles.duration}>{getDurationText()}</span>
						</div>
						<div className={basedStyles.container_select}>
							<select
								onChange={handleChange}
								value={viewType}
								className={basedStyles.durationType}
								name="durationType"
								id="durationType"
							>
								<option value="days">Dias</option>
								<option value="week">Sem.</option>
								<option value="month">Meses</option>
							</select>
							<svg className={basedStyles.select_icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
								<path
									fill="currentColor"
									d="M297.4 438.6C309.9 451.1 330.2 451.1 342.7 438.6L502.7 278.6C515.2 266.1 515.2 245.8 502.7 233.3C490.2 220.8 469.9 220.8 457.4 233.3L320 370.7L182.6 233.4C170.1 220.9 149.8 220.9 137.3 233.4C124.8 245.9 124.8 266.2 137.3 278.7L297.3 438.7z"
								/>
							</svg>
						</div>
					</div>
				</div>
				<p className={basedStyles.description}>{description}</p>
			</div>

			{!daysRemaining && <progress value={daysElapsed} min="00" max="100" className={basedStyles.progress} />}

			{daysRemaining <= 0 && <div className={`${basedStyles.expired} ${styles.expired}`}>Expirado</div>}

			{/*  */}

			<div className={styles.wrapper_menu}>
				<button
					className={`${basedStyles.button_menu} ${isMenuOpen && basedStyles.active}`}
					onClick={(e) => {
						e.stopPropagation();
						toggleMenu();
					}}
					type="button"
				>
					<svg className={basedStyles.icon_menu} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
						<path
							width={35}
							fill="currentColor"
							d="M96 320C96 289.1 121.1 264 152 264C182.9 264 208 289.1 208 320C208 350.9 182.9 376 152 376C121.1 376 96 350.9 96 320zM264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320zM488 264C518.9 264 544 289.1 544 320C544 350.9 518.9 376 488 376C457.1 376 432 350.9 432 320C432 289.1 457.1 264 488 264z"
						/>
					</svg>
				</button>
				{isMenuOpen && (
					<ItemMenu
						eventExpired={daysRemaining <= 0}
						innerRef={menuRef}
						handleEdit={handleEdit}
						handleDelete={handleDelete}
					/>
				)}
			</div>
		</article>
	);
}
