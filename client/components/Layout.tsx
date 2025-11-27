import { Link, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">
                  EC
                </span>
              </div>
              <span className="font-bold text-lg hidden sm:inline">
                Eco Engineering
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="hover:text-primary transition">
                Home
              </Link>
              <Link to="/admin" className="hover:text-primary transition">
                Admin Panel
              </Link>
            </nav>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {menuOpen && (
            <nav className="md:hidden pb-4 flex flex-col gap-3 border-t border-border pt-4">
              <Link
                to="/"
                className="block px-2 py-2 hover:bg-muted rounded transition"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/admin"
                className="block px-2 py-2 hover:bg-muted rounded transition"
                onClick={() => setMenuOpen(false)}
              >
                Admin Panel
              </Link>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Eco Engineering</h3>
              <p className="text-muted-foreground text-sm">
                Sustainable telecommunications infrastructure solutions for the
                digital future.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/"
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    Admin Panel
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-muted-foreground text-sm">
                Waliwita Junction, Kaduwela
                <br />
                011 234 5678
                <br />
                info@ecoengineering.com
              </p>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-muted-foreground text-sm">
            <p>&copy; 2024 Eco Engineering. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
