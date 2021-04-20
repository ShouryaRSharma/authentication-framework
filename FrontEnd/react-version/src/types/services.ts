export interface RegisterParams {
    title?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string, 
    confirmPassword?: string,
    acceptTerms?: boolean
}

export interface ResetParams {
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