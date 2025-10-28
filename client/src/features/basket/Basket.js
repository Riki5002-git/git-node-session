import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { useDeleteProdFromBasketMutation, useViewBasketQuery } from './basketApiSlice';
import { usePlusProdToBasketMutation, useMinusProdFromBasketMutation } from './basketApiSlice';
import Order from './Order';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Basket = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const token = localStorage.getItem('token');
    const decode = jwtDecode(token);
    const userName = decode.firstName;
    const [deleteProdFromBasket] = useDeleteProdFromBasketMutation();
    const [plusProd] = usePlusProdToBasketMutation();
    const [minusProd] = useMinusProdFromBasketMutation();
    const [selectedProducts, setSelectedProducts] = useState([]);
    const { data, refetch } = useViewBasketQuery(token);
    const products = data?.basket || [];
    const totalSum = data?.totalSum || 0;

    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleDelete = async (barCode) => {
        await deleteProdFromBasket({ barCode, token });
        await refetch();
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('he-IL', { style: 'currency', currency: 'ILS' });
    };

    const imageBodyTemplate = (product) => {
        return <img src={`/Images/${product.img}`} alt={product.name} className="w-6rem shadow-2 border-round" />;
    };

    const priceBodyTemplate = (product) => {
        return formatCurrency(product.price);
    };

    const ratingBodyTemplate = (product) => {
        return <Rating value={product.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (product) => {
        return <Tag value={product.amount} severity={getSeverity(product)}></Tag>;
    };

    const getSeverity = (product) => {
        if (product.amount === 0) return 'danger';
        if (product.amount <= 5) return 'warning';
        return 'success';
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">סל קניות</span>
            <span>סכום כולל: ₪{totalSum}</span>
            {products.length > 0 && <Button label="לאישור הזמנה ותשלום" severity="warning" icon="pi pi-shopping-bag" onClick={() => setVisible(true)} style={{ border: '5%', borderBlockColor: 'orange', color: 'orange', backgroundColor: 'white' }} />}
            <Button label="לחזרה לחנות" severity="warning" icon="pi pi-arrow-right" onClick={() => navigate('/veiwAll')} style={{ border: '5%', borderBlockColor: 'blue', color: 'blue', backgroundColor: 'white' }} />
            <Button icon="pi pi-refresh" rounded raised onClick={() => refetch()} />
        </div>
    );

    const footer = `In total there are ${products.length} products. Selected: ${selectedProducts.length}`;

    return (
        <div className="card">
            <h3 style={{ color: 'orange', width: '61px' }}>היי, {userName}</h3>
            <DataTable
                value={products}
                selection={selectedProducts}
                onSelectionChange={(e) => setSelectedProducts(e.value)}
                selectionMode="checkbox"
                header={header}
                footer={footer}
                tableStyle={{ minWidth: '60rem' }}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="name" header="Name"></Column>
                <Column header="Image" body={imageBodyTemplate}></Column>
                <Column field="price" header="Price" body={priceBodyTemplate}></Column>
                <Column field="category" header="Category"></Column>
                <Column field="rating" header="Rating" body={ratingBodyTemplate}></Column>
                <Column header="Status" body={statusBodyTemplate}></Column>
                <Column
                    header="Quantity"
                    body={(product) => (
                        <div className="card flex align-items-center gap-2">
                            <Button style={{ border: '5%', borderBlockColor: 'gray', width: '20px', height: '20px', backgroundColor: 'white', color: 'gray' }}
                                icon="pi pi-minus"
                                className="p-button-secondary"
                                onClick={async () => {
                                    await minusProd({ barCode: product.barCode, token });
                                    await refetch();
                                }}
                            />
                            <span>{product.quantity}</span>
                            <Button style={{ border: '5%', borderBlockColor: 'gray', width: '20px', height: '20px', backgroundColor: 'white', color: 'gray' }}
                                icon="pi pi-plus"
                                className="p-button-secondary"
                                onClick={async () => {
                                    await plusProd({ barCode: product.barCode, token });
                                    await refetch();
                                }}
                            />
                        </div>
                    )}
                />
                <Column
                    header="Delete"
                    body={(product) => (
                        <Button
                            icon="pi pi-trash"
                            onClick={() => handleDelete(product.barCode)}
                            className="p-button-rounded p-button-danger"
                        />
                    )}
                />
            </DataTable>
            <Order visible={visible} onHide={() => setVisible(false)} totalSum={totalSum} basket={products} />
        </div>
    );
};

export default Basket;