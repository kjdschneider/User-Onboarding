import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const LoginForm = ({ values, errors, touched, status }) => {
    const [users, setUsers] = useState([]);

    useEffect((status) => {
        setUsers([...users, status])
    }, [status])

    return (
        <div className='login-container'>
            <Form>
                <label>
                    Name:
                    <Field type='text' name='name' placeholder='Name' />
                    {touched.name && errors.name && <p>{errors.name}</p>}
                </label>
                <label>
                    Email:
                    <Field type='email' name='email' placeholder='Email' />
                    {touched.email && errors.email && <p>{errors.email}</p>}
                </label>
                <label>
                    Password:
                    <Field type='password' name='password' placeholder='Password' />
                    {touched.password && errors.password && <p>{errors.password}</p>}
                </label>
                <label>
                    Click here to accept the Terms of Service
                    <Field type='checkbox' name='terms' checked={values.terms} />
                    {!values.terms && <p>Terms of Service must be accepted to continue</p>}
                </label>
                <button type='submit'>Submit!</button>
            </Form>
            {users.map(user => {
                return (
                    <div>
                        <h2>{user.name}</h2>
                        <h3>{user.email}</h3>
                    </div>
                )
            })}
        </div>
    )
}

const FormikLoginForm = withFormik({
    mapPropsToValues({name, email, password, terms}) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || false,
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
    handleSubmit(values, {resetForm, setSubmitting, setStatus}){
        if (values.terms === true) {
        axios
            .post('https://reqres.in/api/users', values)
            .then(res => {
                console.log(res);
                setStatus(res.data);
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