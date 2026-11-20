import Link from "next/link";

export const meta = {
  "slug": "unlock-your-account",
  "title": "Unlock your account",
  "summary": "Open your workspace on any device with your nickname and password.",
  "category": "get-started",
  "text": "You can open your workspace on any device with a browser. Go to the Twin Paper home page and select Unlock . Enter your nickname and password. Select Unlock . If you’ve turned on two-factor authentication , enter the code from your authenticator app. Your password never leaves your device. It’s used on the device to unlock your encryption key. Lock when you’re done Select Lock at the top right to close your workspace on this device. This matters most on shared or public computers. Forgot your nickname or password? See Recover your account .",
  "order": 3
};

export default function UnlockYourAccount() {
  return (
    <>
      <p>You can open your workspace on any device with a browser.</p>
      <ol>
        <li>Go to the Twin Paper home page and select <strong>Unlock</strong>.</li>
        <li>Enter your nickname and password.</li>
        <li>Select <strong>Unlock</strong>. If you’ve turned on <Link href="/support/two-factor-authentication">two-factor authentication</Link>, enter the code from your authenticator app.</li>
      </ol>
      <p>Your password never leaves your device. It’s used on the device to unlock your encryption key.</p>

      <h2>Lock when you’re done</h2>
      <p>Select <strong>Lock</strong> at the top right to close your workspace on this device. This matters most on shared or public computers.</p>

      <p>Forgot your nickname or password? See <Link href="/support/recover-your-account">Recover your account</Link>.</p>
    </>
  );
}
