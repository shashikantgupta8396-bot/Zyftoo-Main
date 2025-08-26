import ProductCustom from "../layout/ProductCustom";
export default function CategoryProducts({ categoryId, categoryName }) {
    return (
        <ProductCustom
            title={categoryName}
            filter={{ category: categoryId }} // Changed from categories to category
            displayType="grid"
            itemLimit={15}
            showTabs={false} // We don't need tabs for category-specific products
        />
    )
}