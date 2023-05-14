import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TypeOf } from 'zod'
import {useEffect, useState} from 'react'
import { useMutation } from 'react-query'
import axios from 'axios'
import { toast } from 'react-toastify'


const DishSchema = z
	.object({
		name: z.string().nonempty('Dish name is required').min(3, 'Name should be at least 3 words long'),
		preparation_time: z
			.string()
			.nonempty('Preparation time is required')
			.refine((value) => /^\d{2}:\d{2}:\d{2}$/.test(value), {
				message: 'Preparation time must be in the format HH:MM:SS',
			}),
	})

const PizzaSchema = z.object({
	type: z.literal('pizza'),
	no_of_slices: z
		.number()
		.int()
		.min(1, 'Pizza must contain at least 1 slice'),
	diameter: z.number().positive('Diameter must be a positive number'),
}).merge(DishSchema)

const SoupSchema = z.object({
	type: z.literal('soup'),
	spiciness_scale: z
		.number()
		.int()
		.min(1, 'Spiciness scale must be at least 1')
		.max(10, 'Spiciness scale cannot be greater than 10')
}).merge(DishSchema)

const SandwichSchema = z.object({
	type: z.literal('sandwich'),
	slices_of_bread: z
		.number()
		.int()
		.min(1, 'Slices of bread must be at least 1')
}).merge(DishSchema)

const OrderSchema = z.union([PizzaSchema, SandwichSchema, SoupSchema])

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
	return {
		methods,
		order,
		dishType,
		setDishType,
		isLoading,
		response
	}
}
export default useDishForm
