'use client'
import SearchWidget from "@/components/search-widget";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Marousel = () => {
    const [dataSearch, setDataSearch] = useState<any>({});
    return (
        <>
            <div className="relative">
                <Carousel
                    autoPlay
                    infiniteLoop
                    showStatus={false}
                    showThumbs={false}
                    interval={3000}
                >
                    <div>
                        <img className="h-[700px]"
                            src=
                            "https://storage.googleapis.com/blogvxr-uploads/2023/08/tiep-buoc-uoc-mo-vexere.jpg"
                            alt="image1"
                        />
                    </div>
                    <div>
                        <img className="h-[700px]"
                            src=
                            "https://static.vexere.com/production/banners/910/leaderboard.jpg"
                            alt="image2"
                        />
                    </div>
                    <div>
                        <img className="h-[700px]"
                            src=
                            "https://simg.zalopay.com.vn/zlp-website/assets/Top_banner_1920x480_70per_for_web_op_7cdcb30f61.jpg"
                            alt="image3"
                        />
                    </div>
                    <div>
                        <img className="h-[700px]"
                            src=
                            "https://viettelmoney.vn/wp-content/uploads/2023/07/voucher-ve-xe-re-uu-dai-15-1.jpg"
                            alt="image4"
                        />
                    </div>
                    <div>
                        <img className="h-[700px]"
                            src=
                            "https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/210/img_card.png?v=5"
                            alt="image5"
                        />
                    </div>
                </Carousel>
            </div>
            <div style={{ 'position': 'absolute', 'top': '30%', 'left': '0', 'right': '0' }}>
                <SearchWidget dataSearch={dataSearch} setDataSearch={setDataSearch} />
            </div>
        </>
    )
}
export default Marousel;