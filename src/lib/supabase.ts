import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Subdomain {
  id: string;
  subdomain: string;
  status: 'available' | 'claimed';
  claimed_at?: string;
  dns_a_record?: string;
  dns_cname?: string;
  dns_txt?: string;
  dns_server_ip?: string;
  created_at: string;
  updated_at: string;
}

export async function checkSubdomain(subdomain: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('subdomains')
    .select('id, status')
    .eq('subdomain', subdomain.toLowerCase())
    .maybeSingle();

  if (error) {
    console.error('Error checking subdomain:', error);
    return true;
  }

  return !data || data.status === 'available';
}

export async function claimSubdomain(subdomain: string): Promise<{ success: boolean; error?: string }> {
  const isAvailable = await checkSubdomain(subdomain);

  if (!isAvailable) {
    return { success: false, error: 'Subdomain is already taken' };
  }

  const { error } = await supabase
    .from('subdomains')
    .upsert({
      subdomain: subdomain.toLowerCase(),
      status: 'claimed',
      claimed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'subdomain'
    });

  if (error) {
    console.error('Error claiming subdomain:', error);
    return { success: false, error: 'Failed to claim subdomain' };
  }

  return { success: true };
}

export async function updateDNS(
  subdomain: string,
  dns: {
    a_record?: string;
    cname?: string;
    txt?: string;
    server_ip?: string;
  }
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('subdomains')
    .update({
      dns_a_record: dns.a_record,
      dns_cname: dns.cname,
      dns_txt: dns.txt,
      dns_server_ip: dns.server_ip,
      updated_at: new Date().toISOString()
    })
    .eq('subdomain', subdomain.toLowerCase());

  if (error) {
    console.error('Error updating DNS:', error);
    return { success: false, error: 'Failed to update DNS records' };
  }

  return { success: true };
}