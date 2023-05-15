import { Controller, useFormContext, get } from 'react-hook-form'
import { InputAdornment, TextField, TextFieldProps } from '@mui/material'
import React, { FC } from 'react'
import styles from '../dishForm.module.scss'

type InputProps = {
	name: string;
	icon: React.ReactNode
} & TextFieldProps

const DishTextInput: FC<InputProps> = ({ name, ...otherProps }) => {

    const {
        control,
        formState: { errors },
    } = useFormContext()

    const error = get(errors, name)

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <TextField
                    {...otherProps}
                    {...field}
                    value={field.value ?? otherProps.value ?? ''}
                    error={!!errors[name]}
                    helperText={error ? error.message : ''}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <div className={styles.labelIcon}>{otherProps.icon}</div>
                            </InputAdornment>
                        )
                    }}
                />
            )}
        />
    )
}
export default DishTextInput
