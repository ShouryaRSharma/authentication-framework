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
    Select,
    Checkbox
  } from "@chakra-ui/react";
import { accountService } from '../../services/accountService'
import { alertService } from '../../services/alertService'
import { RegisterParams } from '../../types/accounts'

export function Login({history, location}: any) {
    const initialValues: RegisterParams = {
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        email: Yup.string().email('Email is invalid').required('Email is required'),
        password: Yup.string().required('Please Enter your password').matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                ),
        confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('Confirm Password is required'),
        acceptTerms: Yup.bool()
        .oneOf([true], 'Accept Terms & Conditions is required')
    })

    function onSubmit(fields: any, { setStatus, setSubmitting }: any) {
        alertService.clear();
        accountService.register(fields)
            .then(() => {
                alertService.success('Registration successful, please check your email for verification instructions', { keepAfterRouteChange: true });
                history.push('login');
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
                                    <Box paddingBottom={2}>
                                        <Field name="title" as="select" width={"100%"}>
                                        {({ field, form }: any) => (
                                            <FormControl isInvalid={form.errors.title && form.touched.title}>
                                                <FormLabel htmlFor="title">Title</FormLabel>
                                                <Select
                                                    {...field}
                                                    id="title"
                                                    placeholder="Select Title"
                                                    value={values.title}
                                                    onChange={handleChange}
                                                >
                                                    <option value=""></option>
                                                    <option value="Mr">Mr</option>
                                                    <option value="Mrs">Mrs</option>
                                                    <option value="Miss">Miss</option>
                                                    <option value="Ms">Ms</option>
                                                </Select>
                                                <FormErrorMessage>
                                                    {form.errors.title}
                                                </FormErrorMessage>
                                            </FormControl>
                                        )}
                                        </Field>
                                    </Box>
                                    <Box paddingBottom={2}>
                                        <Field name="firstName" type="text" width={"100%"}>
                                        {({ field, form }: any) => (
                                            <FormControl isInvalid={form.errors.firstName && form.touched.firstName}>
                                                <FormLabel htmlFor="firstName">First Name</FormLabel>
                                                <Input
                                                    {...field}
                                                    id="firstName"
                                                    placeholder="firstName"
                                                    value={values.firstName}
                                                    onChange={handleChange}
                                                />
                                                <FormErrorMessage>
                                                    {form.errors.firstName}
                                                </FormErrorMessage>
                                            </FormControl>
                                        )}
                                        </Field>
                                    </Box>
                                    <Box paddingBottom={2}>
                                        <Field name="lastName" type="text" width={"100%"}>
                                        {({ field, form }: any) => (
                                            <FormControl isInvalid={form.errors.lastName && form.touched.lastName}>
                                                <FormLabel htmlFor="lastName">Lsat Name</FormLabel>
                                                <Input
                                                    {...field}
                                                    id="lastName"
                                                    placeholder="lastName"
                                                    value={values.lastName}
                                                    onChange={handleChange}
                                                />
                                                <FormErrorMessage>
                                                    {form.errors.lastName}
                                                </FormErrorMessage>
                                            </FormControl>
                                        )}
                                        </Field>
                                    </Box>
                                    <Box paddingBottom={2}>
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
                                    <Box paddingBottom={2}>
                                        <Field name="password" type="password" width={"100%"}>
                                        {({ field, form }: any) => (
                                            <FormControl isInvalid={form.errors.password && form.touched.password}>
                                                <FormLabel htmlFor="password">Password</FormLabel>
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
                                    <Box paddingBottom={2}>
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
                                    <Box paddingBottom={2}>
                                        <Field name="acceptTerms" type="checkbox" width={"100%"}>
                                        {({ field, form }: any) => (
                                            <FormControl isInvalid={form.errors.acceptTerms && form.touched.acceptTerms}>
                                                <FormLabel htmlFor="acceptTerms">Confirm Password</FormLabel>
                                                <Checkbox colorScheme="green" size="md">
                                                    Accept Terms and Conditions
                                                </Checkbox>
                                                <FormErrorMessage>
                                                    {form.errors.acceptTerms}
                                                </FormErrorMessage>
                                            </FormControl>
                                        )}
                                        </Field>
                                    </Box>
                                    <div>
                                        <Button mt={2} colorScheme="teal" isLoading={isSubmitting} loadingText="Submitting" type="submit">
                                            Register
                                        </Button>
                                        <Button mt={2} colorScheme="cyan"><Link to="login">Cancel</Link></Button>
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