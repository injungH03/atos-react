import React from 'react';

const RadioButton = ({ label, name, value, register, required, errors, ...rest }) => {
    return (
        <div style={styles.radioGroup}>
            <label style={styles.radioLabel}>
                <input
                    type="radio"
                    value={value}
                    {...register(name, { required })}
                    style={styles.radio}
                    {...rest}
                />
                {label}
            </label>
            {errors && <span style={styles.error}>{errors.message}</span>}
        </div>
    );
};

const styles = {
    radioGroup: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
    },
    radioLabel: {
        marginRight: '10px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
    },
    radio: {
        marginRight: '5px',
    },
    error: {
        color: 'red',
        fontSize: '12px',
        marginLeft: '10px',
    },
};

export default RadioButton;
