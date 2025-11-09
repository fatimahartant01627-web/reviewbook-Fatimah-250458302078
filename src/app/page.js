import ListBuku from "./components/ListBuku";
import Search from "./components/Search";
import Navbar from "./components/Navbar";

export default async function Home() {
  const res = await fetch(
    "https://openlibrary.org/subjects/photography.json?limit=12",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Gagal ambil data buku!");
  }

  const data = await res.json();

  return (
    <main className="relative mx-auto max-w-7xl px-6 py-10 text-pink-100">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-10 -left-10 h-48 w-48 rounded-full bg-pink-400/20 blur-3xl" />
      <div
        className="pointer-events-none absolute top-24 -right-10 h-36 w-36 rounded-full bg-purple-400/20 blur-2xl"
        style={{ animationDelay: "2s" }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="relative mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
          <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,192,203,0.3)]">
            🐾 Koleksi Buku photography
          </span>
        </h1>
        <p className="text-pink-200/80 max-w-2xl">
          Temukan kisah menggemaskan dan lucu seputar kucing kecil di malam yang
          tenang. Yuk jelajahi koleksi buku bertema kittens yang bikin hati
          hangat!
        </p>
      </section>

      {/* Search panel */}
      <section className="glass rounded-2xl p-4 sm:p-5 bg-[#1a1822]/70 backdrop-blur-md shadow-lg border border-pink-200/10">
        <Search initialBooks={data.works} />
      </section>

      {/* Recommendations */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-rose-300">
            Rekomendasi
          </h2>
        </div>
        <ListBuku books={data.works} />
      </section>
    </main>
  );
}
