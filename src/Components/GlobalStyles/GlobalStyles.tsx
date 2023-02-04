import { Global } from '@mantine/core'
import React from 'react'

export const GlobalStyles = () => {
    return (
        <Global
            styles={(theme) => ({
                '*::-webkit-scrollbar': {
                    height: '10px',
                    width: '10px',
                },
                '*::-webkit-scrollbar-thumb': {
                    backgroundColor: theme.colors.blue[2],
                    borderRadius: '4px',
                },
            })}
        />
    )
}
