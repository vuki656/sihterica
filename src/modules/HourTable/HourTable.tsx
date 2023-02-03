import { zodResolver } from '@hookform/resolvers/zod'
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
import { DatePicker } from '@mantine/dates'
import {
    eachDayOfInterval,
    endOfMonth,
    format,
    isSunday,
    isWeekend,
    startOfMonth,
} from 'date-fns'
import { useMemo } from 'react'
import {
    Controller,
    useForm,
} from 'react-hook-form'

import {
    ABSENT_CATEGORIES,
    PRESENT_CATEGORIES,
} from './HourTable.data'
import type { HourTableFormValueType } from './HourTable.types'
import { monthValidation } from './HourTable.validation'

const COLUMNS = `200px 80px 80px repeat(${ABSENT_CATEGORIES.length + PRESENT_CATEGORIES.length}, 50px)`

export const HourTable = () => {
    const days = useMemo(() => {
        return eachDayOfInterval({
            end: endOfMonth(new Date()),
            start: startOfMonth(new Date()),
        })
    }, [])

    const {
        control,
        handleSubmit,
        register,
    } = useForm<HourTableFormValueType>({
        defaultValues: {
            list: days.map((day) => {
                return {
                    absent: {
                        companySickLeave: 0,
                        dailyVaccation: 0,
                        holiday: 0,
                        hzzoSickLeave: 0,
                        paidLeave: 0,
                        paternityLeave: 0,
                        unpaidLeave: 0,
                        weeklyVaccation: 0,
                        yearlyVaccation: 0,
                    },
                    date: day,
                    endHour: isWeekend(day) ? null : 16,
                    present: {
                        double: 0,
                        field: 0,
                        holidaysAndNonWorkingDays: 0,
                        nightly: 0,
                        overtime: 0,
                        redistribution: 0,
                        regular: isWeekend(day) ? 0 : 8,
                        shift: 0,
                        standby: 0,
                        sunday: 0,
                    },
                    startHour: isWeekend(day) ? null : 8,
                }
            }),
        },
        resolver: zodResolver(monthValidation),
    })

    const onSubmit = (formValue: HourTableFormValueType) => {
        console.log(formValue)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                <Button type="submit">
                    Print
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
                            Od
                        </Text>
                    </Center>
                    <Center>
                        <Text>
                            Do
                        </Text>
                    </Center>
                    {PRESENT_CATEGORIES.map((category) => {
                        return (
                            <Text
                                key={category.label}
                                sx={{
                                    textOrientation: 'revert',
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
                                sx={{
                                    textOrientation: 'revert',
                                    transform: 'rotate(-180deg)',
                                    writingMode: 'vertical-rl',
                                }}
                            >
                                {category.label}
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
                    {days.map((day, index) => {
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
                                <Controller
                                    control={control}
                                    name={`list.${index}.startHour`}
                                    render={(controller) => {
                                        return (
                                            <NumberInput
                                                hideControls={true}
                                                onChange={(value) => {
                                                    if (!value) {
                                                        controller.field.onChange(0)

                                                        return
                                                    }

                                                    controller.field.onChange(value)
                                                }}
                                                value={controller.field.value ?? undefined}
                                            />
                                        )
                                    }}
                                />
                                <Controller
                                    control={control}
                                    name={`list.${index}.endHour`}
                                    render={(controller) => {
                                        return (
                                            <NumberInput
                                                hideControls={true}
                                                onChange={(value) => {
                                                    if (!value) {
                                                        controller.field.onChange(null)

                                                        return
                                                    }

                                                    controller.field.onChange(value)
                                                }}
                                                value={controller.field.value ?? undefined}
                                            />
                                        )
                                    }}
                                />
                            </Box>
                        )
                    })}
                </Box>
            </Stack>
        </form>
    )
}
