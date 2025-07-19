// spark-core.js

const SparkMemory = {
  core: {},
  log: [],

  remember(key, value) {
    this.core[key] = value;
    this.log.push({ type: 'memory', key, value, timestamp: Date.now() });
  },

  recall(key) {
    return this.core[key] || null;
  },

  history() {
    return this.log;
  }
};

window.SparkCore = SparkMemory;
