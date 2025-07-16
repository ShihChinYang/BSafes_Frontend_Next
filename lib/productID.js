import { demoOwner } from "./demoHelper";
export const productIdDelimiter = "_pd_";
export const NotebookDemo = "notebookDemo";
export const DiaryDemo = "diaryDemo";
export const productDefaultTimestamp = "1739503474833"
/* Products properties
 demoUrl - Complete link to the demo product.
 fixedSize - If the product is fixed in size.
*/

const notebookDemo = {
  demoUrl: `/notebookDemo/n:${demoOwner}:3:1739503470913`,
}

const diaryDemo = {
  demoUrl: `/diaryDemo/d:${demoOwner}:3:1739503571024`,
}

const p00 = {
  demoUrl: `/pageDemo/p:${demoOwner}:3:17395034702025`,
}

const n00 = {
  demoUrl: `/notebookDemo/n:${demoOwner}:3:1739503470913`,
}

const d00 = {
  demoUrl: `/diaryDemo/d:${demoOwner}:3:1739503571024`,
}

const A001 = {
  demoUrl: `/notebookDemo/n:_pd_A001_pd_${demoOwner}:3:1747621297857`,
}

const A002 = {
  demoUrl: `/notebookDemo/n:_pd_A002_pd_${demoOwner}:3:1747621297857`,
  fixedSize: true,
}

/*--- APxx Palette Jounral Series ---*/
const AP01 = { // Dusty Rose
  demoUrl: `/notebookDemo/n:_pd_AP01_pd_${demoOwner}:3:1747621297857`,
}

const AP02 = { // Soft Peach
  demoUrl: `/notebookDemo/n:_pd_AP02_pd_${demoOwner}:3:1747621297857`,
}

const AP03 = { // Pale Buttercup
  demoUrl: `/notebookDemo/n:_pd_AP03_pd_${demoOwner}:3:1747621297857`,
}

const AP04 = { // Sage Mist
  demoUrl: `/notebookDemo/n:_pd_AP04_pd_${demoOwner}:3:1747621297857`,
}

const AP05 = { // Powder Blue
  demoUrl: `/notebookDemo/n:_pd_AP05_pd_${demoOwner}:3:1747621297857`,
}

const AP06 = { // Dusty Periwinkle
  demoUrl: `/notebookDemo/n:_pd_AP06_pd_${demoOwner}:3:1747621297857`,
}

const AP07 = { // Soft Levende
  demoUrl: `/notebookDemo/n:_pd_AP07_pd_${demoOwner}:3:1747621297857`,
}

/*--- End of APxx Palette Jounral Series ---*/

const D001 = {
  demoUrl: `/diaryDemo/d:_pd_D001_pd_${demoOwner}:3:1747621297857`,
  fixedSize: true,
}

const D002 = {
  demoUrl: `/diaryDemo/d:_pd_D002_pd_${demoOwner}:3:1747621297857`,
}

/*--- DPxx Palette Diary Series ---*/
const DP01 = { // Dusty Rose
  demoUrl: `/diaryDemo/d:_pd_DP01_pd_${demoOwner}:3:1747621297857`,
}

const DP02 = { // Soft Peach
  demoUrl: `/diaryDemo/d:_pd_DP02_pd_${demoOwner}:3:1747621297857`,
}

const DP03 = { // Pale Buttercup
  demoUrl: `/diaryDemo/d:_pd_DP03_pd_${demoOwner}:3:1747621297857`,
}

const DP04 = { // Sage Mist
  demoUrl: `/diaryDemo/d:_pd_DP04_pd_${demoOwner}:3:1747621297857`,
}

const DP05 = { // Powder Blue
  demoUrl: `/diaryDemo/d:_pd_DP05_pd_${demoOwner}:3:1747621297857`,
}

const DP06 = { // Dusty Periwinkle
  demoUrl: `/diaryDemo/d:_pd_DP06_pd_${demoOwner}:3:1747621297857`,
}

const DP07 = { // Soft Levende
  demoUrl: `/diaryDemo/d:_pd_DP07_pd_${demoOwner}:3:1747621297857`,
}

/*--- End of APxx Palette Jounral Series ---*/
export const products = {
  notebookDemo,
  diaryDemo,
  p00,
  n00,
  d00,
  A001,
  A002,
  AP01,
  AP02,
  AP03,
  AP04,
  AP05,
  AP06,
  AP07,
  D001,
  D002,
  DP01,
  DP02,
  DP03,
  DP04,
  DP05,
  DP06,
  DP07,
}

export function getFirstPageAfterLoggedIn(memberId) {
  const product = process.env.NEXT_PUBLIC_product;
  if (product && product !== "") {
    if (product.startsWith('A')) {
      return `/notebook/n:${productIdDelimiter}${product}${productIdDelimiter}${memberId}:3:${productDefaultTimestamp}`
    } else if (product.startsWith('D')) {
      return `/diary/d:${productIdDelimiter}${product}${productIdDelimiter}${memberId}:3:${productDefaultTimestamp}`
    }
  } else {
    return '/safe';
  }
}
