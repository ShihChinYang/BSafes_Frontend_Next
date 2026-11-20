import Link from "next/link";

export const meta = {
  "slug": "how-encryption-works",
  "title": "How your privacy is protected",
  "summary": "End-to-end encryption, no OCR or AI, and keys that stay with you.",
  "category": "security",
  "text": "Twin Paper is built so that no one but you can read your pages, including Twin Paper itself. End-to-end encryption Everything you add is encrypted on your device before it’s uploaded: Twins, titles, tags, photos, videos, audio and files. The server stores only encrypted data (ciphertext). Without your key, it’s unreadable, even if someone gains access to the server. This goes further than the “encryption in transit” and “encryption at rest” most cloud services offer. With those, the provider still holds the keys and can read your data. With end-to-end encryption, the provider never has the keys. Your password is part of your key Your password unlocks your encryption key on your device and is never sent to us. That’s why we can’t reset it, and why your recovery code matters. No OCR, no AI, no training Twin Paper never transcribes your handwriting and never uses your pages to train AI. Once a machine has learned from data, it’s nearly impossible to make it forget. Keeping your Twins encrypted and image-only means that can’t happen. Search uses only the titles and tags you choose to add.",
  "order": 1
};

export default function HowEncryptionWorks() {
  return (
    <>
      <p>Twin Paper is built so that no one but you can read your pages, including Twin Paper itself.</p>

      <h2>End-to-end encryption</h2>
      <p>Everything you add is encrypted on your device before it’s uploaded: Twins, titles, tags, photos, videos, audio and files. The server stores only encrypted data (ciphertext). Without your key, it’s unreadable, even if someone gains access to the server.</p>
      <p>This goes further than the “encryption in transit” and “encryption at rest” most cloud services offer. With those, the provider still holds the keys and can read your data. With end-to-end encryption, the provider never has the keys.</p>

      <h2>Your password is part of your key</h2>
      <p>Your password unlocks your encryption key on your device and is never sent to us. That’s why we can’t reset it, and why your <Link href="/support/recover-your-account">recovery code</Link> matters.</p>

      <h2>No OCR, no AI, no training</h2>
      <p>Twin Paper never transcribes your handwriting and never uses your pages to train AI. Once a machine has learned from data, it’s nearly impossible to make it forget. Keeping your Twins encrypted and image-only means that can’t happen. Search uses only the <Link href="/support/search">titles and tags</Link> you choose to add.</p>
    </>
  );
}
