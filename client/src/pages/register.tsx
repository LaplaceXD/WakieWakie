import Title from "@/components/common/title";
import Subtitle from "@/components/common/subtitle";
import TextDisplay from "@/components/common/text-display";
import Buttons from "@/components/common/buttons";
import AuthText from "@/components/common/auth-text";
import FormInput from "@/components/common/form-input";
import { camelCase } from "@/components/utils/index.js";

import { useRef } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "@/pages/register-action";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const formFieldsRef = useRef({});

  const [registeruser, { data, error }] = useMutation(REGISTER_USER);

  const formFields = [
    { label: "Alarm Time", type: "text", options: [] },
    { label: "Bio", type: "text", options: [] },
    { label: "City", type: "text", options: [] },
    { label: "Country", type: "text", options: [] },
    { label: "First Name", type: "text", options: [] },
    { label: "Last Name", type: "text", options: [] },
    { label: "Gender", type: "select", options: ["FEMALE", "MALE", "OTHERS"] },
    { label: "Interest", type: "select", options: ["FEMALE", "MALE", "EVERYONE"] },
    { label: "Email", type: "email", options: [] },
    { label: "Username", type: "text", options: [] },
    { label: "Password", type: "password", options: [] },
  ];

  const registerHandler = () => {
    const _userDetails = {};
    Object.entries(formFieldsRef.current).forEach(([key, el]) => (_userDetails[key] = el.value));

    registeruser({ variables: { userDetails: _userDetails } })
      .then(res => {
        if (res.data.registerAccount.success) {
          toast.success(res.data.registerAccount.message);
          navigate("/login");
        } else {
          const invalidFields = Object.keys(res.data.registerAccount.message);

          invalidFields.forEach(field => {
            const errorMessages = res.data.registerAccount.message[field];

            errorMessages.forEach(errorMessage => {
              const toastMessage = `Invalid input in ${field}: ${errorMessage}.`;
              toast.error(toastMessage);
            });
          });
        }
      })
      .catch(error => {
        if (error.message.includes("alarmTime")) {
          toast.error("Invalid Inputs: Please provide a valid time for the alarm.");
        }
      });
  };

  return (
    <div className="flex h-screen justify-between bg-gradient-to-br from-neutral-100 to-sky-100">
      <div className="flex w-1/2 flex-col items-center justify-center">
        <TextDisplay TitleLabel="Create Account" TextLabel="" style="" />

        <div id="forms" className="mb-14 mt-5 grid grid-cols-2 gap-x-4">
          {formFields.map((field, index) => (
            <FormInput
              ref={ref => (formFieldsRef.current[camelCase(field.label)] = ref)}
              key={index}
              type={field.type}
              label={field.label}
              options={field.type === "select" ? field.options : null}
            />
          ))}
        </div>
        <Buttons label="Sign Up" type="auth" onClick={registerHandler} />
        <AuthText text="Already have an account?" linkText="Go to Login!" link="/login" />
      </div>
      <div className="flex w-1/2 flex-col items-center justify-center">
        <Title label="Wakie Wakie" />
        <Subtitle label={<div>Sign up now to Find Love in your Morning Routine</div>} />
      </div>
    </div>
  );
}

export default Register;
