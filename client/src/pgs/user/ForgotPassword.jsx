/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Container, CustomLink, FormContainer, FormInput, Submit_Btn, Title } from "../../cmps";
import { commonModalClasses } from "../../utils/theme";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const handleChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  }
  return (
    <FormContainer>
      <Container>
        <form  className={commonModalClasses + " w-96"}>
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

export default ForgetPassword
