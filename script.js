document.addEventListener("DOMContentLoaded", function () {
    const folderList = document.getElementById("folder-list");

    (async () => {
        try {
            folderList.innerHTML = ""; // Kosongkan konten lama

            const link = document.createElement("a");
            link.href = "Popok";
            link.className = "icon";
            link.target = "_self";

            const img = document.createElement("img");
            img.src = "https://cdn-icons-png.flaticon.com/256/10218/10218406.png";
            img.alt = "Popok";

            const span = document.createElement("span");
            span.textContent = "Popok";

            link.appendChild(img);
            link.appendChild(span);
            folderList.appendChild(link);
        } catch (error) {
            console.error("Terjadi kesalahan saat membuat folder:", error);
        }
    })();
});
