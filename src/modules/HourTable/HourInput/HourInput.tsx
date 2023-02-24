import type { NumberInputProps } from '@mantine/core'
import { NumberInput } from '@mantine/core'
import { forwardRef } from 'react'

export const HourInput = forwardRef<HTMLInputElement, NumberInputProps>(function HourInput(props, ref) {
    const {
        error,
        value,
        ...other
    } = props

    return (
        <NumberInput
            hideControls={true}
            min={0}
            max={24}
            ref={ref}
            sx={(theme) => {
                let borderColor = value
                    ? theme.colors.green[4]
                    : theme.colors.gray[1]

                if (error) {
                    borderColor = theme.colors.red[4]
                }

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
