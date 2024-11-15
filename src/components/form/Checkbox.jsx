import React from 'react';

const Checkbox = ({
    label,
    name,
    register,
    required = false,
    errors,
    className = '', 
    checkboxClassName = '', 
    labelClassName = '', 
    ...rest
}) => {
    return (
        <div className={`checkbox-group ${className}`}>
            <label htmlFor={name} className={`checkbox-label ${labelClassName}`}>
                <input
                    id={name}
                    name={name}
                    type="checkbox"
                    {...register(name, required ? { required } : {})}
                    className={`checkbox ${checkboxClassName} ${errors ? 'checkbox-error' : ''}`}
                    {...rest}
                />
                {label}
            </label>
            {errors && <span className="error-text">{errors.message}</span>}
        </div>
    );
};

export default Checkbox;
