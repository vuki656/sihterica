import {
    Box,
    NumberInput,
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
    startOfMonth,
} from 'date-fns'
import { useMemo } from 'react'

const CATEGORIES = [
    'Zastoj',
    'Ukupno Radno Vrijeme',
    'Redovni rad',
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
            <Box
                sx={{
                    columnGap: '10px',
                    display: 'grid',
                    gridAutoFlow: 'column',
                    gridTemplateColumns: `200px 150px 150px repeat(${CATEGORIES.length}, 50px)`,
                }}
            >
                <Text>
                    Datum
                </Text>
                <Text>
                    Od - Do
                </Text>
                <Text>
                    Od - Do u Slucaju dvokratnog radnog vremena
                </Text>
                {CATEGORIES.map((category) => {
                    return (
                        <Text
                            sx={{
                                textOrientation: 'revert',
                                transform: 'rotate(-180deg)',
                                writingMode: 'vertical-rl',
                            }}
                        >
                            {category}
                        </Text>
                    )
                })}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '10px',
                }}
            >
                {days.map((day) => {
                    return (
                        <Box
                            sx={{
                                columnGap: '10px',
                                display: 'grid',
                                gridAutoFlow: 'column',
                                gridTemplateColumns: `200px 150px 150px repeat(${CATEGORIES.length}, 50px)`,
                            }}
                        >
                            <Text>
                                {format(day, 'dd.MM.yyyy EEEE')}
                            </Text>
                            <TimeRangeInput clearable={true} />
                            <TimeRangeInput clearable={true} />
                            {CATEGORIES.map((category) => {
                                return (
                                    <NumberInput hideControls={true} />
                                )
                            })}
                        </Box>
                    )
                })}
            </Box>
        </Stack>
    )
}
