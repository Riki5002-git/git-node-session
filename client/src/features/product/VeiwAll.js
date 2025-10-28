import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { useDeleteProductFuncMutation, useVeiwAllQuery } from './productApiSlice';
import UpdateProduct from './UpdateProduct';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge } from 'primereact/badge';

const VeiwAll = () => {
    const [visible, setVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [ratings, setRatings] = useState({});
    const [deleteProduct, { isSuccess }] = useDeleteProductFuncMutation();
    const { data: products = [], refetch } = useVeiwAllQuery();
    const [layout, setLayout] = useState('grid');
    const navigate = useNavigate();

    const { category } = useParams();
    const searchWord = localStorage.getItem('searchWord') || '';

    let filteredProducts = [];

    if (category === 'search') {
        filteredProducts = products.filter(p => p.name.startsWith(searchWord));
    } else if (category === 'onSale') {
        filteredProducts = products.filter(p => p.isSale === true);
    } else if (category) {
        filteredProducts = products.filter(p => p.category === category);
    } else {
        filteredProducts = products;
    }

    const handleRatingChange = (barcode, value) => {
        setRatings(prev => ({
            ...prev,
            [barcode]: value
        }));
    };

    const DeleteProd = (barCode) => {
        deleteProduct({ barCode });
        if (isSuccess)
            refetch();
    };

    useEffect(() => {
        refetch();
    }, [isSuccess, refetch]);

    const getSeverity = (product) => {
        if (product.amount === 0) return 'danger';
        if (product.amount <= 5) return 'warning';
        return 'success';
    };

    const getAmountText = (product) => {
        if (product.amount === 0) return "אזל מהמלאי";
        if (product.amount <= 5) return "כמעט נגמר";
        return "במלאי";
    };

    const VeiwBigProd = (barCode) => {
        navigate(`/bigProduct/${barCode}`);
    };

    const gridItem = (product) => (
        <div className="col-12 sm:col-6 lg:col-4 p-2" key={product._id} >
            <div className="p-4 border-1 surface-border surface-card border-round h-full" onClick={() => VeiwBigProd(product.barCode)} >
                <div className="flex justify-content-between align-items-center" >
                    <span className="font-semibold flex align-items-center gap-2" >
                        <i className="pi pi-tag"></i>
                        {product.category}
                    </span>
                    {product.isSale && <Badge value="במבצע" severity="success"></Badge>}
                    <Tag value={getAmountText(product)} severity={getSeverity(product)} className="w-3rem text-center" />
                </div>

                <div className="flex flex-column align-items-center gap-3 py-5">
                    <img className="w-9 shadow-2 border-round" src={`/Images/${product.img}`} alt={product.name} />
                    <div className="text-2xl font-bold">{product.name}</div>
                    <Rating
                        value={ratings[product.barCode] || 0}
                        onChange={(e) => handleRatingChange(product.barCode, e.value)}
                        cancel={false}
                    />
                </div>

                <div className="flex align-items-center justify-content-between">
                    <span className="text-2xl font-semibold">₪{product.price}</span>
                    {product.isSale && product.percents && (
                        <span style={{ color: 'red', fontWeight: 'bold', fontSize: '1.2rem' }}>
                            -{product.percents}% <p>מחיר לאחר הנחה</p>
                        </span>
                    )}
                    {localStorage.getItem("roles") === "manager" && (
                        <>
                            <Button
                                icon="pi pi-trash"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    DeleteProd(product.barCode);
                                }} className="p-button-rounded" style={{ color: 'red', border: '4%', borderBlockColor: 'red', backgroundColor: 'white' }} />
                            <Button
                                icon="pi pi-pencil"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedProduct(product);
                                    setVisible(true);
                                }} className="p-button-rounded" style={{ color: 'blue', border: '4%', borderBlockColor: 'blue', backgroundColor: 'white' }} />
                        </>
                    )}
                </div>

                <Dialog
                    header={`עריכת מוצר: ${selectedProduct?.name}`}
                    visible={visible && selectedProduct?._id === product._id}
                    onHide={() => {
                        setVisible(false);
                        setSelectedProduct(null);
                        refetch();
                    }}
                    style={{ width: '30vw' }}
                    modal
                    onClick={(e) => e.stopPropagation()}
                    dismissableMask>
                    {selectedProduct && <UpdateProduct barCode={selectedProduct.barCode} />}
                </Dialog>
            </div>
        </div >
    );

    const listItem = (product) => (
        <div key={product._id} className="col-12 p-2">
            <div className="flex align-items-center p-4 border-1 surface-border surface-card border-round" onClick={() => VeiwBigProd(product.barCode)}>
                <img src={`/Images/${product.img}`} alt={product.name} className="w-6rem shadow-2 border-round mr-4" />
                <div className="flex flex-column flex-grow-1">
                    <div className="text-xl font-bold">{product.name}</div>
                    <div className="text-sm text-600">{product.category}</div>
                    <Tag value={getAmountText(product)} severity={getSeverity(product)} className="mt-2 w-3rem text-center" />
                    <div className="mt-3">₪{product.price}</div>
                    {product.isSale && product.percents && (
                        <span style={{ color: 'red', fontWeight: 'bold', fontSize: '1.2rem' }}>
                            -{product.percents}% <p>מחיר לאחר הנחה</p>
                        </span>
                    )}
                    <div className="mt-2">
                        <Rating
                            value={ratings[product.barcode] || 0}
                            onChange={(e) => handleRatingChange(product.barcode, e.value)}
                            cancel={false}
                        />
                    </div>
                </div>
                <div className="flex flex-column gap-2 ml-4">
                    {localStorage.getItem("roles") === "manager" && (
                        <>
                            <Button
                                icon="pi pi-trash"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    DeleteProd(product.barCode);
                                }} className="p-button-rounded" style={{ color: 'red', border: '4%', borderBlockColor: 'red', backgroundColor: 'white' }} />
                            <Button
                                icon="pi pi-pencil"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedProduct(product);
                                    setVisible(true);
                                }} className="p-button-rounded" style={{ color: 'blue', border: '4%', borderBlockColor: 'blue', backgroundColor: 'white' }} />
                        </>
                    )}
                </div>
                <Dialog
                    header={`עריכת מוצר: ${selectedProduct?.name}`}
                    visible={visible && selectedProduct?._id === product._id}
                    onHide={() => {
                        setVisible(false);
                        setSelectedProduct(null);
                        refetch();
                    }}
                    style={{ width: '30vw' }}
                    modal
                    onClick={(e) => e.stopPropagation()}
                    dismissableMask
                >
                    {selectedProduct && <UpdateProduct barCode={selectedProduct.barCode} />}
                </Dialog>
            </div>
        </div>
    );

    const itemTemplate = (product, layout) => layout === 'list' ? listItem(product) : gridItem(product);

    const header = () => (
        <div className="flex justify-content-end">
            <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
        </div>
    );

    return (
        <div className="card">
            <DataView value={filteredProducts} itemTemplate={itemTemplate} layout={layout} header={header()} />
            {filteredProducts.length === 0 && <span>לא נמצאו מוצרים</span>}
        </div>
    );
};

export default VeiwAll;