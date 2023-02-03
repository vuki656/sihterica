import {
    Box,
    Paper,
    Table,
    Text,
} from '@mantine/core'
import {
    eachDayOfInterval,
    endOfMonth,
    format,
    setDefaultOptions,
    startOfMonth,
} from 'date-fns'
import { hr } from 'date-fns/locale'
import { useMemo } from 'react'

setDefaultOptions({ locale: hr })

const other = [
    'Nocni rad',
    'Prekovremeni rad',
    'Smjenski rad',
    'Dvokratni rad',
    'Rad na blagdan i neradni dan',
    'Preraspodjela',
    'Terenski rad',
    'Pripravnost',
    'Rad nedjeljom',
    'Blagdani',
    'Godisnji odmor',
    'Tjedni odmor',
    'Dnevni odmor',
    'Bolovanje na teret poduzeca',
    'Bolovanje na teret HZZO-a',
    'Rodiljni dopust',
    'Placeni dopust',
    'Neplaceni dopust',
    'Nenadocnost krivnjom radnika',
    'Nenadocnost na zahtjev radnika',
    'Strak',
    'Lock out',
]

const COLUMNS = [
    'Zastoj',
    'Ukupno Radno Vrijeme',
    'Redovni rad',
]

export const HourTable = () => {
    const days = useMemo(() => {
        return eachDayOfInterval({
            end: endOfMonth(new Date()),
            start: startOfMonth(new Date()),
        })
    }, [])

    return (
        <Paper
            m={20}
            shadow="md"
        >
            <Table
                captionSide="bottom"
                highlightOnHover={true}
                striped={true}
                withBorder={true}
                withColumnBorders={true}
            >
                <caption>
                    Some elements from periodic table
                </caption>
                <thead>
                    <tr>
                        <th>
                            Datum
                        </th>
                        <th>
                            <Text align="center">
                                Od - Do
                            </Text>
                        </th>
                        {COLUMNS.map((column) => {
                            return (
                                <th>
                                    {column}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {days.map((day) => {
                        const dayName = format(day, 'EEEE')

                        const isSunday = dayName === 'nedjelja'
                        const isSaturday = dayName === 'subota'

                        return (
                            <tr>
                                <Box
                                    sx={(theme) => ({
                                        backgroundColor: isSunday ? theme.colors.blue : '',
                                    })}
                                >
                                    <td>
                                        {format(day, 'dd.MM.yyyy (EEEE)')}
                                    </td>
                                    <td>
                                        {format(day, 'dd.MM.yyyy (EEEE)')}
                                    </td>
                                    <td>
                                        {format(day, 'dd.MM.yyyy (EEEE)')}
                                    </td>
                                </Box>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Paper>
    )
}
