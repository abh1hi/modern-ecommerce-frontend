// Polyfills for development environment compatibility

// Fix for crypto.getRandomValues in Node.js environments
if (typeof globalThis !== 'undefined' && !globalThis.crypto) {
  globalThis.crypto = {
    getRandomValues: function(buffer) {
      if (typeof require !== 'undefined') {
        const crypto = require('crypto')
        const bytes = crypto.randomBytes(buffer.length)
        buffer.set(bytes)
        return buffer
      } else {
        // Fallback for environments without Node.js crypto
        for (let i = 0; i < buffer.length; i++) {
          buffer[i] = Math.floor(Math.random() * 256)
        }
        return buffer
      }
    }
  }
}

// Additional global polyfills if needed
if (typeof global === 'undefined') {
  var global = globalThis
}

export {}
