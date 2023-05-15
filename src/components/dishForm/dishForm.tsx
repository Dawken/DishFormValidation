import React from 'react'
import styles from './dishForm.module.scss'
import { CircularProgress } from '@mui/material'
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
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'
import DishNumberField from './dishFormLabels/dishNumberField'


const DishForm = () => {

	const { methods, dishType, setDishType, isLoading, response, submitDishForm } = useDishForm()

	return (
		<div className={styles.layout}>
			<FormProvider {...methods}>
				<form
					onSubmit={submitDishForm()}
					className={styles.dishForm}
				>
					<DishTextField name='name' label='Dish name' className={styles.label} icon={<DriveFileRenameOutlineIcon />}/>
					<DishTimePicker name='preparation_time' label='Preparation time' className={styles.label}/>
					<DishSelect
						name='type'
						label='Dish type'
						options={[
							{ value: 'pizza', label: 'pizza' },
							{ value: 'soup', label: 'soup' },
							{ value: 'sandwich', label: 'sandwich' },
						]}
						className={styles.label}
						icon={<RestaurantIcon />}
						setDishType={setDishType}
					/>
					{dishType === 'pizza' &&
							<>
								<DishNumberField
									name='no_of_slices'
									label='Slices'
									regex={/[0-9]/}
									inputProps={{ min: 0 }}
									className={styles.label}
									icon={<LocalPizzaIcon/>}
								/>
								<DishNumberField
									name='diameter'
									label='Diameter'
									regex={/^\d*\.?\d*$/}
									type='number'
									inputProps={{ step: 0.1, min: 1 }}
									className={styles.label}
									icon={<HeightIcon/>}
								/>
							</>
					}
					{dishType === 'sandwich' &&
							<DishNumberField
								name='slices_of_bread'
								label='Slices'
								regex={/[0-9]/}
								inputProps={{ min: 0 }}
								className={styles.label}
								icon={<BreakfastDiningIcon/>}
							/>
					}
					{dishType === 'soup' &&
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
					<div className={styles.order}>
						<button className={styles.orderButton}
							style={isLoading || response.isSuccess || response.isFailed ?
								{width: '40px', height:'40px', borderRadius:'50%'}
								:
								{}}
						>
							{(!isLoading && !response.isSuccess && !response.isFailed) && 'Order'}
							{isLoading && <CircularProgress size={25} style={{color:'#00e8ff'}}/>}
							{response.isSuccess && <DoneIcon style={{color: '#10ff00'}}/>}
							{response.isFailed && <ClearIcon style={{color: '#ff0000'}}/>}
						</button>
					</div>
				</form>
			</FormProvider>
		</div>
	)
}
export default DishForm
