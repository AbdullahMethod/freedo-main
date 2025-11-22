import { Instagram, Send, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full py-8 px-4 mt-16 border-t border-gray-200">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-600 font-medium">Connect with Abdullah Coded</p>
          <div className="flex gap-6">
            <a
              href="https://t.me/ABDULLAHCODED"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
            >
              <Send className="w-5 h-5" />
              <span>Telegram</span>
            </a>
            <a
              href="https://www.instagram.com/em.abdullah__/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span>Instagram</span>
            </a>
            <a
              href="https://abdullahcoded.blogspot.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
            >
              <Globe className="w-5 h-5" />
              <span>Website</span>
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            © {new Date().getFullYear()} FreeSub by Abdullah Coded. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}