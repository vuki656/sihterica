import { zodResolver } from '@hookform/resolvers/zod'
import {
    Box,
    Button,
    Group,
    HoverCard,
    Paper,
    Stack,
    Text,
    TextInput,
    Title,
    Tooltip,
} from '@mantine/core'
import { TimeInput } from '@mantine/dates'
import {
    IconBeach,
    IconPrinter,
} from '@tabler/icons-react'
import {
    addHours,
    eachDayOfInterval,
    endOfMonth,
    format,
    isSameDay,
    isSunday,
    isWeekend,
    parseISO,
    startOfDay,
    startOfMonth,
    subMonths,
} from 'date-fns'
import dayjs from 'dayjs'
import { MonthPicker } from 'mantine-dates-6'
import {
    useMemo,
    useRef,
    useState,
} from 'react'
import {
    Controller,
    useForm,
} from 'react-hook-form'
import { useReactToPrint } from 'react-to-print'

import { HourInput } from './HourInput'
import {
    ABSENT_CATEGORIES,
    PRESENT_CATEGORIES,
    TIME_SPAN_IN_DAYS,
} from './HourTable.data'
import type {
    HourTableFormValueType,
    HourTableProps,
} from './HourTable.types'
import { monthValidation } from './HourTable.validation'
import { Pdf } from './Pdf'

import {
    capitalize,
    extractFormFieldError,
} from '@/shared/utils'

const COLUMNS = `200px repeat(2, 100px) repeat(${ABSENT_CATEGORIES.length + PRESENT_CATEGORIES.length}, auto)`

const SHIFT_START_TIME = 8
const SHIFT_END_TIME = 16

