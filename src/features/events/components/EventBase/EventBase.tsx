import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { format, parseISO } from "date-fns";
import { useSearchParams } from "react-router";
import { EventCard } from "@/features/events/components/EventCard/EventCard";
import { EventRow } from "@/features/events/components/EventRow/EventRow";
import { useEvents } from "@/hooks";

type EventBaseProps = {
	view: string;
	id: string;
	name: string;
	categoryId?: string;
	description?: string;
	expirationDate: string;
	daysRemaining: number;
	daysElapsed: number;
	isMenuOpen: boolean;
	toggleMenu: () => void;
	closeMenu: () => void;
	showModal: () => void;
};

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
}: EventBaseProps) {
	const { deleteEvent } = useEvents();
	const menuRef = useRef<HTMLUListElement | null>(null);
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

			const isNotOne = Math.abs(remainingDays) !== 1;
			const isNegative = daysRemaining < 0;

			return `${isNegative ? "Há" : ""} ${weeks} Sem., ${remainingDays} ${isNotOne ? "dias" : "dia"}`;
		}

		if (viewType === "month") {
			const months = Math.floor(Math.abs(daysRemaining) / 30);
			const remainingDays = Math.abs(daysRemaining) % 30;

			const isNotOne = Math.abs(remainingDays) !== 1;
			const isNegative = daysRemaining < 0;

			return `${isNegative ? "Há" : ""} ${months} ${months !== 1 ? "Meses" : "Mês"}, ${remainingDays} ${
				isNotOne ? "dias" : "dia"
			}`;
		}

		const isNotOne = Math.abs(daysRemaining) !== 1;
		const isNegative = daysRemaining < 0;

		return `${isNegative ? "Há" : ""} ${Math.abs(daysRemaining)} ${isNotOne ? "dias" : "dia"}`;
	};

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setViewType(e.target.value);
	};

	const handleDelete = () => deleteEvent(id);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (menuRef.current && isMenuOpen && e.target instanceof Node && !menuRef.current.contains(e.target)) {
				closeMenu();
			}
		}

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [isMenuOpen, closeMenu]);

	const displayDate = (date: string) => (date ? format(parseISO(date), "dd/MM/yyyy") : "--/--/----");

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
		ref: menuRef,
		handleChange,
		handleEdit,
		handleDelete,
		viewType,
		getDurationText,
		displayDate,
	};

	return view === "card" ? <EventCard {...commonProps} /> : <EventRow {...commonProps} />;
}
