// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'softstar.s3.amazonaws.com', // Adicionando o domínio da Amazon S3
      },
    ],
  },
};
