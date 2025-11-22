import { CheckCircle, XCircle, Settings } from 'lucide-react';

interface ResultCardProps {
  subdomain: string;
  isAvailable: boolean;
  onRegister: () => void;
  onSetupDNS: () => void;
}

export default function ResultCard({ subdomain, isAvailable, onRegister, onSetupDNS }: ResultCardProps) {
  const fullDomain = `${subdomain}.abdullah.nyc.mn`;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-8 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Search Results for: {fullDomain}
          </h2>
          {isAvailable ? (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-6 h-6" />
              <span className="font-medium">Available</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-600">
              <XCircle className="w-6 h-6" />
              <span className="font-medium">Unavailable</span>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Domain Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold text-gray-900">Free</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Status:</span>
                <span className={`font-semibold ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                  {isAvailable ? 'Available' : 'Taken'}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Technical Details</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Registrar:</span>
                <span className="font-semibold text-gray-900">FreeSub by Abdullah Coded</span>
              </div>
              {isAvailable && (
                <div className="text-gray-600">
                  Available for registration
                </div>
              )}
            </div>
          </div>
        </div>

        {isAvailable && (
          <div className="flex flex-wrap gap-4">
            <button
              onClick={onRegister}
              className="flex-1 min-w-[200px] bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Register This Domain Free
            </button>
            <button
              onClick={onSetupDNS}
              className="flex-1 min-w-[200px] bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Settings className="w-5 h-5" />
              Set up DNS
            </button>
          </div>
        )}

        {!isAvailable && (
          <div className="text-center py-4">
            <p className="text-gray-600">
              This subdomain has already been claimed. Please try another one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}