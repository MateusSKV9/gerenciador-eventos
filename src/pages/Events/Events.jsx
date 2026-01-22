import { useState } from "react";
import { Button } from "../../shared/components/Button/Button";
import styles from "./Events.module.css";
import { CreateEventModal } from "../../features/events/components/CreateEventModal/CreateEventModal";
import { useEvents } from "../../hooks/useEvents";
import { SectionHeader } from "../../shared/components/SectionHeader/SectionHeader";
import { getDaysElapsed, getDaysRemaining } from "../../utils/date";
import { EventBase } from "../../features/events/components/EventBase/EventBase";

export function Events() {
	const { events, isCreateModalOpen, showModal, closeModal } = useEvents();
	const [openMenuId, setOpenMenuId] = useState(null);
	const [typeDisplay, setTypeDisplay] = useState("card");

	const CONTAINER_STYLE = {
		card: styles.container_events,
		list: styles.list_events,
	};

	return (
		<section>
			<SectionHeader title="Eventos">
				<Button handleClick={showModal}>Novo Evento</Button>

				<div className={styles.wrapper_display}>
					<Button
						handleClick={() => {
							setTypeDisplay((prev) => (prev === "card" ? "list" : "card"));
						}}
					>
						{typeDisplay === "card" ? "Cards" : "Lista"}
					</Button>
				</div>

				<Button>Filtrar por</Button>
			</SectionHeader>

			<div className={CONTAINER_STYLE[typeDisplay]}>
				{events.length > 0 ? (
					<>
						{events.map((event) => {
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
