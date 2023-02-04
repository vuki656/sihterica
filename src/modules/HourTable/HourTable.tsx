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
import { pdf } from '@react-pdf/renderer'
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
} from 'date-fns'
import dayjs from 'dayjs'
import {
    useMemo,
    useRef,
} from 'react'
import {
    Controller,
    useForm,
} from 'react-hook-form'
import ReactToPrint from 'react-to-print'

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

const COLUMNS = `200px 80px 80px repeat(${ABSENT_CATEGORIES.length + PRESENT_CATEGORIES.length}, auto)`

const SHIFT_START_TIME = 8
const SHIFT_END_TIME = 16

// TODO: total hours for day row
// TODO: total hours for the column
// TODO: performance is trash
// FIXME: you can put blank value inside an hour box
export const HourTable = (props: HourTableProps) => {
    const { nonWorkingDays } = props

    const componentRef = useRef<HTMLDivElement | null>(null)

    const days = useMemo(() => {
        return eachDayOfInterval({
            end: endOfMonth(new Date()),
            start: startOfMonth(new Date()),
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
        },
        reValidateMode: 'onSubmit',
        resolver: zodResolver(monthValidation),
    })

    const onSubmit = async (formValue: HourTableFormValueType) => {
        const blob = await pdf((<Pdf data={formValue} />)).toBlob()

        const blobUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')

        link.href = blobUrl
        link.download = `${formValue.fullName}-sihterica.pdf`

        document.body.appendChild(link)

        link.click()

        window.requestAnimationFrame(() => {
            document.body.removeChild(link)
            URL.revokeObjectURL(blobUrl)
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ReactToPrint
                content={() => componentRef.current}
                trigger={() => (
                    <button>
                        Print this out!
                    </button>
                )}
            />
            <Box
                ref={componentRef}
                sx={{
                    backgroundColor: 'white',
                    height: 850,
                    width: 1100,
                    boxSizing: 'border-box',
                    padding: '15px 10px',
                    border: '1px solid red',
                }}
            >
                <Stack spacing={1}>
                    <Group position='apart'>
                        <Text size="sm">
                            KNJIGOVODSTVENI SERVIS LIBER, Tanja Vuković
                        </Text>
                        <Text size="sm">
                            33000 VIROVITICA, MASARYKOVA 14/1
                        </Text>
                    </Group>
                    <Group position="apart">
                        <Text size="sm">
                            Odgovorna osoba: TANJA VUKOVIĆ
                        </Text>
                        <Text size="sm">
                            (Kontrolirao: )
                        </Text>
                    </Group>
                    <Group position='apart'>
                        <Text size='sm'>
                            Mjesec:
                            {' '}
                            {dayjs(new Date()).format('MMMM')}
                        </Text>
                        <Text size='sm'>
                            Godina:
                            {' '}
                            {dayjs(new Date()).format('YYYY')}
                        </Text>
                        <Text size='sm'>
                            Radnik:
                            {' '}
                            Pero Peric
                        </Text>
                        <Text size='sm'>
                            Za datum
                            {' '}
                            {dayjs(new Date()).format('DD.MM.YYYY')}
                        </Text>
                    </Group>
                </Stack>
            </Box>
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
                <Group position="apart">
                    <Group>
                        <TextInput
                            {...register('fullName')}
                            {...extractFormFieldError(formState.errors.fullName)}
                            label="Radnik"
                            placeholder="Ime i prezime radnika"
                        />
                    </Group>
                </Group>
                <Paper
                    component={Stack}
                    shadow="xl"
                    spacing={0}
                    sx={{
                        backgroundColor: 'white',
                    }}
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
                                                            onChange={(value) => {
                                                                if (!value) {
                                                                    controller.field.onChange(0)

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
        </form>
    )
}
