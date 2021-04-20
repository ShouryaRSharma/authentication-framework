import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    FormErrorMessage,
  } from "@chakra-ui/react";
import { accountService } from '../../services/accountService';
import { alertService } from '../../services/alertService';
import { RouteProps, TokenProps, ResetParams } from '../../types/accounts'

export function ResetPassword({ history }: RouteProps) {
    const TokenStatus: TokenProps = {
        Validating: 'Validating',
        Valid: 'Valid',
        Invalid: 'Invalid'
    }

    const [token, setToken] = useState<string>();
    const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating)

    useEffect(() => {
        const { token }: any = queryString.parse(window.location.search)
        history?.replace(window.location.pathname)

        accountService.validateResetToken(token)
            .then(() => {
                setToken(token);
                setTokenStatus(TokenStatus.Valid);
            })
            .catch(() => {
                setTokenStatus(TokenStatus.Invalid);
            });
    }, [history, TokenStatus.Invalid, TokenStatus.Valid])

    function getForm() {
        const initialValues: ResetParams = {
            password: '',
            confirmPassword: ''
        }

        const validationSchema = Yup.object().shape({
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
        });

        function onSubmit({ password, confirmPassword }: ResetParams, { setSubmitting }: any) {
            alertService.clear();
            accountService.resetPassword({ token, password, confirmPassword })
                .then(() => {
                    alertService.success('Password reset successful, you can now login', { keepAfterRouteChange: true });
                    history?.push('login');
                })
                .catch(error => {
                    setSubmitting(false);
                    alertService.error(error);
                });
        }

        return (
            <Box
                maxWidth="1200px"
                mx="auto"
                my="auto"
                paddingTop="20px"
                paddingBottom="20px"
                height={"100%"}
            >
                <Flex alignItems="center" justifyContent="center" flexDirection="column">
                    <Heading as="h1" color="teal.500" size="lg" p={5}>
                        Reset Password
                    </Heading>
                    <Box p={5} shadow="md" borderWidth="1px" rounded="md" width={"40%"}>
                        <Stack isInline spacing={8} align="center">
                            <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                                {({ values, isSubmitting, handleChange }) => (
                                    <Form>
                                        <Box paddingBottom={3}>
                                            <Field name="password" type="password" width={"100%"}>
                                            {({ field, form }: any) => (
                                                <FormControl isInvalid={form.errors.password && form.touched.password}>
                                                    <FormLabel htmlFor="password">Email</FormLabel>
                                                    <Input
                                                        {...field}
                                                        id="password"
                                                        placeholder="password"
                                                        value={values.password}
                                                        onChange={handleChange}
                                                    />
                                                    <FormErrorMessage>
                                                        {form.errors.password}
                                                    </FormErrorMessage>
                                                </FormControl>
                                            )}
                                            </Field>
                                        </Box>
                                        <Box paddingBottom={3}>
                                            <Field name="confirmPassword" type="password" width={"100%"}>
                                            {({ field, form }: any) => (
                                                <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                                                    <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                                                    <Input
                                                        {...field}
                                                        id="confirmPassword"
                                                        placeholder="confirmPassword"
                                                        value={values.confirmPassword}
                                                        onChange={handleChange}
                                                    />
                                                    <FormErrorMessage>
                                                        {form.errors.confirmPassword}
                                                    </FormErrorMessage>
                                                </FormControl>
                                            )}
                                            </Field>
                                        </Box>
                                        <div>
                                            <Button mt={2} colorScheme="teal" isLoading={isSubmitting} loadingText="Submitting" type="submit">
                                                Reset Password
                                            </Button>
                                            <Button mt={2} colorScheme="cyan"><Link to="/login">Login</Link></Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </Stack>
                    </Box>
                </Flex>
            </Box>
        )

    }

    function getBody() {
        switch (tokenStatus) {
            case TokenStatus.Valid:
                return getForm();
            case TokenStatus.Invalid:
                return <div>Token validation failed, if the token has expired you can get a new one at the <Link to="forgot-password">forgot password</Link> page.</div>;
            case TokenStatus.Validating:
                return <div>Validating token...</div>;
        }
    }

    return (
        <div>
            <Fragment>{getBody()}</Fragment>
        </div>
    )


}