import React from 'react';

const Select = ({ label, name, register, required, options, placeholder, errors, ...rest }) => {
    return (
        <div style={styles.selectGroup}>
            {label && (
                <label htmlFor={name} style={styles.label}>
                    {label}
                </label>
            )}
            <select
                id={name}
                name={name}
                {...register(name, { required })}
                style={errors ? styles.selectError : styles.select}
                {...rest}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {errors && <span style={styles.error}>{errors.message}</span>}
        </div>
    );
};

const styles = {
    selectGroup: {
        marginBottom: '15px',
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    select: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    selectError: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid red',
        fontSize: '16px',
    },
    error: {
        color: 'red',
        fontSize: '12px',
        marginTop: '5px',
    },
};

export default Select;
