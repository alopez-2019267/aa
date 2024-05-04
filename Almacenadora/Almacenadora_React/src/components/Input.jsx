import PropTypes from 'prop-types'

export const Input = ({
    field,
    label,
    value,
    onChangeHandler,
    type,
    showErrorMessage,
    validationMessage,
    onBlurHandler,
    textarea,
    options
}) => {
    const handleValueChange = (e)=>{
        const newValue = e.target.value;
        onChangeHandler(newValue, field);
    }

    const handleOnBlur = (e)=>{
        onBlurHandler(e.target.value, field);
    }

  return (
    <>
        <div className="auth-form-label">
            <span>{label}</span>
        </div>
        {
            textarea ? (
                <textarea 
                    type={type}
                    value={value}
                    onChange={handleValueChange}
                    onBlur={handleOnBlur}
                    rows={5}
                    style={{maxWidth: '400px'}}
                />
            ) : (
                <input type={type}
                    value={value}
                    onChange={handleValueChange}
                    onBlur={handleOnBlur}
                />
            )
        }
        {type === "select" && options && (
            <select value={value} onChange={handleValueChange}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        )}
        <span className="auth-form-validation-message">
            {showErrorMessage && validationMessage}
        </span>
    </>
  )
}

Input.propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    showErrorMessage: PropTypes.bool.isRequired,
    validationMessage: PropTypes.string,
    onBlurHandler: PropTypes.func.isRequired,
    textarea: PropTypes.bool,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    )
}