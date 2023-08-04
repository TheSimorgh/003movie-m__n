/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Container, CustomLink, FormContainer, FormInput, Submit_Btn, Title } from "../../cmps";
import { commonModalClasses } from "../../utils/theme";
import { useNotification } from "../../hooks";
import {isValidEmail} from "../../utils/helper"
import { forgot_password } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [test,setTest]=useState(null)
  const navigate =useNavigate()
  const { updateNotification } = useNotification();


  const handleChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email))return updateNotification("error", "Invalid email!");
    const {error,message,info}=await forgot_password(email)
    // const {url,user,token}=info
    if (error) return updateNotification("error", error);
     setTest(url)
    updateNotification("success", message);
    // setTimeout(()=>{
      navigate(`/auth/reset-password${url}`)
    // },1500)
  }

  // console.log(test);
  return (
    <FormContainer>
      <Container>
        <form  onSubmit={handleSubmit} className={commonModalClasses + " w-96"}>
        <Title>Please Enter Your Email</Title>
        <FormInput
            onChange={handleChange}
            value={email}
            label="Email"
            placeholder="john@email.com"
            name="email"
          />
          <Submit_Btn value="Send Link" />

          <div className="flex justify-between">
            <CustomLink to="/auth/signin">Sign in</CustomLink>
            <CustomLink to="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  )
}

export default ForgotPassword
