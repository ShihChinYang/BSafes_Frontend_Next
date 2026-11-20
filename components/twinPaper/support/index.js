// Twin Paper help center: article registry. To add an article, create a file in
// ./articles exporting `meta` + a default component, then add it to MODULES.
import * as captureYourFirstPage from "./articles/capture-your-first-page";
import * as createYourAccount from "./articles/create-your-account";
import * as dataCenter from "./articles/data-center";
import * as howEncryptionWorks from "./articles/how-encryption-works";
import * as moveAndTrash from "./articles/move-and-trash";
import * as organize from "./articles/organize";
import * as page from "./articles/page";
import * as photosVideosAudioFiles from "./articles/photos-videos-audio-files";
import * as recoverYourAccount from "./articles/recover-your-account";
import * as search from "./articles/search";
import * as twoFactorAuthentication from "./articles/two-factor-authentication";
import * as unlockYourAccount from "./articles/unlock-your-account";

export const CATEGORIES = [
  { id: "get-started", name: "Get started", desc: "Create your account, capture a page, unlock and recover." },
  { id: "twins", name: "Pages & Twins", desc: "What a page holds, and how to add photos, video, audio and files." },
  { id: "organize", name: "Organize & find", desc: "Notebooks, diaries, folders, boxes, search, and Trash." },
  { id: "security", name: "Privacy & security", desc: "Encryption, two-factor authentication and data centers." },
];

const MODULES = [
  captureYourFirstPage,
  createYourAccount,
  dataCenter,
  howEncryptionWorks,
  moveAndTrash,
  organize,
  page,
  photosVideosAudioFiles,
  recoverYourAccount,
  search,
  twoFactorAuthentication,
  unlockYourAccount,
];

const catOrder = Object.fromEntries(CATEGORIES.map((c, i) => [c.id, i]));

// Sorted by category, then `order` within the category.
export const ARTICLES = MODULES.map((m) => ({ ...m.meta, Body: m.default })).sort(
  (a, b) => catOrder[a.category] - catOrder[b.category] || a.order - b.order
);

export const getArticle = (slug) => ARTICLES.find((a) => a.slug === slug) || null;
export const getCategory = (id) => CATEGORIES.find((c) => c.id === id) || null;
export const articlesIn = (categoryId) => ARTICLES.filter((a) => a.category === categoryId);
