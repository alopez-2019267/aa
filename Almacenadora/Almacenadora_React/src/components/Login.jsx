import { 
    emailValidationMessage,
    validateEmail,
    validatePassword,
    passwordValidationMessage
   } from '../shared/validators/validator.js';
  import { Input } from './Input.jsx'
  import { useState } from 'react';
  import { Logo } from './Logo.jsx';
  import { useLogin } from '../shared/hooks/useLogin.jsx'
  
  export const Login = ({switchAuthHandler}) => {
    const { login, isLoading } = useLogin()
    const [formData, setFormData] = useState(
      {
        email: {
          value: "",
          isValid: false,
          showError: false,
        },
        password: {
          value: "",
          isValid: false,
          showError: false,
        },
      }
    );
    const isSubmitButtonDisable = !formData.email.isValid ||
                                  !formData.password.isValid
  
    const onValueChange = (value, field)=>{
      setFormData((prevData)=> (
        {
            ...prevData,
            [field]: {
                ...prevData[field],
                value
            }
        }
    ))
    }
  
    const handleValidationOnBlur = (value, field)=>{
      let isValid = false
          switch(field){
              case 'email':
                  isValid = validateEmail(value)
                  break
              case 'password':
                  isValid = validatePassword(value)
                  break
              default:
              break
          }
          setFormData((prevData)=> (
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
  
    const handleLogin = (e)=> {
      e.preventDefault()
          login(
                  formData.email.value,
                  formData.password.value
          )
    }
    return (
      <div className="login-container">
        <Logo text={"Login KinalCast"} />
        <form 
          className="auth-form"
          onSubmit={handleLogin}
        >
          <Input 
            field='email'
            label='Email'
            value={formData.email.value}
            onChangeHandler={onValueChange}
            type='text'
            onBlurHandler={handleValidationOnBlur}
            showErrorMessage={formData.email.showError}
            validationMessage={emailValidationMessage}
          />
  
          <Input 
            field='password'
            label='Password'
            value={formData.password.value}
            onChangeHandler={onValueChange}
            type='password'
            onBlurHandler={handleValidationOnBlur}
            showErrorMessage={formData.password.showError}
            validationMessage={passwordValidationMessage}
          />
          <button
            disabled={isSubmitButtonDisable}
          >
            LogIn
          </button>
        </form>
        <span onClick={switchAuthHandler} className="auth-form-switch-label">
          ¿Aún no tienes una cuenta? ¡Registrate...!
        </span>
      </div>
    )
  }
  