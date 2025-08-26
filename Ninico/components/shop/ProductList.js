'use client'
import { useEffect, useState } from "react"
import { getProducts } from "../../util/apiService"
import FilterShopBox2 from "./FilterShopBox2"

export default function ProductList({ 
    filter = {}, 
    sort = {}, 
    search = "", 
    itemStart = 0, 
    itemEnd = 10,
    displayComponent = null 
}) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                setError(null)
                console.log('📥 ProductList: Fetching with filter:', filter)
                
                const data = await getProducts({
                    filter,
                    search,
                    sort,
                    page: 1,
                    limit: itemEnd - itemStart
                })
                
                console.log('📦 ProductList: Received products:', data)
                setProducts(Array.isArray(data) ? data : [])
                
            } catch (err) {
                console.error('❌ ProductList: Error:', err)
                setError(err.message || 'Failed to fetch products')
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [JSON.stringify(filter), search, JSON.stringify(sort), itemStart, itemEnd])

    if (loading) return <div className="text-center p-4">Loading products...</div>
    if (error) return <div className="text-center p-4 text-danger">Error: {error}</div>
    if (!products?.length) return <div className="text-center p-4">No products found</div>

    // Use custom display component if provided
    if (displayComponent) {
        return displayComponent(products)
    }

    // Default display
    return (
        <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-1">
            <FilterShopBox2 products={products} />
        </div>
    )
}