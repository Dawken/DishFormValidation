import React from 'react'
import styles from './dishForm.module.scss'
import { CircularProgress } from '@mui/material'
import useDishForm from './useDishForm'
import { FormProvider } from 'react-hook-form'
import DishTextInput from './dishFormInputs/dishTextInput'
import DishTimePicker from './dishFormInputs/dishTimePicker'
import DishSelect from './dishFormInputs/dishSelect'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import LocalPizzaIcon from '@mui/icons-material/LocalPizza'
import HeightIcon from '@mui/icons-material/Height'
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen'
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'
import DishNumberInput from './dishFormInputs/dishNumberInput'
import arrayFrom from '../../utils/arrayFrom'


const DishForm = () => {

    const { methods, dishType, isLoading, isSuccess, isError, submitDishForm } = useDishForm()

    return (
        <div className={styles.layout}>
            <FormProvider {...methods}>
                <form
                    onSubmit={submitDishForm()}
                    className={styles.dishForm}
                >
                    <DishTextInput name='name' label='Dish name' className={styles.label} icon={<DriveFileRenameOutlineIcon />}/>
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
                    />
                    {dishType === 'pizza' &&
							<>
							    <DishNumberInput
							        name='no_of_slices'
							        label='Slices'
							        regex={/[0-9]/}
							        inputProps={{ min: 0 }}
							        className={styles.label}
							        icon={<LocalPizzaIcon/>}
							    />
							    <DishNumberInput
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
							<DishNumberInput
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
							    options={arrayFrom(10)}
							    icon={<SoupKitchenIcon />}
							    className={styles.label}
							/>
                    }
                    <div className={styles.order}>
                        <button className={styles.orderButton}
                            style={
                                isSuccess ||
								isError ?
                                    {width: '40px', height:'40px', borderRadius:'50%'}
                                    :
                                    {}
                            }
                        >
                            {(!isLoading && !isSuccess && !isError) && 'Order'}
                            {isLoading && <CircularProgress size={25} style={{color:'#00e8ff'}}/>}
                            {isSuccess && <DoneIcon style={{color: '#10ff00'}}/>}
                            {isError && <ClearIcon style={{color: '#ff0000'}}/>}
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
export default DishForm
