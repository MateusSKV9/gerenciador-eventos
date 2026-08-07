import type { RefObject, ChangeEvent } from "react";
import { CategoryBadge } from "@/features/categories";
import { ItemMenu } from "@/shared";
import basedStyles from "../EventBase/EventBase.module.css";
import styles from "./EventCard.module.css";

type EventCardProps = {
	id: string;
	name: string;
	categoryId?: string;
	description?: string;
	expirationDate: string;
	daysRemaining: number;
	daysElapsed: number;
	isMenuOpen: boolean;
	toggleMenu: () => void;
	ref?: RefObject<HTMLUListElement | null>;
	handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	handleEdit: () => void;
	handleDelete: () => void;
	viewType: string;
	getDurationText: () => string;
	displayDate: (date: string) => string;
};

export function EventCard({
	id,
	name,
	categoryId,
	description,
	expirationDate,
	daysRemaining,
	daysElapsed,
	isMenuOpen,
	toggleMenu,
	ref,
	handleChange,
	handleEdit,
	handleDelete,
	viewType,
	getDurationText,
	displayDate,
}: EventCardProps) {
	const styleProgress = () => {
		if (daysElapsed < 30) return basedStyles.red;
		if (daysElapsed < 60) return basedStyles.yellow;
		return basedStyles.green;
	};

	return (
		<article
			className={`${basedStyles.event} ${styles.event} ${daysRemaining <= 0 ? basedStyles.event_expired : ""}`.trim()}
		>
			<header className={basedStyles.header}>
				<div className={basedStyles.wrapper_col}>
					<h2 className={basedStyles.name}>{name}</h2>
					{categoryId && <CategoryBadge id={categoryId} />}
				</div>
				<button
					className={`${basedStyles.button_menu} ${isMenuOpen ? basedStyles.active : ""}`.trim()}
					onClick={(e) => {
						e.stopPropagation();
						toggleMenu();
					}}
					type="button"
					title="Opções"
				>
					<svg className={basedStyles.icon_menu} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={22}>
						<path
							fill="currentColor"
							d="M96 320C96 289.1 121.1 264 152 264C182.9 264 208 289.1 208 320C208 350.9 182.9 376 152 376C121.1 376 96 350.9 96 320zM264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320zM488 264C518.9 264 544 289.1 544 320C544 350.9 518.9 376 488 376C457.1 376 432 350.9 432 320C432 289.1 457.1 264 488 264z"
						/>
					</svg>
				</button>
				{isMenuOpen && (
					<ItemMenu eventExpired={daysRemaining <= 0} ref={ref} onEdit={handleEdit} onDelete={handleDelete} />
				)}
			</header>

			{description && <p className={basedStyles.description}>{description}</p>}

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
							id={`durationType_${id}`}
							title="Tipo de duração"
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
				{daysRemaining > 0 && (
					<progress value={daysElapsed} max={100} className={`${basedStyles.progress} ${styleProgress()}`} />
				)}
			</div>
			{daysRemaining <= 0 && <div className={`${basedStyles.expired}`}>Expirado</div>}
		</article>
	);
}
