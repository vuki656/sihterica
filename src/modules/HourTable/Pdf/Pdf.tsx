import {
    Document,

    Page,
    StyleSheet,
    Text,
    View,
} from '@react-pdf/renderer'
import {
    format,
    isSunday,
} from 'date-fns'

import {
    ABSENT_CATEGORIES,
    PRESENT_CATEGORIES,
} from '../HourTable.data'

import type { PdfProps } from './Pdf.types'

import { formatLongDate } from '@/shared/utils'

const DEFAULT_FONT_SIZE = 8

export const styles = StyleSheet.create({
    day: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        fontSize: DEFAULT_FONT_SIZE,
        marginBottom: 5,
    },
    hour: {
        textAlign: 'center',
        width: 30,
    },
    page: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 30,
    },
    timeRange: {
        textAlign: 'center',
        width: 30,
    },
    header: {
        display: 'flex',
        fontSize: DEFAULT_FONT_SIZE,
        flexDirection: 'row',
        marginBottom: 30,
    },
    category: {
        textAlign: 'left',
        transform: 'rotate(-90deg)',
        width: 120,
        height: 10,
        marginLeft: -90,
        paddingLeft: 30
    }
})

// TODO: use font with Croatian characters
export const Pdf = (props: PdfProps) => {
    const {
        data,
    } = props

    return (
        <Document>
            <Page
                orientation="landscape"
                size="A4"
                style={styles.page}
            >
                <View style={styles.header}>
                    <Text style={{ width: 100 }}>
                        Datum
                    </Text>
                    <Text style={{ width: 60, textAlign: 'center', marginRight: 90 }}>
                        Od - Do
                    </Text>
                    {PRESENT_CATEGORIES.map((category) => {
                        return (
                            <Text style={styles.category}>
                                {category.label}
                            </Text>
                        )
                    })}
                    {ABSENT_CATEGORIES.map((category) => {
                        return (
                            <Text style={styles.category}>
                                {category.label}
                            </Text>
                        )
                    })}
                </View>
                <View>
                    {data.list.map((day) => {
                        return (
                            <View style={[styles.day, { backgroundColor: isSunday(day.date) ? '#A5D8FF' : 'white' }]}>
                                <Text style={{ width: 100 }}>
                                    {formatLongDate(day.date)}
                                </Text>
                                <Text style={styles.timeRange}>
                                    {day.startHour ? format(day.startHour, 'HH:mm') : ''}
                                </Text>
                                <Text style={styles.timeRange}>
                                    {day.endHour ? format(day.endHour, 'HH:mm') : ''}
                                </Text>
                                {PRESENT_CATEGORIES.map((category) => {
                                    const hours = day.present[category.name]

                                    return (
                                        <Text style={styles.hour}>
                                            {hours}
                                        </Text>
                                    )
                                })}
                                {ABSENT_CATEGORIES.map((category) => {
                                    const hours = day.absent[category.name]

                                    return (
                                        <Text style={styles.hour}>
                                            {hours}
                                        </Text>
                                    )
                                })}
                            </View>
                        )
                    })}
                </View>
            </Page>
        </Document>
    )
}
