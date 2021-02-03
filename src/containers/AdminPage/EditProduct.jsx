
import { Grid, Paper } from '@material-ui/core';
import React, {useState, useContext, useEffect} from 'react';
import {productContext} from '../../contexts/ProductsContext'
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';


const EditProduct = (props) => {
    const {productToEdit, saveTask} = useContext(productContext)
    const [newEditItem, setNewEditItem] = useState(productToEdit)
    useEffect (()=>{ // говорит, как ток productToEdit поменяется, закидывай в newEditItem productToEdit, замени все что там находится
        setNewEditItem(productToEdit)
    },[productToEdit])

    function handleEditInput1(e){
        let newObj = {
            ...newEditItem,
            img : e.target.value    
        }
        setNewEditItem(newObj);
    }
    function handleEditInput2(e){
        let newObj = {
            ...newEditItem,
            title : e.target.value
        }
        setNewEditItem(newObj);
    }
    function handleEditInput3(e){
        let newObj = {
            ...newEditItem,
            brand : e.target.value
        }
        setNewEditItem(newObj);
    }
    function handleEditInput4(e){
        let newObj = {
            ...newEditItem,
            gender : e.target.value
        }
        setNewEditItem(newObj);
    }
    function handleEditInput5(e){
        let newObj = {
            ...newEditItem,
            size : e.target.value
        }
        setNewEditItem(newObj);
    }
    function handleEditInput6(e){
        let newObj = {
            ...newEditItem,
            color : e.target.value
        }
        setNewEditItem(newObj);
    }
    function handleEditInput7(e){
        let newObj = {
            ...newEditItem,
            type : e.target.value
        }
        setNewEditItem(newObj);
    }
    function handleEditInput8(e){
        let newObj = {
            ...newEditItem,
            price : e.target.value
        }
        setNewEditItem(newObj);
    }
    function handleEditInput9(e){
        let newObj = {
            ...newEditItem,
            sale : e.target.value
        }
        setNewEditItem(newObj);
    }
    return (
        <Grid  item xs={12} sm={6}>
            <Paper style={{textAlign: 'center', margin: '60px 50px'}}>
                {newEditItem ? 
                <>
                    <h2>Edit</h2>
                    <span>Image</span><Input style={{width: '70%', margin: '10px 40px'}} onChange={handleEditInput1} value={newEditItem.img} type="text" /><br/>
                    <span>Title</span><Input style={{width: '70%', margin: '10px 40px'}} onChange={handleEditInput2} value={newEditItem.title} type="text"/><br/>
                    <span>Brand</span><Input style={{width: '70%', margin: '10px 40px'}} onChange={handleEditInput3} value={newEditItem.brand} type="text"/><br/>
                    <span>Gender</span><Input style={{width: '70%', margin: '10px 40px'}} onChange={handleEditInput4} value={newEditItem.gender} type="text"/><br/>
                    <span>Size</span><Input style={{width: '70%', margin: '10px 40px'}} onChange={handleEditInput5} value={newEditItem.size} type="text"/><br/>
                    <span>Color</span><Input style={{width: '70%', margin: '10px 40px'}} onChange={handleEditInput6} value={newEditItem.color} type="text"/><br/>
                    <span>Type</span><Input style={{width: '70%', margin: '10px 40px'}} onChange={handleEditInput7} value={newEditItem.type} type="text"/><br/>
                    <span>Price</span><Input style={{width: '70%', margin: '10px 40px'}} onChange={handleEditInput8} value={newEditItem.price} type="text"/><br/>
                    <span>Sale</span><Input style={{width: '70%', margin: '10px 40px'}} onChange={handleEditInput9} value={newEditItem.sale} type="text"/><br/>
                    <Button style={{margin: '15px'}} variant="contained" color="primary" onClick ={() => saveTask(newEditItem, props.history)} className="btn-save">Save</Button>
                </>
                : <h1>Loading</h1>}
            </Paper>
        </Grid>
    );
};

export default EditProduct;