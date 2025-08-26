'use client'
import { useState, useRef } from "react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import ProductList from "../shop/ProductList"
import FilterShopBox2 from "../shop/FilterShopBox2"
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Product3() {
    const [activeIndex, setActiveIndex] = useState(1)
    const prevRef = useRef(null)
    const nextRef = useRef(null)
    
    const swiperOptions = {
        modules: [Autoplay, Pagination, Navigation],
        slidesPerView: 4,
        spaceBetween: 30,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            1400: { slidesPerView: 4 },
            1200: { slidesPerView: 3 },
            992: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            576: { slidesPerView: 1 },
            0: { slidesPerView: 1 },
        },
        navigation: {
            prevEl: prevRef.current,
            nextEl: nextRef.current,
        },
        onBeforeInit: (swiper) => {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
        },
    }
    
    const handleOnClick = (index) => {
        console.log('🔄 Tab changed to:', index)
        setActiveIndex(index)
    }

    const getFilter = () => {
        switch(activeIndex) {
            case 1:
                return {} 
            case 2:
                return { is_popular: true }
            case 3:
                return { sale_price: { $exists: true } }
            case 4:
                return { rating: { $gte: 4 } }
            default:
                return {}
        }
    }

    return (
        <section className="product-area pt-65 pb-40">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="tpsection mb-40">
                            <h4 className="tpsection__title">
                                {activeIndex === 1 ? 'All Products' :
                                 activeIndex === 2 ? 'Popular Products' :
                                 activeIndex === 3 ? 'Sale Products' :
                                 'Best Rated Products'}
                            </h4>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-6 col-12">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="tpnavbar">
                                <nav>
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                        <button 
                                            className={activeIndex === 1 ? "nav-link active" : "nav-link"} 
                                            onClick={() => handleOnClick(1)}
                                        >
                                            All
                                        </button>
                                        <button 
                                            className={activeIndex === 2 ? "nav-link active" : "nav-link"} 
                                            onClick={() => handleOnClick(2)}
                                        >
                                            Popular
                                        </button>
                                        <button 
                                            className={activeIndex === 3 ? "nav-link active" : "nav-link"} 
                                            onClick={() => handleOnClick(3)}
                                        >
                                            On Sale
                                        </button>
                                        <button 
                                            className={activeIndex === 4 ? "nav-link active" : "nav-link"} 
                                            onClick={() => handleOnClick(4)}
                                        >
                                            Best Rated
                                        </button>
                                    </div>
                                </nav>
                            </div>
                            <div className="tpplatiarrow d-flex align-items-center">
                                <div className="tpplatiarrow__prv" ref={prevRef}>
                                    <i className="far fa-long-arrow-left" />Prev
                                </div>
                                <div className="tpplatiarrow__nxt" ref={nextRef}>
                                    Next<i className="far fa-long-arrow-right" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" role="tabpanel">
                        <div className="swiper-container product-active">
                            <ProductList 
                                key={activeIndex}
                                filter={getFilter()}
                                itemStart={0}
                                itemEnd={10}
                                displayComponent={(products) => (
                                    <Swiper {...swiperOptions}>
                                        {products.map((item, i) => (
                                            <SwiperSlide key={item._id || item.id || i}>
                                                <FilterShopBox2 
                                                    products={[item]}
                                                    variant="carousel"
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}