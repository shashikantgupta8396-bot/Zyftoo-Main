export function filterProducts(products, filters) {
    // Filtering logic here
    return products.filter(product => {
        let pass = true
        
        // Filter by is_popular
        if (filters.is_popular !== undefined) {
            pass = pass && product.is_popular === filters.is_popular
        }
        
        // Filter by is_featured
        if (filters.is_featured !== undefined) {
            pass = pass && product.is_featured === filters.is_featured
        }
        
        // Filter by is_trending
        if (filters.is_trending !== undefined) {
            pass = pass && product.is_trending === filters.is_trending
        }
        
        // Filter by on sale (has sale_price)
        if (filters.sale_price?.$exists) {
            pass = pass && product.sale_price !== null && product.sale_price !== undefined
        }
        
        // Filter by rating
        if (filters.rating?.$gte) {
            pass = pass && product.rating >= filters.rating.$gte
        }
        
        // Filter by price
        if (filters.price) {
            pass = pass && product.price?.min >= filters.price.min && product.price?.max <= filters.price.max
        }
        
        // Filter by category
        if (filters.category && filters.category.length) {
            pass = pass && filters.category.includes(product.category?.[0]?.type?.toLowerCase().replace(/ /g, "-"))
        }
        
        return pass
    })
}

export function sortProducts(products, sortKey, order = "asc") {
    return [...products].sort((a, b) => {
        if (order === "asc") return a[sortKey] > b[sortKey] ? 1 : -1
        else return a[sortKey] < b[sortKey] ? 1 : -1
    })
}