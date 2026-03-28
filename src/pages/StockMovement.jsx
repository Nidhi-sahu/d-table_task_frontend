
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStock, getStock } from "../redux/action/stockAction";

const emptyForm = { productId: "", quantity: "" };

export default function StockMovementPage() {
  const dispatch = useDispatch();
 

  const { loading, success, error, stockData } = useSelector((state) => state.stock);

  const [mode, setMode]           = useState("IN");
  const [form, setForm]           = useState(emptyForm);
  const [errors, setErrors]       = useState({});
  const [toast, setToast]         = useState(null);
  const [savedMode, setSavedMode] = useState("IN");

  // ── Fetch history on mount ───────────────────────────────
  useEffect(() => {
    dispatch(getStock());
  }, [dispatch]);

  // ── success ke baad reset + refetch ─────────────────────
  useEffect(() => {
    console.log("success:", success); 
  console.log("error:", error);   
    if (success) {
      dispatch(getStock());
      setForm(emptyForm);
      setErrors({});
      showToast(
        `${savedMode === "IN" ? "📥 Stock IN" : "📤 Stock OUT"} — Entry saved successfully!`,
        savedMode === "IN" ? "#10b981" : "#f59e0b"
      );
      dispatch({ type: "STOCK_RESET" });
    }
  }, [success]);

  // ── Stats ────────────────────────────────────────────────
  const list     = stockData || [];
  const totalIn  = list.filter(l => l.type === "IN").reduce((s, l) => s + (l.quantity || 0), 0);
  const totalOut = list.filter(l => l.type === "OUT").reduce((s, l) => s + (l.quantity || 0), 0);

  const showToast = (msg, color) => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3200);
  };

  // ── Validate ─────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.productId.trim()) e.productId = "Product ID daalo";
    if (!form.quantity || Number(form.quantity) <= 0) e.quantity = "Valid quantity daalo";
    return e;
  };

  // ── Save ─────────────────────────────────────────────────
  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSavedMode(mode);
    dispatch(updateStock({
      productId: form.productId.trim(), 
      quantity:  Number(form.quantity),
      type:      mode,
    }));
  };

  // ── Format date ──────────────────────────────────────────
  const formatDate = (iso) => {
    if (!iso) return "—";
    const d   = new Date(iso);
    const pad = n => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  return (
    <div style={S.page}>

      {/* Toast */}
      {toast && (
        <div style={{ ...S.toast, borderLeft: `4px solid ${toast.color}` }}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={S.header}>
        <div>
          <h2 style={S.title}>Stock Movement</h2>
          <p style={S.sub}>Bank ledger jaisa — har IN / OUT permanently record hoga  •  Edit allowed nahi 🔒</p>
        </div>
      </div>

      {/* 2 Summary Cards */}
      <div style={S.cards}>
        {[
          { label: "Total Stock IN",  value: totalIn,  icon: "📥", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
          { label: "Total Stock OUT", value: totalOut, icon: "📤", color: "#f59e0b", bg: "rgba(245,158,11,0.1)"  },
        ].map(c => (
          <div key={c.label} style={{ ...S.card, borderTop: `3px solid ${c.color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={S.cardLabel}>{c.label}</p>
                <p style={{ ...S.cardVal, color: c.color }}>{c.value}</p>
              </div>
              <div style={{ ...S.cardIcon, background: c.bg }}>
                <span style={{ fontSize: "20px" }}>{c.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inline Form */}
      <div style={S.formCard}>
        <div style={S.formHeader}>
          <span style={S.formTitle}>Record Stock Movement</span>
        </div>

        {/* IN / OUT toggle */}
        <div style={S.modeTabs}>
          {["IN", "OUT"].map(m => (
            <button
              key={m}
              style={{
                ...S.modeTab,
                background: mode === m
                  ? m === "IN"
                    ? "linear-gradient(135deg,#10b981,#059669)"
                    : "linear-gradient(135deg,#f59e0b,#d97706)"
                  : "#0f172a",
                color:  mode === m ? "white" : "#94a3b8",
                border: mode === m ? "none"  : "1px solid #334155",
              }}
              onClick={() => { setMode(m); setErrors({}); }}
            >
              {m === "IN" ? "📥 Stock IN" : "📤 Stock OUT"}
            </button>
          ))}
        </div>

        {/* Product ID */}
        <div style={{ ...S.mf, marginBottom: "14px" }}>
          <label style={S.ml}>Product ID *</label>
          <input
            style={inp(errors.productId)}
            placeholder="e.g. 69c69e8105d53be39a9141de"
            value={form.productId}
            onChange={e => { setForm({ ...form, productId: e.target.value }); setErrors({ ...errors, productId: "" }); }}
          />
          {errors.productId && <span style={S.err}>{errors.productId}</span>}
        </div>

        {/* Quantity */}
        <div style={{ ...S.mf, marginBottom: "14px" }}>
          <label style={S.ml}>Quantity *</label>
          <input
            style={inp(errors.quantity)}
            type="number" min="1" placeholder="e.g. 10"
            value={form.quantity}
            onChange={e => { setForm({ ...form, quantity: e.target.value }); setErrors({ ...errors, quantity: "" }); }}
          />
          {errors.quantity && <span style={S.err}>{errors.quantity}</span>}
        </div>

        {/* API error */}
        {error && (
          <div style={{ ...S.lockBox, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", marginBottom: "14px" }}>
            ⚠️ {error}
          </div>
        )}

        {/* Lock notice */}
        <div style={S.lockBox}>
          🔒 <strong>Important:</strong> Yeh entry save hone ke baad <strong>edit ya delete nahi ho sakti.</strong>
        </div>

        <div style={S.mfoot}>
          <button
            style={{
              ...S.saveBtn,
              background: loading
                ? "#334155"
                : mode === "IN"
                  ? "linear-gradient(135deg,#10b981,#059669)"
                  : "linear-gradient(135deg,#f59e0b,#d97706)",
              opacity: loading ? 0.7 : 1,
              cursor:  loading ? "not-allowed" : "pointer",
            }}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : mode === "IN" ? "📥 IN Record Karo" : "📤 OUT Record Karo"}
          </button>
        </div>
      </div>

      {/* Ledger Table */}
      <div style={S.tableCard}>
        <div style={{ overflowX: "auto" }}>
          <table style={S.table}>
            <thead>
              <tr>
                {["#", "Date & Time", "Type", "Product", "SKU", "Quantity"].map(h => (
                  <th key={h} style={S.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && list.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ ...S.td, textAlign: "center", padding: "48px", color: "#475569" }}>
                    Loading...
                  </td>
                </tr>
              ) : list.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ ...S.td, textAlign: "center", padding: "48px", color: "#475569" }}>
                    😕 Koi record nahi mila
                  </td>
                </tr>
              ) : list.map((l, i) => (
                <tr
                  key={l._id}
                  style={{ borderBottom: "1px solid #1e293b" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#1a2744"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ ...S.td, color: "#475569" }}>{i + 1}</td>
                  <td style={{ ...S.td, color: "#64748b", fontSize: "12px", whiteSpace: "nowrap" }}>
                    {formatDate(l.createdAt)}
                  </td>
                  <td style={S.td}>
                    {l.type === "IN"
                      ? <span style={S.inBadge}>📥 IN</span>
                      : <span style={S.outBadge}>📤 OUT</span>}
                  </td>
                  {/* ✅ populate se product.name aur product.sku aa raha hai */}
                  <td style={{ ...S.td, fontWeight: "500", color: "#e2e8f0" }}>
                    {l.product?.name || "—"}
                  </td>
                  <td style={{ ...S.td, fontFamily: "monospace", fontSize: "12px", color: "#818cf8" }}>
                    {l.product?.sku || "—"}
                  </td>
                  <td style={{ ...S.td, fontWeight: "700", fontSize: "15px", color: l.type === "IN" ? "#10b981" : "#f59e0b" }}>
                    {l.type === "IN" ? "+" : "−"}{l.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

const inp = (err) => ({
  background:   "#0f172a",
  border:       `1px solid ${err ? "#ef4444" : "#334155"}`,
  borderRadius: "8px",
  padding:      "10px 14px",
  color:        "#f1f5f9",
  fontSize:     "14px",
  fontFamily:   "'DM Sans', sans-serif",
  outline:      "none",
  width:        "100%",
  boxSizing:    "border-box",
});

const S = {
  page:      { marginLeft: "240px", marginTop: "64px", padding: "28px", background: "#0b1120", minHeight: "calc(100vh - 64px)", fontFamily: "'DM Sans', sans-serif" },
  toast:     { position: "fixed", bottom: "24px", right: "24px", zIndex: 9999, background: "#1e293b", border: "1px solid #334155", borderRadius: "10px", padding: "14px 20px", color: "#e2e8f0", fontSize: "13px", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", maxWidth: "420px", lineHeight: "1.5" },
  header:    { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" },
  title:     { margin: "0 0 4px", color: "#f1f5f9", fontSize: "22px", fontWeight: "700", letterSpacing: "-0.3px" },
  sub:       { margin: 0, color: "#64748b", fontSize: "13px" },

  cards:     { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" },
  card:      { background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "20px" },
  cardLabel: { margin: "0 0 6px", color: "#94a3b8", fontSize: "13px" },
  cardVal:   { margin: 0, fontSize: "28px", fontWeight: "700", letterSpacing: "-0.5px" },
  cardIcon:  { width: "44px", height: "44px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" },

  formCard:   { background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "20px 24px", marginBottom: "20px" },
  formHeader: { marginBottom: "16px", borderBottom: "1px solid #334155", paddingBottom: "12px" },
  formTitle:  { color: "#e2e8f0", fontSize: "14px", fontWeight: "600" },
  modeTabs:   { display: "flex", gap: "10px", marginBottom: "18px" },
  modeTab:    { flex: 1, padding: "10px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },

  mf:      { display: "flex", flexDirection: "column", gap: "6px" },
  ml:      { color: "#94a3b8", fontSize: "12px", fontWeight: "500" },
  err:     { color: "#ef4444", fontSize: "11px" },
  lockBox: { background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "8px", padding: "10px 14px", color: "#818cf8", fontSize: "12px", lineHeight: "1.6", marginBottom: "14px" },
  mfoot:   { display: "flex", justifyContent: "flex-end", marginTop: "4px" },
  saveBtn: { border: "none", color: "white", borderRadius: "8px", padding: "10px 28px", fontSize: "13px", fontWeight: "600", fontFamily: "'DM Sans', sans-serif" },

  tableCard: { background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", overflow: "hidden" },
  table:     { width: "100%", borderCollapse: "collapse", minWidth: "500px" },
  th:        { textAlign: "left", padding: "12px 16px", color: "#475569", fontSize: "11px", fontWeight: "600", letterSpacing: "0.6px", textTransform: "uppercase", background: "#0b1120", whiteSpace: "nowrap" },
  td:        { padding: "12px 16px", color: "#cbd5e1", fontSize: "13px", verticalAlign: "middle" },

  inBadge:  { display: "inline-flex", alignItems: "center", gap: "4px", padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", background: "rgba(16,185,129,0.12)", color: "#10b981" },
  outBadge: { display: "inline-flex", alignItems: "center", gap: "4px", padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", background: "rgba(245,158,11,0.12)", color: "#f59e0b" },
};
