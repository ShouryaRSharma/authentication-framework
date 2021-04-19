import React from 'react'
import { Link } from 'react-router-dom';
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
import { accountService } from '../../services/accountService'
import { alertService } from '../../services/alertService'

interface PasswordReset {
    email: string,
    password: string
}

export function Login({history, location}: any) {
    const initialValues: PasswordReset = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email is invalid').required('Email is required'),
        password: Yup.string().required('Please Enter your password').matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                )
    })

    function onSubmit({ email, password }: any, { setSubmitting }: any) {
        alertService.clear();
        accountService.login(email, password)
            .then(() => {
                const { from } = location.state || { from: { pathname: "/" } };
                history.push(from);
            })
            .catch(err => {
                setSubmitting(false)
                alertService.error(err)
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
                    Forgot Password?
                </Heading>
                <Box p={5} shadow="md" borderWidth="1px" rounded="md" width={"40%"}>
                    <Stack isInline spacing={8} align="center">
                        <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                            {({ values, isSubmitting, handleChange }) => (
                                <Form>
                                    <Box paddingBottom={3}>
                                        <Field name="email" type="text" width={"100%"}>
                                        {({ field, form }: any) => (
                                            <FormControl isInvalid={form.errors.email && form.touched.email}>
                                                <FormLabel htmlFor="email">Email</FormLabel>
                                                <Input
                                                    {...field}
                                                    id="email"
                                                    placeholder="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                />
                                                <FormErrorMessage>
                                                    {form.errors.email}
                                                </FormErrorMessage>
                                            </FormControl>
                                        )}
                                        </Field>
                                    </Box>
                                    <Box paddingBottom={3}>
                                        <Field name="password" type="password" width={"100%"}>
                                        {({ field, form }: any) => (
                                            <FormControl isInvalid={form.errors.password && form.touched.password}>
                                                <FormLabel htmlFor="password">Password</FormLabel>
                                                <Input
                                                    {...field}
                                                    id="email"
                                                    placeholder="email"
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
                                    <div>
                                        <Button mt={2} colorScheme="teal" isLoading={isSubmitting} loadingText="Submitting" type="submit">
                                            Login
                                        </Button>
                                        <Button mt={2} colorScheme="cyan"><Link to="register">Register</Link></Button>
                                    </div>
                                    <div>
                                        <Button mt={2} colorScheme="red" float="right">
                                            <Link to="forgot-password">Forgot Password</Link>
                                        </Button>
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