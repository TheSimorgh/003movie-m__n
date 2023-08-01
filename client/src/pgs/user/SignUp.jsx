/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormContainer, FormInput, Submit_Btn, Title,Container, CustomLink } from "../../cmps";
import { commonModalClasses } from "../../utils/theme";
import { isValidEmail } from "../../utils/helper";
import { register_user } from "../../api/auth";
import { useNotification } from "../../hooks";
const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const {updateNotification}=useNotification()
  const validateUserInfo = ({ name, email, password }) => {
    const isValidName = /^[a-z A-Z]+$/;
  
    if (!name.trim()) return { ok: false, error: "Name is missing!" };
    if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" };
  
    if (!email.trim()) return { ok: false, error: "Email is missing!" };
    if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };
  
    if (!password.trim()) return { ok: false, error: "Password is missing!" };
    if (password.length < 8)
      return { ok: false, error: "Password must be 8 characters long!" };
  
    return { ok: true };
  };
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);
    const response=await register_user(userInfo)
    if (response.error) return console.log(response.error);
    
    navigate("/auth/verification", {
      state: { user: response.user },
      replace: true,
    });
  };
  const { name, email, password } = userInfo;
  return (
    <FormContainer>
      <Container>
      <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title>Sign up</Title>
          <FormInput
            value={name}
            onChange={handleChange}
            label="Name"
            placeholder="John Doe"
            name="name"
          />
          <FormInput
            value={email}
            onChange={handleChange}
            label="Email"
            placeholder="john@email.com"
            name="email"
          />
          <FormInput
            value={password}
            onChange={handleChange}
            label="Password"
            placeholder="********"
            name="password"
            type="password"
          />
          <Submit_Btn value="Sign up" />
        </form>
      </Container>
    </FormContainer>
  );
};

export default SignUp;
