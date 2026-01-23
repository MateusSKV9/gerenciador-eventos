import { useEffect, useState } from "react";
import { EventContext } from "../hooks/useEvents";

const initialEvents = [
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
		name: "Desenvolver Lading Page",
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

export function EventProvider({ children }) {
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	const showModal = () => setIsCreateModalOpen(true);
	const closeModal = () => setIsCreateModalOpen(false);

	const [events, setEvents] = useState(() => {
		const stored = localStorage.getItem("events");
		return stored ? JSON.parse(stored) : initialEvents;
	});

	const createEvent = (event) => {
		setEvents((prev) => [...prev, event]);
	};

	const getEvent = (id) => events.find((event) => event.id === id);

	const updateEvent = (updatedEvent) =>
		setEvents((prev) => prev.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));

	const deleteEvent = (id) => setEvents((prev) => prev.filter((event) => event.id !== id));

	useEffect(() => {
		localStorage.setItem("events", JSON.stringify(events));
	}, [events]);

	const value = { events, createEvent, getEvent, updateEvent, deleteEvent, isCreateModalOpen, showModal, closeModal };

	return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}
