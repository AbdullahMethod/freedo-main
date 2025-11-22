import { Globe } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full py-6 px-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Freedomian</h1>
            <p className="text-xs text-gray-500">by Abdullah Coded</p>
          </div>
        </div>
      </div>
    </header>
  );
}