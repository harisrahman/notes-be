import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '@config/constants';

export const convert = (date: string, format?: string, isTime = false) => {
	if (date) {
		const dayjsDate = dayjs(date);
		const frmt = format || (isTime ? DATE_FORMAT : DATE_TIME_FORMAT);

		if (dayjsDate) {
			return dayjsDate.format(frmt);
		}
	}

	return date;
};

export const parse = (format: string, date?: string) => {
	if (date) {
		dayjs.extend(customParseFormat);
		return dayjs(date, format).toDate();
	}

	return date;
};
