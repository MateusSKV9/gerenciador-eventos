import { useEffect } from "react";
import { useState } from "react";

const initialEvents = [
	{
		id: "1",
		name: "Evento1",
		categoryId: "1",
		description: "blabla",
		creationDate: "2026-01-18",
		expirationDate: "2026-01-21",
	},
	{
		id: "2",
		name: "Evento2",
		categoryId: "1",
		description: "blabla",
		creationDate: "2026-01-19",
		expirationDate: "2026-02-01",
	},
	{
		id: "3",
		name: "Evento3",
		categoryId: "1",
		description: "blabla",
		creationDate: "2026-01-01",
		expirationDate: "2027-03-12",
	},
];

export const useEvents = () => {
	const [events, setEvents] = useState(() => {
		const stored = localStorage.getItem("events");
		return stored ? JSON.parse(stored) : initialEvents;
	});

	const createEvent = (event) => {
		setEvents((prev) => [...prev, event]);
	};

	const updateEvent = (updatedEvent) => {
		setEvents((prev) => prev.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
	};

	const deleteEvent = (id) => {
		setEvents((prev) => prev.filter((event) => event.id !== id));
	};

	useEffect(() => {
		localStorage.setItem("events", JSON.stringify(events));
	}, [events]);

	return { events, createEvent, updateEvent, deleteEvent };
};
