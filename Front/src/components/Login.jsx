import {
  validatePassword,
  passwordValidationMessage,
  usernameValidationMessage,
  validateUsername,
  validateEmail
} from './../shared/validators/validator.js';
import { Input } from './Input.jsx';
import { useState } from 'react';
import { useLogin } from '../shared/hooks/useLogin.jsx';


export const Login = () => {

  const { login, isLoading } = useLogin();
  const [formData, setFormData] = useState(
    {
      username: {
        value: '',
        isValid: false,
        showError: false
      },
      password: {
        value: '',
        isValid: false,
        showError: false
      }
    }
  );

  const isSubmitButtonDisable = !formData.username.isValid ||
    !formData.password.isValid


  const onValueChange = (value, field) => {
    setFormData((prevData) => (
      {
        ...prevData,
        [field]: {
          ...prevData[field],
          value
        }
      }
    ))
  }

  //validamos si los formatos son validos
  const handleValidationOnBlur = (value, field) => {
    let isValid = false;

    switch (field) {
      case 'username':
        isValid = validateUsername(value)
        break;
      case 'password':
        isValid = validatePassword(value)
        break;
      default:
        break;
    }

    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        isValid,
        showError: !isValid
      }
    }))
  }

  const handleLogin = (e) => {
    e.preventDefault()
    login(//pasamos los parametros del constructor en useLogin.jsx
      formData.username.value,
      formData.password.value
    )
  }

  return (
    <div className="login-container">
      <form
        className="auth-form"
        name='form1'
        onSubmit={handleLogin}
      >

        <Input
          field='username'
          label='Username'
          value={formData.username.value}
          onChangeHandler={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          type='text'
          showErrorMessage={formData.username.showError}
          validationMessage={usernameValidationMessage}
        />

        <Input
          field='password'
          label='Password'
          value={formData.password.value}
          onChangeHandler={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          type='password'
          showErrorMessage={formData.password.showError}
          validationMessage={passwordValidationMessage}
        />

        <button
          disabled={isSubmitButtonDisable}
        >
          Log In
        </button>
      </form>
      <span className='auth-form-switch-label'>
        ¿Aún no tienes una cuenta? ¡Registrate...!
      </span>
    </div>
  )
}
