import type { z } from 'zod'

import type {
    dayValidation,
    monthValidation,
} from './HourTable.validation'

export type HourTableFormValueType = z.infer<typeof monthValidation>

type DayValidationType = z.infer<typeof dayValidation>

export type PresentCategoryType = {
    label: string
    name: keyof DayValidationType['present']
}

export type AbsentCategoryType = {
    label: string
    name: keyof DayValidationType['absent']
}

export type GoogleCalendarApiResponse = {
    items: HolidayType[]
}

export type HolidayType = {
    description: string
    end: {
        date: string
    }
    id: string
    start: {
        date: string
    }
    summary: string
}

export type HourTableProps = {
    nonWorkingDays: HolidayType[]
}
