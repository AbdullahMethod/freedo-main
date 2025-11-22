import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (subdomain: string) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [subdomain, setSubdomain] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subdomain.trim()) {
      onSearch(subdomain.trim().toLowerCase());
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-2">
          <input
            type="text"
            value={subdomain}
            onChange={(e) => setSubdomain(e.target.value)}
            placeholder="abdullah"
            className="flex-1 text-lg px-4 py-3 outline-none text-gray-900"
            disabled={isLoading}
          />
          <div className="text-lg text-gray-500 px-2 whitespace-nowrap">
            .abdullah.nyc.mn
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search className="w-5 h-5" />
            {isLoading ? 'Checking...' : 'Check / WHOIS'}
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-sm mt-4">
        Enter your desired subdomain name (minimum 6 characters for free)
      </p>
    </div>
  );
}