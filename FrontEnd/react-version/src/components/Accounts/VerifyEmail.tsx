import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { accountService } from '../../services/accountService'
import { alertService } from '../../services/alertService'
import { EmailStatusParams, RouteProps } from '../../types'
import { Heading } from '@chakra-ui/react';

export function VerifyEmail({ history }: RouteProps) {
    const EmailStatus: EmailStatusParams = {
        Verifying: 'Verifying',
        Failed: 'Failed'
    }

    const [emailStatus, setEmailStatus] = useState(EmailStatus.Verifying)

    useEffect(() => {
        const { token }: any = queryString.parse(window.location.search)

        history?.replace(window.location.pathname)

        accountService.verifyEmail(token)
            .then(() => {
                alertService.success('Verification Successful, you can now login', { keepAfterRouteChange: true });
                history?.push('login')
            })
            .catch(() => {
                setEmailStatus(EmailStatus.Failed)
            })
    }, [history, EmailStatus.Failed])

    function getBody() {
        switch (emailStatus) {
            case EmailStatus.Verifying:
                return <div>Verifying</div>
            case EmailStatus.Failed:
                return <div>Verification failed, you can also verify your account using the <Link to="forgot-password">forgot password</Link> page.</div>;
        }
    }

    return (
        <div>
            <Heading as="h3" color="teal.500" size="lg" p={5}>
                Verify Email
            </Heading> 
            <div>{getBody()}</div>
        </div>
    )
}