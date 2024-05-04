import PropTypes from 'prop-types'

export const ComboBox = ({
    label,
    field,
    value,
    onChangeHandler,
    options
}) => {
    const handleValueChange = (e)=>{
        const newValue = e.target.value;
        onChangeHandler(newValue, field);
    }

  return (
    <div>
      <label htmlFor={field}>{label}</label>
      <select value={value} onChange={handleValueChange}>
        {options.map((option, index) => (
            <option key={index} value={option.value}>
                {option.label}
            </option>
        ))}
      </select>
    </div>
  )
}

ComboBox.propTypes = {
    label: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    )
}