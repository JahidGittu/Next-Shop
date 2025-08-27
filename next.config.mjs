// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,   
//   output: 'export',        
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,   
  // output: 'export',  <-- Removed to allow SSR and middleware
};

export default nextConfig;
