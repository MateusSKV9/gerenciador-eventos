import { EventForm } from "@/features/events/components/EventForm/EventForm";
import { useEvents } from "@/hooks";
import { CreateModal } from "@/shared";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

type CreateEventModalProps = {
	close: () => void;
};

export default function CreateEventModal({ close }: CreateEventModalProps) {
	const { getEvent } = useEvents();
	const [searchParams, setSearchParams] = useSearchParams();
	const id = searchParams.get("event");
	const eventData = id ? getEvent(id) : undefined;

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	const handleClose = () => {
		close();
		setSearchParams({});
	};

	return (
		<CreateModal close={close}>
			<EventForm
				key={id || "new"}
				eventData={eventData}
				close={handleClose}
				textSubmitButton={`${id ? "Salvar" : "Criar"}`}
			/>
		</CreateModal>
	);
}
