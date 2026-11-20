import Link from "next/link";

export const meta = {
  "slug": "capture-your-first-page",
  "title": "Capture your first page",
  "summary": "Turn a paper page into an encrypted Twin, then give it a title and tags.",
  "category": "get-started",
  "text": "A Twin is an exact image of your paper page, not a transcription. Your device encrypts it before it’s uploaded, and you add the titles and tags that make it findable later. 1. Create a page In your workspace, select the orange + button. In New Twin , choose Page , give it a title, and create it. 2. Capture the paper page On the new, empty page, select the Twin button in the middle of the page. On a phone, take a photo of your paper page; on a computer, choose a photo you’ve already taken. For a clear Twin Lay the page flat in even light, fill the frame with the page, and avoid shadows from your hand or phone. Save the page. Your device encrypts the image and uploads it to the secure server. 3. Make it findable Twin Paper never reads your handwriting, with no OCR and no AI. Search works on the title and tags you add: Title : name the page the way you’ll search for it later, for example “Latch prototype – spring noise” . Tags : select Add a tag , type a tag, press Return, and repeat. Save to encrypt and upload the tags. 4. Keep building on it Add photos, videos, voice notes and files to the same page. See Add photos, videos, audio and files .",
  "order": 2
};

export default function CaptureYourFirstPage() {
  return (
    <>
      <p>A Twin is an exact image of your paper page, not a transcription. Your device encrypts it before it’s uploaded, and you add the titles and tags that make it findable later.</p>

      <h2>1. Create a page</h2>
      <p>In your workspace, select the orange <strong>+</strong> button. In <strong>New Twin</strong>, choose <strong>Page</strong>, give it a title, and create it.</p>

      <h2>2. Capture the paper page</h2>
      <p>On the new, empty page, select the <strong>Twin</strong> button in the middle of the page. On a phone, take a photo of your paper page; on a computer, choose a photo you’ve already taken.</p>
      <div className="callout">
        <strong>For a clear Twin</strong>
        Lay the page flat in even light, fill the frame with the page, and avoid shadows from your hand or phone.
      </div>
      <p>Save the page. Your device encrypts the image and uploads it to the secure server.</p>

      <h2>3. Make it findable</h2>
      <p>Twin Paper never reads your handwriting, with no OCR and no AI. Search works on the title and tags you add:</p>
      <ul>
        <li><strong>Title</strong>: name the page the way you’ll search for it later, for example <em>“Latch prototype – spring noise”</em>.</li>
        <li><strong>Tags</strong>: select <strong>Add a tag</strong>, type a tag, press Return, and repeat. Save to encrypt and upload the tags.</li>
      </ul>

      <h2>4. Keep building on it</h2>
      <p>Add photos, videos, voice notes and files to the same page. See <Link href="/support/photos-videos-audio-files">Add photos, videos, audio and files</Link>.</p>
    </>
  );
}
