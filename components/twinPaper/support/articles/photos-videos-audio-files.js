export const meta = {
  "slug": "photos-videos-audio-files",
  "title": "Add photos, videos, audio and files",
  "summary": "Attach prototype photos, experiment videos, voice notes and documents to a page.",
  "category": "twins",
  "text": "A Twin is a starting point. Below the Twin on each page are four places to add more: Photo : add one or more photos. Select any photo to view them in a full-screen carousel, and select the pen icon under a photo to add a caption. Video : add video clips, such as an experiment or a demo. Audio : add voice notes and observations. File : add PDFs, drawings, specifications or any other file. Select one of these areas to choose files, or drag and drop files onto it on a computer. Your device encrypts each file, then uploads it to the secure server. Download or delete a file Select the download icon next to a file to download it. To delete a file, open the menu next to it, select Delete , and confirm.",
  "order": 2
};

export default function PhotosVideosAudioFiles() {
  return (
    <>
      <p>A Twin is a starting point. Below the Twin on each page are four places to add more:</p>
      <ul>
        <li><strong>Photo</strong>: add one or more photos. Select any photo to view them in a full-screen carousel, and select the pen icon under a photo to add a caption.</li>
        <li><strong>Video</strong>: add video clips, such as an experiment or a demo.</li>
        <li><strong>Audio</strong>: add voice notes and observations.</li>
        <li><strong>File</strong>: add PDFs, drawings, specifications or any other file.</li>
      </ul>
      <p>Select one of these areas to choose files, or drag and drop files onto it on a computer. Your device encrypts each file, then uploads it to the secure server.</p>

      <h2>Download or delete a file</h2>
      <p>Select the download icon next to a file to download it. To delete a file, open the menu next to it, select <strong>Delete</strong>, and confirm.</p>
    </>
  );
}
