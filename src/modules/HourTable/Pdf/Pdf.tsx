import type { TextProps } from '@mantine/core'
import {
    Box,

    Group,
    SimpleGrid,
    Stack,
    Text,
} from '@mantine/core'
import dayjs from 'dayjs'
import { forwardRef } from 'react'

import {
    ABSENT_CATEGORIES,
    PRESENT_CATEGORIES,
} from '../HourTable.data'

import type { PdfProps } from './Pdf.types'

const TOTAL_COLUMN = 1
const PDF_COLUMNS = `70px 55px 30px repeat(${ABSENT_CATEGORIES.length + PRESENT_CATEGORIES.length + TOTAL_COLUMN}, 28px)`

const PdfText = (props: TextProps) => {
    const {
        children,
        ...other
    } = props

    return (
        <Text
            size="xs"
            {...other}
        >
            {children}
        </Text>
    )
}

export const Pdf = forwardRef<HTMLDivElement, PdfProps>((props, ref) => {
    const { data } = props

    return (
        <Group
            ref={ref}
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
            <Group
                sx={{
                    display: 'grid',
                    gridTemplateColumns: PDF_COLUMNS,
                    justifyContent: 'center',
                }}
            >
                <Text size="xs">
                    Datum
                </Text>
                <Text size="xs">
                    Od - Do
                </Text>
                <Text
                    size="xs"
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        fontWeight: 'bold',
                        height: 80,
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
                                height: 80,
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
                                height: 80,
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
                                display: 'grid',
                                gridTemplateColumns: PDF_COLUMNS,
                                justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            <Text size="xs">
                                {dayjs(day.date).format('DD.MM.YYYY')}
                            </Text>
                            <Text size="xs">
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
            <Box
                sx={{
                    borderTop: '1px solid black',
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
        </Group>
    )
})
