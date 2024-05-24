import { useState } from "react"
import { Input } from "./Input"
import { useRegister } from "../shared/hooks/useRegister"
import { emailValidationMessage, nameValidationMessage, passConfirmValidationMessage, passwordValidationMessage, surnameValidationMessage, usernameValidationMessage, validateEmail, validateName, validatePassConfirm, validatePassword, validateSurname, validateUsername } from "../shared/validators/validator";

export const Register = () => {
    const { register, isLoading } = useRegister();

    const [formData, setFormData] = useState(
        {
            name: {
                value: '',
                isValid: false,
                showError: false
            },
            surname: {
                value: '',
                isValid: false,
                showError: false
            },
            username: {
                value: '',
                isValid: false,
                showError: false
            },
            email: {
                value: '',
                isValid: false,
                showError: false
            },
            password: {
                value: '',
                isValid: false,
                showError: false
            },
            passwordConfirm: {
                value: '',
                isValid: false,
                showError: false
            }
        }
    )

    const isSubmitButtonDisable = !formData.name.isValid ||
        !formData.surname.isValid ||
        !formData.username.isValid ||
        !formData.email.isValid ||
        !formData.password.isValid ||
        !formData.passwordConfirm.isValid

    const handleValueChange = (value, field) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: {
                ...prevData[field],
                value
            }
        }))
    }

    const handleValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case 'name':
                isValid = validateName(value);
                break;
            case 'surname':
                isValid = validateSurname(value);
                break;
            case 'username':
                isValid = validateUsername(value)
                break;
            case 'email':
                isValid = validateEmail(value);
                break;
            case 'password':
                isValid = validatePassword(value);
                break;
            case 'passwordConfirm':
                isValid = validatePassConfirm(value);
                break;
            default:
                break;
        }
        setFormData((prevData) => (
            {
                ...prevData,
                [field]: {
                    ...prevData[field],
                    isValid,
                    showError: !isValid
                }
            }
        ))
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        register(
            formData.name.value,
            formData.surname.value,
            formData.username.value,
            formData.email.value,
            formData.password.value,
        )
    }

    return (
        <div className="register-container">
            <form
                className="auth-form"
                onSubmit={handleRegister}
            >
                <Input

                    field='name'
                    label='Name'
                    value={formData.name.value}
                    onChangeHandler={handleValueChange}
                    onBlurHandler={handleValidationOnBlur}
                    type='text'
                    showErrorMessage={formData.name.showError}
                    validationMessage={nameValidationMessage}
                />
                <Input

                    field='surname'
                    label='Surname'
                    value={formData.surname.value}
                    onChangeHandler={handleValueChange}
                    onBlurHandler={handleValidationOnBlur}
                    type='text'
                    showErrorMessage={formData.surname.showError}
                    validationMessage={surnameValidationMessage}
                />
                <Input

                    field='username'
                    label='Username'
                    value={formData.username.value}
                    onChangeHandler={handleValueChange}
                    onBlurHandler={handleValidationOnBlur}
                    type='text'
                    showErrorMessage={formData.username.showError}
                    validationMessage={usernameValidationMessage}
                />

                <Input

                    field='email'
                    label='Email'
                    value={formData.email.value}
                    onChangeHandler={handleValueChange}
                    onBlurHandler={handleValidationOnBlur}
                    type='email'
                    showErrorMessage={formData.email.showError}
                    validationMessage={emailValidationMessage}
                />
                <Input

                    field='password'
                    label='Password'
                    value={formData.password.value}
                    onChangeHandler={handleValueChange}
                    onBlurHandler={handleValidationOnBlur}
                    type='password'
                    showErrorMessage={formData.password.showError}
                    validationMessage={passwordValidationMessage}
                />
                <Input

                    field='passwordConfirm'
                    label='Password Confirmation'
                    value={formData.passwordConfirm.value}
                    onChangeHandler={handleValueChange}
                    onBlurHandler={handleValidationOnBlur}
                    type='password'
                    showErrorMessage={formData.passwordConfirm.showError}
                    validationMessage={passConfirmValidationMessage}
                />
                <button
                    disabled={isSubmitButtonDisable}
                >
                    Register
                </button>
            </form>

            <span>
                ¿Ya tienes una cuenta? ¡Inicia sesión acá!
            </span>
        </div>
    )
}
