import { useState } from "react";
import { useParams } from "react-router-dom";

export const useResetPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [success, setSuccess] = useState(null);
  const { token } = useParams();

  const resetpassword = async (newPassword) => {
    setIsLoading(true);
    setError(false);
    setSuccess(false);

    const endpoint = `/api/user/resetpassword/${token}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newPassword }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      setSuccess(json.message);
      setIsLoading(false);
      console.log(json);
    }
  };

  return { resetpassword, isLoading, error, success };
};
