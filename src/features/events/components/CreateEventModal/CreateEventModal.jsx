import { EventForm } from "../EventForm/EventForm";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useEvents } from "../../../../hooks/useEvents";
import { CreateModal } from "../../../../shared/components/CreateModal/CreateModal";

export function CreateEventModal({ close }) {
	const { getEvent } = useEvents();
	const [searchParams, setSearchParams] = useSearchParams();
	const id = searchParams.get("event");
	const eventData = id ? getEvent(id) : {};

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
				eventData={id ? eventData : {}}
				close={handleClose}
				textSubmitButton={`${id ? "Salvar" : "Criar"}`}
			/>
		</CreateModal>
	);
}
