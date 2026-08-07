import { useMemo, useState } from "react";
import type { EventType } from "@/features/events/schemas/eventSchema";

type DaysRemainingFn = (dateStr: string) => number;

type SorterOption = {
	label: string;
	compare: (a: EventType, b: EventType, fn: DaysRemainingFn) => number;
};

export const SORTERS = {
	remainingAsc: {
		label: "Menor prazo",
		compare: (a, b, fn) => fn(a.expirationDate) - fn(b.expirationDate),
	},
	remainingDesc: {
		label: "Maior prazo",
		compare: (a, b, fn) => fn(b.expirationDate) - fn(a.expirationDate),
	},
	nameAsc: {
		label: "Nome (A → Z)",
		compare: (a, b) => a.name.localeCompare(b.name),
	},
	nameDesc: {
		label: "Nome (Z → A)",
		compare: (a, b) => b.name.localeCompare(a.name),
	},
} as const satisfies Record<string, SorterOption>;

export type SortKeyType = keyof typeof SORTERS | "";

type UseSorterProps = {
	events: EventType[];
	getDaysRemaining: (date: string) => number;
	initialSortKey?: SortKeyType;
};

export function useSorter({ events, getDaysRemaining, initialSortKey = "remainingAsc" }: UseSorterProps) {
	const [sortKey, setSortKey] = useState<SortKeyType>(initialSortKey);

	const sortedEvents = useMemo(() => {
		if (!events?.length) return [];
		if (!sortKey || !SORTERS[sortKey]) return events;

		const sorter = SORTERS[sortKey];
		return [...events].sort((a, b) => sorter.compare(a, b, getDaysRemaining));
	}, [events, sortKey, getDaysRemaining]);

	return {
		sortedEvents,
		sortKey,
		setSortKey,
	};
}
