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
