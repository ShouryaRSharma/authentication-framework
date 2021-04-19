import React, { useState, useEffect, Fragment } from 'react';
import { alertService } from '../../services/alertService'
import { history } from '../../helpers'
import { useToast } from '@chakra-ui/react'

interface AlertInterface {
    id?: string,
    fade?: boolean
}

const defaultProps: AlertInterface = {
    id: 'default-alert',
    fade: true
};

export function Alerts({id, fade}: AlertInterface) {
    
    const toast = useToast();
    const [alerts, setAlerts] = useState<any>([]);

    useEffect(() => { 
        const subscription = alertService.onAlert(id)
            .subscribe(alert => {
                if (!alert.message) {
                    setAlerts((alerts: any) => {
                        // filter out alerts without 'keepAfterRouteChange' flag
                        const filteredAlerts = alerts.filter((x: any) => x.keepAfterRouteChange);

                        // remove 'keepAfterRouteChange' flag on the rest
                        filteredAlerts.forEach((x: any) => delete x.keepAfterRouteChange);
                        return filteredAlerts;
                    });
                } else {
                    // add alert to array
                    setAlerts((alerts: any) => ([...alerts, alert]));
                }
            });

        // clear alerts on location change
        const historyUnlisten = history.listen(({ pathname }: any) => {
            // don't clear if pathname has trailing slash because this will be auto redirected again
            if (pathname.endsWith('/')) return;

            alertService.clear(id);
        });

        // clean up function that runs when the component unmounts
        return () => {
            // unsubscribe & unlisten to avoid memory leaks
            subscription.unsubscribe();
            historyUnlisten();
        };
    }, [id]);

    if (!alerts.length) return null;

    return (
        <Fragment>
            {alerts.map((alert: any, index: string) => 
                toast({
                    title: "Notification",
                    description: alert.message,
                    status: alert.type,
                    duration: 1500,
                    isClosable: true,
                })
            )}
        </Fragment>
    )
}