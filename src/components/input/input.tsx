import { forwardRef } from "react";
import "./input.css";
type TInputProps = {
  label?: string;
  type: "password" | "email" | "text" | "number";
  name: string;
  placeholder?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, TInputProps>(
  ({ label, type, name, placeholder, ...props }, ref) => {
    return (
      <>
        {label && (
          <label htmlFor={name} className="label">
            {label}
          </label>
        )}
        <input
          id={name}
          className="input"
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder || ""}
          {...props}
        />
      </>
    );
  }
);

Input.displayName = "Input";

export default Input;
