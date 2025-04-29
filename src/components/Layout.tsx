
import React from 'react';
import { cn } from '@/lib/utils';

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-tibetan-maroon/10 to-tibetan-gold/5">
      <header className="py-6 px-4 border-b border-tibetan-gold/20 bg-white/80 backdrop-blur-sm">
        <div className="container flex justify-between items-center">
          <h1 className="text-3xl font-bold text-tibetan-maroon">Digital Prayer Wheel</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="/" className="text-tibetan-earth hover:text-tibetan-maroon transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-tibetan-earth hover:text-tibetan-maroon transition-colors">
                  About
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className={cn("container py-8 px-4", className)}>
        {children}
      </main>
      
      <footer className="py-6 px-4 border-t border-tibetan-gold/20 bg-white/80 backdrop-blur-sm">
        <div className="container text-center text-sm text-muted-foreground">
          <p>This digital prayer wheel is created with respect for Tibetan Buddhist traditions.</p>
          <p className="mt-2">© {new Date().getFullYear()} Digital Prayer Wheel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
