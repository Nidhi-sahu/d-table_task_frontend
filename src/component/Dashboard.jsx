import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../redux/action/productAction";
import { updateStock } from "../redux/action/stockAction";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {

  const dispatch = useDispatch();
  const { products = [] } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts({ page: 1, limit: 100 }));
  }, [dispatch]);

  const totalProducts = products.length;
  const stockIn = products.reduce((acc, p) => acc + p.quantity, 0);
  const stockOut = Math.floor(stockIn / 2);
  const handleStockUpdate = () => {
    if (!products.length) return;

    const data = {
      productId: products[0]?._id,
      type: "IN",
      quantity: 5,
    };

    dispatch(updateStock(data));
  };

  const cards = [
    {
      title: "Total Products",
      value: totalProducts,
      change: "+12% this month",
      positive: true,
      icon: "📦",
      color: "#6366f1",
      bg: "rgba(99,102,241,0.1)",
    },
    {
      title: "Stock Inward",
      value: stockIn,
      change: "+5% this week",
      positive: true,
      icon: "📥",
      color: "#10b981",
      bg: "rgba(16,185,129,0.1)",
    },
    {
      title: "Stock Outward",
      value: stockOut,
      change: "-3% this week",
      positive: false,
      icon: "📤",
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.1)",
    },
  ];

  return (
    <main style={styles.main}>

      {/* Header */}
      <div style={styles.welcomeRow}>
        <button style={styles.addBtn} onClick={handleStockUpdate}>
          + Add Stock
        </button>
      </div>

      {/* Cards */}
      <div style={styles.cardsRow}>
        {cards.map((card) => (
          <div key={card.title} style={{ ...styles.card, borderTop: `3px solid ${card.color}` }}>

            <div style={styles.cardTop}>
              <div>
                <p style={styles.cardTitle}>{card.title}</p>
                <p style={styles.cardValue}>{card.value}</p>
              </div>

              <div style={{ ...styles.cardIconBox, background: card.bg }}>
                <span style={{ fontSize: "22px" }}>{card.icon}</span>
              </div>
            </div>

            <div style={styles.cardBottom}>
              <span
                style={{
                  ...styles.cardChange,
                  color: card.positive ? "#10b981" : "#ef4444",
                }}
              >
                {card.positive ? "▲" : "▼"} {card.change}
              </span>
            </div>

          </div>
        ))}
      </div>

    </main>
  );
}

const styles = {
  main: {
    marginLeft: "240px",
    marginTop: "64px",
    padding: "28px",
    background: "#0b1120",
    minHeight: "calc(100vh - 64px)",
    fontFamily: "'DM Sans', sans-serif",
  },
  welcomeRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "28px",
  },
  welcomeTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "700",
    color: "#f1f5f9",
  },
  welcomeSub: {
    margin: "4px 0 0",
    color: "#64748b",
    fontSize: "13px",
  },
  addBtn: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "10px 18px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  cardsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginBottom: "28px",
  },
  card: {
    background: "#1e293b",
    borderRadius: "12px",
    padding: "22px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    border: "1px solid #334155",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTitle: {
    margin: 0,
    color: "#94a3b8",
    fontSize: "13px",
    fontWeight: "500",
  },
  cardValue: {
    margin: "6px 0 0",
    color: "#f1f5f9",
    fontSize: "28px",
    fontWeight: "700",
    letterSpacing: "-0.5px",
  },
  cardIconBox: {
    width: "46px",
    height: "46px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardBottom: {},
  cardChange: {
    fontSize: "12px",
    fontWeight: "500",
  },
  tableCard: {
    background: "#1e293b",
    borderRadius: "12px",
    border: "1px solid #334155",
    overflow: "hidden",
  },
  tableHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 22px",
    borderBottom: "1px solid #334155",
  },
  tableTitle: {
    margin: 0,
    color: "#f1f5f9",
    fontSize: "15px",
    fontWeight: "600",
  },
  viewAllBtn: {
    background: "transparent",
    border: "1px solid #334155",
    color: "#818cf8",
    borderRadius: "6px",
    padding: "6px 12px",
    fontSize: "12px",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "12px 22px",
    color: "#475569",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    background: "#0f172a",
  },
  td: {
    padding: "14px 22px",
    color: "#cbd5e1",
    fontSize: "13.5px",
  },
  typeBadge: {
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },
  statusBadge: {
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
  },
};
