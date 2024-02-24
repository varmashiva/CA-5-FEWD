// Importing necessary dependencies and styles for the Form component, including React hooks for state management and useForm hook from react-hook-form for form handling.
import React, { useState } from 'react';
import './Form.css';
import { useForm } from "react-hook-form";

// Defining a functional component for a form, including state for an alert, useForm hook for form handling, validation function for password confirmation, and submit handler function.
const Form = () => {
    const [alert, setAlert] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const validateRepeatPassword = (value) => {
        const password = watch('password');
        return value === password || 'Passwords do not match';
    };

    const onSubmit = (data, e) => {
        setAlert(true);
        console.log(data);
        e.preventDefault(); 
    };

    return (
        <div>
            {alert && (
                <div>
                    <p className='successMessage'>Registration Successful!!</p>
                </div>
            )}
            <form className='main_box' onSubmit={handleSubmit(onSubmit)}>
                <h1>CREATE ACCOUNT</h1>

                <div className='text_box'>
                    <input 
                        type="text"
                        name='name'
                        placeholder='Name'
                        {...register("name", {
                            required: "Name is required!",
                            minLength: { value: 3, message: "Name must be more than 3 characters" },
                            maxLength: { value: 30, message: "Name cannot be more than 30 characters" },
                        })}
                    />
                    {errors.name?.message && <p className='wrong'>{errors.name.message}</p>}
                </div>

                <div className='text_box'>
                    <input
                        type="email"
                        name='email'
                        placeholder='Email'
                        {...register("email", {
                            required: "Email is required!",
                            pattern: { value: /^\S+@\S+$/i, message: "Invalid Email" },
                        })}
                    />
                    {errors.email?.message && <p className='wrong'>{errors.email.message}</p>}
                </div>

                <div className='text_box'>
                    <input
                        type="password"
                        name='password'
                        placeholder='Password'
                        {...register("password", {
                            required: "Password is required!",
                            minLength: { value: 10, message: "Password must contain at least 10 characters" },
                            pattern: { value: /^(?=.*[!@#$%^&*])/, message: "Password must contain a special character" },
                        })}
                    />
                    {errors.password?.message && <p className='wrong'>{errors.password.message}</p>}
                </div>

                <div className='text_box'>
                    <input
                        type='password'
                        name='repeatPassword'
                        placeholder='Repeat Password'
                        {...register('repeatPassword', {
                            required: 'Repeat the Password',
                            validate: validateRepeatPassword,
                        })}
                    />
                    {errors.repeatPassword?.message && <p className='wrong'>{errors.repeatPassword.message}</p>}
                </div>

                <input className='submit' type="submit" value={"Sign up"} />
            </form>
        </div>
    );
};

export default Form;
