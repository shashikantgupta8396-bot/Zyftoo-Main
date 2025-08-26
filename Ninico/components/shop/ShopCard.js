import Link from "next/link"

const ShopCard = ({ item, addToCart, addToWishlist }) => {
    // Guard clause
    if (!item) return null;

    // Debug log to see the actual item structure
    console.log("🎯 ShopCard item:", item);

    // Extract data with fallbacks
    const productId = item._id || item.id;
    const productName = item.name || item.title || 'Unnamed Product';
    
    // Handle product images - prioritize product_thumbnail_id, then images array
    const productImage = item.product_thumbnail_id || 
                        (item.images && item.images.length > 0 ? item.images[0] : null) ||
                        '/assets/img/product/product-1.jpg';
    
    const productImageSecondary = (item.images && item.images.length > 1) ? item.images[1] : null;
    
    // Price handling - check retailPrice object structure
    const productPrice = item.retailPrice?.mrp || item.price || 0;
    const salePrice = item.retailPrice?.sellingPrice || item.sale_price;
    const discount = item.retailPrice?.discount || item.discount;
    
    const rating = item.rating || 0;
    const reviewCount = item.numReviews || 0;

    console.log("🖼️ Product images:", { thumbnail: item.product_thumbnail_id, images: item.images, final: productImage });

    return (
        <>
            <div className="col">
                <div className="tpproduct tpproductitem mb-15 p-relative">
                    <div className="tpproduct__thumb">
                        <div className="tpproduct__thumbitem p-relative">
                            <Link href={`/shop-details/${productId}`}>
                                <img 
                                    src={productImage} 
                                    alt={productName}
                                    onError={(e) => {
                                        console.error("Image load error:", e.target.src);
                                        e.target.src = '/assets/img/product/product-1.jpg';
                                    }}
                                    style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                                />
                                {productImageSecondary && (
                                    <img 
                                        className="thumbitem-secondary" 
                                        src={productImageSecondary} 
                                        alt={productName}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                        style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                                    />
                                )}
                            </Link>
                            {/* Sale Badge */}
                            {salePrice && salePrice < productPrice && (
                                <span className="tpproduct__thumb-topsall">
                                    {discount ? `${discount}% OFF` : 'Sale'}
                                </span>
                            )}
                            <div className="tpproduct__thumb-bg">
                                <div className="tpproductactionbg">
                                    <a 
                                        onClick={() => addToCart(productId)} 
                                        className="add-to-cart"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <i className="fal fa-shopping-basket" />
                                    </a>
                                    <Link href="#"><i className="fal fa-exchange" /></Link>
                                    <Link href={`/shop-details/${productId}`}><i className="fal fa-eye" /></Link>
                                    <a 
                                        onClick={() => addToWishlist(productId)} 
                                        className="wishlist"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <i className="fal fa-heart" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tpproduct__content-area">
                        <h3 className="tpproduct__title mb-5">
                            <Link href={`/shop-details/${productId}`}>{productName}</Link>
                        </h3>
                        <div className="tpproduct__priceinfo p-relative">
                            <div className="tpproduct__ammount">
                                {salePrice && salePrice < productPrice ? (
                                    <>
                                        <span>₹{salePrice.toLocaleString('en-IN')}</span>
                                        <del className="ml-2">₹{productPrice.toLocaleString('en-IN')}</del>
                                    </>
                                ) : (
                                    <span>₹{productPrice.toLocaleString('en-IN')}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="tpproduct__ratingarea">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="tpproductdot">
                                {/* Color variations if available */}
                                {item.variations?.colors?.map((color, index) => (
                                    <Link key={index} className="tpproductdot__variationitem" href={`/shop-details/${productId}`}>
                                        <div className="tpproductdot__termshape">
                                            <span 
                                                className="tpproductdot__termshape-bg" 
                                                style={{ backgroundColor: color.hex || color.value }}
                                            />
                                            <span className="tpproductdot__termshape-border" />
                                        </div>
                                    </Link>
                                ))}
                                {/* Default color dots if no variations */}
                                {(!item.variations?.colors || item.variations.colors.length === 0) && (
                                    <>
                                        <Link className="tpproductdot__variationitem" href={`/shop-details/${productId}`}>
                                            <div className="tpproductdot__termshape">
                                                <span className="tpproductdot__termshape-bg" />
                                                <span className="tpproductdot__termshape-border" />
                                            </div>
                                        </Link>
                                    </>
                                )}
                            </div>
                            <div className="tpproduct__rating">
                                <ul>
                                    <li>
                                        {[...Array(5)].map((_, i) => (
                                            <Link key={i} href="#">
                                                <i className={i < Math.floor(rating) ? "fas fa-star" : "far fa-star"} />
                                            </Link>
                                        ))}
                                    </li>
                                    <li>
                                        <span>({reviewCount})</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopCard