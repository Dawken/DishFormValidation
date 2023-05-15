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

    const { mutate: order, isLoading, isSuccess, isError, reset } = useMutation((values: DishInput) => {
        return axios.post('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/', values)
    },{
        onSuccess: () => {
            toast.success('Dish ordered successfully')
        },
        onError: () => {
            toast.error('Cannot order dish, try again later')
        }
    })

    useEffect(() => {
        if(isSuccess || isError) {
            setTimeout(() => {
                reset()
            }, 5000)
        }
    }, [isSuccess, isError])

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
        isSuccess,
        isError,
        submitDishForm
    }
}
export default useDishForm
