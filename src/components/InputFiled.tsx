import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errors?: string[];
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { errors, value, onChange, placeholder, label, id, type, ...props },
    ref,
  ) => {
    return (
      <div>
        {label && (
          <label htmlFor={id} className="mb-1 flex text-sm">
            {label}
          </label>
        )}
        <div className="mt-1">
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            id={id}
            className="text-gray-800 h-full w-full rounded-lg border bg-white px-3 py-2.5 font-normal transition-all duration-200 outline-none"
            ref={ref}
            aria-invalid={!!errors}
            {...props}
          />
        </div>
        {errors?.map((error, index) => (
          <p key={index} className="text-sm text-red-500 mt-1">
            {error}
          </p>
        ))}
      </div>
    );
  },
);

InputField.displayName = "InputField";
export { InputField };
