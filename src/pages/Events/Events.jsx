import { useState } from "react";
import { Event } from "../../features/events/components/Event/Event";
import { Button } from "../../shared/components/Button/Button";
import styles from "./Events.module.css";
import { CreateEventModal } from "../../features/events/components/CreateEventModal/CreateEventModal";
import { useEvents } from "../../hooks/useEvents";

import { differenceInDays, startOfDay, parseISO } from "date-fns";

export function Events() {
	const { events, isCreateModalOpen, showModal, closeModal } = useEvents();
	const [openMenuId, setOpenMenuId] = useState(null);

	function getDaysRemaining(expirationDate) {
		const today = startOfDay(new Date());
		const end = startOfDay(parseISO(expirationDate));

		return differenceInDays(end, today);
	}

	function getDaysElapsed(creationDate, expirationDate) {
		const today = startOfDay(new Date());
		const start = startOfDay(parseISO(creationDate));
		const end = startOfDay(parseISO(expirationDate));

		const totalDays = differenceInDays(end, start);
		const elapsed = differenceInDays(today, start);

		if (totalDays <= 0) return 100;

		const percentage = (elapsed / totalDays) * 100;
		return Math.min(Math.max(percentage, 0), 100);
	}

	return (
		<section>
			<header className={styles.header}>
				<h1>Eventos</h1>

				<div className={styles.container_buttons}>
					<Button handleClick={showModal}>Novo Evento</Button>
					<Button>Exibição</Button>
					<Button>Filtrar por</Button>
				</div>
			</header>

			<div className={styles.container_events}>
				{events.length > 0 ? (
					<>
						{events.map((event) => {
							const daysRemaining = getDaysRemaining(event.expirationDate);
							const daysElapsed = getDaysElapsed(event.creationDate, event.expirationDate);

							return (
								<Event
									key={event.id}
									id={event.id}
									name={event.name}
									categoryId={event.categoryId}
									description={event.description}
									expirationDate={event.expirationDate}
									daysRemaining={daysRemaining}
									daysElapsed={daysElapsed}
									isMenuOpen={openMenuId === event.id}
									toggleMenu={() => setOpenMenuId(openMenuId === event.id ? null : event.id)}
									closeMenu={() => setOpenMenuId(null)}
								/>
							);
						})}
					</>
				) : (
					<h2>Sem eventos registrados.</h2>
				)}
			</div>

			{isCreateModalOpen && <CreateEventModal close={closeModal} />}
		</section>
	);
}
