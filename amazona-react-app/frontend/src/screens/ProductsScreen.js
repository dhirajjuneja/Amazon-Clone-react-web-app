import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProdcut } from '../actions/productAction';


function ProductsScreen(props){
    const [modelVisible, setModeVisible ] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const productList = useSelector(state => state.productList);
    const { products } = productList;
    
    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave ,success: succesSave, error: errorSave } = productSave;
    
    const productDelete = useSelector(state => state.productDelete);
    const { success: successDelete} = productDelete;
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(succesSave){
            setModeVisible(false);
        }
        dispatch(listProducts());
    return() => {
            //
        };//eslint-disable-next-line
    }, [succesSave, successDelete]);

    const openModel = (product) => {
        setModeVisible(true)
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({
            _id: id,
            name, price, brand, image, 
            category, countInStock, description}));
    }
    
    const deleteHandler = (product) => {
        dispatch(deleteProdcut(product._id))
    }
    return <div className="content content-margined">
        
        <div className="product-header">
            <h3>Products</h3>
            <button className="button primary" onClick={() => openModel({})}>Create Product</button>
        </div>
    {modelVisible && 
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                    <h2>Create Product</h2>
                    </li>
                    <li>
                        {loadingSave && <div>Loading...</div>}
                        {errorSave && <div>{errorSave}</div>}
                    </li>
                    <li>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)} >
                        </input>
                    </li>
                    <li>
                        <label htmlFor="price">
                            Price
                        </label>
                        <input type="number" name="price" value={price} id="price" onChange={(e) => setPrice(e.target.value)} >
                            </input>
                    </li>
                    <li>
                        <label htmlFor="image">
                            Image
                        </label>
                        <input type="text" name="image" value={image} id="image" onChange={(e) => setImage(e.target.value)} >
                            </input>
                    </li>
                    <li>
                        <label htmlFor="brand">
                            Brand
                        </label>
                        <input type="text" name="brand" value={brand} id="brand" onChange={(e) => setBrand(e.target.value)} >
                        </input>
                    </li>
                    <li>
                        <label htmlFor="countInStock">
                        CountInStock
                        </label>
                        <input type="number" name="countInStock" value={countInStock} id="countInStock" onChange={(e) => setCountInStock(e.target.value)} >
                        </input>
                    </li>
                    <li>
                        <label htmlFor="category">
                        Category
                        </label>
                        <input type="text" name="category" value={category} id="category" onChange={(e) => setCategory(e.target.value)} >
                        </input>
                    </li>
                    <li>
                        <label htmlFor="description">
                        Description
                        </label>
                        <input type="text" name="description" value={description} id="description" onChange={(e) => setDescription(e.target.value)} >
                        </input>
                    </li>
                    <li>
                        <button type="submit" className="button primary">{id ? "Update":"Create"}</button>
                    </li>
                    <li>
                        <button type="button" onClick={()=> setModeVisible(false)} className="button secondary">Back</button>
                    </li>
                </ul>
            </form>
        </div> 
    }
        <div className="product-list">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                        <td>{product._id}</td>
                        <th>{product.name}</th>
                        <th>{product.price}</th>
                        <th>{product.category}</th>
                        <th>{product.brand}</th>
                        <th>
                            <button className='button' onClick={()=> openModel(product)}>Edit</button>
                            {' '}    
                            <button className='button' onClick={() => deleteHandler(product)}>Delete</button>    
                        </th>        
                    </tr>
                    ))}
                   
                </tbody>
            </table>
        </div>
    </div>
    
    
    
}
export default ProductsScreen;