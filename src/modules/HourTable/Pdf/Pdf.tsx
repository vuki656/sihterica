import {
    Box
    ,
    Group,

    SimpleGrid,
    Stack,
    Text,
    useMantineTheme,
} from '@mantine/core'
import dayjs from 'dayjs'
import { forwardRef } from 'react'

import {
    ABSENT_CATEGORIES,
    PRESENT_CATEGORIES,
} from '../HourTable.data'

import type { PdfProps } from './Pdf.types'

const TOTAL_COLUMN = 1
const PDF_COLUMNS = `130px 50px 1fr repeat(${ABSENT_CATEGORIES.length + PRESENT_CATEGORIES.length + TOTAL_COLUMN}, 20px)`

// TODO: extract pdf header to a componnetn
export const Pdf = forwardRef<HTMLDivElement, PdfProps>((props, ref) => {
    const { data } = props

    const theme = useMantineTheme()

    return (
        <Stack
            ref={ref}
            spacing={5}
            sx={{
                backgroundColor: 'white',
                border: '1px solid red',
                height: 850,
                padding: '35px 10px',
                width: 1100,
            }}
        >
            <Group>
                <Stack spacing={0}>
                    <Group>
                        <Text
                            align="left"
                            size="xl"
                            weight="bold"
                        >
                            EVIDENCIJA O RADNOM VREMENU
                        </Text>
                    </Group>
                    <Text
                        size="xs"
                        weight="bold"
                    >
                        KNJIGOVODSTVENI SERVIS LIBER, Tanja Vuković
                    </Text>
                    <Text size="xs">
                        33000 VIROVITICA, MASARYKOVA 14/1
                    </Text>
                </Stack>
                <SimpleGrid
                    cols={2}
                    sx={{ width: 450 }}
                >
                    <Text
                        size="xs"
                        sx={{
                            borderBottom: '1px solid black',
                            paddingBottom: 20,
                        }}
                        weight="bold"
                    >
                        Odgovorna osoba:
                    </Text>
                    <Text
                        size="xs"
                        sx={{
                            borderBottom: '1px solid black',
                            paddingBottom: 20,
                        }}
                        weight="bold"
                    >
                        Kontrolirao:
                    </Text>
                </SimpleGrid>
                <Stack
                    align="center"
                    spacing={0}
                >
                    <Text
                        size="xs"
                        weight="bold"
                    >
                        {
                            dayjs(new Date())
                                .format('MMMM')
                                .toUpperCase()
                        }
                    </Text>
                    <Text
                        size="xs"
                        weight="bold"
                    >
                        {dayjs(new Date()).format('YYYY')}
                    </Text>
                </Stack>
                <Stack spacing={0}>
                    <Group position="apart">
                        <Text
                            size="xs"
                            weight="bold"
                        >
                            Radnik:
                        </Text>
                        {' '}
                        <Text size="xs">
                            {data.fullName}
                        </Text>
                    </Group>
                    <Group position="apart">
                        <Text
                            size="xs"
                            weight="bold"
                        >
                            Za Datum:
                        </Text>
                        {' '}
                        <Text size="xs">
                            {dayjs(new Date()).format('DD.MM.YYYY')}
                        </Text>
                    </Group>
                </Stack>
            </Group>
            <Stack spacing={0}>
                <Group
                    sx={{
                        alignItems: 'flex-end',
                        borderBottom: '1px solid black',
                        borderTop: '1px solid black',
                        display: 'grid',
                        gridTemplateColumns: PDF_COLUMNS,
                        padding: '10px 0',
                    }}
                >
                    <Text
                        size="xs"
                        weight="bold"
                    >
                        Datum
                    </Text>
                    <Text
                        size="xs"
                        weight="bold"
                    >
                        Od - Do
                    </Text>
                    <Text
                        size="xs"
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            fontWeight: 'bold',
                            height: 100,
                            transform: 'rotate(-180deg)',
                            writingMode: 'vertical-rl',
                        }}
                    >
                        Ukupno
                    </Text>
                    {PRESENT_CATEGORIES.map((category) => {
                        return (
                            <Text
                                key={category.label}
                                size="xs"
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    fontWeight: 'bold',
                                    height: 100,
                                    transform: 'rotate(-180deg)',
                                    writingMode: 'vertical-rl',
                                }}
                            >
                                {category.label}
                            </Text>
                        )
                    })}
                    {ABSENT_CATEGORIES.map((category) => {
                        return (
                            <Text
                                key={category.label}
                                size="xs"
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    fontWeight: 'bold',
                                    height: 100,
                                    transform: 'rotate(-180deg)',
                                    writingMode: 'vertical-rl',
                                }}
                            >
                                {category.label}
                            </Text>
                        )
                    })}
                </Group>
                <Box>
                    {data.list.map((day) => {
                        return (
                            <Group
                                sx={{
                                    borderBottom: '1px solid black',
                                    display: 'grid',
                                    gridTemplateColumns: PDF_COLUMNS,
                                    justifyContent: 'center',
                                    width: '100%',
                                }}
                            >
                                <Text size="xs">
                                    {dayjs(day.date).format('DD.MM.YYYY dddd')}
                                </Text>
                                <Text
                                    align="center"
                                    size="xs"
                                >
                                    {day.startHour ? dayjs(day.startHour).format('HH') : ''}
                                    {' '}
                                    -
                                    {day.endHour ? dayjs(day.endHour).format('HH') : ''}
                                </Text>
                                <Text
                                    align="center"
                                    size="xs"
                                    weight="bold"
                                >
                                    {day.startHour ? Object.values(day.present).reduce((accumulator, dayHours) => {
                                        return accumulator + dayHours
                                    }, 0) : '-'}
                                </Text>
                                {PRESENT_CATEGORIES.map((category) => {
                                    return (
                                        <Text
                                            align="center"
                                            size="xs"
                                        >
                                            {day.present[category.name]}
                                        </Text>
                                    )
                                })}
                                {ABSENT_CATEGORIES.map((category) => {
                                    return (
                                        <Text
                                            align="center"
                                            size="xs"
                                        >
                                            {day.absent[category.name]}
                                        </Text>
                                    )
                                })}
                            </Group>
                        )
                    })}
                </Box>
            </Stack>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: PDF_COLUMNS,
                }}
            >
                <Text
                    align="center"
                    size="xs"
                >
                    20
                </Text>
            </Box>
        </Stack>
    )
})
