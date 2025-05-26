import { demoOwner } from "./demoHelper";
export const productIdDelimiter = "_pd_";
export const NotebookDemo = "notebookDemo";
export const DiaryDemo = "diaryDemo";
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

const A002 = {
    demoUrl: `/notebookDemo/n:_pd_A002_pd_${demoOwner}:3:1747621297857`,
    fixedSize: true,
}

export const products = {
    notebookDemo,
    diaryDemo,
    p00,
    n00,
    d00,
    A002,
}

