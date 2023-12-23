import { forwardRef, ForwardedRef } from "react";

interface FormInputProps {
  label: string;
  type: string;
  options?: string[] | null;
}

const FormInput = forwardRef<HTMLSelectElement | HTMLInputElement, FormInputProps>(
  ({ label, type, options = [] }, ref) => {
    const style =
      "h-10 w-80 rounded-lg bg-neutral-200/30 p-4 duration-150 ease-in-out hover:border-2 hover:border-neutral-200";
    return (
      <div className="mb-4">
        <div className="text-neutral-200">{label}</div>
        <div>
          {type === "select" ? (
            <select ref={ref as ForwardedRef<HTMLSelectElement>} className={`${style} h-fit py-2`}>
              <option value="" disabled>
                {label === "Gender" ? "Select your gender:" : "Who are you interested in?"}
              </option>
              {options?.map((option, optionIndex) => (
                <option key={optionIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              className={`${style} hover:scale-105`}
              type={type}
              ref={ref as ForwardedRef<HTMLInputElement>}
              placeholder={label === "Alarm Time" ? "HH:mm:ss+ZZZZ" : ""}
            />
          )}
        </div>
      </div>
    );
  },
);

export default FormInput;
