/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'cookie',
            key: 'accessLevel',
            value: 'aluno'
          }
        ],
        destination: '/alunos/:path*'
      }
    ]
  }
}

module.exports = nextConfig
