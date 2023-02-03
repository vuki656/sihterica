import type { InferGetStaticPropsType } from 'next'

import type { GoogleCalendarApiResponse } from '@/modules'
import {
    GOOGLE_CALEDAR_HOLIDAYS,
    HourTable,
} from '@/modules'

export const getStaticProps = async () => {
    const holidays = await fetch(GOOGLE_CALEDAR_HOLIDAYS)
        .then(async (response) => {
            const data = await response.json()

            return data as GoogleCalendarApiResponse
        })
        .catch((error: unknown) => {
            console.error(JSON.stringify(error, undefined, 4))
        })

    if (!holidays) {
        throw new Error('No response from google API')
    }

    const nonWorkingDays = holidays.items.filter((holiday) => {
        if (holiday.description.toLowerCase().includes('spomendan')) {
            return false
        }

        return true
    })

    return {
        props: {
            nonWorkingDays,
        },
    }
}

const HourTablePage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <HourTable nonWorkingDays={props.nonWorkingDays} />
    )
}

export default HourTablePage
