/*
  # Create Subdomains Management System

  1. New Tables
    - `subdomains`
      - `id` (uuid, primary key)
      - `subdomain` (text, unique) - The subdomain name without the main domain
      - `status` (text) - Status: 'available' or 'claimed'
      - `claimed_at` (timestamptz) - When the subdomain was claimed
      - `dns_a_record` (text) - A record value
      - `dns_cname` (text) - CNAME record value
      - `dns_txt` (text) - TXT record value
      - `dns_server_ip` (text) - Server IP address
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `subdomains` table
    - Add policies for public read access
    - Add policies for authenticated insert/update operations
*/

CREATE TABLE IF NOT EXISTS subdomains (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subdomain text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'available',
  claimed_at timestamptz,
  dns_a_record text,
  dns_cname text,
  dns_txt text,
  dns_server_ip text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE subdomains ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read subdomains"
  ON subdomains FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert subdomains"
  ON subdomains FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update subdomains"
  ON subdomains FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_subdomains_subdomain ON subdomains(subdomain);
CREATE INDEX IF NOT EXISTS idx_subdomains_status ON subdomains(status);