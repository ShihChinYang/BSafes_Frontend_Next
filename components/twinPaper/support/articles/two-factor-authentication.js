export const meta = {
  "slug": "two-factor-authentication",
  "title": "Two-factor authentication (2FA)",
  "summary": "Add an authenticator code to unlocking, and recover if you lose your phone.",
  "category": "security",
  "text": "Two-factor authentication adds a second step when you unlock: a code from an authenticator app such as Google Authenticator, Microsoft Authenticator or Authy. Have the app ready before you start. Turn on 2FA Unlock your workspace and open the menu. Select 2FA . Enter your password. Your device uses it to confirm you own the account. Follow the on-screen steps to add Twin Paper to your authenticator app. Save your 2FA recovery phrase. If you lose your phone or authenticator app, the recovery phrase is the only way past the 2FA step. Unlock with 2FA After you enter your nickname and password, enter the current code from your authenticator app. Lost your authenticator? On the 2FA step, select Recover . Paste your 2FA recovery phrase, or select the attachment icon to open your recovery file. Once you’re in, turn 2FA off and set it up again. You’ll get a new recovery phrase. Turn off 2FA Open the menu, select 2FA , enter your password, select Disable , then type Yes to confirm.",
  "order": 2
};

export default function TwoFactorAuthentication() {
  return (
    <>
      <p>Two-factor authentication adds a second step when you unlock: a code from an authenticator app such as Google Authenticator, Microsoft Authenticator or Authy. Have the app ready before you start.</p>

      <h2>Turn on 2FA</h2>
      <ol>
        <li>Unlock your workspace and open the menu.</li>
        <li>Select <strong>2FA</strong>.</li>
        <li>Enter your password. Your device uses it to confirm you own the account.</li>
        <li>Follow the on-screen steps to add Twin Paper to your authenticator app.</li>
      </ol>
      <div className="callout warn">
        <strong>Save your 2FA recovery phrase.</strong>
        If you lose your phone or authenticator app, the recovery phrase is the only way past the 2FA step.
      </div>

      <h2>Unlock with 2FA</h2>
      <p>After you enter your nickname and password, enter the current code from your authenticator app.</p>

      <h2>Lost your authenticator?</h2>
      <ol>
        <li>On the 2FA step, select <strong>Recover</strong>.</li>
        <li>Paste your 2FA recovery phrase, or select the attachment icon to open your recovery file.</li>
        <li>Once you’re in, turn 2FA off and set it up again. You’ll get a new recovery phrase.</li>
      </ol>

      <h2>Turn off 2FA</h2>
      <p>Open the menu, select <strong>2FA</strong>, enter your password, select <strong>Disable</strong>, then type <strong>Yes</strong> to confirm.</p>
    </>
  );
}
