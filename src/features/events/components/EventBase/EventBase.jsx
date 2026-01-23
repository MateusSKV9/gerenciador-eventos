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
			const weeks = Math.floor(Math.abs(daysRemaining) / 7);
			const remainingDays = Math.abs(daysRemaining) % 7;

			const isNotOne = Math.abs(remainingDays) != 1;
			const isNegative = daysRemaining < 0;

			return `${isNegative ? "Há" : ""} ${weeks} Sem., ${remainingDays} ${isNotOne ? "dias" : "dia"}`;
		}

		if (viewType === "month") {
			const months = Math.floor(Math.abs(daysRemaining) / 30);
			const remainingDays = Math.abs(daysRemaining) % 30;

			const isNotOne = Math.abs(remainingDays) != 1;
			const isNegative = daysRemaining < 0;

			return `${isNegative ? "Há" : ""} ${months} ${months != 1 ? "Meses" : "Mês"},  ${remainingDays} ${
				isNotOne ? "dias" : "dia"
			}`;
		}

		const isNotOne = Math.abs(daysRemaining) != 1;
		const isNegative = daysRemaining < 0;

		return `${isNegative ? "Há" : ""} ${Math.abs(daysRemaining)} ${isNotOne ? "dias" : "dia"} `;
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
