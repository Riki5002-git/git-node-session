import { useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog';
import { OrderList } from 'primereact/orderlist';
import { ProductService } from '../product/ProductService';
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useDeleteBasketMutation } from './basketApiSlice';
import { useVeiwAllQuery, useUpdateProductFuncMutation } from "../product/productApiSlice";

const Order = ({ visible, onHide, totalSum, basket }) => {
    const [deleteBasket] = useDeleteBasketMutation();
    const { data: allProducts = [] } = useVeiwAllQuery();
    const [updateProduct] = useUpdateProductFuncMutation();
    const [, setProducts] = useState([]);
    const [status, setStatus] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setStatus(true);
        const token = localStorage.getItem('token');
        ProductService.getProductsSmall(token).then((data) => setProducts(data));
    }, [visible]);

    const FinishOrder = async () => {
        for (let i = 0; i < basket.length; i++) {
            for (let j = 0; j < allProducts.length; j++) {
                if (basket[i].barCode === allProducts[j].barCode) {
                    if (basket[i].quantity > allProducts[j].amount) {
                        setStatus(false);
                        alert(`המוצר ${basket[i].name} לא קיים במלאי בכמות שביקשת`);
                        return;
                    }
                    const newAmount = allProducts[j].amount - basket[i].quantity;
                    await updateProduct({ barCode: allProducts[j].barCode, amount: newAmount });
                    break;
                }
            }
        }
        await deleteBasket();
        alert("הזמנתך בוצעה בהצלחה");
        navigate('/veiwAll');
    };

    const itemTemplate = (item) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={`Images/${item.img}`} alt={item.name} />
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{item.name}</span>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag text-sm"></i>
                        <span>{item.category}</span>
                    </div>
                </div>
                <span className="font-bold"> יחידות {item.quantity}</span>
                <span className="font-bold text-900">₪{item.price}</span>
            </div>
        );
    };

    return (
        <Dialog
            header="להזמנה"
            visible={visible}
            maximizable
            style={{ width: '50vw' }}
            onHide={onHide}
        >
            <span style={{ color: 'red' }}>סכום הסל שלך: ₪{totalSum}</span>
            <div className="card xl:flex xl:justify-content-center">
                <OrderList
                    dataKey="id"
                    value={basket}
                    itemTemplate={itemTemplate}
                    header="Basket Items"
                />
            </div>
            {status && <Button label="לתשלום" severity="success" onClick={() => FinishOrder()} />}
            {!status && <span>אינך רשאי לבצע הזמנה זו</span>}
        </Dialog>
    )
}

export default Order;