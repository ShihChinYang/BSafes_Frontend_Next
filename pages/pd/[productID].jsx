import { useEffect } from "react";
import { useRouter } from "next/router";

import { products, getDemoUrl } from "../../lib/productID";
import { debugLog } from "../../lib/helper";

export default function PRODUCT() {
    const debugOn = true;

    const router = useRouter();
    const productId = router.query.productId;

    useEffect(() => {
        if (productId) {
            debugLog(debugOn, `ProductId: ${productId}`);
            let productLink = getDemoUrl(productId); //products[productId].demoUrl;
            if (productLink) {
                router.push(productLink)
            }
        }
    }, [productId])

    return (
        <></>
    )
}