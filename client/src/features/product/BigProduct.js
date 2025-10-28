import { useParams } from "react-router-dom";
import { useBigProductQuery } from "./productApiSlice";
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useAddProdToBasketMutation } from '../basket/basketApiSlice';
import { useEffect } from "react";

const BigProduct = () => {
    const navigate = useNavigate();
    const { barCode } = useParams();
    const { data: product, isLoading, isError, refetch } = useBigProductQuery(barCode);
    const [addProdToBasket] = useAddProdToBasketMutation();

    useEffect(() => {
        refetch();
    }, [refetch]);

    const AddProd = async () => {
        if (!product)
            return;
        await addProdToBasket({
            barCode: product.barCode,
            token: localStorage.getItem('token')
        });
        const basket = JSON.parse(localStorage.getItem("basket")) || [];
        const index = basket.findIndex(p => p.barCode === product.barCode);
        if (index !== -1) {
            basket[index].quantity = (basket[index].quantity || 1) + 1;
        } else {
            basket.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("basket", JSON.stringify(basket));
        navigate("/basket");
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError || !product) return <div>Product not found</div>;

    return (
        <div style={{
            maxWidth: '1000px',
            margin: '2rem auto',
            padding: '1rem',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
            flexWrap: 'wrap'
        }}>
            <img
                src={`/Images/${product.img}`}
                alt={product.name}
                style={{
                    maxWidth: '350px',
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 0 8px rgba(0,0,0,0.15)'
                }}
            />
            <div style={{ flex: '1', minWidth: '270px' }}>
                <h1 style={{ marginBottom: '1rem', fontSize: '2rem', color: '#333' }}>
                    {product.name}
                </h1>
                <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                    <strong>Category:</strong> {product.category}
                </p>
                <p style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#007a33' }}>
                    ₪{product.price}
                </p>
                <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                    <strong> מעצב\ת:</strong> {product.designer}
                </p>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.5', color: '#555' }}>
                    {product.description}
                </p>
                {product.amount > 0 && <Button
                    icon="pi pi-shopping-cart"
                    onClick={AddProd}
                    className="p-button-rounded"
                    style={{ background: 'green', fontWeight: 'bold', padding: '0.75rem 1.5rem' }}
                    disabled={product.amount === 'OUTOFSTOCK'}
                    aria-label="Add to basket"> הוסף לסל</Button>}
                {product.amount <= 0 && <span style={{ color: 'red' }}>מוצר זה אזל מהמלאי</span>}
            </div>
        </div>
    );
};

export default BigProduct;