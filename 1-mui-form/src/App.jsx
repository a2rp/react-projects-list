import React from 'react'
import MuiForm from './muiForm'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <div>
            <MuiForm />

            <ToastContainer />
        </div>
    )
}

export default App

