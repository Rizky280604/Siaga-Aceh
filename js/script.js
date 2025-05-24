document.addEventListener("DOMContentLoaded", function () {
  // === MODAL ===
  const modal = document.getElementById("notification-modal");
  const closeModal = document.getElementById("close-modal");

  document.querySelectorAll("button").forEach(btn => {
    if (btn.textContent.includes("Aktifkan Notifikasi")) {
      btn.addEventListener("click", () => {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
      });
    }
  });

  closeModal?.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  });

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  });

  // === ALERT BANNER (optional, jika Anda pakai) ===
  document.getElementById("close-alert")?.addEventListener("click", () => {
    document.getElementById("alert-banner").classList.add("hidden");
  });

  // === PANDUAN KESELAMATAN TAB (optional jika ada) ===
  document.querySelectorAll(".safety-tab")?.forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".safety-tab").forEach(b => b.classList.remove("tab-active", "bg-red-600", "text-white"));
      btn.classList.add("tab-active", "bg-red-600", "text-white");
      const tab = btn.dataset.tab;
      document.querySelectorAll(".safety-content").forEach(c => c.classList.add("hidden"));
      document.getElementById(`${tab}-content`)?.classList.remove("hidden");
    });
  });

  // === PETA ===
  const mapEl = document.getElementById("map");
  const infoPanel = document.getElementById("disaster-info");

  if (mapEl && infoPanel) {
    const map = L.map("map").setView([5.55, 95.32], 9);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap"
    }).addTo(map);

    fetch("data-bencana.json")
      .then(res => res.json())
      .then(data => {
        data.forEach(d => {
          const marker = L.marker(d.koordinat).addTo(map);
          const label = `
            <strong>${d.jenis.toUpperCase()}</strong><br>
            ${d.lokasi}<br>
            ${d.status} - ${d.waktu}
          `;
          marker.bindPopup(label);
          marker.on("click", () => {
            infoPanel.innerHTML = label;
          });
        });
      })
      .catch(err => {
        infoPanel.innerHTML = "<p class='text-red-500'>Gagal memuat data bencana.</p>";
      });
  }
});
