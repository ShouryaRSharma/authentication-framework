import React, { useState, useEffect, Fragment } from 'react';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton
} from "@chakra-ui/react"

interface AlertInterface {
    id?: string,
    fade?: boolean
}

const defaultProps: AlertInterface = {
    id: 'default-alert',
    fade: true
};

export function Alerts({id, fade}: AlertInterface) {
    const [alerts, setAlerts] = useState(true);

    function closeAlert() {
        console.log("hello")
        setAlerts(false)
    }

    useEffect(() => {
        async function fetchData() {
            const requestOoptions = {
                method: 'GET'
            }
            await fetch('http://localhost:4000/accounts', requestOoptions).then(
                res => console.log("hello")
            )
        }

        fetchData()
    }, []) 

    return (
        <Fragment>
            { alerts && <Alert status="warning" variant="subtle">
                <AlertIcon />
                <AlertTitle mr={2}>This is a test alert</AlertTitle>
                <AlertDescription>Your Chakra experience may be degraded</AlertDescription>
                <CloseButton onClick={closeAlert} position="absolute" right="8px" top="8px" />
            </Alert> }
        </Fragment>
    )
}