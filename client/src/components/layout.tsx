import { Link, useLocation } from "wouter";
import { CartDrawer } from "./cart-drawer";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { UserCircle, LogOut } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { user, logout } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2">
              <span className="text-2xl font-serif font-bold text-primary tracking-tight">Sweetora</span>
            </a>
          </Link>

          <nav className="flex items-center gap-4">
            {user?.role === 'admin' && (
              <Link href="/admin">
                <a className={`text-sm font-medium transition-colors hover:text-primary ${location === '/admin' ? 'text-primary' : 'text-muted-foreground'}`}>
                  Dashboard
                </a>
              </Link>
            )}
            
            <CartDrawer />

            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium hidden md:inline-block">Hi, {user.username}</span>
                <Button variant="ghost" size="icon" onClick={() => logout()} title="Logout">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Link href="/auth">
                <Button variant="ghost" size="sm" className="gap-2">
                  <UserCircle className="h-5 w-5" />
                  Login
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t bg-card mt-auto">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground text-sm">
          <p className="font-serif text-lg text-primary mb-2">Sweetora</p>
          <p>© 2024 Sweetora Authentic Sweets. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
