function hitungKeuntungan() {
    let hargaBall = parseFloat(document.getElementById("hargaBall").value) || 0;
    let jumlahPcs = parseInt(document.getElementById("jumlahPcs").value) || 60;
    let hargaJual = parseFloat(document.getElementById("hargaJual").value) || 2000;

    let hargaBeliPcs = hargaBall / jumlahPcs;
    let keuntunganPerBall = (hargaJual - hargaBeliPcs) * jumlahPcs;

    document.getElementById("hargaBeliPcs").innerText = hargaBeliPcs.toFixed(2);
    document.getElementById("keuntungan").innerText = keuntunganPerBall.toFixed(2);
}
