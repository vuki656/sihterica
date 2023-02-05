import { z } from 'zod'

const hourValidation = z
    .number()
    .nonnegative()
    .max(24, { message: 'Broj sati za dan ne moze biti veci of 24' })

const absentValidation = z.object({
    companySickLeave: hourValidation,
    dailyVaccation: hourValidation,
    holiday: hourValidation,
    hzzoSickLeave: hourValidation,
    paidLeave: hourValidation,
    paternityLeave: hourValidation,
    unpaidLeave: hourValidation,
    weeklyVaccation: hourValidation,
    yearlyVaccation: hourValidation,
})

const presetValidation = z.object({
    double: hourValidation,
    field: hourValidation,
    holidaysAndNonWorkingDays: hourValidation,
    nightly: hourValidation,
    overtime: hourValidation,
    redistribution: hourValidation,
    regular: hourValidation,
    shift: hourValidation,
    standby: hourValidation,
    sunday: hourValidation,
})

export const dayValidation = z.object({
    absent: absentValidation,
    date: z.date(),
    endHour: z.date().nullable(),
    present: presetValidation,
    startHour: z.date().nullable(),
})

export const monthValidation = z.object({
    fullName: z.string().min(1, { message: 'Morate unesti ime radnika' }),
    companyName: z.string().min(1, { message: 'Morate unesti ime firme' }),
    address: z.string().min(1, { message: 'Morate unesti adresu' }),
    list: z.array(dayValidation),
})
