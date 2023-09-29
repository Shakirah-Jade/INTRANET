import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const SignUp = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(firstname, lastname, email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Firstname:</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstname}
      />
      <label>Lastname:</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastname}
      />
      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Sign Up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SignUp;