// TODO: total hours for day row
// TODO: total hours for the column
// TODO: performance is trash
// TODO: buttons for 8 - 16, 7 - 15
// TODO: month picker
// FIXME: you can put blank value inside an hour box
export const HourTable = (props: HourTableProps) => {
    const { nonWorkingDays } = props

    const [data, setData] = useState<HourTableFormValueType | null>(null)

    const pdfRef = useRef<HTMLDivElement | null>(null)

    const printPdf = useReactToPrint({
        content: () => pdfRef.current,
        onAfterPrint: () => {
            setData(null)
        },
    })

    const days = useMemo(() => {
        return eachDayOfInterval({
            end: endOfMonth(
                subMonths(
                    new Date(),
                    1
                )
            ),
            start: startOfMonth(
                subMonths(
                    new Date(),
                    1
                )
            ),
        })
    }, [])

    const {
        control,
        formState,
        handleSubmit,
        register,
    } = useForm<HourTableFormValueType>({
        defaultValues: {
            fullName: '',
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
                    endHour: isWeekend(day) ? null : addHours(startOfDay(new Date), SHIFT_END_TIME),
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
                    startHour: isWeekend(day) ? null : addHours(startOfDay(new Date()), SHIFT_START_TIME),
                }
            }),
            month: dayjs(new Date)
                .subtract(1, 'month')
                .startOf('months')
                .toDate(),
        },
        reValidateMode: 'onSubmit',
        resolver: zodResolver(monthValidation),
    })

    const onSubmit = async (formValue: HourTableFormValueType) => {
        setData(formValue)

        window.requestAnimationFrame(() => {
            printPdf()
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack m={20}>
                <Group position="apart">
                    <Title>
                        🗃️ eSihterica
                    </Title>
                    <HoverCard
                        shadow="md"
                        width={500}
                    >
                        <HoverCard.Target>
                            <Button
                                color="blue"
                                leftIcon={<IconBeach />}
                                variant="light"
                            >
                                Blagdani
                            </Button>
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                            <Text
                                mb={5}
                                size="lg"
                                weight="bold"
                            >
                                Blagdani u sljedecih
                                {' '}
                                {TIME_SPAN_IN_DAYS}
                                {' '}
                                dana
                            </Text>
                            <Stack spacing={2}>
                                {nonWorkingDays.map((holiday) => {
                                    return (
                                        <Group key={holiday.id}>
                                            <Text>
                                                {format(new Date(holiday.start.date), 'dd.MM.yyyy EEEE')}
                                                {': '}
                                                {holiday.summary}
                                            </Text>
                                        </Group>
                                    )
                                })}
                            </Stack>
                        </HoverCard.Dropdown>
                    </HoverCard>
                    <Button
                        color="red"
                        leftIcon={<IconPrinter />}
                        type="submit"
                    >
                        Print
                    </Button>
                </Group>
                <Group>
                    <Group>
                        <TextInput
                            {...register('fullName')}
                            {...extractFormFieldError(formState.errors.fullName)}
                            label="Radnik"
                            placeholder="Unestie puno ime radnika"
                        />
                        <TextInput
                            {...register('companyName')}
                            {...extractFormFieldError(formState.errors.companyName)}
                            label="Ime firme"
                            placeholder="Unesite ime firme"
                        />
                        <TextInput
                            {...register('address')}
                            {...extractFormFieldError(formState.errors.address)}
                            label="Adresa"
                            placeholder="Unesite adresu firme"
                        />
                        <Controller
                            name="month"
                            control={control}
                            render={(controller) => {
                                return (
                                    <MonthPicker
                                        value={controller.field.value}
                                        onChange={(value) => {
                                            controller.field.onChange(value)
                                        }}
                                    />
                                )
                            }}
                        />
                    </Group>
                </Group>
                <Paper
                    component={Stack}
                    shadow="xl"
                    spacing={0}
                    sx={{ backgroundColor: 'white' }}
                >
                    <Paper
                        sx={(theme) => ({
                            backgroundColor: 'white',
                            borderBottom: `1px solid ${theme.colors.gray[3]}`,
                            borderRadius: 0,
                            columnGap: '10px',
                            display: 'grid',
                            gridAutoFlow: 'column',
                            gridTemplateColumns: COLUMNS,
                            padding: 30,
                            position: 'sticky',
                            top: 0,
                            zIndex: 5,
                        })}
                    >
                        <Text
                            sx={{
                                alignItems: 'flex-end',
                                display: 'flex',
                                fontWeight: 'bold',
                                justifyContent: 'flex-start',
                            }}
                        >
                            Datum
                        </Text>
                        <Text
                            sx={{
                                alignItems: 'flex-end',
                                display: 'flex',
                                fontWeight: 'bold',
                                justifyContent: 'center',
                            }}
                        >
                            Od
                        </Text>
                        <Text
                            sx={{
                                alignItems: 'flex-end',
                                display: 'flex',
                                fontWeight: 'bold',
                                justifyContent: 'center',
                            }}
                        >
                            Do
                        </Text>
                        {PRESENT_CATEGORIES.map((category) => {
                            return (
                                <Text
                                    key={category.label}
                                    sx={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        fontWeight: 'bold',
                                        justifyContent: 'flex-start',
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
                                        alignItems: 'center',
                                        display: 'flex',
                                        fontWeight: 'bold',
                                        justifyContent: 'flex-start',
                                        textOrientation: 'revert',
                                        transform: 'rotate(-180deg)',
                                        writingMode: 'vertical-rl',
                                    }}
                                >
                                    {category.label}
                                </Text>
                            )
                        })}
                    </Paper>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: 20,
                            rowGap: '10px',
                        }}
                    >
                        {days.map((day, dayIndex) => {
                            const foundNonWorkingDay = nonWorkingDays.find((nonWorkingDay) => {
                                return isSameDay(parseISO(nonWorkingDay.start.date), day)
                            })

                            return (
                                <Box
                                    key={day.toString()}
                                    sx={(theme) => ({
                                        '&:hover': {
                                            backgroundColor: theme.colors.yellow[1],
                                        },
                                        alignItems: 'center',
                                        backgroundColor: isSunday(day) ? theme.colors.blue[1] : '',
                                        borderRadius: theme.radius.sm,
                                        columnGap: '10px',
                                        display: 'grid',
                                        gridAutoFlow: 'column',
                                        gridTemplateColumns: COLUMNS,
                                        justifyContent: 'center',
                                        padding: 10,
                                    })}
                                >
                                    <Tooltip
                                        disabled={!foundNonWorkingDay}
                                        label={foundNonWorkingDay?.summary}
                                    >
                                        <Text
                                            sx={(theme) => ({
                                                color: foundNonWorkingDay ? theme.colors.red[8] : theme.black,
                                                fontWeight: foundNonWorkingDay ? 600 : 400,
                                            })}
                                        >
                                            {format(day, 'dd.MM.yyyy')}
                                            {' '}
                                            {capitalize(format(day, 'EEEE'))}
                                        </Text>
                                    </Tooltip>
                                    <Controller
                                        control={control}
                                        name={`list.${dayIndex}.startHour`}
                                        render={(controller) => {
                                            return (
                                                <TimeInput
                                                    clearable={true}
                                                    onChange={controller.field.onChange}
                                                    value={controller.field.value ?? undefined}
                                                />
                                            )
                                        }}
                                    />
                                    <Controller
                                        control={control}
                                        name={`list.${dayIndex}.endHour`}
                                        render={(controller) => {
                                            return (
                                                <TimeInput
                                                    clearable={true}
                                                    onChange={controller.field.onChange}
                                                    value={controller.field.value ?? undefined}
                                                />
                                            )
                                        }}
                                    />
                                    {PRESENT_CATEGORIES.map((category) => {
                                        return (
                                            <Controller
                                                control={control}
                                                key={category.name}
                                                name={`list.${dayIndex}.present.${category.name}`}
                                                render={(controller) => {
                                                    return (
                                                        <HourInput
                                                            error={Boolean(controller.fieldState.error)}
                                                            onChange={(value) => {
                                                                if (!value) {
                                                                    controller.field.onChange(null)

                                                                    return
                                                                }

                                                                controller.field.onChange(value)
                                                            }}
                                                            value={controller.field.value}
                                                        />
                                                    )
                                                }}
                                            />
                                        )
                                    })}
                                    {ABSENT_CATEGORIES.map((category) => {
                                        return (
                                            <Controller
                                                control={control}
                                                key={category.name}
                                                name={`list.${dayIndex}.absent.${category.name}`}
                                                render={(controller) => {
                                                    return (
                                                        <HourInput
                                                            error={Boolean(controller.fieldState.error)}
                                                            onChange={(value) => {
                                                                if (!value) {
                                                                    controller.field.onChange(null)

                                                                    return
                                                                }

                                                                controller.field.onChange(value)
                                                            }}
                                                            value={controller.field.value}
                                                        />
                                                    )
                                                }}
                                            />
                                        )
                                    })}
                                </Box>
                            )
                        })}
                    </Box>
                </Paper>
                <Text color="dimmed">
                    © Domagoj Vukovic
                    {' '}
                    {format(new Date(), 'yyyy')}
                </Text>
            </Stack>
            {data ? (
                <Pdf
                    data={data}
                    ref={pdfRef}
                />
            ) : null}
        </form>
    )
}
