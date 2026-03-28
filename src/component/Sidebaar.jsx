import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const menuItems = [
  {
    section: "Products",
    icon: "📦",
    items: [
      { label: "All Products", icon: "▪" },
      
    ],
  },
  {
    section: "Stock Movement",
    icon: "🔄",
    items: [
      { label: "Stock Movement", icon: "▪" },
      
    ],
  },
];

// Route map for sidebar items
const routeMap = {
  "Dashboard": "/dashboard",
  "All Products": "/products",
  "Stock Movement": "//stock",
 
  
};

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSections, setOpenSections] = useState(["Products", "Stock Movement"]);

  // Derive active item from current route
  const getActiveFromPath = () => {
    if (location.pathname === "/products") return "All Products";
    if (location.pathname === "/dashboard") return "Dashboard";
    return "Dashboard";
  };
  const activeItem = getActiveFromPath();

  const toggleSection = (section) => {
    setOpenSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const handleNavClick = (label) => {
    const route = routeMap[label];
    if (route) navigate(route);
  };
  const handleLogout = async () => {
  try {
    await axios.post(
      "https://d-table-backend-task.onrender.com/auth/logout",
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.log("Logout error", error);
  }

  
  localStorage.removeItem("token");

  navigate("/login");
};

  return (
    <aside style={styles.sidebar}>
      {/* Logo Area */}
      <div style={styles.logoArea}>
        <div style={styles.logoIcon}>S</div>
        <span style={styles.logoText}>StockFlow</span>
      </div>

      <nav style={styles.nav}>
        {/* Dashboard Link */}
        <div
          style={{
            ...styles.dashLink,
            background: activeItem === "Dashboard" ? "rgba(99,102,241,0.15)" : "transparent",
            color: activeItem === "Dashboard" ? "#818cf8" : "#94a3b8",
          }}
          onClick={() => handleNavClick("Dashboard")}
        >
          <span>🏠</span>
          <span>Dashboard</span>
        </div>

        {/* Sections */}
        {menuItems.map((group) => (
          <div key={group.section} style={styles.group}>
            {/* Section Header */}
            <div style={styles.sectionHeader} onClick={() => toggleSection(group.section)}>
              <div style={styles.sectionLeft}>
                <span style={styles.sectionIcon}>{group.icon}</span>
                <span style={styles.sectionLabel}>{group.section}</span>
              </div>
              <span
                style={{
                  ...styles.chevron,
                  transform: openSections.includes(group.section) ? "rotate(90deg)" : "rotate(0deg)",
                }}
              >
                ›
              </span>
            </div>

            {/* Section Items */}
            {openSections.includes(group.section) && (
              <div style={styles.itemList}>
                {group.items.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      ...styles.navItem,
                      background:
                        activeItem === item.label
                          ? "linear-gradient(90deg, rgba(99,102,241,0.2), transparent)"
                          : "transparent",
                      color: activeItem === item.label ? "#818cf8" : "#64748b",
                      borderLeft: activeItem === item.label ? "3px solid #6366f1" : "3px solid transparent",
                    }}
                    onClick={() => handleNavClick(item.label)}
                  >
                    <span style={styles.dot}>●</span>
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom User */}
     <div style={styles.userArea}>
        
        <div>
          <div style={styles.userName}>
  <button onClick={handleLogout}>Logout</button>
</div>
         
        </div>
      </div>
      
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    minHeight: "100vh",
    background: "#0f172a",
    borderRight: "1px solid #1e293b",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 100,
    fontFamily: "'DM Sans', sans-serif",
  },
  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "24px 20px",
    borderBottom: "1px solid #1e293b",
  },
  logoIcon: {
    width: "34px",
    height: "34px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
  },
  logoText: {
    color: "#f1f5f9",
    fontSize: "17px",
    fontWeight: "700",
    letterSpacing: "-0.3px",
  },
  nav: {
    flex: 1,
    padding: "16px 10px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  dashLink: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s",
    marginBottom: "8px",
  },
  group: {
    marginBottom: "4px",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 12px",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "all 0.2s",
    color: "#cbd5e1",
  },
  sectionLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  sectionIcon: {
    fontSize: "15px",
  },
  sectionLabel: {
    fontSize: "13.5px",
    fontWeight: "600",
    letterSpacing: "0.2px",
  },
  chevron: {
    fontSize: "18px",
    color: "#475569",
    transition: "transform 0.2s",
  },
  itemList: {
    paddingLeft: "12px",
    marginTop: "2px",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "400",
    transition: "all 0.15s",
  },
  dot: {
    fontSize: "6px",
    opacity: 0.5,
  },
  userArea: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "16px 20px",
    borderTop: "1px solid #1e293b",
  },
  avatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "700",
    fontSize: "14px",
    flexShrink: 0,
  },
  userName: {
    color: "#e2e8f0",
    fontSize: "13px",
    fontWeight: "600",
  },
  userRole: {
    color: "#64748b",
    fontSize: "11px",
  },
};
