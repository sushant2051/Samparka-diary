import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { InputField } from "../components/InputFiled";
import { useState } from "react";
import {
  SignupSchema,
  type SignupSchemaType,
} from "./validators/signup.validation";
import z from "zod";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignupSchemaType>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: [],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = SignupSchema.parse(formData);
      console.log("Signup Data:", data);
      setErrors({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string[]> = {};

        err.issues.forEach((issue) => {
          const key = issue.path[0] as string;

          if (!fieldErrors[key]) {
            fieldErrors[key] = [];
          }

          fieldErrors[key].push(issue.message);
        });

        setErrors(fieldErrors);
      }
    }
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="w-100 py-8 ">
      <div className="border border-gray-200 w-full rounded-md shadow-md p-6">
        <div className="pb-5 text-center">
          <p className="text-xl font-bold">Create an account</p>
          <p>Signup and start using samparka diary</p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <InputField
            autoFocus
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            errors={errors.fullName}
          />

          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            errors={errors.email}
          />

          <InputField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            errors={errors.phone}
          />

          <InputField
            autoComplete="password"
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            errors={errors.password}
          />

          <InputField
            autoComplete="password"
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            errors={errors.confirmPassword}
          />

          <Button label="Signup" type="submit" />
        </form>

        <div className="flex items-center justify-center gap-2 mt-2">
          <p>Already have an account?</p>
          <button
            onClick={handleNavigateToLogin}
            className="underline cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
