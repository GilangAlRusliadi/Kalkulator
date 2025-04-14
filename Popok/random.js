document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".theme-toggle");
    const body = document.body;
  
    let lastBackground = null;
  
    button.addEventListener("click", async () => {
      try {
        const response = await fetch("https://gilbertclaus.pythonanywhere.com/list-pictures");
  
        if (!response.ok) {
          console.error("Gagal fetch data:", response.statusText);
          return;
        }
  
        const data = await response.json();
        const entries = Object.entries(data);
  
        const validImages = entries.filter(([title, link]) => {
          const parts = link.split("/");
          return link.includes("vgi");
        });
  
        const under2MBImages = [];
        for (const [title, link] of validImages) {
          try {
            const headResponse = await fetch(link, { method: "HEAD" });
            const size = parseInt(headResponse.headers.get("Content-Length"), 10);
            if (!isNaN(size) && size < 2 * 1024 * 1024) {
              under2MBImages.push([title, link]);
            }
          } catch (e) {
            console.warn("Gagal mengambil ukuran gambar:", link, e);
          }
        }
  
        if (under2MBImages.length === 0) {
          console.warn("Tidak ada gambar valid di bawah 2MB.");
          return;
        }
  
        let title, link, attempts = 0;
        do {
          [title, link] = under2MBImages[Math.floor(Math.random() * under2MBImages.length)];
          attempts++;
        } while (link === lastBackground && attempts < 10);
  
        lastBackground = link;
        console.log("Mengubah background ke:", link);
  
        // Transisi: fade out → ubah background → fade in
        body.classList.add("fade-out");
  
        setTimeout(() => {
          body.style.background = `url("${link}") center center / cover no-repeat fixed`;
          body.classList.remove("fade-out");
          body.classList.add("fade-in");
  
          // Hapus fade-in agar bisa diulang di klik berikutnya
          setTimeout(() => {
            body.classList.remove("fade-in");
          }, 500);
        }, 500);
  
      } catch (err) {
        console.error("Gagal memuat gambar:", err);
      }
    });
  });
  