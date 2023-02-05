import { format } from 'date-fns'

// TODO: use this everywhere
// TODO: potentialy also handle uppercasing first word of the day here
export const formatLongDate = (date: Date) => {
    return format(date, 'dd.MM.yyyy EEEE')
}
