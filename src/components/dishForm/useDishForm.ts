import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import axios from 'axios'
import { toast } from 'react-toastify'
import { TypeOf } from 'zod'
import OrderSchema from './dishFormSchema'


type DishInput = TypeOf<typeof OrderSchema>

const useDishForm = () => {

	const [dishType, setDishType] = useState('')
	const [response, setResponse] = useState({
		isSuccess: false,
		isFailed: false
	})

	const { mutate: order, isLoading } = useMutation((values: DishInput) => {
		return axios.post('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/', values)
	},{
		onSuccess: () => {
			setResponse(prevState => ({
				...prevState,
				isSuccess: true
			}))
			toast.success('Dish ordered successfully')
		},
		onError: () => {
			setResponse(prevState => ({
				...prevState,
				isFailed: true
			}))
			toast.error('Cannot order dish, try again later')
		}
	})
	useEffect(() => {
		setTimeout(() => {
			setResponse({
				isSuccess: false,
				isFailed: false
			})
		}, 5000)
	}, [isLoading])

	const methods = useForm<DishInput>({
		resolver: zodResolver(OrderSchema),
	})

	const submitDishForm = () => {
		return methods.handleSubmit((formv) => order(formv))
	}

	return {
		methods,
		dishType,
		setDishType,
		isLoading,
		response,
		submitDishForm
	}
}
export default useDishForm
