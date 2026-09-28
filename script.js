// =========================
// 1. AMBIL ELEMENT HTML
// =========================

const tombolBuka = document.getElementById("tombolBuka");

const cover = document.getElementById("cover");

const pesan = document.getElementById("pesan");

const musik = document.getElementById("musik");

const tombolMusik = document.getElementById("tombolMusik");

const hatiJatuh = document.getElementById("hatiJatuh");

const semuaStory = document.querySelectorAll(".story");

const pesanAkhir = document.querySelector(".pesanAkhir");


// =========================
// 2. VARIABEL
// =========================

let hatiAktif = false;

let storySekarang = 0;


// =========================
// 3. MEMBUAT HATI
// =========================

function buatHati() {

    const hati = document.createElement("div");

    hati.classList.add("hatiJatuhItem");

    hati.textContent = "♡";

    hati.style.left =
        Math.random() * 100 + "%";

    hati.style.fontSize =
        (12 + Math.random() * 18) + "px";

    hati.style.animationDuration =
        (4 + Math.random() * 4) + "s";

    hatiJatuh.appendChild(hati);


    setTimeout(function () {

        hati.remove();

    }, 8000);
}


// =========================
// 4. TOMBOL BUKA
// =========================

tombolBuka.addEventListener(
    "click",
    function () {

        // Hilangkan cover
        cover.style.display = "none";


        // Tampilkan isi
        pesan.style.display = "block";


        // Kembali ke paling atas
        window.scrollTo(0, 0);


        // =========================
        // MUSIK
        // =========================

        musik.currentTime = 0;

        musik.volume = 0;


        musik.play().then(function () {

            tombolMusik.style.display = "block";

            tombolMusik.textContent =
                "🎵 Musik";


            // Fade in volume

            let volume = 0;


            const fadeIn =
                setInterval(function () {

                    volume += 0.05;


                    if (volume >= 1) {

                        volume = 1;

                        clearInterval(fadeIn);
                    }


                    musik.volume = volume;

                }, 150);

        }).catch(function (error) {

            console.log(
                "Musik gagal diputar:",
                error
            );

            tombolMusik.style.display =
                "block";
        });


        // =========================
        // AKTIFKAN HATI
        // =========================

        hatiAktif = true;


        // Hati awal

        for (
            let i = 0;
            i < 25;
            i++
        ) {

            setTimeout(
                function () {

                    buatHati();

                },
                i * 150
            );
        }


        // =========================
        // TAMPILKAN FOTO PERTAMA
        // =========================

        setTimeout(
            function () {

                tampilkanStory();

            },
            300
        );
    }
);


// =========================
// 5. PLAY / PAUSE MUSIK
// =========================

tombolMusik.addEventListener(
    "click",
    function () {

        if (musik.paused) {

            musik.play();

            tombolMusik.textContent =
                "🎵 Musik";

        } else {

            musik.pause();

            tombolMusik.textContent =
                "▶ Musik";
        }
    }
);


// =========================
// 6. STORYTELLING 1 PER 1
// =========================

function tampilkanStory() {

    // Kalau semua foto sudah tampil
    if (
        storySekarang >=
        semuaStory.length
    ) {

        // Tampilkan pesan terakhir

        if (pesanAkhir) {

            pesanAkhir.classList.add(
                "tampil"
            );
        }

        return;
    }


    // Ambil story berikutnya

    const story =
        semuaStory[storySekarang];


    // Tampilkan

    story.classList.add("tampil");


    // Pindah ke story berikutnya

    storySekarang++;
}


// =========================
// 7. DETEKSI SCROLL
// =========================

window.addEventListener("scroll", function () {

    // Kalau masih ada foto yang belum ditampilkan
    if (storySekarang < semuaStory.length) {

        const storyBerikutnya =
            semuaStory[storySekarang];

        const posisi =
            storyBerikutnya.getBoundingClientRect();

        if (
            posisi.top <
            window.innerHeight * 0.75
        ) {
            tampilkanStory();
        }
    }

    // Kalau sudah semua foto,
    // cek apakah pesan terakhir sudah dekat
    if (storySekarang >= semuaStory.length) {

        const posisiAkhir =
            pesanAkhir.getBoundingClientRect();

        if (
            posisiAkhir.top <
            window.innerHeight * 0.85
        ) {
            pesanAkhir.classList.add("tampil");
        }
    }

});


// =========================
// 8. HATI JATUH TERUS
// =========================

setInterval(
    function () {

        if (hatiAktif) {

            buatHati();
        }

    },
    1800
);