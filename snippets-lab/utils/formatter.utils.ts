import { LOGGER } from '@/logger';



export default class DATES {
  private constructor() {

  }


  static DATE_DIFF(
    start: string | Temporal.PlainDate,
    end: string | Temporal.PlainDate
  ): string {
    const startDate = typeof start === 'string' ? Temporal.PlainDate.from(start) : start;
    const endDate = typeof end === 'string' ? Temporal.PlainDate.from(end) : end;
    const duration = startDate.until(endDate, { largestUnit: 'year' });
    return `${duration.years} años, ${duration.months} meses y ${duration.days} días`;
  }
  
  static DATE_FORMATTER(
    dateInput: TemporalInput,
    locale?: Locale,
    options: Intl.DateTimeFormatOptions = {} as DateFormatOptions,
  ): string {
    let date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime;
  
    if (typeof dateInput === 'number') {
      date = Temporal.Instant.fromEpochMilliseconds(dateInput).toZonedDateTimeISO(Temporal.Now.timeZoneId());
    } else if (typeof dateInput === 'string') {
      try {
        date = Temporal.PlainDate.from(dateInput);
      } catch {
        date = Temporal.PlainDateTime.from(dateInput);
      }
    } else {
      date = dateInput;
    }
  
    return date.toLocaleString(locale, options);
  }
  
  static NOW(): string {
    return Temporal.Now.plainDateISO().toString();
  }
}


export const { DATE_FORMATTER, NOW } = DATES

LOGGER(DATE_FORMATTER(NOW(), 'en-US'))

 
