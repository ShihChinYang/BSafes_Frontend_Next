import StoreLayout from "../../components/layouts/storeLayout";
import StoreTopSection from "../../components/storeTopSection";
import StoreOneOfAKind from "../../components/storeOneOfAKind";
import MakeupSection from "../../components/beautico/components/Home/MakeupSection"

import ProductSeriesSlides from "../../components/productSeriesSlides"

export default function Store() {
    const endTime = "2023-10-23";
    
    return (
        <div className="bsafesStore">
            <StoreLayout>
                <StoreTopSection />
                <ProductSeriesSlides index={1} seriesName="Designers Series" items={["AS06", "AS07", "AS08", "AS09", "AS10", "AS11", "AS01", "AS02", "AS03", "AS04", "AS05"]}/>
                <ProductSeriesSlides index={2} seriesName="Fabric Series" items={["AF08", "AF09", "AF01", "AF02", "AF03", "AF04", "AF05", "AF06", "AF07"]}/>
                <ProductSeriesSlides index={3} seriesName="Leather Series" items={["AL08", "AL09", "AL01", "AL02", "AL03", "AL04", "AL05", "AL06", "AL07"]}/>
                <StoreOneOfAKind/>
                <MakeupSection/>
            </StoreLayout>
        </div>

    )
}