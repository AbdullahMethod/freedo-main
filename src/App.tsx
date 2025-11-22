import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ResultCard from './components/ResultCard';
import DNSModal from './components/DNSModal';
import Footer from './components/Footer';
import { checkSubdomain, claimSubdomain, updateDNS } from './lib/supabase';

function App() {
  const [searchedSubdomain, setSearchedSubdomain] = useState<string | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDNSModal, setShowDNSModal] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSearch = async (subdomain: string) => {
    if (subdomain.length < 6) {
      showNotification('error', 'Subdomain must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    try {
      const available = await checkSubdomain(subdomain);
      setSearchedSubdomain(subdomain);
      setIsAvailable(available);
    } catch (error) {
      console.error('Search error:', error);
      showNotification('error', 'Failed to check subdomain availability');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!searchedSubdomain) return;

    setIsLoading(true);
    try {
      const result = await claimSubdomain(searchedSubdomain);
      if (result.success) {
        setIsAvailable(false);
        showNotification('success', 'Subdomain registered successfully!');
      } else {
        showNotification('error', result.error || 'Failed to register subdomain');
      }
    } catch (error) {
      console.error('Registration error:', error);
      showNotification('error', 'Failed to register subdomain');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDNSSave = async (dns: {
    a_record: string;
    cname: string;
    txt: string;
    server_ip: string;
  }) => {
    if (!searchedSubdomain) return;

    try {
      const result = await updateDNS(searchedSubdomain, dns);
      if (result.success) {
        showNotification('success', 'DNS records updated successfully!');
        setShowDNSModal(false);
      } else {
        showNotification('error', result.error || 'Failed to update DNS records');
      }
    } catch (error) {
      console.error('DNS update error:', error);
      showNotification('error', 'Failed to update DNS records');
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-12">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {searchedSubdomain && (
          <ResultCard
            subdomain={searchedSubdomain}
            isAvailable={isAvailable}
            onRegister={handleRegister}
            onSetupDNS={() => setShowDNSModal(true)}
          />
        )}
      </main>

      <Footer />

      {showDNSModal && searchedSubdomain && (
        <DNSModal
          subdomain={searchedSubdomain}
          onClose={() => setShowDNSModal(false)}
          onSave={handleDNSSave}
        />
      )}

      {notification && (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
          <div
            className={`px-6 py-4 rounded-lg shadow-lg ${
              notification.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {notification.message}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
