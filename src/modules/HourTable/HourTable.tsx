import {
    Grid,
    Group,
    Paper,
    Stack,
    Text,
    TextInput,
    Title,
} from '@mantine/core'
import {
    DatePicker,
    TimeRangeInput,
} from '@mantine/dates'
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
        <Stack m={10}>
            <Title>
                eSihterica - Dobrodosli u 21. stoljece ❤️
            </Title>
            <Stack>
                <TextInput
                    label="Radnik"
                    placeholder="Ime i prezime radnika"
                />
                <DatePicker
                    label="Za darum"
                    locale="hr"
                    placeholder="Odaberite datum"
                />
            </Stack>
            <Paper shadow="xs">
                <Grid>
                    <Grid.Col span={3}>
                        {days.map((day) => {
                            const dayName = format(day, 'EEEE')

                            const isSunday = dayName === 'nedjelja'
                            const isSaturday = dayName === 'subota'

                            return (
                                <Group
                                    position="apart"
                                    sx={(theme) => ({
                                        backgroundColor: isSunday ? theme.colors.blue[2] : '',
                                    })}
                                >
                                    <Text>
                                        {format(day, 'dd.MM.yyyy EEEE')}
                                    </Text>
                                    <Text>
                                        {
                                            isSunday || isSaturday
                                                ? null
                                                : (
                                                    <TimeRangeInput
                                                        clearable={true}
                                                        label="Appointment time"
                                                    />
                                                )
                                        }
                                    </Text>
                                </Group>
                            )
                        })}
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <TimeRangeInput
                            clearable={true}
                            label="Appointment time"
                        />
                    </Grid.Col>
                </Grid>
            </Paper>
        </Stack>
    )
}
