import StoreLayout from "../../components/layouts/storeLayout";
import StoreTopSection from "../../components/storeTopSection";
import StoreJouralFeatures from "../../components/storeJouralFeatures";
import StoreWhyBSafes from "../../components/storeWhyBSafes";
import StorePageFeatures from "../../components/storePageFeatures";
import StoreFeaturesSection from "../../components/storeFeaturesSection";

import StoreProductSeriesSlides from "../../components/StoreProductSeriesSlides"

export default function Store() {
    const endTime = "2023-10-23";
    
    return (
        <div className="bsafesStore">
            <StoreLayout>
                <StoreTopSection />
                <StoreProductSeriesSlides index={1} seriesName="Designers Series" items={["AS06", "AS07", "AS08", "AS09", "AS10", "AS11", "AS01", "AS02", "AS03", "AS04", "AS05"]}/>
                <StoreProductSeriesSlides index={2} seriesName="Fabric Series" items={["AF08", "AF09", "AF01", "AF02", "AF03", "AF04", "AF05", "AF06", "AF07"]}/>
                <StoreProductSeriesSlides index={3} seriesName="Leather Series" items={["AL08", "AL09", "AL01", "AL02", "AL03", "AL04", "AL05", "AL06", "AL07"]}/>
                <br/>
                <StoreJouralFeatures/>
                <StorePageFeatures/>
                <StoreWhyBSafes/>
                <StoreFeaturesSection/>
            </StoreLayout>
        </div>

    )
}