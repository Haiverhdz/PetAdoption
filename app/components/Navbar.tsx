export default function Navbar() {
    return (
      <nav className="bg-blue-500 text-white p-4 flex justify-between">
        <div className="font-bold">AdoptaPet</div>
        <ul className="flex gap-4">
          <li><a href="/">Inicio</a></li>
          <li><a href="/pets">Mascotas</a></li>
          <li><a href="/contact">Contacto</a></li>
        </ul>
      </nav>
    );
  }
  