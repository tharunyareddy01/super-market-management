const API = "/api/products";

const categories = ["Groceries", "Beverages", "Snacks", "Bakery", "Dairy", "Household", "Personal Care"];

function money(value) {
  return `₹${Number(value || 0).toFixed(2)}`;
}

async function getProducts() {
  const response = await fetch(API);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Unable to load products.");
  return data;
}

function showMessage(text, type = "success") {
  const box = document.getElementById("message");
  if (!box) return;
  box.className = `message ${type}`;
  box.textContent = text;
  box.hidden = false;
}

function fillProductDropdown(select, products, placeholder = "Select Product") {
  if (!select) return;
  select.innerHTML = `<option value="">${placeholder}</option>` +
    products.map(p => `<option value="${p.productId}">${p.productId} — ${escapeHtml(p.name)}</option>`).join("");
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[ch]));
}

async function loadDropdowns() {
  try {
    const products = await getProducts();
    document.querySelectorAll("[data-product-select]").forEach(select =>
      fillProductDropdown(select, products)
    );
    return products;
  } catch (error) {
    showMessage(error.message, "error");
    return [];
  }
}

async function loadUpdateProduct(id) {
  const response = await fetch(`${API}/${id}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Product not found.");

  document.getElementById("name").value = data.name;
  document.getElementById("price").value = data.price;
  document.getElementById("quantity").value = data.quantity;
  document.getElementById("category").value = data.category;
  document.getElementById("update-fields").hidden = false;
}

document.addEventListener("DOMContentLoaded", () => {
  const addForm = document.getElementById("addForm");
  if (addForm) {
    addForm.addEventListener("submit", async e => {
      e.preventDefault();
      const body = Object.fromEntries(new FormData(addForm));
      body.productId = Number(body.productId);
      body.price = Number(body.price);
      body.quantity = Number(body.quantity);

      try {
        const response = await fetch(API, {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(body)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        addForm.reset();
        showMessage(data.message);
      } catch (error) { showMessage(error.message, "error"); }
    });
  }

  const updateSelect = document.getElementById("updateProductId");
  if (updateSelect) {
    loadDropdowns();
    updateSelect.addEventListener("change", async () => {
      if (!updateSelect.value) {
        document.getElementById("update-fields").hidden = true;
        return;
      }
      try { await loadUpdateProduct(updateSelect.value); }
      catch (error) { showMessage(error.message, "error"); }
    });
  }

  const updateForm = document.getElementById("updateForm");
  if (updateForm) {
    updateForm.addEventListener("submit", async e => {
      e.preventDefault();
      const id = document.getElementById("updateProductId").value;
      const body = Object.fromEntries(new FormData(updateForm));
      delete body.productId;
      body.price = Number(body.price);
      body.quantity = Number(body.quantity);

      try {
        const response = await fetch(`${API}/${id}`, {
          method: "PUT",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(body)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        showMessage(data.message);
        await loadDropdowns();
      } catch (error) { showMessage(error.message, "error"); }
    });
  }

  const deleteForm = document.getElementById("deleteForm");
  if (deleteForm) {
    loadDropdowns();
    deleteForm.addEventListener("submit", async e => {
      e.preventDefault();
      const id = document.getElementById("deleteProductId").value;
      if (!id) return showMessage("Please select a product.", "error");

      const selected = document.getElementById("deleteProductId").selectedOptions[0].textContent;
      if (!confirm(`Delete ${selected}?`)) return;

      try {
        const response = await fetch(`${API}/${id}`, {method:"DELETE"});
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        showMessage(data.message);
        await loadDropdowns();
      } catch (error) { showMessage(error.message, "error"); }
    });
  }

  const listBody = document.getElementById("productRows");
  if (listBody) {
    const categoryFilter = document.getElementById("categoryFilter");
    const sortFilter = document.getElementById("sortFilter");
    let products = [];

    async function render() {
      try {
        products = await getProducts();
        const category = categoryFilter.value;
        const sort = sortFilter.value;
        let visible = products.filter(p => !category || p.category === category);

        if (sort === "price-low") visible.sort((a,b) => a.price - b.price);
        if (sort === "price-high") visible.sort((a,b) => b.price - a.price);
        if (sort === "name") visible.sort((a,b) => a.name.localeCompare(b.name));
        if (sort === "quantity") visible.sort((a,b) => b.quantity - a.quantity);

        listBody.innerHTML = visible.length ? visible.map(p => `
          <tr>
            <td>#${p.productId}</td>
            <td><strong>${escapeHtml(p.name)}</strong></td>
            <td>${money(p.price)}</td>
            <td><span class="stock ${p.quantity > 0 ? "in" : "out"}">${p.quantity}</span></td>
            <td><span class="tag">${escapeHtml(p.category)}</span></td>
            <td><button class="mini-btn" onclick="quickDelete(${p.productId})">Delete</button></td>
          </tr>
        `).join("") : `<tr><td colspan="6" class="empty">No products found.</td></tr>`;

        document.getElementById("productCount").textContent = `${visible.length} product${visible.length === 1 ? "" : "s"}`;
      } catch (error) {
        listBody.innerHTML = `<tr><td colspan="6" class="empty">${escapeHtml(error.message)}</td></tr>`;
      }
    }

    categories.forEach(c => categoryFilter.insertAdjacentHTML("beforeend", `<option>${c}</option>`));
    categoryFilter.addEventListener("change", render);
    sortFilter.addEventListener("change", render);
    render();
  }

  const searchSelect = document.getElementById("searchId");
  if (searchSelect) loadDropdowns();

  const searchForm = document.getElementById("searchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", async e => {
      e.preventDefault();
      const id = document.getElementById("searchId").value;
      const result = document.getElementById("searchResult");
      try {
        const response = await fetch(`${API}/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        result.innerHTML = `
          <div class="result-card">
            <span class="result-id">#${data.productId}</span>
            <h2>${escapeHtml(data.name)}</h2>
            <p>${escapeHtml(data.category)} · ${data.quantity} in stock</p>
            <strong>${money(data.price)}</strong>
          </div>`;
      } catch (error) { result.innerHTML = `<div class="message error">${escapeHtml(error.message)}</div>`; }
    });
  }
});

async function quickDelete(id) {
  if (!confirm(`Delete product #${id}?`)) return;
  try {
    const response = await fetch(`${API}/${id}`, {method:"DELETE"});
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    location.reload();
  } catch (error) { alert(error.message); }
}
