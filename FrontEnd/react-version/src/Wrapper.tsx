import React from 'react'
import {
    Box,
    Stack,
    Grid,
} from '@chakra-ui/react'
import { ColorModeSwitcher } from "./ColorModeSwitcher"

interface Children {
    children: any
}
  
export const Wrapper = ({children}: Children) => {
    return (
        <Box textAlign="center">
            <Grid minH="100vh" p={3}>
                <ColorModeSwitcher justifySelf="flex-end" />
                <Stack spacing={5}>
                    {children}
                </Stack>
            </Grid>
        </Box>
    )
}