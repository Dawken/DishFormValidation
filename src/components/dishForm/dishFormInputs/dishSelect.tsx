import React, { FC } from 'react'
import { Controller, get, useFormContext } from 'react-hook-form'
import { Select, MenuItem, SelectProps, InputLabel, FormControl, InputAdornment } from '@mui/material'
import styles from '../dishForm.module.scss'


type InputProps = {
	name: string;
	options: { value: string | number; label: string | number } []
	icon: React.ReactNode
} & SelectProps


const DishSelect: FC<InputProps> = ({ name, options, ...otherProps }) => {

    const {
        control,
        formState: { errors },
    } = useFormContext()

    const error = get(errors, name)

    return (
        <FormControl>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <>
                        <InputLabel className={styles.label}>{otherProps.label}</InputLabel>
                        <Select
                            {...otherProps}
                            {...field}
                            onChange={event => {
                                field.onChange(event)
                            }}
                            error={!!error}
                            value={field.value ?? otherProps.value ?? ''}
                            startAdornment={
                                <InputAdornment position='start'>
                                    <div className={styles.labelIcon}>{otherProps.icon}</div>
                                </InputAdornment>
                            }
                            inputProps={{
                                MenuProps: {
                                    MenuListProps: {
                                        className: styles.selectLabel
                                    }
                                }
                            }}
                        >
                            {options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </>
                )}
            />
        </FormControl>
    )
}
export default DishSelect
