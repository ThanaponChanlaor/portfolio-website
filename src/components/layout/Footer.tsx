import { profile } from '../../data/profile';

export function Footer() {
  return (
    <footer className="bg-ink py-6 text-center text-sm font-semibold text-white">
      © {new Date().getFullYear()} {profile.firstName} {profile.lastName} 
      {/* · React · TypeScript · Go · PostgreSQL */}
    </footer>
  );
}
