'use client'
import { useState } from "react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import ProductList from "../shop/ProductList"
import FilterShopBox2 from "../shop/FilterShopBox2"

export default function ProductCustom({ 
    title = "Products",
    filter = {},
    displayType = "grid", // grid or carousel
    showTabs = true,
    tabOptions = [
        { label: 'All', filter: {} },
        { label: 'Popular', filter: { is_popular: true } },
        { label: 'On Sale', filter: { sale_price: { $exists: true } } },
        { label: 'Best Rated', filter: { rating: { $gte: 4 } } }
    ],
    className = "",
    itemLimit = 10
}) {
    const [activeIndex, setActiveIndex] = useState(0)

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
            prevEl: '.tpproduct__prv',
            nextEl: '.tpproduct__nxt',
        }
    }

    // Combine base filter with tab filter
    const currentFilter = {
        ...filter,
        ...tabOptions[activeIndex].filter
    }

    return (
        <section className={`product-section ${className}`}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-12">
                        <div className="tpsection mb-40">
                            <h4 className="tpsection__title">{title}</h4>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="d-flex justify-content-end align-items-center">
                            {showTabs && (
                                <div className="tpnavbar me-4">
                                    <nav>
                                        <div className="nav nav-tabs">
                                            {tabOptions.map((tab, index) => (
                                                <button 
                                                    key={index}
                                                    className={activeIndex === index ? "nav-link active" : "nav-link"}
                                                    onClick={() => setActiveIndex(index)}
                                                >
                                                    {tab.label}
                                                </button>
                                            ))}
                                        </div>
                                    </nav>
                                </div>
                            )}
                            {displayType === 'carousel' && (
                                <div className="tpproduct-btn d-flex align-items-center">
                                    <div className="tpproduct__prv">
                                        <i className="far fa-long-arrow-left" />Prev
                                    </div>
                                    <div className="tpproduct__nxt">
                                        Next<i className="far fa-long-arrow-right" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="product-content">
                    <ProductList 
                        key={`${activeIndex}-${JSON.stringify(currentFilter)}`}
                        filter={currentFilter}
                        itemStart={0}
                        itemEnd={itemLimit}
                        displayComponent={(products) => (
                            displayType === 'carousel' ? (
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
                            ) : (
                                <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1">
                                    <FilterShopBox2 products={products} />
                                </div>
                            )
                        )}
                    />
                </div>
            </div>
        </section>
    )
}