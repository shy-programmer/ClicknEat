const token = localStorage.getItem("token");
if (!token) window.location.href = "/staff";

const itemsEl = document.getElementById("itemsList");
const form = document.getElementById("form");
const returnBtn = document.getElementById("returnBtn");

returnBtn.addEventListener("click", () => {
  window.location.href = "/staff/dashboard";
});


async function loadItems() {
  const res = await fetch("/api/clickneat/item", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const result = await res.json();
  const items = result.data || result;

  itemsEl.innerHTML = "";

  items.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ₦${item.price}
      (${item.isAvailable ? "Available" : "Unavailable"})
      <button onclick="toggle('${item._id}')">Change Availability</button>
    `;
    itemsEl.appendChild(li);
  });
}

async function toggle(id) {
  await fetch(`/api/clickneat/item/${id}/toggle`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  loadItems();
}

window.toggle = toggle;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("itemName").value;
  const price = document.getElementById("itemPrice").value;

  const res = await fetch("/api/clickneat/item", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name, price })
  });
    const result = await res.json();
    if (!res.ok) {
      return alert(result.message || "Error adding item");
    }

  form.reset();
  loadItems();
});

loadItems();
