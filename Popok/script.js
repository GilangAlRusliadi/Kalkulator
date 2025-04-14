function evaluateInput(value) {
    // Jika input kosong atau tidak valid, kembalikan 0
    if (!value) return 0;
    
    // Tambahkan 0 jika terakhir adalah operator
    if (/[+\-*]$/.test(value)) {
        value += "0";
    }
    
    try {
        return eval(value); // Mengevaluasi ekspresi matematika sederhana
    } catch {
        return 0; // Jika terjadi error, kembalikan 0
    }
}

function hitungKeuntungan() {
    let hargaBall = evaluateInput(document.getElementById("hargaBall").value);
    let jumlahPcs = evaluateInput(document.getElementById("jumlahPcs").value) || 60;
    let hargaJual = evaluateInput(document.getElementById("hargaJual").value) || 2000;

    let hargaBeliPcs = hargaBall / jumlahPcs;
    let keuntunganPerBall = (hargaJual - hargaBeliPcs) * jumlahPcs;

    document.getElementById("hargaBeliPcs").innerText = hargaBeliPcs.toFixed(2);
    document.getElementById("keuntungan").innerText = keuntunganPerBall.toFixed(2);
}

let lastVideoUrl = null; // Variabel global untuk menyimpan URL terakhir

async function LoadVideo() {
  try {
    const response = await fetch("https://gilbertclaus.pythonanywhere.com/list-videos");
    const data = await response.json();

    // Ambil semua entry yang cocok
    const entries = Object.entries(data).filter(([name, link]) =>
      name.includes("iStripper") && link.includes("Dil")
    );

    if (entries.length === 0) {
      alert("Video iStripper tidak ditemukan.");
      return;
    }

    // Jika hanya ada satu dan itu sama dengan sebelumnya, tampilkan pesan
    if (entries.length === 1 && entries[0][1] === lastVideoUrl) {
      alert("Hanya ada satu video dan sudah diputar.");
      return;
    }

    // Filter agar tidak memilih yang sama dengan sebelumnya
    const filteredEntries = entries.filter(([_, link]) => link !== lastVideoUrl);

    // Pilih satu secara acak dari hasil yang sudah difilter
    const randomIndex = Math.floor(Math.random() * filteredEntries.length);
    const [, videoUrl] = filteredEntries[randomIndex];

    // Update lastVideoUrl
    lastVideoUrl = videoUrl;

    const video = document.getElementById("bg-video");
    const source = video.querySelector("source");

    source.src = videoUrl;
    video.load();
    video.play();

    console.log("Video loaded:", videoUrl);
  } catch (error) {
    console.error("Gagal load video:", error);
    alert("Terjadi kesalahan saat mengambil data video.");
  }
}
