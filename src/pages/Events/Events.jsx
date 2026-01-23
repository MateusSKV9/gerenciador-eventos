import { useMemo, useState } from "react";
import { Button } from "../../shared/components/Button/Button";
import { CreateEventModal } from "../../features/events/components/CreateEventModal/CreateEventModal";
import { useEvents } from "../../hooks/useEvents";
import { SectionHeader } from "../../shared/components/SectionHeader/SectionHeader";
import { getDaysElapsed, getDaysRemaining } from "../../utils/date";
import { EventBase } from "../../features/events/components/EventBase/EventBase";
import basedStyles from "./../../features/events/components/EventBase/EventBase.module.css";
import styles from "./Events.module.css";

const SORTERS = {
	remainingAsc: {
		label: "Menor prazo",
		compare: (a, b, getDaysRemaining) => getDaysRemaining(a.expirationDate) - getDaysRemaining(b.expirationDate),
	},
	remainingDesc: {
		label: "Maior prazo",
		compare: (a, b, getDaysRemaining) => getDaysRemaining(b.expirationDate) - getDaysRemaining(a.expirationDate),
	},
	nameAsc: {
		label: "Nome (A → Z)",
		compare: (a, b) => a.name.localeCompare(b.name),
	},
	nameDesc: {
		label: "Nome (Z → A)",
		compare: (a, b) => b.name.localeCompare(a.name),
	},
};

export function Events() {
	const { events, isCreateModalOpen, showModal, closeModal } = useEvents();
	const [openMenuId, setOpenMenuId] = useState(null);
	const [typeDisplay, setTypeDisplay] = useState("card");
	const [sortKey, setSortKey] = useState("remainingAsc");

	const CONTAINER_STYLE = {
		card: styles.container_events,
		list: styles.list_events,
	};

	const sortedEvents = useMemo(() => {
		if (!events?.length) return [];

		if (sortKey === "") return events;

		const sorter = SORTERS[sortKey];

		return [...events].sort((a, b) => sorter.compare(a, b, getDaysRemaining));
	}, [events, sortKey]);

	return (
		<section>
			<SectionHeader title="Eventos">
				<Button handleClick={showModal}>Novo Evento</Button>

				<Button handleClick={() => setTypeDisplay((prev) => (prev === "card" ? "list" : "card"))}>
					{typeDisplay === "card" ? "Cards" : "Lista"}
				</Button>

				<div className={basedStyles.container_select}>
					<select
						value={sortKey}
						id="sortKey"
						onChange={(e) => setSortKey(e.target.value)}
						className={`${styles.sortSelect}`}
					>
						<option className={styles.option} value="">
							Sem ordenação
						</option>
						{Object.entries(SORTERS).map(([key, { label }]) => (
							<option className={styles.option} key={key} value={key}>
								{label}
							</option>
						))}
					</select>
				</div>
			</SectionHeader>

			<div className={CONTAINER_STYLE[typeDisplay]}>
				{sortedEvents.length > 0 ? (
					sortedEvents.map((event) => {
						const daysRemaining = getDaysRemaining(event.expirationDate);
						const daysElapsed = getDaysElapsed(event.creationDate, event.expirationDate);

						return (
							<EventBase
								key={event.id}
								id={event.id}
								view={typeDisplay}
								name={event.name}
								categoryId={event.categoryId}
								description={event.description}
								expirationDate={event.expirationDate}
								daysRemaining={daysRemaining}
								daysElapsed={daysElapsed}
								isMenuOpen={openMenuId === event.id}
								toggleMenu={() => setOpenMenuId((prev) => (prev === event.id ? null : event.id))}
								closeMenu={() => setOpenMenuId(null)}
							/>
						);
					})
				) : (
					<h2>Sem eventos registrados.</h2>
				)}
			</div>

			{isCreateModalOpen && <CreateEventModal close={closeModal} />}
		</section>
	);
}
