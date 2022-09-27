import './style.scss';
import './style-mobile.scss';

import { useEffect, useState } from 'react';

import AddCartButton from '../../components/button/addCart/addCartButton';
import DiscountDisplay from '../../components/display/discount';
import PriceDisplay from '../../components/display/price';
import { getPercentage } from '../../utils/utils';
import image from '../../a.jpg';
import { useLoaderData } from "react-router-dom";
import QuantitySelector from '../../components/quantitySelector';

export async function loader({ params }) {
    return params.id;
  }

const Product = () => {
    // const id = useLoaderData();
    const brand = "Brand";
    const title = "T-Shirt";
    const price = 15;
    const oldPrice = 18;
    const description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro.";
    const shipping = true;

    const [discount, setDiscount] = useState(0);
    useEffect(() => {
        if (price && oldPrice !== undefined) {
            setDiscount(getPercentage(price, oldPrice));
        }
    }, [oldPrice, price]); 
    
    return (
        <section id='product-page'>
            <div className="product-container">
                <div className="product-image">
                    <DiscountDisplay discount={discount} />
                    <img src={image} alt="" />
                </div>
                <div className="product-description">
                    <h6 className="brand">{brand}</h6>
                    <h4 className="title">{title}</h4>
                    <PriceDisplay price={price} oldPrice={oldPrice}/>
                    <p className='quantity'>Quantity</p>
                    <QuantitySelector quantity={6}/>
                    <p className="description">{description}</p>
                    {shipping && <h6 className="shipping">Free Shipping</h6>}
                    <AddCartButton />
                </div>
            </div>
        </section>
    );
}
    
export default Product;
