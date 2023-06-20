import { object, string,ref } from 'yup';
export const singUpValidations=object({
    name:string().min(2).max(50).required(),
    email: string().email().required(),
    password: string().required().min(5),
    confirmPassword:string().oneOf([ref('password')]).required()
})
export const singInValidations=object({
    email: string().email().required(),
    password: string().required().min(5),
})