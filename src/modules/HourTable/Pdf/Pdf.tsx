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
        <Box
            ref={ref}
            sx={{
                backgroundColor: 'white',
                border: '1px solid red',
                height: 850,
                padding: '35px 10px',
                width: 1100,
            }}
        >
            <Group spacing={0}>
                <Stack spacing={0}>
                    <Text
                        size="sm"
                        weight="bold"
                    >
                        KNJIGOVODSTVENI SERVIS LIBER, Tanja Vuković
                    </Text>
                    <Text size="xs">
                        33000 VIROVITICA, MASARYKOVA 14/1
                    </Text>
                    <Group>
                        <Text
                            size="sm"
                            weight="bold"
                        >
                            {dayjs(new Date()).format('MMMM')
                                .toUpperCase()}
                        </Text>
                        <Text
                            size="sm"
                            weight="bold"
                        >
                            {dayjs(new Date()).format('YYYY')}
                        </Text>
                    </Group>
                    <Text size="sm">
                        Radnik:
                        {' '}
                        {data.fullName}
                    </Text>
                    <Text size="sm">
                        Za datum
                        {' '}
                        {dayjs(new Date()).format('DD.MM.YYYY')}
                    </Text>
                </Stack>
                <SimpleGrid cols={2}>
                    <Text size="sm">
                        Odgovorna osoba: TANJA VUKOVIĆ
                    </Text>
                    <Text size="sm">
                        Kontrolirao:
                    </Text>
                </SimpleGrid>
                <Group position="apart" />
                <Group
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: PDF_COLUMNS,
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    <Text>
                        Datum
                    </Text>
                    <Text>
                        Od - Do
                    </Text>
                    <Text>
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
                                <Text size="sm">
                                    {dayjs(day.date).format('DD.MM.YYYY')}
                                </Text>
                                <Text size="sm">
                                    {day.startHour ? dayjs(day.startHour).format('HH') : ''}
                                    {' '}
                                    -
                                    {day.endHour ? dayjs(day.endHour).format('HH') : ''}
                                </Text>
                                <Text
                                    align="center"
                                    size="sm"
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
                        size="sm"
                    >
                        20
                    </Text>
                </Box>
            </Group>
        </Box>
    )
})
