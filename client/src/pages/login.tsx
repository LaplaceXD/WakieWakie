import Title from "@/components/common/title";
import Subtitle from "@/components/common/subtitle";
import TextDisplay from "@/components/common/text-display";
import Buttons from "@/components/common/buttons";
import AuthText from "@/components/common/auth-text";
import FormInput from "@/components/common/form-input";
import { useRef } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/pages/login-action";
import { camelCase } from "@/components/utils/index.js";
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const formFieldsRef = useRef({});

  const [loginuser, { data }] = useMutation(LOGIN_USER);

  const formFields = [
    { label: "Username", type: "text" },
    { label: "Password", type: "password" },
  ];

    const loginHandler = () => {
        const _userDetails = {};
        Object.entries(formFieldsRef.current).forEach(([key, el]) => (_userDetails[key] = el.value));
        const { username, password } = _userDetails; // Extract username and password
        loginuser({ variables: { username, password } }).then(res => {
            console.log(res);
            if (res.data.loginAccount.success) {
                // Redirect to the home page
                navigate("/");
            }
        });
    };


    return (
    <div className="flex h-screen justify-between bg-gradient-to-br from-neutral-100 to-sky-100">
      <div className="flex w-1/2 flex-col items-center justify-center">
        <TextDisplay TitleLabel="Welcome Back" TextLabel="" style="" />

        <div id="forms" className="mb-20 mt-5">
          {formFields.map((field, index) => (
            <FormInput
              ref={ref => (formFieldsRef.current[camelCase(field.label)] = ref)}
              key={index}
              type={field.type}
              label={field.label}
            />
          ))}
        </div>
        <Buttons label="Login" type="auth" onClick={loginHandler}/>
        <AuthText text="Don't have an account yet?" linkText="Sign Up Now!" link="/register" />
      </div>
      <div className="flex w-1/2 flex-col items-center justify-center">
        <Title label="Wakie Wakie" />
        <Subtitle
          label={
            <>
              <div>It's time to Rise and Shine together and</div>
              <div>Find Love in your Morning Routine</div>
            </>
          }
        />
      </div>
    </div>
  );
}

export default Login;
