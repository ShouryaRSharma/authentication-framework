export interface RegisterServiceParams {
    title?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string, 
    confirmPassword?: string,
    acceptTerms?: boolean
}

export interface ResetServiceParams {
    token?: string,
    password?: string,
    confirmPassword?: string
}

export interface AlertTypeParams {
    Success: string,
    Error: string,
    Info: string,
    Warning: string
}