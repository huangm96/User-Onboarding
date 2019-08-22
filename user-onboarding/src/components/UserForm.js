import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios'
import UserList from './UserList'

const UserForm = ({ errors, touched, values, status }) => {
  const [users, setUsers] = useState([]);
  console.log(users);
  console.log(values)

  const checkEmail = (newInput)=>{
    let dupEmail = false;
    users.forEach((e) => {
      if (e.email === newInput.email) {
        dupEmail = true;
      }
    })
    return dupEmail;
  }
  const checkName = newInput => {
    let dupName = false;
    users.forEach(e => {
      if (e.name === newInput.name) {
        dupName = true;
      }
    });
    return dupName;
  };
  useEffect(() => {
    
    if (
      status &&
      checkEmail(status) === false &&
      checkName(status) === false
    ) {
      console.log(status);
      setUsers([...users, status]);
      alert("You are submitted!");
    } else if (checkName(status)) {
      alert("That name is already taken. Please change your name");
    } else if (checkEmail(status)) {
      alert("That email is already taken. Please change your email");
    } 
  }, [status]);

  return (
    <div className="big-container">
    <div className="UserForm">
      <h3>User Form</h3>
      <Form>
        <Field
          className="inputArea"
          type="text"
          name="name"
          placeholder="Name"
        />
        {touched.name && errors.name && (
          <p className="error">{errors.name}</p>
        )}
        <Field
          className="inputArea"
          type="email"
          name="email"
          placeholder="Email"
        />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <Field
          className="inputArea"
          type="password"
          name="password"
          placeholder="Password"
        />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <label className="checkbox-container">
          Terms Of Service
          <Field
            type="checkbox"
            name="termOfService"
            checked={values.termOfService}
          />
        </label>
        <button type="submit">Submit!</button>
      </Form>
       
      </div>
       <UserList list={users}/>
      </div>
  );
}
const FormikUserForm = withFormik({
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
    if (values.termOfService===false) {
      alert("please check the box")
    } else {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  }}
})(UserForm);



export default FormikUserForm;
