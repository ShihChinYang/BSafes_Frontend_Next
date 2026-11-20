export const meta = {
  "slug": "data-center",
  "title": "Change your data center",
  "summary": "Store your encrypted data closer to you for faster loading.",
  "category": "security",
  "text": "Your encrypted data is stored in one data center. A data center near you makes your pages load faster. Only ciphertext is stored there; your keys stay on your device. Change it Open the menu and select Data Center . Your current location is shown at the top. Choose a different location from the list. Select Switch to confirm.",
  "order": 3
};

export default function DataCenter() {
  return (
    <>
      <p>Your encrypted data is stored in one data center. A data center near you makes your pages load faster. Only ciphertext is stored there; your keys stay on your device.</p>

      <h2>Change it</h2>
      <ol>
        <li>Open the menu and select <strong>Data Center</strong>.</li>
        <li>Your current location is shown at the top. Choose a different location from the list.</li>
        <li>Select <strong>Switch</strong> to confirm.</li>
      </ol>
    </>
  );
}
