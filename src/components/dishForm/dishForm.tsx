import React from 'react'
import styles from './dishForm.module.scss'
import { ThemeProvider } from '@mui/material'
import { purpleTheme } from '../../themes/customMuiTheme'
import useDishForm from './useDishForm'
import { FormProvider } from 'react-hook-form'
import DishTextField from './dishFormLabels/dishTextField'
import DishTimePicker from './dishFormLabels/dishTimePicker'
import DishSelect from './dishFormLabels/dishSelect'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import LocalPizzaIcon from '@mui/icons-material/LocalPizza'
import HeightIcon from '@mui/icons-material/Height'
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen'
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining'


const DishForm = () => {

	const { methods, order, dishType, setDishType } = useDishForm()


	return (
		<div className={styles.layout}>
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit((formv) => order(formv))}
					className={styles.dishForm}
				>
					<ThemeProvider theme={purpleTheme} >
						<DishTextField name='name' label='Dish name' className={styles.label} icon={<DriveFileRenameOutlineIcon />}/>
						<DishTimePicker name='preparation_time' label='Preparation time' className={styles.label}/>
						<DishSelect
							name='type'
							label='Dish type'
							options={[
								{ value: 'Pizza', label: 'Pizza' },
								{ value: 'Soup', label: 'Soup' },
								{ value: 'Sandwich', label: 'Sandwich' },
							]}
							className={styles.label}
							icon={<RestaurantIcon />}
							setDishType={setDishType}
						/>
						{dishType === 'Pizza' &&
							<>
								<DishTextField
									name='no_of_slices'
									label='Slices'
									type='number'
									inputProps={{ min: 0, pattern: '^[0-9]+$' }}
									className={styles.label}
									icon={<LocalPizzaIcon/>}
								/>
								<DishTextField
									name='diameter'
									label='Diameter'
									type='number'
									inputProps={{ step: 0.1, min: 0 }}
									className={styles.label}
									icon={<HeightIcon/>}
								/>
							</>
						}
						{dishType === 'Sandwich' &&
							<DishTextField
								name='slices_of_bread'
								label='Slices'
								type='number'
								inputProps={{ min: 0, pattern: '^[0-9]+$'  }}
								className={styles.label}
								icon={<BreakfastDiningIcon/>}
							/>
						}
						{dishType === 'Soup' &&
							<DishSelect name='spiciness_scale' label='Spiciness scale'
								options={
									Array.from({length: 10}, (_, i) => (
										{value: i+1, label: i+1}
									))
								}
								icon={<SoupKitchenIcon />}
								className={styles.label}
							/>
						}
					</ThemeProvider>
					<div className={styles.order}>
						<button className={styles.orderButton}>Order</button>
					</div>
				</form>
			</FormProvider>
		</div>
	)
}
export default DishForm
