/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from "react-router-dom"
import { Container, FormContainer, FormInput, Submit_Btn, Title } from "../../cmps"
import { useNotification } from "../../hooks";
import { useEffect, useState } from "react";
import { commonModalClasses } from "../../utils/theme";
import { ImSpinner3 } from "react-icons/im";
import { reset_password, verify_pass_reset_token } from "../../api/auth";


//http://localhost:5173/auth/reset-password?token=558b0d1e3d5566a0caec83cac87d32110999366de0bc0871bdf571b3cc1a&id=64caf8a1b3387434622cf614
//token=558b0d1e3d5566a0caec83cac87d32110999366de0bc0871bdf571b3cc1a
//&id=64caf8a1b3387434622cf614


const ConfirmPassword = () => {
  const [password, setPassword] = useState({
    one: "",
    two: "",
  });

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const [isVerifying, setIsVerifying] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const { updateNotification } = useNotification();
  const navigate = useNavigate();


  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPassword({ ...password, [name]: value });
  };
  console.log(token,id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.one.trim())
      return updateNotification("error", "Password is missing!");

    if (password.one.trim().length < 8)
      return updateNotification("error", "Password must be 8 characters long!");

    if (password.one !== password.two)
      return updateNotification("error", "Password do not match!");

    const { error, message } = await reset_password({
      newPassword: password.one,
      userId: id,
      token,
    });

    if (error) return updateNotification("error", error);

    updateNotification("success", message);
    navigate("/auth/signin", { replace: true });
  };
  const isValidToken = async () => {
    const {error,valid}=await verify_pass_reset_token(token,id)
    setIsVerifying(false);
    if (error) {
      navigate("/auth/reset-password", { replace: true });
      return updateNotification("error", error);
    }
    if (!valid) {
      setIsValid(false);
      return navigate("/auth/reset-password", { replace: true });
    }
    setIsValid(true);
 
  }

    // isValid, !isValid
    useEffect(() => {
      isValidToken();
    }, []);


  
  if (isVerifying)
    return (
      <FormContainer>
        <Container>
          <div className="flex space-x-2 items-center">
            <h1 className="text-4xl font-semibold dark:text-white text-primary">
              Please wait we are verifying your token!
            </h1>
            <ImSpinner3 className="animate-spin text-4xl dark:text-white text-primary" />
          </div>
        </Container>
      </FormContainer>
    );

    if (!isValid)
    return (
      <FormContainer>
        <Container>
          <h1 className="text-4xl font-semibold dark:text-white text-primary">
            Sorry the token is invalid!
          </h1>
        </Container>
      </FormContainer>
    );
  return (
    <FormContainer>
    <Container>
      <form onSubmit={handleSubmit} className={commonModalClasses + " w-96"}>
        <Title>Enter New Password</Title>
        <FormInput
          value={password.one}
          onChange={handleChange}
          label="New Password"
          placeholder="********"
          name="one"
          type="password"
        />
        <FormInput
          value={password.two}
          onChange={handleChange}
          label="Confirm Password"
          placeholder="********"
          name="two"
          type="password"
        />
        <Submit_Btn value="Confirm Password" />
      </form>
    </Container>
  </FormContainer>
  )
}

export default ConfirmPassword
