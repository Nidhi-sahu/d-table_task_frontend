
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, updateProduct, deleteProduct, addProduct } from "../redux/action/productAction"


const ITEMS_PER_PAGE = 5;
const emptyForm = { name: "", sku: "", category: "Electronics", price: "", quantity: "", lowStockThreshold: "" };

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { products = [], totalPages = 1, loading = false } = useSelector((state) => state.product) || {};

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    dispatch(getProducts({
      page,
      limit: ITEMS_PER_PAGE,
      search: search || undefined,
    }));
  }, [search, page, dispatch]);

  const openAdd = () => { setForm(emptyForm); setFormError(""); setModal("add"); };
  const openEdit = (p) => { setSelectedProduct(p); setForm({ name: p.name, sku: p.sku, category: p.category, price: p.price, quantity: p.quantity, lowStockThreshold: p.lowStockThreshold }); setFormError(""); setModal("edit"); };
  const openDelete = (p) => { setSelectedProduct(p); setModal("delete"); };
  const closeModal = () => { setModal(null); setSelectedProduct(null); setForm(emptyForm); setFormError(""); };

  const validateForm = () => {
    if (!form.name || !form.sku || !form.category || form.price === "" || form.quantity === "" || form.lowStockThreshold === "") {
      setFormError("Sabhi fields bharna zaroori hai!");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const payload = {
      name: form.name,
      sku: form.sku,
      category: form.category,
      price: Number(form.price),
      quantity: Number(form.quantity),
      lowStockThreshold: Number(form.lowStockThreshold),
    };

    if (modal === "add") {
      await dispatch(addProduct(payload));
    }

    // UPDATE
    if (modal === "edit") {
      await dispatch(updateProduct(selectedProduct._id, payload));
    }

    dispatch(getProducts({ page, limit: ITEMS_PER_PAGE, search: search || undefined }));

    closeModal();
  };

  const handleDelete = async () => {
    await dispatch(deleteProduct(selectedProduct._id));

    dispatch(getProducts({ page, limit: ITEMS_PER_PAGE, search: search || undefined }));
    closeModal();
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );
  const isLowStock = (p) => p.quantity <= p.lowStockThreshold;

  return (
    <main style={styles.main}>
      {/* Header */}
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.pageTitle}>Products</h2>
          <p style={styles.pageSub}>{filteredProducts.length} products found</p>
        </div>
        <button style={styles.addBtn} onClick={openAdd}>+ Add Product</button>
      </div>

      {/* Search */}
      <div style={styles.filtersRow}>
        <div style={styles.searchBox}>
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            style={styles.searchInput}
          />
          {search && <span style={styles.clearBtn} onClick={() => setSearch("")}>✕</span>}
        </div>
      </div>

      {/* Table */}
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              {["#", "Name", "SKU", "Category", "Price (₹)", "Quantity", "Low Stock Threshold", "Actions"].map((h) => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} style={{ ...styles.td, textAlign: "center", padding: "40px", color: "#475569" }}>
                  Loading...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ ...styles.td, textAlign: "center", padding: "40px", color: "#475569" }}>
                  No Product
                </td>
              </tr>
            ) : (
              filteredProducts.map((p, i) => (
                <tr key={p.id}
                  style={{ borderBottom: "1px solid #1e293b" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#1a2744"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ ...styles.td, color: "#475569" }}>{(page - 1) * ITEMS_PER_PAGE + i + 1}</td>
                  <td style={styles.td}><div style={styles.productName}>{p.name}</div></td>
                  <td style={styles.td}><span style={styles.skuBadge}>{p.sku}</span></td>
                  <td style={styles.td}><span style={styles.catTag}>{p.category}</span></td>
                  <td style={{ ...styles.td, fontWeight: "600", color: "#e2e8f0" }}>₹{p.price.toLocaleString("en-IN")}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.qtyBadge, background: isLowStock(p) ? "rgba(239,68,68,0.12)" : "rgba(16,185,129,0.1)", color: isLowStock(p) ? "#ef4444" : "#10b981" }}>
                      {isLowStock(p) ? "⚠️ " : ""}{p.quantity}
                    </span>
                  </td>
                  <td style={{ ...styles.td, color: "#94a3b8" }}>{p.lowStockThreshold}</td>
                  <td style={styles.td}>
                    <div style={styles.actionRow}>
                      <button style={styles.editBtn} onClick={() => openEdit(p)}>✏️ Edit</button>
                      <button style={styles.deleteBtn} onClick={() => openDelete(p)}>🗑️ Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination — server se aa raha hai totalPages */}
      {totalPages > 1 && (
        <div style={styles.paginationRow}>
          <span style={styles.pageInfo}>Page {page} of {totalPages}</span>
          <div style={styles.pageButtons}>
            <button style={{ ...styles.pageBtn, opacity: page === 1 ? 0.4 : 1 }} disabled={page === 1} onClick={() => setPage(1)}>«</button>
            <button style={{ ...styles.pageBtn, opacity: page === 1 ? 0.4 : 1 }} disabled={page === 1} onClick={() => setPage(page - 1)}>‹ Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).filter(n => Math.abs(n - page) <= 2).map(n => (
              <button key={n} style={{ ...styles.pageBtn, background: n === page ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "#1e293b", color: n === page ? "white" : "#94a3b8", border: n === page ? "none" : "1px solid #334155" }} onClick={() => setPage(n)}>{n}</button>
            ))}
            <button style={{ ...styles.pageBtn, opacity: page === totalPages ? 0.4 : 1 }} disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next ›</button>
            <button style={{ ...styles.pageBtn, opacity: page === totalPages ? 0.4 : 1 }} disabled={page === totalPages} onClick={() => setPage(totalPages)}>»</button>
          </div>
        </div>
      )}

      {/* Modal — Add / Edit */}
      {(modal === "add" || modal === "edit") && (
        <div style={styles.overlay} onClick={closeModal}>
          <div style={styles.modalCard} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>{modal === "add" ? " Add Product" : "✏️ Edit Product"}</h3>
              <span style={styles.closeBtn} onClick={closeModal}>✕</span>
            </div>
            <div style={styles.modalBody}>
              {[
                { label: "Product Name", key: "name", type: "text", placeholder: "e.g. Dell XPS Laptop" },
                { label: "SKU", key: "sku", type: "text", placeholder: "e.g. LAP-001" },
                { label: "Category", key: "category", type: "text", placeholder: "e.g. Electronics" },
                { label: "Price (₹)", key: "price", type: "number", placeholder: "e.g. 85000" },
                { label: "Quantity", key: "quantity", type: "number", placeholder: "e.g. 24" },
                { label: "Low Stock Threshold", key: "lowStockThreshold", type: "number", placeholder: "e.g. 5" },
              ].map(f => (
                <div key={f.key} style={styles.fieldGroup}>
                  <label style={styles.label}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} style={styles.input} />
                </div>
              ))}
              {formError && <div style={styles.errorBox}>⚠️ {formError}</div>}
              <div style={styles.modalFooter}>
                <button style={styles.cancelBtn} onClick={closeModal}>Cancel</button>
                <button style={styles.saveBtn} onClick={handleSave}>{modal === "add" ? "Add Product" : "Save Changes"}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal — Delete */}
      {modal === "delete" && (
        <div style={styles.overlay} onClick={closeModal}>
          <div style={{ ...styles.modalCard, maxWidth: "400px" }} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={{ ...styles.modalTitle, color: "#ef4444" }}>🗑️ Delete Product</h3>
              <span style={styles.closeBtn} onClick={closeModal}>✕</span>
            </div>
            <div style={styles.modalBody}>
              <p style={{ color: "#94a3b8", fontSize: "14px", margin: "0 0 8px" }}>sure</p>
              <div style={styles.deleteTarget}>
                <strong style={{ color: "#f1f5f9" }}>{selectedProduct?.name}</strong>
                <span style={{ color: "#8c94a0", fontSize: "12px" }}> — {selectedProduct?.sku}</span>
              </div>
              <div style={styles.modalFooter}>
                <button style={styles.cancelBtn} onClick={closeModal}>Cancel</button>
                <button style={{ ...styles.saveBtn, background: "linear-gradient(135deg,#ef4444,#dc2626)" }} onClick={handleDelete}> Delete </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

const styles = {
  main: { marginLeft: "240px", marginTop: "64px", padding: "28px", background: "#0b1120", minHeight: "calc(100vh - 64px)", fontFamily: "'DM Sans', sans-serif" },
  headerRow: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" },
  pageTitle: { margin: "0 0 4px", color: "#f1f5f9", fontSize: "22px", fontWeight: "700", letterSpacing: "-0.3px" },
  pageSub: { margin: 0, color: "#64748b", fontSize: "13px" },
  addBtn: { background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", border: "none", borderRadius: "8px", padding: "10px 18px", fontSize: "13px", fontWeight: "600", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
  filtersRow: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" },
  searchBox: { display: "flex", alignItems: "center", background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", padding: "8px 14px", gap: "8px", flex: "1", maxWidth: "320px" },
  searchInput: { background: "transparent", border: "none", outline: "none", color: "#cbd5e1", fontSize: "13px", width: "100%", fontFamily: "'DM Sans', sans-serif" },
  clearBtn: { color: "#475569", cursor: "pointer", fontSize: "12px" },
  tableCard: { background: "#1e293b", borderRadius: "12px", border: "1px solid #334155", overflow: "hidden", marginBottom: "20px" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "13px 18px", color: "#475569", fontSize: "11px", fontWeight: "600", letterSpacing: "0.6px", textTransform: "uppercase", background: "#0f172a", whiteSpace: "nowrap" },
  td: { padding: "13px 18px", color: "#cbd5e1", fontSize: "13.5px", verticalAlign: "middle" },
  productName: { fontWeight: "500", color: "#e2e8f0" },
  skuBadge: { background: "rgba(99,102,241,0.1)", color: "#818cf8", padding: "3px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", fontFamily: "monospace" },
  catTag: { background: "#0f172a", color: "#94a3b8", padding: "3px 10px", borderRadius: "6px", fontSize: "12px", border: "1px solid #1e293b" },
  qtyBadge: { padding: "3px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600" },
  actionRow: { display: "flex", gap: "8px" },
  editBtn: { background: "rgba(99,102,241,0.12)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.25)", borderRadius: "6px", padding: "5px 12px", fontSize: "12px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: "500" },
  deleteBtn: { background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px", padding: "5px 12px", fontSize: "12px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: "500" },
  paginationRow: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" },
  pageInfo: { color: "#475569", fontSize: "13px" },
  pageButtons: { display: "flex", gap: "6px", flexWrap: "wrap" },
  pageBtn: { background: "#1e293b", color: "#94a3b8", border: "1px solid #334155", borderRadius: "6px", padding: "6px 12px", fontSize: "12px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, backdropFilter: "blur(4px)" },
  modalCard: { background: "#1e293b", border: "1px solid #334155", borderRadius: "14px", width: "100%", maxWidth: "520px", boxShadow: "0 24px 60px rgba(0,0,0,0.5)" },
  modalHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #334155" },
  modalTitle: { margin: 0, color: "#f1f5f9", fontSize: "16px", fontWeight: "700" },
  closeBtn: { color: "#475569", cursor: "pointer", fontSize: "16px", fontWeight: "600" },
  modalBody: { padding: "24px", display: "flex", flexDirection: "column", gap: "16px" },
  fieldGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { color: "#94a3b8", fontSize: "12px", fontWeight: "500" },
  input: { background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#f1f5f9", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", outline: "none" },
  errorBox: { background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "8px", padding: "10px 14px", color: "#f87171", fontSize: "13px" },
  modalFooter: { display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "4px" },
  cancelBtn: { background: "#0f172a", border: "1px solid #334155", color: "#94a3b8", borderRadius: "8px", padding: "10px 20px", fontSize: "13px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
  saveBtn: { background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", color: "white", borderRadius: "8px", padding: "10px 20px", fontSize: "13px", fontWeight: "600", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
  deleteTarget: { background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "12px 16px" },
};