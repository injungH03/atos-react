import React from 'react';

const Input = ({ label, name, register, required, type = 'text', placeholder, errors, className, inputClassName, ...rest }) => {
    return (
        <div className={`input-group ${className}`}>
            {label && (
                <label htmlFor={name} className="input-label">
                    {label}
                </label>
            )}
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                {...register(name, { required })} 
                className={`input-field ${inputClassName} ${errors ? 'input-error' : ''}`}
                {...rest}
            />
            {errors && <span className="error-text">{errors.message}</span>}
        </div>
    );
};

export default Input;
