const token = localStorage.getItem("token");
if (!token) window.location.href = "/staff/login.html";

const itemsEl = document.getElementById("items");
const form = document.getElementById("createItem");

async function loadItems() {
  const res = await fetch("/api/clickneat/item", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  const items = await res.json();

  itemsEl.innerHTML = "";
  items.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ₦${item.price}
      (${item.isAvailable ? "Available" : "Unavailable"})
      <button onclick="toggle('${item._id}')">Toggle</button>
    `;
    itemsEl.appendChild(li);
  });
}

async function toggle(id) {
  await fetch(`/api/clickneat/item/${id}/toggle`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  loadItems();
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;

  await fetch("/api/clickneat/item", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ name, price })
  });

  form.reset();
  loadItems();
});

loadItems();
