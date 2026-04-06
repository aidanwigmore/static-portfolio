import React from 'react';

interface ProductPageProps {
    children? : React.ReactNode;
}

function ProductPage({ children } : ProductPageProps) {
    return (
        <>
            { children }
        </>
    );
}

export default ProductPage;
