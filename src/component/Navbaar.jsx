import { useState } from "react";

export default function Navbar() {
  const [notifications] = useState(3);
  const [searchVal, setSearchVal] = useState("");

  return (
    <header style={styles.navbar}>
      
      <div style={styles.titleArea}>
        <h1 style={styles.pageTitle}>Dashboard</h1>
       
      </div>

      {/* Right Side */}
      <div style={styles.rightArea}>
        {/* Search */}
        <div style={styles.searchBox}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            style={styles.searchInput}
          />
        </div>

       

        

        {/* Avatar */}
        
      </div>
    </header>
  );
}

const styles = {
  navbar: {
    height: "64px",
    background: "#0f172a",
    borderBottom: "1px solid #1e293b",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 28px",
    position: "fixed",
    top: 0,
    left: "240px",
    right: 0,
    zIndex: 99,
    fontFamily: "'DM Sans', sans-serif",
  },
  titleArea: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  pageTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
    color: "#f1f5f9",
    letterSpacing: "-0.3px",
  },
  breadcrumb: {
    fontSize: "11px",
    color: "#475569",
  },
  rightArea: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "8px",
    padding: "6px 12px",
    gap: "8px",
  },
  searchIcon: {
    fontSize: "13px",
  },
  searchInput: {
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#cbd5e1",
    fontSize: "13px",
    width: "160px",
    fontFamily: "'DM Sans', sans-serif",
  },
  iconBtn: {
    position: "relative",
    width: "38px",
    height: "38px",
    borderRadius: "8px",
    background: "#1e293b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "1px solid #334155",
  },
  badge: {
    position: "absolute",
    top: "-4px",
    right: "-4px",
    background: "#ef4444",
    color: "white",
    fontSize: "9px",
    fontWeight: "700",
    borderRadius: "10px",
    padding: "1px 5px",
    minWidth: "16px",
    textAlign: "center",
  },
  avatarArea: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "700",
    fontSize: "14px",
  },
  name: {
    color: "#e2e8f0",
    fontSize: "13px",
    fontWeight: "600",
  },
  role: {
    color: "#64748b",
    fontSize: "11px",
  },
};
