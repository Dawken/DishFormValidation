import React from 'react'
import styles from './dishForm.module.scss'
import {FormControl, InputLabel, MenuItem, Select, TextField, ThemeProvider} from '@mui/material'
import {purpleTheme} from '../../themes/customMuiTheme'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import {MobileTimePicker} from '@mui/x-date-pickers'


const DishForm = () => {

	return (
		<div className={styles.layout}>
			<div className={styles.dishForm}>
				<ThemeProvider theme={purpleTheme}>
					<TextField
						className={styles.dishLabel}
						label='Dish name'
					/>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DemoContainer
							components={['MobileTimePicker', 'MobileTimePicker', 'MobileTimePicker']}
							sx={{ minWidth: 210 }}
						>
							<MobileTimePicker
								className={styles.dishLabel}
								label={'Preparation time'}
								views={['hours', 'minutes', 'seconds']}
								format='hh:mm:ss'
							/>
						</DemoContainer>
					</LocalizationProvider>
					<FormControl>
						<>
							<InputLabel className={styles.dishLabel}>
										Dish type
							</InputLabel>
							<Select
								label='Dish type'
								className={styles.dishLabel}
							>
								<MenuItem value='Pizza'>Pizza</MenuItem>
								<MenuItem value='Soup'>Soup</MenuItem>
								<MenuItem value='Sandwich'>Sandwich</MenuItem>
							</Select>
						</>
					</FormControl>
				</ThemeProvider>
			</div>
		</div>
	)
}
export default DishForm
