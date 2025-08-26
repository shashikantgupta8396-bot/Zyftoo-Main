'use client'
import { addCart } from "@/features/shopSlice"
import { addWishlist } from "@/features/wishlistSlice"
import { Fragment, useContext } from "react"
import { useDispatch } from "react-redux"
import { AuthContext } from "../context/AuthContext"
import ShopCard from "./ShopCard"
import EnhancedShopCard from "./EnhancedShopCard"

const FilterShopBox2 = ({ products = [] }) => {
    const dispatch = useDispatch()
    
    // Safely get user context
    let user = null
    let isCorporate = false
    
    try {
        const context = useContext(AuthContext)
        user = context?.user
        isCorporate = user?.userType === 'Corporate'
    } catch (error) {
        console.log("AuthContext not available, defaulting to individual view")
    }
    
    console.log("🎨 FilterShopBox2: Rendering", products.length, "products")
    console.log("👤 User type:", user?.userType, "Corporate:", isCorporate)
    console.log("📦 First product sample:", products[0]) // Debug log to see data structure

    const addToCart = (id) => {
        const item = products.find((item) => item._id === id || item.id === id)
        if (item) {
            dispatch(addCart({ product: item }))
        }
    }

    const addToWishlist = (id) => {
        const item = products.find((item) => item._id === id || item.id === id)
        if (item) {
            dispatch(addWishlist({ product: item }))
        }
    }

    if (!products || products.length === 0) {
        return <div className="col-12 text-center p-4">No products to display</div>
    }

    return (
        <>
            {products.map((item, i) => (
                <Fragment key={item._id || item.id || i}>
                    {isCorporate ? (
                        <EnhancedShopCard 
                            item={item} 
                            addToCart={addToCart} 
                            addToWishlist={addToWishlist}
                            showCorporateBadge={true}
                            showBulkPricing={true}
                        />
                    ) : (
                        <ShopCard 
                            item={item} 
                            addToCart={addToCart} 
                            addToWishlist={addToWishlist} 
                        />
                    )}
                </Fragment>
            ))}
        </>
    )
}

export default FilterShopBox2