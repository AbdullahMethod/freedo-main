import { useState } from 'react';
import { X } from 'lucide-react';

interface DNSModalProps {
  subdomain: string;
  onClose: () => void;
  onSave: (dns: {
    a_record: string;
    cname: string;
    txt: string;
    server_ip: string;
  }) => void;
}

export default function DNSModal({ subdomain, onClose, onSave }: DNSModalProps) {
  const [aRecord, setARecord] = useState('');
  const [cname, setCname] = useState('');
  const [txt, setTxt] = useState('');
  const [serverIp, setServerIp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      a_record: aRecord,
      cname: cname,
      txt: txt,
      server_ip: serverIp
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Set up DNS</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Configure DNS records for <span className="font-semibold">{subdomain}.abdullah.nyc.mn</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              A Record
            </label>
            <input
              type="text"
              value={aRecord}
              onChange={(e) => setARecord(e.target.value)}
              placeholder="192.0.2.1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CNAME
            </label>
            <input
              type="text"
              value={cname}
              onChange={(e) => setCname(e.target.value)}
              placeholder="example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              TXT Record
            </label>
            <input
              type="text"
              value={txt}
              onChange={(e) => setTxt(e.target.value)}
              placeholder="v=spf1 include:_spf.example.com ~all"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Server IP
            </label>
            <input
              type="text"
              value={serverIp}
              onChange={(e) => setServerIp(e.target.value)}
              placeholder="192.0.2.1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Save DNS Records
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}