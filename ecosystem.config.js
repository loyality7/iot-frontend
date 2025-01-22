module.exports = {
  apps: [{
    name: 'frontend',
    script: 'npm',
    args: 'run preview',
    env: {
      NODE_ENV: 'production',
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
  }]
} 