import { useState } from "react";

export const useForgotPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [success, setSuccess] = useState(null);

  const forgotpassword = async (email) => {
    setIsLoading(true);
    setError(false);
    setSuccess(false);

    const response = await fetch("/api/user/forgotpassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }

    if (response.ok) {
      setSuccess(json.message);
      setIsLoading(false);
      console.log(json);
    }
  };

  return { forgotpassword, isLoading, error, success };
};
