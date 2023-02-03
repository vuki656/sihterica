import type {
    AbsentCategoryType,
    PresentCategoryType,
} from './HourTable.types'

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
