import { useEffect, useRef, useState } from "react";
import { useEvents } from "../../../../hooks/useEvents";
import { format, parseISO } from "date-fns";
import { useSearchParams } from "react-router";
import { EventRow } from "../EventRow/EventRow";
import { EventCard } from "../EventCard/EventCard";

export function EventBase({
	view,
	id,
	name,
	categoryId,
	description,
	expirationDate,
	daysRemaining,
	daysElapsed,
	isMenuOpen,
	toggleMenu,
	closeMenu,
	showModal,
}) {
	const { deleteEvent } = useEvents();
	const menuRef = useRef(null);
	const [viewType, setViewType] = useState("days");
	const [, setSearchParams] = useSearchParams();

	const handleEdit = () => {
		closeMenu();
		setSearchParams({ event: id });
		showModal();
	};

	const getDurationText = () => {
		if (viewType === "week") {
			const weeks = Math.floor(daysRemaining / 7);
			const remainingDays = daysRemaining % 7;
			return `${weeks} ${weeks > 1 ? "Sem." : "Sem."}, ${remainingDays} ${remainingDays > 1 ? "dias" : "dia"}`;
		}

		if (viewType === "month") {
			const months = Math.floor(daysRemaining / 30);
			const remainingDays = daysRemaining % 30;
			return `${months} ${months != 1 ? "Meses" : "Mês"},  ${remainingDays} ${remainingDays > 1 ? "dias" : "dia"}`;
		}

		return `${daysRemaining} ${daysRemaining > 1 ? "dias" : "dia"} `;
	};

	const handleChange = (e) => setViewType(e.target.value);

	const handleDelete = () => deleteEvent(id);

	useEffect(() => {
		function handleClickOutside(e) {
			if (menuRef.current && isMenuOpen && !menuRef.current.contains(e.target)) {
				closeMenu();
			}
		}

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [isMenuOpen, closeMenu]);

	const displayDate = (date) => (date ? format(parseISO(date), "dd/MM/yyyy") : "--/--/----");

	const commonProps = {
		id,
		name,
		categoryId,
		description,
		expirationDate,
		daysRemaining,
		daysElapsed,
		isMenuOpen,
		toggleMenu,
		menuRef,
		handleChange,
		handleEdit,
		handleDelete,
		viewType,
		getDurationText,
		displayDate,
	};

	return view === "card" ? <EventCard {...commonProps} /> : <EventRow {...commonProps} />;
}
