import React from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const LoginForm = ({ values, errors, touched, isSubmitting }) => {

    return (
        <div className='login-container'>
            <Form>
                <label>
                    {touched.name && errors.name && <p>{errors.name}</p>}
                    Name:
                    <Field type='text' name='name' placeholder='Name' />
                </label>
                <label>
                    {touched.email && errors.email && <p>{errors.email}</p>}
                    Email:
                    <Field type='email' name='email' placeholder='Email' />
                </label>
                <label>
                    {touched.password && errors.password && <p>{errors.password}</p>}
                    Password:
                    <Field type='password' name='password' placeholder='Password' />
                </label>
                <label>
                    {!values.terms && <p>Terms of Service must be accepted to continue</p>}
                    Click here to accept the Terms of Service
                    <Field type='checkbox' name='terms' checked={values.terms} />
                </label>
                <button type='submit'>Submit!</button>
            </Form>
        </div>
    )
}

const FormikLoginForm = withFormik({
    mapPropsToValues({name, email, password, terms}) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .min(2, 'Name must be at least 2 characters')
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        
    }),
    handleSubmit(values, {resetForm, setSubmitting}){
        if (values.terms === true) {
        axios
            .post('https://reqres.in/api/users', values)
            .then(res => {
                console.log(res);
                resetForm();
                setSubmitting(false);
            })
            .catch(err => {
                console.log(err);
                setSubmitting(false);
            })
        }
    }
})(LoginForm)

export default FormikLoginForm;