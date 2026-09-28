export const CODE_CHARSET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

export function randCode(len = 5) {
  let s = '';
  for (let i = 0; i < len; i++) {
    s += CODE_CHARSET[Math.floor(Math.random() * CODE_CHARSET.length)];
  }
  return s;
}

export function isValidRoomCode(code) {
  if (typeof code !== 'string' || code.length !== 5) return false;
  return new RegExp(`^[${CODE_CHARSET}]{5}$`).test(code);
}

export function escapeHtml(str) {
  return (str || '').replace(/[&<>"']/g, function (m) {
    switch (m) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return m;
    }
  });
}

export const URL_REGEX = /\bhttps?:\/\/[^\s<>()"']+[^\s<>()"'.,?!:;]/gi;

export function linkify(text) {
  const escaped = escapeHtml(text);
  return escaped.replace(URL_REGEX, function (url) {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });
}

export function parseRoomCode(code) {
  code = (code || '').trim();
  if (!code) return '';
  if (code.indexOf('?r=') !== -1) code = code.split('?r=')[1].split('&')[0];
  else if (code.indexOf('?room=') !== -1) code = code.split('?room=')[1].split('&')[0];
  else if (code.indexOf('?R=') !== -1) code = code.split('?R=')[1].split('&')[0];
  else if (code.indexOf('?ROOM=') !== -1) code = code.split('?ROOM=')[1].split('&')[0];
  return code.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
}

export function formatChatExport(msgs, code) {
  const lines = [
    `# Local Network Chat — Room ${code || 'unknown'}`,
    `# Exported: ${new Date().toISOString()}`,
    ''
  ];
  (msgs || []).forEach((m) => {
    if (m.sys) {
      lines.push(`--- ${m.text || ''} ---`);
    } else {
      lines.push(`[${m.time || ''}] ${m.from || 'anonymous'}: ${m.text || ''}`);
    }
  });
  return lines.join('\n');
}
