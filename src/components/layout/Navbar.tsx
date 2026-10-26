import { useState } from 'react';
import { navLinks, profile } from '../../data/profile';
import { cx } from '../../lib/cx';
import { ScrollTrigger, useGSAP } from '../../lib/gsap';
// import { Button } from '../ui/Button'; // used by the Contact buttons below

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Solid background once the page scrolls past 40px, all the way to the bottom.
  // Checks the scroll position directly: a start/end range would turn "inactive"
  // when the scroll reaches its end at the very bottom of the page.
  useGSAP(() => {
    const update = (self: ScrollTrigger) => setScrolled(self.scroll() > 40);
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: update, // React skips the re-render when the value doesn't change
      onRefresh: update, // correct state on load/resize, even if already scrolled
    });
  });

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled || menuOpen ? 'border-b-2 border-ink bg-white/90 backdrop-blur' : 'bg-transparent',
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-display font-extrabold">
          <span className="grid h-8 w-8 place-items-center rounded-md border-2 border-ink bg-sun text-xs shadow-pop-sm">
            {profile.initials}
          </span>
          {profile.firstName}
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-semibold hover:text-coral-dark">
              {link.label}
            </a>
          ))}
          {/* Disabled together with the Contact section in App.tsx.
          <Button href="#contact" variant="coral" className="px-4 py-1.5">
            Contact me
          </Button> */}
        </div>

        <button
          type="button"
          className="rounded-md border-2 border-ink bg-white px-3 py-1 text-sm font-bold md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="container flex flex-col gap-3 pb-4 md:hidden">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu} className="font-semibold">
              {link.label}
            </a>
          ))}
          {/* Disabled together with the Contact section in App.tsx.
          <Button href="#contact" variant="coral" onClick={closeMenu} className="self-start">
            Contact me
          </Button> */}
        </div>
      )}
    </nav>
  );
}
