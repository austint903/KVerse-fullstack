import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css"

const Register = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
      }}
    >
      <div style={{ width: "400px" }}>
        <Form route="/api/user/register/" method="register" />
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p className="login-message">
          Already have an account? Log in below!
        </p>
        <button
          onClick={handleLogin}
          className="button"
          style={{ fontWeight: "bold" }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Register;
