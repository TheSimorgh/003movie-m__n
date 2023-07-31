/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { Container, FormContainer, Submit_Btn, Title } from "../../cmps";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OTP_LENGTH = 6;
let currentOTPIndex;

const isValidOTP = (otp) => {
  let valid = false;

  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }

  return valid;
};
const EmailVerification = () => {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1);
  };

  const focusPrevInputField = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;
    setActiveOtpIndex(nextIndex);
  };
  const handleOptChange = ({ target },index) => {
    const { value } = target;
    console.log(value );
    // const newOtp=otp.push(value)
    const newOtp=[...otp]
    newOtp[index]=value.substring(value.length - 1, value.length);
    setOtp([...newOtp])
    // setActiveOtpIndex(index+1)
    if (!value) focusPrevInputField(index);
    else focusNextInputField(index);
    console.log(activeOtpIndex);
  };

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);
  console.log(activeOtpIndex);

  const handleKeyDown = ({ key }, index) => {
    currentOTPIndex = index;
    if (key === "Backspace") {
      focusPrevInputField(index);
    }
 
  };
console.log(inputRef.current?.value);
  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={""}>
          <div>
            <Title>Please enter the OTP to verify your account</Title>
            <p className="text-center dark:text-dark-subtle text-light-subtle">
              OTP has been sent to your email
            </p>
          </div>

          <div className="flex justify-center items-center space-x-4">
            {otp.map((_, index) => {
              return (
                <input
                  ref={activeOtpIndex === index ? inputRef : null}
                  key={index}
                  type="number"
                  value={otp[index] || ""}
                  onChange={(e)=>handleOptChange(e,index)}
                  // onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 border-2 dark:border-dark-subtle   border-light-subtle darK:focus:border-white focus:border-primary rounded bg-transparent outline-none text-center dark:text-white text-primary font-semibold text-xl spin-button-none active:border-blue-600"
                />
              );
            })}
          </div>
          <div>
            <Submit_Btn value="Verify Account" />
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default EmailVerification;