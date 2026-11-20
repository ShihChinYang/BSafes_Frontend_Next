import Link from "next/link";

export const meta = {
  "slug": "create-your-account",
  "title": "Create your Twin Paper account",
  "summary": "Pick a nickname and password, save your recovery code, and choose a data center.",
  "category": "get-started",
  "text": "Your Twin Paper account is a private, end-to-end encrypted workspace for the twins of your paper pages. It takes about a minute to set up. 1. Choose a nickname and password Select Create account on the Twin Paper home page. Enter a nickname (2–24 characters) and a password. Your password needs: at least 8 characters 1 number, 1 uppercase letter and 1 lowercase letter 1 symbol ( !@#$%^&* ) 16 or more characters is recommended. Type the password again to confirm it, then select Create account . Write down your nickname and password. Together they unlock your workspace, and your password is part of the key that encrypts it. We never see either, so we can’t reset them for you. 2. Save your recovery code Your device then creates an account recovery code. It is the only way back into your account if you forget your nickname or password, and you’ll only see it once. Select Copy code and paste it into a password manager, or select Download .txt to save it as a file, or write it down and keep the paper somewhere safe, offline. When you’ve saved it, select Done , then Yes, I saved it . 3. Choose your data center Twin Paper suggests a data center near you, so your pages load quickly. Select Continue with this location , or choose a different location from the list. Only encrypted data is stored there. See Change your data center . 4. You’re in You’ll land in your workspace. Next, capture your first page .",
  "order": 1
};

export default function CreateYourAccount() {
  return (
    <>
      <p>Your Twin Paper account is a private, end-to-end encrypted workspace for the twins of your paper pages. It takes about a minute to set up.</p>

      <h2>1. Choose a nickname and password</h2>
      <p>Select <strong>Create account</strong> on the Twin Paper home page. Enter a nickname (2–24 characters) and a password. Your password needs:</p>
      <ul>
        <li>at least 8 characters</li>
        <li>1 number, 1 uppercase letter and 1 lowercase letter</li>
        <li>1 symbol (<code>!@#$%^&amp;*</code>)</li>
      </ul>
      <p>16 or more characters is recommended. Type the password again to confirm it, then select <strong>Create account</strong>.</p>

      <div className="callout warn">
        <strong>Write down your nickname and password.</strong>
        Together they unlock your workspace, and your password is part of the key that encrypts it. We never see either, so we can’t reset them for you.
      </div>

      <h2>2. Save your recovery code</h2>
      <p>Your device then creates an account recovery code. It is the only way back into your account if you forget your nickname or password, and you’ll only see it once.</p>
      <ul>
        <li>Select <strong>Copy code</strong> and paste it into a password manager, or</li>
        <li>select <strong>Download .txt</strong> to save it as a file, or</li>
        <li>write it down and keep the paper somewhere safe, offline.</li>
      </ul>
      <p>When you’ve saved it, select <strong>Done</strong>, then <strong>Yes, I saved it</strong>.</p>

      <h2>3. Choose your data center</h2>
      <p>Twin Paper suggests a data center near you, so your pages load quickly. Select <strong>Continue with this location</strong>, or choose a different location from the list. Only encrypted data is stored there. See <Link href="/support/data-center">Change your data center</Link>.</p>

      <h2>4. You’re in</h2>
      <p>You’ll land in your workspace. Next, <Link href="/support/capture-your-first-page">capture your first page</Link>.</p>
    </>
  );
}
