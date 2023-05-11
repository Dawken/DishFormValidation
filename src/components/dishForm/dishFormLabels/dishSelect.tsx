import React, {FC} from 'react'
import { Controller, get, useFormContext } from 'react-hook-form'
import { Select, MenuItem, SelectProps, InputLabel, FormControl } from '@mui/material'
import styles from '../dishForm.module.scss'


type InputProps = {
	name: string;
	options: { value: string; label: string }[]
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
						<InputLabel className={styles.label}>Dish type</InputLabel>
						<Select
							{...otherProps}
							{...field}
							onChange={field.onChange}
							error={!!error}
							value={field.value ?? otherProps.value ?? ''}
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
