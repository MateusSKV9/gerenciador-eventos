import { lazy, Suspense, useEffect, useState } from "react";
import { CreateEventModal, EventBase } from "@/features/events";
import { useEvents, useModal } from "@/hooks";
import { Button, SectionHeader } from "@/shared";
import { getDaysRemaining, getRemainingProgressPercentage } from "@/utils/date";
import basedStyles from "@/features/events/components/EventBase/EventBase.module.css";
import styles from "./Events.module.css";
import { SORTERS, useSorter, type SortKeyType } from "@/hooks/useSorter";

type DisplayType = "card" | "list";

const CONTAINER_STYLE: Record<DisplayType, string> = {
	card: styles.container_events,
	list: styles.list_events,
};

export function Events() {
	const { events } = useEvents();
	const { isCreateModalOpen, showModal, closeModal } = useModal();
	const [openMenuId, setOpenMenuId] = useState<string | null>(null);
	const [typeDisplay, setTypeDisplay] = useState<DisplayType>(
		() => (localStorage.getItem("typeDisplay") as DisplayType) || "card"
	);

	// Hook isolado com o estado e lógica de ordenação
	const { sortedEvents, sortKey, setSortKey } = useSorter({
		events,
		getDaysRemaining,
	});

	useEffect(() => {
		localStorage.setItem("typeDisplay", typeDisplay);
	}, [typeDisplay]);

	return (
		<section>
			<SectionHeader title="Eventos">
				<Button onClick={showModal}>Novo Evento</Button>

				<Button onClick={() => setTypeDisplay((prev) => (prev === "card" ? "list" : "card"))}>
					{typeDisplay === "card" ? "Cards" : "Lista"}
				</Button>

				<div className={basedStyles.container_select}>
					<select
						value={sortKey}
						id="sortKey"
						onChange={(e) => setSortKey(e.target.value as SortKeyType)}
						className={styles.sortSelect}
						title="Filtro"
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
						const daysElapsed = getRemainingProgressPercentage(event.creationDate, event.expirationDate);

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
								showModal={showModal}
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
