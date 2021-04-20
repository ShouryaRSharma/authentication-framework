import { RouteComponentProps } from 'react-router-dom';

export interface PasswordReset {
    email: string
}

export interface RegisterParams {
    title: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    acceptTerms: boolean
}

export interface LoginParams {
    email: string,
    password: string
}

export interface RouteProps {
    location?: RouteComponentProps["location"],
    history?: RouteComponentProps["history"],
    match?: RouteComponentProps["match"],
}

export interface TokenProps {
    Validating: string,
    Valid: string,
    Invalid: string
}

export interface ResetParams {
    password: string,
    confirmPassword: string
}

export interface EmailStatusParams {
    Verifying: string,
    Failed: string
}