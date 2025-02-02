document.addEventListener("DOMContentLoaded", async function() {
    const folderList = document.getElementById("folder-list");

    try {
        const response = await fetch("list.php");
        const folders = await response.json();

        if (folders.length === 0) {
            folderList.innerHTML = "<p>Tidak ada folder</p>";
        } else {
            folders.forEach(folder => {
                const link = document.createElement("a");
                link.href = folder;
                link.className = "icon";
                link.target = "_self";

                const img = document.createElement("img");
                img.src = "https://cdn-icons-png.flaticon.com/256/10218/10218406.png";
                img.alt = "Folder Icon";

                const span = document.createElement("span");
                span.textContent = folder;

                link.appendChild(img);
                link.appendChild(span);
                folderList.appendChild(link);
            });
        }
    } catch (error) {
        console.error("Error fetching folder list:", error);
        folderList.innerHTML = "<p>Gagal mengambil data folder</p>";
    }
});
