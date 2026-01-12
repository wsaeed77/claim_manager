import DatePicker from 'react-datepicker';

export default function DateInput({ value, onChange, className = '', ...props }) {
    const handleChange = (date) => {
        if (date) {
            // Format date as YYYY-MM-DD for backend
            const formattedDate = date.toISOString().split('T')[0];
            onChange(formattedDate);
        } else {
            onChange('');
        }
    };

    // Parse value to Date object
    const dateValue = value ? new Date(value) : null;

    return (
        <DatePicker
            selected={dateValue}
            onChange={handleChange}
            dateFormat="dd-MM-yyyy"
            className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
            wrapperClassName="w-full"
            {...props}
        />
    );
}
