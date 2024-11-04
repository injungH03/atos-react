import React from 'react';

const Checkbox = ({ label, name, register, required, errors, ...rest }) => {
    return (
        <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    {...register(name, { required })}
                    style={styles.checkbox}
                    {...rest}
                />
                {label}
            </label>
            {errors && <span style={styles.error}>{errors.message}</span>}
        </div>
    );
};

const styles = {
    checkboxGroup: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
    },
    checkbox: {
        marginRight: '5px',
    },
    error: {
        color: 'red',
        fontSize: '12px',
        marginLeft: '10px',
    },
};

export default Checkbox;
