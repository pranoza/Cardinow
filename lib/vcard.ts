import { Card } from './directus';

export function createVCardString(card: Card): string {
  if (!card) return '';
  const { phone, mobile, extra_phones, whatsapp, email, website } = card.social_links || {};
  
  const phoneNumbers: { number: string; type: string }[] = [];

  // 1. Mobile Phone Number
  if (mobile && typeof mobile === 'string' && mobile.trim()) {
    phoneNumbers.push({ number: mobile.trim(), type: 'CELL,VOICE' });
  }

  // 2. Fixed/Landline Work Phone Number
  if (phone && typeof phone === 'string' && phone.trim()) {
    const cleanPhone = phone.trim();
    if (!phoneNumbers.some(p => p.number === cleanPhone)) {
      phoneNumbers.push({ number: cleanPhone, type: 'WORK,VOICE' });
    }
  }

  // 3. WhatsApp Phone Number (if distinct and numeric)
  if (whatsapp && typeof whatsapp === 'string' && whatsapp.trim()) {
    const cleanWa = whatsapp.trim();
    if (/^[\d+\s()-]+$/.test(cleanWa) && !phoneNumbers.some(p => p.number === cleanWa)) {
      phoneNumbers.push({ number: cleanWa, type: 'CELL,MSG' });
    }
  }

  // 4. Additional Extra Phone Numbers
  if (extra_phones) {
    let list: string[] = [];
    if (Array.isArray(extra_phones)) {
      list = extra_phones;
    } else if (typeof extra_phones === 'string') {
      list = (extra_phones as string).split(/[\n,;]+/);
    }
    list.forEach((p) => {
      const clean = p ? String(p).trim() : '';
      if (clean && !phoneNumbers.some(item => item.number === clean)) {
        phoneNumbers.push({ number: clean, type: 'OTHER,VOICE' });
      }
    });
  }

  const firstName = card.first_name || '';
  const lastName = card.last_name || '';
  const fullName = `${firstName} ${lastName}`.trim() || 'مخاطب کاردینو';

  const telLines = phoneNumbers.map(p => `TEL;TYPE=${p.type}:${p.number}`);

  const vCardLines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN;CHARSET=UTF-8:${fullName}`,
    `N;CHARSET=UTF-8:${lastName};${firstName};;;`,
    card.company ? `ORG;CHARSET=UTF-8:${card.company}` : '',
    card.job_title ? `TITLE;CHARSET=UTF-8:${card.job_title}` : '',
    ...telLines,
    email ? `EMAIL;TYPE=PREF,INTERNET:${email}` : '',
    website ? `URL:${website}` : '',
    card.address ? `ADR;TYPE=WORK;CHARSET=UTF-8:;;${card.address};;;;` : '',
    card.bio ? `NOTE;CHARSET=UTF-8:${card.bio.replace(/\r?\n/g, ' ')}` : '',
    'END:VCARD'
  ].filter(Boolean);

  return vCardLines.join('\r\n');
}

export async function saveCardToContacts(card: Card): Promise<boolean> {
  if (!card) return false;
  const vCardString = createVCardString(card);
  const fullName = `${card.first_name || 'contact'}_${card.last_name || 'card'}`.replace(/\s+/g, '_');
  const fileName = `${fullName}.vcf`;

  if (typeof navigator === 'undefined' || typeof window === 'undefined') return false;

  const userAgent = navigator.userAgent || '';
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(userAgent);

  // 1. SPECIFIC HANDLING FOR iOS (Safari / Chrome on iPhone & iPad)
  if (isIOS) {
    try {
      // On iOS Safari, opening a Blob URL with text/vcard WITHOUT setting the 'download' attribute
      // instructs Safari to open the native iOS Contacts import modal directly.
      const blob = new Blob([vCardString], { type: 'text/vcard;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      // CRITICAL: Do NOT set link.download attribute on iOS!
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      return true;
    } catch (e) {
      console.warn("iOS Blob URL vCard navigation failed, attempting base64 data URI fallback:", e);
      try {
        const utf8Bytes = new TextEncoder().encode(vCardString);
        let binary = '';
        for (let i = 0; i < utf8Bytes.length; i++) {
          binary += String.fromCharCode(utf8Bytes[i]);
        }
        const base64VCard = btoa(binary);
        const dataUri = `data:text/x-vcard;charset=utf-8;base64,${base64VCard}`;
        window.location.href = dataUri;
        return true;
      } catch (err) {
        console.error("iOS base64 fallback failed:", err);
      }
    }
  }

  // 2. SPECIFIC HANDLING FOR ANDROID (Chrome / Web Share API)
  if (isAndroid) {
    if (navigator.share && navigator.canShare) {
      try {
        const file = new File([vCardString], fileName, { type: 'text/vcard' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `${card.first_name || ''} ${card.last_name || ''}`.trim(),
            text: `ذخیره مخاطب`
          });
          return true;
        }
      } catch (e) {
        console.log("Android Web Share skipped/failed, falling back to download...", e);
      }
    }
  }

  // 3. DESKTOP & FALLBACK DOWNLOAD FOR OTHER BROWSERS
  try {
    const blob = new Blob([vCardString], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    return true;
  } catch (err) {
    console.error("Failed to save contact:", err);
    return false;
  }
}
