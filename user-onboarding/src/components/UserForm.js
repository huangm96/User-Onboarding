import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios'


const UserForm = ({ errors, touched, values, status }) => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);
  return (
    <div className="UserForm">
      <h3>User Form</h3>
      <Form>
        <Field className="inputArea" type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && (
          <p className="error">{errors.name}</p>
        )}
        <Field className="inputArea" type="email" name="email" placeholder="Email" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <Field className="inputArea" type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <label className="checkbox-container">
          Terms Of Service 
          <Field type="checkbox" name="termsOfService" checked={values.termsOfService} />
          
        </label>
        <button  type="submit" >Submit!</button>
      </Form>
    </div>
  );
}
const FormikAnimalForm = withFormik({
  mapPropsToValues({ name, email, password, termOfService }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      termOfService: termOfService || false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    password: Yup.string().min(8).max(12).required("The length of your password should >8 and <12"),
    email: Yup.string().email().required(),
    //termOfService: Yup.boolean().isValid(true),
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  }
})(UserForm);


export default FormikAnimalForm;
