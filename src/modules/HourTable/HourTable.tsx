import {
    Box,
    Button,
    Center,
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
    isSunday,
    startOfMonth,
} from 'date-fns'
import { useMemo } from 'react'

const CATEGORIES = [
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
]

const COLUMNS = `200px 200px repeat(${CATEGORIES.length}, 50px)`

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
                🗃️ eSihterica
            </Title>
            <Stack>
                <TextInput
                    label="Radnik"
                    placeholder="Ime i prezime radnika"
                />
                <DatePicker
                    label="Za datum"
                    locale="hr"
                    placeholder="Odaberite datum"
                />
            </Stack>
            <Button>
                Unesi 8 sati svaki radni dan
            </Button>
            <Box
                sx={{
                    columnGap: '10px',
                    display: 'grid',
                    gridAutoFlow: 'column',
                    gridTemplateColumns: COLUMNS,
                }}
            >
                <Center>
                    <Text>
                        Datum
                    </Text>
                </Center>
                <Center>
                    <Text>
                        Od - Do
                    </Text>
                </Center>
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
                            key={day.toString()}
                            sx={(theme) => ({
                                backgroundColor: isSunday(day) ? theme.colors.blue[3] : '',
                                columnGap: '10px',
                                display: 'grid',
                                gridAutoFlow: 'column',
                                gridTemplateColumns: COLUMNS,
                            })}
                        >
                            <Text>
                                {format(day, 'dd.MM.yyyy EEEE')}
                            </Text>
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
