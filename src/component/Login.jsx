import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Email aur password dono bharo!");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://d-table-backend-task.onrender.com/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);

      setLoading(false);
      navigate("/dashboard");

    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Login failed");
    }
  };


  return (
    <div style={styles.page}>

      <div style={styles.leftPanel}>
        <div style={styles.brandArea}>
          <div style={styles.logoIcon}>S</div>
          <span style={styles.logoText}>StockFlow</span>
        </div>
        <div style={styles.illustrationArea}>
          <div style={styles.bigIcon}>📦</div>
          <h2 style={styles.tagline}>Inventory ko karo smart manage</h2>

        </div>
        {/* Decorative circles */}
        <div style={styles.circle1} />
        <div style={styles.circle2} />
        <div style={styles.circle3} />
      </div>

      {/* Right login form */}
      <div style={styles.rightPanel}>
        <div style={styles.formCard}>
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>Welcome Back </h2>
            <p style={styles.formSub}>Apne account mein login karo</p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Email */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>📧</span>
                <input
                  type="email"
                  name="email"
                  placeholder=""
                  value={form.email}
                  onChange={handleChange}
                  style={styles.input}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>🔒</span>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder=""
                  value={form.password}
                  onChange={handleChange}
                  style={styles.input}
                  autoComplete="current-password"
                />
                <span
                  style={styles.eyeIcon}
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? "🙈" : "👁️"}
                </span>
              </div>
            </div>
          {/* Error */}
            {error && (
              <div style={styles.errorBox}>
                ⚠️ {error}
              </div>
            )}
            {/* Submit */}
            <button
              type="submit"
              style={{
                ...styles.submitBtn,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
              disabled={loading}
            >
              {loading ? (
                <span style={styles.loadingRow}>
                  <span style={styles.spinner} /> Logging in...
                </span>
              ) : (
                "Login →"
              )}
            </button>
          </form>
          </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "#0b1120",
    fontFamily: "'DM Sans', sans-serif",
  },

  // Left Panel
  leftPanel: {
    flex: 1,
    background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 60%, #0b1120 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "40px",
    position: "relative",
    overflow: "hidden",
    borderRight: "1px solid #1e293b",
  },
  brandArea: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    position: "relative",
    zIndex: 2,
  },
  logoIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "800",
    fontSize: "18px",
  },
  logoText: {
    color: "#f1f5f9",
    fontSize: "20px",
    fontWeight: "700",
    letterSpacing: "-0.3px",
  },
  illustrationArea: {
    position: "relative",
    zIndex: 2,
    marginBottom: "60px",
  },
  bigIcon: {
    fontSize: "72px",
    marginBottom: "24px",
    display: "block",
    filter: "drop-shadow(0 0 30px rgba(99,102,241,0.4))",
  },
  tagline: {
    margin: "0 0 12px",
    color: "#f1f5f9",
    fontSize: "26px",
    fontWeight: "700",
    lineHeight: "1.3",
    letterSpacing: "-0.5px",
  },
  taglineSub: {
    margin: 0,
    color: "#64748b",
    fontSize: "14px",
    lineHeight: "1.6",
    maxWidth: "340px",
  },
  // Decorative circles
  circle1: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    border: "1px solid rgba(99,102,241,0.15)",
    top: "-80px",
    right: "-80px",
  },
  circle2: {
    position: "absolute",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    border: "1px solid rgba(139,92,246,0.1)",
    top: "-30px",
    right: "-30px",
  },
  circle3: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    border: "1px solid rgba(99,102,241,0.08)",
    bottom: "-100px",
    left: "-100px",
  },

  // Right Panel
  rightPanel: {
    width: "480px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 32px",
    background: "#0f172a",
  },
  formCard: {
    width: "100%",
    maxWidth: "380px",
  },
  formHeader: {
    marginBottom: "32px",
  },
  formTitle: {
    margin: "0 0 6px",
    color: "#f1f5f9",
    fontSize: "26px",
    fontWeight: "700",
    letterSpacing: "-0.5px",
  },
  formSub: {
    margin: 0,
    color: "#64748b",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    color: "#94a3b8",
    fontSize: "13px",
    fontWeight: "500",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: "14px",
    fontSize: "15px",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "12px 14px 12px 42px",
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "10px",
    color: "#f1f5f9",
    fontSize: "14px",
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  eyeIcon: {
    position: "absolute",
    right: "14px",
    fontSize: "15px",
    cursor: "pointer",
    userSelect: "none",
  },
  rememberRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rememberLabel: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  forgotLink: {
    color: "#6366f1",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: "500",
  },
  errorBox: {
    background: "rgba(239,68,68,0.1)",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: "8px",
    padding: "10px 14px",
    color: "#f87171",
    fontSize: "13px",
  },
  submitBtn: {
    width: "100%",
    padding: "13px",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    transition: "opacity 0.2s",
    marginTop: "4px",
  },
  loadingRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  spinner: {
    display: "inline-block",
    width: "14px",
    height: "14px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "white",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
  },
  hintBox: {
    marginTop: "24px",
    background: "rgba(99,102,241,0.08)",
    border: "1px solid rgba(99,102,241,0.2)",
    borderRadius: "8px",
    padding: "12px 16px",
  },
  hintText: {
    margin: 0,
    color: "#64748b",
    fontSize: "12.5px",
    lineHeight: "1.8",
  },
};
