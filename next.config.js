// Which site does this build serve? Set NEXT_PUBLIC_isTwinPaper=true to build/serve
// twinpaper.com; leave it unset (or =false) to build/serve bsafes.com.
const isTwinPaper =
  !!process.env.NEXT_PUBLIC_isTwinPaper && process.env.NEXT_PUBLIC_isTwinPaper !== 'false';

// The BSafes routes (still compiled in every build) read these NEXT_PUBLIC_* vars
// unguarded. A BSafes build is expected to pass them itself, exactly as before.
// A twinPaper build shouldn't have to know about them, so default them here so
// the shared pages/ tree still compiles.
if (isTwinPaper) {
  process.env.NEXT_PUBLIC_platform = process.env.NEXT_PUBLIC_platform || 'Web';
  process.env.NEXT_PUBLIC_app = process.env.NEXT_PUBLIC_app || 'bsafes';
  process.env.NEXT_PUBLIC_functions = process.env.NEXT_PUBLIC_functions || 'default';
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // twinPaper's static host resolves /create/ -> /create/index.html.
  trailingSlash: isTwinPaper,
  images: {
    unoptimized: true
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        path: false,
        fs: false,
        Buffer: false,
        process: false,
      }
    }
    
    config.experiments = {
      asyncWebAssembly: true,
      layers: true
    };

    config.cache = {
      type: 'memory',
      maxGenerations: 5
    }

    config.module.rules.push({
      test: /\.wasm$/,
      loader: "base64-loader",
      type: "javascript/auto",
    });

    config.module.noParse = /\.wasm$/;

    config.module.rules.forEach(rule => {
      (rule.oneOf || []).forEach(oneOf => {
        if (oneOf.loader && oneOf.loader.indexOf("file-loader") >= 0) {
          oneOf.exclude.push(/\.wasm$/);
        }
      });
    });
    
    return config;
  },
  allowedDevOrigins: ['127.0.0.1']
}

module.exports = nextConfig

