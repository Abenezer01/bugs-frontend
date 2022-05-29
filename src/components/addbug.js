import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addBug } from '../store/bugSlice';
import { useNavigate } from "react-router-dom";

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    user_id: Yup.string(),
});

export default ({toggleAddBug}) => {
    const navigate = useNavigate()
    const navigateTohome=()=>{
        navigate("/success");
    }
    const dispatch = useDispatch()
    return (<div className='m-4'>
        <h1>Add bug</h1>
        <Formik
            initialValues={{
                name: '',
                description: '',
                user_id: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
                // same shape as initial values
                dispatch(addBug(values,navigateTohome()))
                console.log(values);
            }}
        >
            {({ errors, touched }) => (
                <Form>
                    <div className='row'>
                        <div className='col-9'>
                            <div className='form-group'>
                                <label>name</label>
                                <Field className="form-control" name="name" />
                                {errors.name && touched.name ? (
                                    <div>{errors.name}</div>
                                ) : null}
                            </div>
                            <div className='form-group'>
                                <label>description</label>
                                <Field className="form-control" name="description" />
                                {errors.description && touched.description ? (
                                    <div>{errors.description}</div>
                                ) : null}
                            </div>
                            <div className='form-group'>
                                <label>User</label>
                                <Field className="form-control" name="user_id" />
                                {errors.user_id && touched.user_id ? <div>{errors.user_id}</div> : null}
                            </div>
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    </div>)

}