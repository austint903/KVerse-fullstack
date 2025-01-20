import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css"

const Login = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
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
        <Form route="/api/token/" method="login" />
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p className="register-message">
          Don't have an account yet? Register below!
        </p>
        <button
          onClick={handleRegister}
          className="button"
          style={{ fontWeight: "bold" }}
           >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
