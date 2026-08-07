import { createContext, useContext } from "react";
import type { EventData, EventType } from "@/features/events/schemas/eventSchema";

type EventContextType = {
	events: EventType[];
	createEvent: (data: EventData) => void;
	getEvent: (id: string) => EventType | undefined;
	updateEvent: (id: string, updatedEvent: EventData) => void;
	deleteEvent: (id: string) => void;
};

export const EventContext = createContext<EventContextType | null>(null);

export const useEvents = () => {
	const context = useContext(EventContext);

	if (!context) {
		throw new Error("useEvents deve ser usado dentro de um EventProvider");
	}

	return context;
};
