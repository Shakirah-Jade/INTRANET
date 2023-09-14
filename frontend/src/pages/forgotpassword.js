import { useState } from "react";
import { useForgotPassword } from "../hooks/useForgotPassword";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { forgotpassword, error, isLoading, success } = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await forgotpassword(email);
  };

  return (
    <form className="forgotpassword" onSubmit={handleSubmit}>
      <h3>Enter email for sending reset password link</h3>

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <button disabled={isLoading}>Submit</button>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </form>
  );
};

export default ForgotPassword;
