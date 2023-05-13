import React, { FC } from 'react'
import { Controller, get, useFormContext } from 'react-hook-form'
import { Select, MenuItem, SelectProps, InputLabel, FormControl, InputAdornment } from '@mui/material'
import styles from '../dishForm.module.scss'


type InputProps = {
	name: string;
	options: { value: string | number; label: string | number}[]
	setDishType?: React.Dispatch<React.SetStateAction<string>>
	icon: React.ReactNode
} & SelectProps


const DishSelect: FC<InputProps> = ({ name, options, setDishType, ...otherProps }) => {

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
								setDishType && setDishType(event.target.value)
							}}
							error={!!error}
							value={field.value ?? otherProps.value ?? ''}
							startAdornment={
								<InputAdornment position='start'>
									<div style={{color:'white'}}>{otherProps.icon}</div>
								</InputAdornment>
							}
							inputProps={{
								MenuProps: {
									MenuListProps: {
										sx: {
											backgroundColor: '#1f1f1f',
											color: 'white'
										}
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
