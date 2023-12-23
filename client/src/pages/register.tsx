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

function Register() {
  const formFieldsRef = useRef({});

  const [registeruser, { data }] = useMutation(REGISTER_USER);

  const formFields = [
    { label: "Alarm Time", type: "text" },
    { label: "Bio", type: "text" },
    { label: "City", type: "text" },
    { label: "Country", type: "text" },
    { label: "First Name", type: "text" },
    { label: "Last Name", type: "text" },
    { label: "Gender", type: "text" },
    { label: "Interest", type: "text" },
    { label: "Email", type: "email" },
    { label: "Username", type: "text" },
    { label: "Password", type: "password" },
  ];

  const registerHandler = () => {
    const _userDetails = {};
    Object.entries(formFieldsRef.current).forEach(([key, el]) => (_userDetails[key] = el.value));
    registeruser({ variables: { userDetails: _userDetails } }).then(res => {
      console.log(res);
    });
  };

  return (
    <div className="flex h-screen justify-between bg-gradient-to-br from-neutral-100 to-sky-100">
      <div className="flex w-1/2 flex-col items-center justify-center">
        <TextDisplay TitleLabel="Create Account" TextLabel="" style="" />

        <div id="forms" className="mb-20 mt-5 grid grid-cols-2 gap-x-4">
          {formFields.map((field, index) => (
            <FormInput
              ref={ref => (formFieldsRef.current[camelCase(field.label)] = ref)}
              key={index}
              type={field.type}
              label={field.label}
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
