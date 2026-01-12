export default function TextInput({ type = 'text', name, id, value, className = '', autoComplete, required, isFocused, handleChange, onChange, placeholder, disabled, readOnly, ...props }) {
    return (
        <input
            {...props}
            type={type}
            name={name}
            id={id}
            value={value}
            className={
                `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ` +
                className
            }
            autoComplete={autoComplete}
            required={required}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            onChange={onChange || ((e) => handleChange && handleChange(e))}
        />
    );
}
