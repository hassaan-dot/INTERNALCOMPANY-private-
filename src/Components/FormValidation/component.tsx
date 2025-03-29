import { useState } from "react";
import * as yup from "yup";

interface FormErrors {
  [key: string]: string;
}

interface UseFormValidationProps {
  initialValues: { [key: string]: any };
  validationSchema: yup.ObjectSchema<any>;
  onSubmit: (values: any) => void;
}

const useFormValidation = ({
  initialValues,
  validationSchema,
  onSubmit,
}: UseFormValidationProps) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const validateField = async (field: string, value: any) => {
    try {
      await validationSchema.validateAt(field, { [field]: value });
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors((prev) => ({ ...prev, [field]: err.message }));
      }
    }
  };

  const handleChange = async (field: string, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    if (submitAttempted) {
      await validateField(field, value);
    }
  };

  const handleSubmit = async () => {
    setSubmitAttempted(true);
    try {
      await validationSchema.validate(values, { abortEarly: false });
      setErrors({});
      onSubmit(values);
    } catch (err) {
      const newErrors: FormErrors = {};
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
      }
      setErrors(newErrors);
    }
  };

  return {
    values,
    errors,
    submitAttempted,
    handleChange,
    handleSubmit,
    setValues,
  };
};

export default useFormValidation;
