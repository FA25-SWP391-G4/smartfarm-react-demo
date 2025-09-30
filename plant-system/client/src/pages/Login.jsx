// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authApi from "../api/authApi";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      setLoading(true);
      const { data } = await authApi.login(email, password);
      setLoading(false);
      // Expect backend returns { token, user }
      login(data.token, data.user);
      nav("/");
    } catch (e) {
      setLoading(false);
      setErr(e?.response?.data?.message || "Login failed");
    }
  };

  const loginWithGoogle = () => {
    window.location.href = "/auth/google"; // backend should handle this route
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Login</h2>
              
              {err && <div className="alert alert-danger">{err}</div>}
              
              <form onSubmit={onSubmit} className="mb-3">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    id="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                
                <div className="mb-3 d-flex justify-content-between">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password">Forgot password?</Link>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
              
              <div className="text-center mb-3">
                <p>Don't have an account? <Link to="/register">Register</Link></p>
              </div>
              
              <hr />
              
              <div className="d-grid gap-2">
                <button 
                  onClick={loginWithGoogle} 
                  className="btn btn-outline-danger"
                >
                  <i className="fab fa-google me-2"></i>Continue with Google
                </button>
                
                {process.env.NODE_ENV === 'development' && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={()=>{
                      const fake = { token:"dev", user:{id:1,name:"Dev",role:"Premium"} };
                      localStorage.setItem("token", fake.token);
                      localStorage.setItem("user", JSON.stringify(fake.user));
                      window.location.href="/";
                    }}
                  >
                    Dev bypass
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
