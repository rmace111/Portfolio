async function loadInventory() {
  const status = document.getElementById("inventory-status");
  const grid = document.getElementById("inventory-grid");

  try {
    const response = await fetch("./inventory.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Inventory could not be loaded.");
    const data = await response.json();

    const active = (data.items || []).filter(item => item.status === "available");

    if (!active.length) {
      status.textContent = "No garage items are published yet. Richard is physically verifying the first sale inventory before anything is offered publicly.";
      return;
    }

    status.textContent = active.length === 1
      ? "1 verified item currently available."
      : active.length + " verified items currently available.";

    grid.innerHTML = active.map(item => {
      const subject = encodeURIComponent("MaceTopia item inquiry — " + item.id + " — " + item.title);
      const photo = item.image
        ? '<img src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.title) + '">'
        : '<span>Photo coming from verified inventory</span>';

      return '<article class="item-card">' +
        '<div class="item-photo">' + photo + '</div>' +
        '<div class="item-body">' +
          '<div class="item-top"><div><h3>' + escapeHtml(item.title) + '</h3><div class="item-id">' + escapeHtml(item.id) + '</div></div>' +
          '<div class="item-price">$' + Number(item.price).toFixed(2) + '</div></div>' +
          '<div class="item-meta">' +
            '<span class="tag">' + escapeHtml(item.condition) + '</span>' +
            '<span class="tag">' + escapeHtml(item.delivery) + '</span>' +
          '</div>' +
          '<p>' + escapeHtml(item.description) + '</p>' +
          '<a class="btn primary" href="mailto:macetopiallc@gmail.com?subject=' + subject + '">Ask about this item</a>' +
        '</div></article>';
    }).join("");
  } catch (error) {
    status.textContent = "Inventory is temporarily unavailable. Please email macetopiallc@gmail.com if you are looking for an item.";
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

loadInventory();
