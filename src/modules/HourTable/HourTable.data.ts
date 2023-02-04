import { addDays } from 'date-fns'

import type {
    AbsentCategoryType,
    PresentCategoryType,
} from './HourTable.types'

const GOOGLE_CALENDAR_URL = 'https://www.googleapis.com/calendar/v3/calendars'
const CROATIAN_HOLIDAYS_URL = 'hr.croatian%23holiday%40group.v.calendar.google.com/events'

export const GOOGLE_CALENDAR_HOLIDAY_DATE_FORMAT = 'yyyy-MM-dd'
export const TIME_SPAN_IN_DAYS = 90

const HOLIDAY_MIN = new Date().toISOString()
const HOLIDAY_MAX = addDays(new Date, TIME_SPAN_IN_DAYS).toISOString()

// eslint-disable-next-line max-len
export const GOOGLE_CALEDAR_HOLIDAYS = `${GOOGLE_CALENDAR_URL}/${CROATIAN_HOLIDAYS_URL}?key=${process.env.GOOGLE_CALENDAR_API_KEY}&timeMin=${HOLIDAY_MIN}&timeMax=${HOLIDAY_MAX}`

export const PRESENT_CATEGORIES: PresentCategoryType[] = [
    {
        label: 'Redovni rad',
        name: 'regular',
    },
    {
        label: 'Nocni rad',
        name: 'nightly',
    },
    {
        label: 'Prekovremeni rad',
        name: 'overtime',
    },
    {
        label: 'Smjenski rad',
        name: 'shift',
    },
    {
        label: 'Dvokratni rad',
        name: 'double',
    },
    {
        label: 'Rad na blagdan i neradni dan',
        name: 'holidaysAndNonWorkingDays',
    },
    {
        label: 'Preraspodjela',
        name: 'redistribution',
    },
    {
        label: 'Terenski rad',
        name: 'field',
    },
    {
        label: 'Pripravnost',
        name: 'standby',
    },
    {
        label: 'Rad nedjeljom',
        name: 'sunday',
    },
]

export const ABSENT_CATEGORIES: AbsentCategoryType[] = [
    {
        label: 'Blagdan',
        name: 'holiday',
    },
    {
        label: 'Godisnji odmor',
        name: 'yearlyVaccation',
    },
    {
        label: 'Tjedni odmor',
        name: 'weeklyVaccation',
    },
    {
        label: 'Dnevni odmor',
        name: 'dailyVaccation',
    },
    {
        label: 'Bolovanje na teret poduzeca',
        name: 'companySickLeave',
    },
    {
        label: 'Bolovanje na teret HZZO-a',
        name: 'hzzoSickLeave',
    },
    {
        label: 'Rodiljni dopust',
        name: 'paternityLeave',
    },
    {
        label: 'Placeni dopust',
        name: 'paidLeave',
    },
    {
        label: 'Neplaceni dopust',
        name: 'unpaidLeave',
    },
]
