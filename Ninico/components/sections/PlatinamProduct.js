'use client'
import { useRef } from 'react'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import ProductList from "../shop/ProductList"
import FilterShopBox2 from "../shop/FilterShopBox2"

export default function PlatinamProduct() {
    // Add refs for navigation
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    
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
        // Update navigation configuration
        navigation: {
            prevEl: '.tpplatiarrow__prv',
            nextEl: '.tpplatiarrow__nxt',
        },
        // Initialize navigation elements
        onInit: (swiper) => {
            swiper.params.navigation.prevEl = '.tpplatiarrow__prv';
            swiper.params.navigation.nextEl = '.tpplatiarrow__nxt';
            swiper.navigation.init();
            swiper.navigation.update();
        },
    }

    return (
        <section className="platinam-product-area pt-65">
            {/* ...existing code... */}
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="tpsection mb-40">
                            <h4 className="tpsection__title">Popular Products</h4>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="tpplatiarrow d-flex align-items-center justify-content-end">
                            <div className="tpplatiarrow__prv" ref={prevRef}>
                                <i className="far fa-long-arrow-left" />Prev
                            </div>
                            <div className="tpplatiarrow__nxt" ref={nextRef}>
                                Next<i className="far fa-long-arrow-right" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="swiper-container platinam-pro-active">
                    <ProductList 
                        filter={{ is_popular: true }}
                        itemStart={0}
                        itemEnd={6}
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
        </section>
    )
}