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
}

const A002 = {
  fixedSize: true,
}

/*--- APxx Palette Jounral Series ---*/
const AP01 = { // Dusty Rose
}
const AP02 = { // Soft Peach
}
const AP03 = { // Pale Buttercup
}
const AP04 = { // Sage Mist
}
const AP05 = { // Powder Blue
}
const AP06 = { // Dusty Periwinkle
}
const AP07 = { // Soft Levende
}
/*--- End of APxx Palette Jounral Series ---*/
/*--- AFxx Fabric Jounral Series ---*/
const AF01 = { // Dusty Rose
  title:"Dusty Rose",
  subTitle:"Fabric"
}
const AF02 = { // Soft Peach
  title:"Soft Peach",
  subTitle:"Fabric"
}
const AF03 = { // Pale Buttercup
  title:"Pale Buttercup",
  subTitle:"Fabric"
}
const AF04 = { // Sage Mist
  title:"Sage Mist",
  subTitle:"Fabric"
}
const AF05 = { // Powder Blue
  title:"Powder Blue",
  subTitle:"Fabric"
}
const AF06 = { // Dusty Periwinkle
  title:"Dusty Periwinkle",
  subTitle:"Fabric"
}
const AF07 = { // Soft Levende
  title:"Soft Levende",
  subTitle:"Fabric"
}
const AF08 = { // Black
  title:"Black",
  subTitle:"Fabric"
}
const AF09 = { // White
  title:"White",
  subTitle:"Fabric"
}
/*--- End of AFxx Fabric Jounral Series ---*/
/*--- ALxx Leather Jounral Series ---*/
const AL01 = { // Dark Red/Burgundy
  title:"Dark Burgundy",
  subTitle:"Leather"
}
const AL02 = { // Saddle Brown/Cognac
  title:"Saddle Cognac",
  subTitle:"Leather"
}
const AL03 = { // Goldenrod
  title:"Goldenrod",
  subTitle:"Leather"
}
const AL04 = { // Forest Green
  title:"Forest Green",
  subTitle:"Leather"
}
const AL05 = { // Midnight Blue
  title:"Midnight Blue",
  subTitle:"Leather"
}
const AL06 = { // Indigo
  title:"Indigo",
  subTitle:"Leather"
}
const AL07 = { // Deep Purple
  title:"Deep Purple",
  subTitle:"Leather"
}
const AL08 = { // Black
  title:"Black",
  subTitle:"Leather"
}
const AL09 = { // White
  title:"White",
  subTitle:"Leather"
}
/*--- End of ALxx Leather Jounral Series ---*/
/*--- ASxx Special Jounral Series ---*/
const AS01 = { // Gray Floral, Dusty Rose
  title:"Gray Floral",
  subTitle:"Dusty Rose"
}
const AS02 = { // Foggy Birds, Denim
  title:"Foggy Birds",
  subTitle:"Denim"
}
const AS03 = { // Food, Eucalyptus
  title:"Food",
  subTitle:"Eucalyptus"
}
const AS04 = { // Argle, Dark Tan
  title:"Argle",
  subTitle:"Dark Tan"
}
const AS05 = { // flower, Lotion
  title:"Flower",
  subTitle:"Lotion",
  coverSticker: "/images/covers/flower.png",
  stickerWidth:30,
  stickerMargin:70,
  stickerBottom: 3,
}
const AS06 = { // Exotic Floral, Lotion
  title:"Exotic Floral",
  subTitle:"Paper",
}
const AS07 = { // Exotic Floral, Lotion
  title:"Exotic Floral",
  subTitle:"Fabric",
}
const AS08 = { 
  title:"A Girl",
  subTitle:"Autumn Landscape",
  coverSticker: "/images/covers/shutterstock_2070716912_cover.jpg",
  stickerWidth:60,
  stickerMargin:20,
  stickerBottom: 10,
}
const AS09 = { 
  title:"Inner World",
  subTitle:"Self Reflection",
  coverSticker: "/images/covers/shutterstock_2608702403_cover.png",
  stickerWidth:60,
  stickerMargin:20,
  stickerBottom: 20,
}
const AS10 = { // Mind, Lotion
  title:"The Girl",
  subTitle:"Contemplation",
  coverSticker: "/images/covers/shutterstock_1595472160_cover.png",
  stickerWidth:60,
  stickerMargin:20,
  stickerBottom: 20,
}
const AS11 = { // Mind, Lotion
  title:"The Little Prince",
  subTitle:"Journey",
  coverSticker: "/images/covers/shutterstock_2413073063_cover.png",
  stickerWidth:60,
  stickerMargin:20,
  stickerBottom: 20,
}
/*--- End of ASxx Special Jounral Series ---*/
const D001 = {
}

const D002 = {
}

/*--- DPxx Palette Diary Series ---*/
const DP01 = { // Dusty Rose
}

const DP02 = { // Soft Peach
}

const DP03 = { // Pale Buttercup
}

const DP04 = { // Sage Mist
}

const DP05 = { // Powder Blue
}

const DP06 = { // Dusty Periwinkle
}

const DP07 = { // Soft Levende
}

/*--- End of DPxx Palette Jounral Series ---*/
export const productTypes = {
  'A': "notebook",
  'D': "diary"
}

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
  AF01,
  AF02,
  AF03,
  AF04,
  AF05,
  AF06,
  AF07,
  AF08,
  AF09,
  AL01,
  AL02,
  AL03,
  AL04,
  AL05,
  AL06,
  AL07,
  AL08,
  AL09,
  AS01,
  AS02,
  AS03,
  AS04,
  AS05,
  AS06,
  AS07,
  AS08,
  AS09,
  AS10,
  AS11,
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

export function getDemoUrl(productId) {
  if (productId && productId !== "") {
    const type = productTypes[productId.charAt(0)];
    const demoUrl = `/${type}Demo/${type.charAt(0)}:_pd_${productId}_pd_${demoOwner}:3:1747621297857`
    return demoUrl;
  } else {
    return '/safe';
  }
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
