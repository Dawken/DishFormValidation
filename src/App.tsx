import React from 'react'
import DishForm from './components/dishForm/dishForm'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {purpleTheme} from './themes/customMuiTheme'
import {ThemeProvider} from '@mui/material'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={purpleTheme} >
				<DishForm />
			</ThemeProvider>
			<ToastContainer
				position='top-left'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
			/>
		</QueryClientProvider>
	)
}

export default App
