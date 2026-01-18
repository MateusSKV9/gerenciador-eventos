import { Event } from "../../features/events/components/Event/Event";
import styles from "./Events.module.css";

const events = [
	{ id: "1", name: "Evento1", categoryId: "1", description: "blabla", data: "30/12/2030", duration: 30 },
	{ id: "2", name: "Evento2", categoryId: "1", description: "blabla", data: "30/12/2030", duration: 30 },
	{ id: "3", name: "Evento3", categoryId: "1", description: "blabla", data: "30/12/2030", duration: 30 },
];

export function Events() {
	return (
		<section>
			<h1>Eventos</h1>

			<div className={styles.container_events}>
				{events.map((event) => (
					<Event
						key={event.id}
						name={event.name}
						categoryId={event.categoryId}
						description={event.description}
						date={event.data}
						duration={event.duration}
					/>
				))}
			</div>
		</section>
	);
}
