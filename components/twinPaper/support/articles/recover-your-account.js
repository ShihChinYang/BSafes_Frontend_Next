export const meta = {
  "slug": "recover-your-account",
  "title": "Recover your account",
  "summary": "Use your recovery code if you forget your nickname or password.",
  "category": "get-started",
  "text": "If you forget your nickname or password, your account recovery code is the only way back in. Your device created it when you set up your account. Because your workspace is end-to-end encrypted, Twin Paper can’t recover your account without it. Recover access On the Unlock Twin Paper page, select Recover access . Paste your recovery code into the box, or select the attachment icon to open the recovery file you downloaded. Select Recover , then follow the steps to unlock your workspace. Lost the recovery code too? Without your password or the recovery code, no one can decrypt your workspace, not even Twin Paper. Keep the code somewhere safe and offline.",
  "order": 4
};

export default function RecoverYourAccount() {
  return (
    <>
      <p>If you forget your nickname or password, your account recovery code is the only way back in. Your device created it when you set up your account. Because your workspace is end-to-end encrypted, Twin Paper can’t recover your account without it.</p>

      <h2>Recover access</h2>
      <ol>
        <li>On the <strong>Unlock Twin Paper</strong> page, select <strong>Recover access</strong>.</li>
        <li>Paste your recovery code into the box, or select the attachment icon to open the recovery file you downloaded.</li>
        <li>Select <strong>Recover</strong>, then follow the steps to unlock your workspace.</li>
      </ol>

      <div className="callout warn">
        <strong>Lost the recovery code too?</strong>
        Without your password or the recovery code, no one can decrypt your workspace, not even Twin Paper. Keep the code somewhere safe and offline.
      </div>
    </>
  );
}
