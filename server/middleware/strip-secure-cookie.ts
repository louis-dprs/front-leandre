import { defineEventHandler } from 'h3';

// Middleware serveur qui intercepte les appels à setHeader pour 'set-cookie'
// et supprime l'attribut 'Secure' afin de permettre l'envoi du cookie en HTTP
// (utile pour le développement local / docker sans TLS).
export default defineEventHandler((event) => {
  const res = event.node.res as any;
  if (!res || !res.setHeader) return;

  const origSetHeader = res.setHeader.bind(res);

  res.setHeader = (name: string | number, value: any) => {
    try {
      if (typeof name === 'string' && name.toLowerCase() === 'set-cookie' && value) {
        // Normalize to array of strings
        const arr: string[] = Array.isArray(value) ? value.map(String) : [String(value)];
        // Remove the Secure attribute (case-insensitive)
        const cleaned = arr.map((s) => s.replace(/; ?secure/ig, '')).filter(Boolean);
        return origSetHeader('set-cookie', cleaned);
      }
    } catch (e) {
      // defensive: fall back to original behaviour
      return origSetHeader(name as any, value);
    }
    return origSetHeader(name as any, value);
  };
});
