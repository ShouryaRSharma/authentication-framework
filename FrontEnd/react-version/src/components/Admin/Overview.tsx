import React from 'react';
import { Link } from 'react-router-dom';
import { RouteProps } from '../../types'
import { Heading, Text, Stack } from '@chakra-ui/react'

export function Overview({ match }: RouteProps) {
    const { path }: any = match;

    return (
        <Stack spacing={3}>
            <Heading as="h1">Admin</Heading>
            <Text>This section can only be accessed by administrators.</Text>
            <Text><Link to={`${path}/users`}>Manage Users</Link></Text>
        </Stack>
    );
}