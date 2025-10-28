import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { clearToken } from './features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { jwtDecode } from 'jwt-decode';

const Menu = () => {
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [promoIndex, setPromoIndex] = useState(0);
    const promotions = [
        'משלוח חינם בקניה מעל ₪10,000',
        'עד 50% הנחה על מוצרים מיוחדים',
        'הנחות לקראת סוף עונה',
        'משלוח תוך 5-7 ימי עסקים'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setPromoIndex((prev) => (prev + 1) % promotions.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [promotions.length]);

    const LogOut = () => {
        localStorage.clear();
        dispatch(clearToken());
        toast.current.show({ severity: 'info', summary: 'התנתקת', detail: 'יצאת מהמערכת', life: 3000 });
        navigate('/login');
    };

    const promoText = promotions[promoIndex];

    const Search = (word) => {
        localStorage.setItem('searchWord', word);
        navigate('/veiwAll/search');
    };

    const accept = () => {
        LogOut();
        setVisible(false);
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'ביטול', detail: 'ההתנתקות בוטלה', life: 3000 });
        setVisible(false);
    };

    const items = [
        localStorage.getItem('token') ? {
            label: `היי, ${jwtDecode(localStorage.getItem('token')).firstName}`
        } : {},
        {
            label: 'רישום',
            icon: 'pi pi-user-edit',
            command: () => navigate('/register')
        },
        {
            label: 'התחבר',
            icon: 'pi pi-sign-in',
            command: () => navigate('/logIn')
        },
        localStorage.getItem('token') ? {
            label: 'התנתק',
            icon: 'pi pi-sign-out',
            command: () => setVisible(true)
        } : {},
        localStorage.getItem('token') ? {
            label: 'דף הבית',
            icon: 'pi pi-home',
            command: () => navigate('')
        } : {},
        localStorage.getItem('token') ? {
            label: 'מוצרים',
            icon: 'pi pi-shop',
            command: () => navigate('/veiwAll')
        } : {},
        localStorage.getItem('token') ? {
            label: 'קטגוריות',
            icon: 'pi pi-tags',
            items: [
                { label: 'חדרי בנים', command: () => navigate('/veiwAll/boys') },
                { label: 'חדרי בנות', command: () => navigate('/veiwAll/girls') },
                { label: 'חדרי שינה', command: () => navigate('/veiwAll/parents') },
                { label: 'סלונים', command: () => navigate('/veiwAll/livingRooms') },
                { label: 'מטבחים', command: () => navigate('/veiwAll/kitchens') },
                { label: 'מוצרים במבצע', command: () => navigate('/veiwAll/onSale') }
            ]
        } : {},
        localStorage.getItem('token') ? {
            label: 'סל',
            icon: 'pi pi-shopping-cart',
            command: () => navigate('/basket')
        } : {}
    ];

    if (localStorage.getItem("roles") === "manager") {
        items.push({
            label: 'אוסף מוצר',
            icon: 'pi pi-plus',
            command: () => navigate('/addProduct')
        });
    }

    const start = <img alt="logo" src="Images/logo.png" height="40" className="mr-2" />;
    const end = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" onChange={(e) => Search(e.target.value)} />
            <i className="pi pi-search" style={{ color: 'var(--primary-color)' }}></i>
        </div>
    );

    return (
        <>
            <div className="promo-bar">
                <div key={promoIndex} className="slide-text">
                    {promoText}
                </div>
            </div>
            <div className="card2">
                <Menubar model={items} start={start} end={end} />
                <Toast ref={toast} />
                <ConfirmDialog
                    visible={visible}
                    onHide={() => setVisible(false)}
                    message="אתה בטוח שברצונך להתנתק?"
                    header="אישור"
                    icon="pi pi-exclamation-triangle"
                    accept={accept}
                    reject={reject}
                />
            </div>
        </>
    );
};

export default Menu;