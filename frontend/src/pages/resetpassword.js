import { useState } from "react";
import { useResetPassword } from "../hooks/useResetPassword";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const { resetpassword, error, isLoading, success } = useResetPassword();
  const [matchingerror, setMatchingError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isMatching = doPasswordsMatch();

    if (isMatching) {
      await resetpassword(newPassword, newConfirmPassword);
    } else {
      setMatchingError("Passwords not matching");
    }
  };

  const doPasswordsMatch = () => {
    return newPassword === newConfirmPassword;
  };

  return (
    <form className="forgotpassword" onSubmit={handleSubmit}>
      <h3>Enter New Password</h3>

      <label>Enter New Password:</label>
      <input
        type="password"
        onChange={(e) => setNewPassword(e.target.value)}
        value={newPassword}
      />
      <label>Confirm New Password:</label>
      <input
        type="password"
        onChange={(e) => setNewConfirmPassword(e.target.value)}
        value={newConfirmPassword}
      />

      <button disabled={isLoading}>Submit</button>
      {error && <div className="error">{error}</div>}
      {matchingerror && <div className="error">{matchingerror}</div>}
      {success && <div className="success">{success}</div>}
    </form>
  );
};

export default ResetPassword;
