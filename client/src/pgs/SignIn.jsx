/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormContainer, FormInput, Submit_Btn, Title,Container, CustomLink } from "../cmps";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const handleSubmit = async (e) => {}
  return (
    <FormContainer>
    <Container>
      <form onSubmit={handleSubmit} className={ " w-72"}>
        <Title>Sign in</Title>
        <FormInput
          value={userInfo.email}
          onChange={handleChange}
          label="Email"
          placeholder="john@email.com"
          name="email"
        />
        <FormInput
          value={userInfo.password}
          onChange={handleChange}
          label="Password"
          placeholder="********"
          name="password"
          type="password"
        />
        <Submit_Btn value="Sign in"  />

        <div className="flex justify-between">
          <CustomLink to="/auth/forgot-password">Forget password</CustomLink>
          <CustomLink to="/auth/signup">Sign up</CustomLink>
        </div>
      </form>
    </Container>
  </FormContainer>
  )
}

export default SignIn