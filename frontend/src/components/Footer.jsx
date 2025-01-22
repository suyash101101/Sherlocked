import { useLocation } from 'react-router-dom';

function Footer() {
  const isLevel = useLocation().pathname === '/level';

  if (isLevel) return null;
  
  return (
    <footer className="bg-stone-900/90 border-t border-amber-900/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-amber-200/60 font-serif text-sm">
            © 2025 Sherlocked: The Cipher Hunt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

