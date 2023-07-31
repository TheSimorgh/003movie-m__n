/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormContainer, FormInput, Submit_Btn, Title,Container, CustomLink } from "../../cmps";
import { commonModalClasses } from "../../utils/theme";
import { isValidEmail } from "../../utils/helper";
import { register_user } from "../../api/auth";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const validateUserInfo=({email,password})=>{
    if (!email.trim()) return { ok: false, error: "Email is missing!" };
    if(!isValidEmail(email))return  { ok: false, error: "Invalid email!" };
    if (!password.trim()) return { ok: false, error: "Password is missing!" };
    if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
 
  }
  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

  }
  return (
    <FormContainer>
    <Container>
      <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
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