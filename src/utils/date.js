import { differenceInDays, parseISO, startOfDay } from "date-fns";

export const getDaysRemaining = (expirationDate) => {
	const today = startOfDay(new Date());
	const end = startOfDay(parseISO(expirationDate));

	return differenceInDays(end, today);
};

export const getDaysElapsed = (creationDate, expirationDate) => {
	const today = startOfDay(new Date());
	const start = startOfDay(parseISO(creationDate));
	const end = startOfDay(parseISO(expirationDate));

	const totalDays = differenceInDays(end, start);
	const elapsed = differenceInDays(today, start);

	if (totalDays <= 0) return 100;
	const percentage = (elapsed / totalDays) * 100;

	return 100 - Math.min(Math.max(percentage, 0), 100);
};
