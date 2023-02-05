import {
    Box
    ,
    Group,
    Stack,
    Text,
    useMantineTheme,
} from '@mantine/core'
import { isSunday } from 'date-fns'
import dayjs from 'dayjs'
import { forwardRef } from 'react'

import {
    ABSENT_CATEGORIES,
    PRESENT_CATEGORIES,
} from '../HourTable.data'

import type { PdfProps } from './Pdf.types'

import { capitalize } from '@/shared/utils'

const TOTAL_COLUMN = 1
const CATEGORY_COULMN_COUNT = ABSENT_CATEGORIES.length + PRESENT_CATEGORIES.length + TOTAL_COLUMN
const COLUMNS = `130px 100px 100px repeat(${CATEGORY_COULMN_COUNT}, 20px)`

// TODO: extract pdf header to a component
export const Pdf = forwardRef<HTMLDivElement, PdfProps>((props, ref) => {
    const { data } = props

    const theme = useMantineTheme()

    return (
        <Stack
            ref={ref}
            spacing={5}
            sx={{
                backgroundColor: 'white',
                height: 850,
                padding: '35px 10px',
                width: 1100,
            }}
        >
            <Group position="apart">
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
                        {data.companyName}
                    </Text>
                    <Text size="xs">
                        {data.address}
                    </Text>
                </Stack>
                <Text
                    size="xs"
                    sx={{
                        borderBottom: '1px solid black',
                        paddingBottom: 20,
                        width: 300,
                    }}
                    weight="bold"
                >
                    Odgovorna osoba:
                </Text>
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
                        gridTemplateColumns: COLUMNS,
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
                        align="center"
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
                                key={day.date.toString()}
                                sx={{
                                    backgroundColor: isSunday(day.date) ? theme.colors.gray[2] : 'white',
                                    borderBottom: '1px solid black',
                                    display: 'grid',
                                    gridTemplateColumns: COLUMNS,
                                    justifyContent: 'center',
                                    width: '100%',
                                }}
                            >
                                <Text size="xs">
                                    {dayjs(day.date).format('DD.MM.YYYY')}
                                    {' '}
                                    {capitalize(dayjs(day.date).format('dddd'))}
                                </Text>
                                <Text
                                    align="center"
                                    size="xs"
                                >
                                    {day.startHour ? dayjs(day.startHour).format('HH:mm') : ''}
                                    {' - '}
                                    {day.endHour ? dayjs(day.endHour).format('HH:mm') : ''}
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
                                    const value = day.present[category.name]

                                    return (
                                        <Text
                                            align="center"
                                            key={category.name}
                                            size="xs"
                                            weight={value === 0 ? 400 : 600}
                                        >
                                            {value}
                                        </Text>
                                    )
                                })}
                                {ABSENT_CATEGORIES.map((category) => {
                                    const value = day.absent[category.name]

                                    return (
                                        <Text
                                            align="center"
                                            key={category.name}
                                            size="xs"
                                            weight={value === 0 ? 400 : 600}
                                        >
                                            {value}
                                        </Text>
                                    )
                                })}
                            </Group>
                        )
                    })}
                </Box>
            </Stack>
            <Group
                sx={{
                    alignItems: 'center',
                    display: 'grid',
                    gridTemplateColumns: COLUMNS,
                }}
            >
                <Text
                    size="sm"
                    weight="bold"
                >
                    Ukupno
                </Text>
                <div />
                <Text
                    align="center"
                    size="sm"
                    weight="bold"
                >
                    {data.list.reduce((accumulator, day) => {
                        return accumulator + Object.values(day.present).reduce((accumulator, category) => {
                            return accumulator + category
                        }, 0)
                    }, 0)}
                </Text>
                {PRESENT_CATEGORIES.map((category) => {
                    const totalCategoryHours = data.list.reduce((accumulator, day) => {
                        return accumulator + day.present[category.name]
                    }, 0)

                    return (
                        <Text
                            align="center"
                            key={category.label}
                            size="xs"
                            weight="bold"
                        >
                            {totalCategoryHours}
                        </Text>
                    )
                })}
                {ABSENT_CATEGORIES.map((category) => {
                    const totalCategoryHours = data.list.reduce((accumulator, day) => {
                        return accumulator + day.absent[category.name]
                    }, 0)

                    return (
                        <Text
                            align="center"
                            key={category.label}
                            size="xs"
                            weight="bold"
                        >
                            {totalCategoryHours}
                        </Text>
                    )
                })}
            </Group>
        </Stack>
    )
})
