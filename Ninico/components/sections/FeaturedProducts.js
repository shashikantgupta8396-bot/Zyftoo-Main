import ProductCustom from "../layout/ProductCustom";
export default function FeaturedProducts() {
    return (
        <ProductCustom 
            title="Featured Products"
            filter={{ is_featured: true }}
            displayType="carousel"
            showTabs={true}
            className="featured-products-section pt-65"
            itemLimit={8}
        />
    )
}