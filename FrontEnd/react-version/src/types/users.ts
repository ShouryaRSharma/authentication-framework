export interface AddParams {
    title: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    password: string,
    confirmPassword: string
}

export interface EditParams {
    title?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    role?: string,
    password?: string,
    confirmPassword?: string
}