export default {
  apps: [{
    name: 'frontend',
    cwd: './',
    script: './node_modules/vite/bin/vite.js',
    args: 'preview',
    env: {
      NODE_ENV: 'production',
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
  }]
} 