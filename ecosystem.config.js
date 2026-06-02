module.exports = {
  apps: [
    {
      name: "kn-portfolio",
      script: "node_modules/serve/build/main.js",
      args: "-s . -l 9000 --no-clipboard",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      watch: false,
      max_memory_restart: "200M",
      env: {
        NODE_ENV: "production",
        PORT: 9000
      },
      out_file: "./logs/out.log",
      error_file: "./logs/err.log",
      merge_logs: true,
      time: true
    }
  ]
};
