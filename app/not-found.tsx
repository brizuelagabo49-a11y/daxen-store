import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center px-5 text-center">
      <div>
        <p className="chrome-text animate-shine font-display text-[30vw] font-extrabold leading-none md:text-[14rem]">404</p>
        <p className="text-mute">Esta página no existe.</p>
        <Link href="/" className="btn-light mt-8">Volver a DAXEN</Link>
      </div>
    </main>
  );
}
