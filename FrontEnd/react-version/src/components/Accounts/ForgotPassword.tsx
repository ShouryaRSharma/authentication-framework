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
import { PasswordReset } from '../../types'

export function ForgotPassword() {
    const initialValues: PasswordReset = {
        email: ''
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email is invalid').required('Email is required')
    })

    function onSubmit({ email }: any, { setSubmitting }: any) {
        alertService.clear();
        accountService.forgotPassword(email)
            .then(() => alertService.success('Please check your email for password reset instructions', {}))
            .catch(err => alertService.error(err))
            .finally(() => setSubmitting(false));
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
                                        <div>
                                            <Button mt={2} colorScheme="teal" isLoading={isSubmitting} loadingText="Submitting" type="submit" float="right">
                                                Forgot Password
                                            </Button>
                                            <Button mt={2} colorScheme="red"><Link to="login">Cancel</Link></Button> 
                                        </div>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </Stack>
                </Box>
            </Flex>
        </Box>
        
    )
}