'use client'
import Link from "next/link"

const ShopCard = ({ item, addToCart, addToWishlist }) => {
    if (!item) return null

    return (
        <div className="tpproduct tpproductitem mb-15 p-relative">
            <div className="tpproduct__thumb">
                <div className="tpproduct__thumbitem p-relative">
                    <Link href={`/shop-details/${item._id || item.id}`}>
                        <img 
                            src={item.images?.[0]?.url || item.imgf || '/assets/img/product/product-1.jpg'} 
                            alt={item.name || item.title || 'Product'} 
                        />
                        {item.images?.[1]?.url && (
                            <img 
                                className="thumbitem-secondary" 
                                src={item.images[1].url} 
                                alt={item.name} 
                            />
                        )}
                    </Link>
                    {item.sale_price && (
                        <span className="tpproduct__thumb-topsall">Sale</span>
                    )}
                </div>
            </div>
            <div className="tpproduct__content-area">
                <h3 className="tpproduct__title mb-5">
                    <Link href={`/shop-details/${item._id || item.id}`}>
                        {item.name || item.title || 'Product'}
                    </Link>
                </h3>
                <div className="tpproduct__priceinfo p-relative">
                    <div className="tpproduct__priceinfo-list">
                        {item.sale_price ? (
                            <>
                                <span>₹{item.sale_price}</span>
                                <del className="ml-10">₹{item.price}</del>
                            </>
                        ) : (
                            <span>₹{item.price || '0'}</span>
                        )}
                    </div>
                    <div className="tpproduct__action">
                        <Link className="comphare" href="#"><i className="fal fa-exchange" /></Link>
                        <Link className="quckview" href="#"><i className="fal fa-eye" /></Link>
                        <Link 
                            className="wishlist" 
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                addToWishlist(item._id || item.id)
                            }}
                        >
                            <i className="fal fa-heart" />
                        </Link>
                    </div>
                </div>
                <div className="tpproduct__cart">
                    <button 
                        className="tpproduct__cart-btn"
                        onClick={() => addToCart(item._id || item.id)}
                    >
                        <i className="fal fa-shopping-cart mr-5" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ShopCard