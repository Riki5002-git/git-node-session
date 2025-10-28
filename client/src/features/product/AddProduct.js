import { useAddProductFuncMutation } from './productApiSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from "primereact/inputtextarea";

const AddProduct = () => {
    const [addProduct, { isSuccess, isError, error }] = useAddProductFuncMutation();
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");
    const [, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        barCode: '',
        name: '',
        madeIn: '',
        designer: '',
        price: 0,
        amount: 0,
        isSale: false,
        percents: 0,
        img: '',
        category: '',
        description: '',
        quantity: 0
    });

    const category = ['girls', 'boys', 'parents', 'livingRooms', 'kitchens'];

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    useEffect(() => {
        if (isSuccess) {
            alert("add succesfully");
            navigate("/veiwAll");
        };
        if (isError) {
            setErrorMessage(error.data || "אחד או יותר מהנתונים שהזנת שגויים");
        };
    }, [isSuccess, navigate, isError, error]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let val = value;
        if (["price", "amount", "percents", "barCode", "rating", "quantity"].includes(name))
            val = Number(value);
        if (name === "isSale")
            val = value.toLowerCase() === "true";
        setFormData({
            ...formData,
            [name]: val
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct(formData);
    };

    if (localStorage.getItem("roles") !== "manager") {
        return <div><p>לא מורשה</p></div>;
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="form-addProduct">
            <div className="card">
                <div className="flex flex-column md:flex-row">
                    <h2 className="title-addProduct">Add Product</h2>
                    <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">BarCode</label>
                            <FloatLabel>
                                <InputText name="barCode" id="barCode" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Name</label>
                            <FloatLabel>
                                <InputText name="name" id="name" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">MadeIn</label>
                            <FloatLabel>
                                <InputText name="madeIn" id="madeIn" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Designer</label>
                            <FloatLabel>
                                <InputText name="designer" id="designer" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Price</label>
                            <FloatLabel>
                                <InputText name="price" id="price" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Amount</label>
                            <FloatLabel>
                                <InputText name="amount" id="amount" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">IsSale</label>
                            <FloatLabel>
                                <InputText name="isSale" id="isSale" type='Boolean' onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Percents</label>
                            <FloatLabel>
                                <InputText name="percents" id="percents" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Image</label>
                            <FloatLabel>
                                <InputText name="img" id="img" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Category</label>
                            <Dropdown value={formData.category} name="category" onChange={(e) => handleChange(e)} options={category} optionLabel="name"
                                showClear placeholder="Select a category" className="w-full md:w-14rem" />
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Description</label>
                            <InputTextarea autoResize name="description" value={formData.description} onChange={(e) => handleChange(e)} rows={5} cols={30} />
                        </div>
                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                        <Button label="Add Product" icon="pi pi-check" onClick={load} type="submit" />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddProduct;