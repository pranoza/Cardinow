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

  const fullName = `${card.first_name || ''} ${card.last_name || ''}`.trim() || 'مخاطب';

  const telLines = phoneNumbers.map(p => `TEL;TYPE=${p.type}:${p.number}`);

  const vCardLines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${fullName}`,
    `N:${card.last_name || ''};${card.first_name || ''};;;`,
    card.company ? `ORG:${card.company}` : '',
    card.job_title ? `TITLE:${card.job_title}` : '',
    ...telLines,
    email ? `EMAIL;TYPE=PREF,INTERNET:${email}` : '',
    website ? `URL:${website}` : '',
    card.address ? `ADR;TYPE=WORK:;;${card.address};;;;` : '',
    card.bio ? `NOTE:${card.bio.replace(/\r?\n/g, ' ')}` : '',
    'END:VCARD'
  ].filter(Boolean);

  return vCardLines.join('\r\n');
}

export async function saveCardToContacts(card: Card): Promise<boolean> {
  if (!card) return false;
  const vCardString = createVCardString(card);
  const fullName = `${card.first_name || 'contact'}_${card.last_name || 'card'}`.replace(/\s+/g, '_');
  const fileName = `${fullName}.vcf`;

  // 1. Web Share API with File object (Supported on modern iOS Safari & Android Chrome)
  if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare) {
    try {
      const file = new File([vCardString], fileName, { type: 'text/vcard' });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${card.first_name} ${card.last_name}`,
          text: `ذخیره مخاطب ${card.first_name} ${card.last_name}`
        });
        return true;
      }
    } catch (e) {
      // User cancelled share or share failed, fallback
      console.log('Web Share API for vCard failed/cancelled, falling back...', e);
    }
  }

  // 2. Direct data URI navigation for Mobile Safari & Mobile Browsers
  const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    try {
      const encoded = encodeURIComponent(vCardString);
      const dataUri = `data:text/vcard;charset=utf-8,${encoded}`;
      window.location.href = dataUri;
      return true;
    } catch (e) {
      console.warn("data URI navigation failed, fallback to blob download:", e);
    }
  }

  // 3. Fallback file download for Desktop or unsupported browsers
  try {
    const blob = new Blob([vCardString], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return true;
  } catch (err) {
    console.error("Failed to save contact:", err);
    return false;
  }
}
