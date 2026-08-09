import { differenceInDays, parseISO, startOfDay } from "date-fns";

export const getDaysRemaining = (expirationDate: string, baseDate: Date | string = new Date()) => {
	const today = startOfDay(typeof baseDate === "string" ? parseISO(baseDate) : baseDate);
	const end = startOfDay(parseISO(expirationDate));

	return differenceInDays(end, today);
};

export const getRemainingProgressPercentage = (
	creationDate: string,
	expirationDate: string,
	baseDate: Date | string = new Date()
) => {
	const today = startOfDay(typeof baseDate === "string" ? parseISO(baseDate) : baseDate);
	const start = startOfDay(parseISO(creationDate));
	const end = startOfDay(parseISO(expirationDate));

	const totalDays = differenceInDays(end, start);
	const elapsed = differenceInDays(today, start);

	if (totalDays <= 0) return 100;
	const percentage = (elapsed / totalDays) * 100;

	return 100 - Math.min(Math.max(percentage, 0), 100);
};
