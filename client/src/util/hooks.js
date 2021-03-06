import { useState } from 'react'


export const useForm = (callback, initalState = {}) => {

    const [values, setValues] = useState();


    const onChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };
}