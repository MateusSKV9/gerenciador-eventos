import { useEffect, useState, type ReactNode } from "react";
import { EventContext } from "@/hooks/useEvents";
import type { EventData, EventType } from "@/features/events/schemas/eventSchema";

const initialEvents: EventType[] = [
	{
		id: "1",
		name: "Evento Importante",
		categoryId: "1",
		description: "Este é um evento importante.",
		creationDate: "2026-01-18",
		expirationDate: "2026-01-21",
	},
	{
		id: "2",
		name: "Desenvolver Landing Page",
		categoryId: "2",
		description: "Em React.",
		creationDate: "2026-01-19",
		expirationDate: "2026-02-01",
	},
	{
		id: "3",
		name: "Aniversário de React",
		categoryId: "3",
		description: "Hello, World!",
		creationDate: "2026-01-01",
		expirationDate: "2026-06-01",
	},
];

type EventProviderProps = {
	children: ReactNode;
};

export function EventProvider({ children }: EventProviderProps) {
	const [events, setEvents] = useState<EventType[]>(() => {
		const stored = localStorage.getItem("events");
		return stored ? JSON.parse(stored) : initialEvents;
	});

	const createEvent = (data: EventData) => {
		const newEvent: EventType = {
			...data,
			id: crypto.randomUUID(),
			creationDate: new Date().toISOString().split("T")[0],
		};
		setEvents((prev) => [...prev, newEvent]);
	};

	const getEvent = (id: string) => events.find((event) => event.id === id);

	const updateEvent = (id: string, updatedEvent: EventData) =>
		setEvents((prev) => prev.map((event) => (event.id === id ? { ...event, ...updatedEvent } : event)));

	const deleteEvent = (id: string) => setEvents((prev) => prev.filter((event) => event.id !== id));

	useEffect(() => {
		localStorage.setItem("events", JSON.stringify(events));
	}, [events]);

	const value = {
		events,
		createEvent,
		getEvent,
		updateEvent,
		deleteEvent,
	};

	return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}
