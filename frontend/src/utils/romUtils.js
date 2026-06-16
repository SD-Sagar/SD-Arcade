export const detectPlatform = (filename) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'nes': return 'NES';
    case 'sfc':
    case 'smc': return 'SNES';
    case 'gba': return 'GBA';
    // Future platforms
    case 'bin':
    case 'iso': return 'PS1';
    case 'gen':
    case 'md': return 'Genesis';
    default: return 'Unknown';
  }
};

export const generateRomHash = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};
