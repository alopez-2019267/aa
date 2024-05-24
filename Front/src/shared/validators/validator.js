/*--------------------- VALIDACIÓN DE CORREO ---------------------------- */
export const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/
    return regex.test(email)
}

/*--------------------- VALIDACIÓN DE NOMBRE DE USUARIO ---------------------------- */
export const validateUsername = (username) => {
    const regex = /^\S{3,20}$/
    return regex.test(username)
}

/*--------------------- VALIDACIÓN DE NOMBRE DE PERSONA ---------------------------- */
export const validateName = (name)=>{
    const regex = /^(?!.*  )[A-Z][a-z]+(?: [A-Z][a-z]+)*$/
    return regex.test(name) && name.trim().length > 0;
}

/*--------------------- VALIDACIÓN DE APELLIDO DE PERSONA ---------------------------- */
export const validateSurname = (surname)=>{
    const regex = /^(?!.*  )[A-Z][a-z]+(?: [A-Z][a-z]+)*$/
    return regex.test(surname) && surname.trim().length > 0;
}

/*--------------------- VALIDACIÓN DE CONTRASEÑA ---------------------------- */
export const validatePassword = (password) => {
    const regex = /^\S{5,12}$/
    return regex.test(password)
}

/*--------------------- VALIDACIÓN DE CONFIRMACION CONTRASEÑA ---------------------------- */
export const validatePassConfirm = (password, passConfirm) => {
    return password === passConfirm
}

/*--------------------- VALIDACIÓN DE TITULO ---------------------------- */
export const validateTitle = (title) => {
    return title.length >= 3 && title.length <= 30
}

/*--------------------- VALIDACIÓN DE URL ---------------------------- */
export const validateAvatarUrl = (url) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url)

}

/*--------------------- VALIDACIÓN DE DESCRIPCION ---------------------------- */
export const validateDescription = (title) => {
    return title.length >= 10 && title.length <= 200
}

/* --------------------- MENSAJES DE VALIDACIÓN DE CAMPOS ------------------------------ */
export const usernameValidationMessage = 'Username y/o email invalid.'
export const nameValidationMessage = 'Name invalid.'
export const surnameValidationMessage = 'Surname invalid.'
export const passwordValidationMessage = 'The password must be between 6 and 12 characters, without spaces.'
export const passConfirmValidationMessage = 'Passwords do not match'
export const emailValidationMessage = 'Please enter a valid email'
export const titleValidationMessage = 'The title must be between 3 and 30 characters.'
export const avatarValidationMessage = 'The URL is not in a valid format'
export const descriptionValidationMessage = 'The description must be between 10 and 200 characters.'

/* --------------------- MENSAJES DE VALIDACIÓN DE CAMPOS ------------------------------ */