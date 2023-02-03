import type { NumberInputProps } from '@mantine/core'
import { NumberInput } from '@mantine/core'
import { forwardRef } from 'react'

export const HourInput = forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => {
    const {
        value,
        ...other
    } = props

    return (
        <NumberInput
            hideControls={true}
            ref={ref}
            sx={(theme) => {
                const borderColor = value === 0
                    ? theme.colors.gray[1]
                    : theme.colors.green[4]

                return {
                    'input': {
                        border: `1px solid ${borderColor}`,
                        borderRadius: 4,
                        borderWidth: 2,
                        textAlign: 'center',
                    },
                }
            }}
            value={value}
            {...other}
        />
    )
})
