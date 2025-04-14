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


async function LoadVideo() {
    try {
      const response = await fetch("https://gilbertclaus.pythonanywhere.com/list-videos");
      const data = await response.json();
  
      // Cari entri yang mengandung "iStripper" di key name
      const entry = Object.entries(data).find(([name, link]) =>
        name.includes("iStripper")
      );
  
      if (!entry) {
        alert("Video iStripper tidak ditemukan.");
        return;
      }
  
      const [, videoUrl] = entry;
  
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