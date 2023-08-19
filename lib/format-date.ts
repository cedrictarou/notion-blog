import { format } from "date-fns";
import { ja } from "date-fns/locale";

export const formatDate = (date: string) => {
	const parsedDate = new Date(date);
	return format(parsedDate, "yyyy/MM/dd", {
		locale: ja,
	});
}