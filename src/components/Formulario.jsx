import React, {useState} from 'react';

const opciones = [
    {producto: 'Abrigo', precio: 30},
    {producto: 'Aretes', precio: 2.50},
    {producto: 'Bufanda', precio: 15},
    {producto: 'Camiseta', precio: 25},
    {producto: 'Calcetines', precio: 5},
    {producto: 'Pantalon', precio: 32},
    {producto: 'Pulcera', precio: 3.75},
    {producto: 'Sombrero', precio: 17.80},
    {producto: 'Vestido', precio: 45},
    {producto: 'Zapatos', precio: 33}]

const Form = () => {
    
    const [Producto, setProducto]=useState({})
    const [Productos, setProductos]=useState([])

    const [Precios, setPrecios]=useState([])

    const [Cantidad, setCantidad]=useState({})
    const [Cantidades, setCantidades]=useState([])

    const handleChange = e => setProducto({[e.target.name]: e.target.value})

    const handleChangeCan = (e, indexProd) => {
        setCantidad({[e.target.name]: e.target.value})
        Cantidades.splice(indexProd,1,e.target.value)
    }

    const FuncTotal = () => {
        var totalCompra = 0
        Precios.map((valuePrec, indexPrec) => 
        totalCompra += (parseFloat(valuePrec) * parseInt(Cantidades.find((valueCant, indexCant) => indexCant === indexPrec))))
        return totalCompra
    }

const handleClick = e => {
    if((Producto.Lproducto === undefined) || (Producto.Lproducto === ' '))
    {
        alert('Por favor, seleccione un producto')
    }
    else
    {
        const PrecioF = opciones.find((elemento) => elemento.producto === Producto.Lproducto)
        setPrecios([...Precios, PrecioF.precio])
        
        setProductos([...Productos, Producto.Lproducto])
        setCantidades([...Cantidades, '0'])
    }
}

const deleteProducto = indice => {
    const newProductos = [...Productos]
    newProductos.splice(indice,1)
    setProductos(newProductos)

    
    const newPrecios = [...Precios]
    newPrecios.splice(indice,1)
    setPrecios(newPrecios)

    
    const newCantidad = [...Cantidades]
    newCantidad.splice(indice,1)
    setCantidades(newCantidad)
}

    return (
        <>
        <form onSubmit = { e=> e.preventDefault()}>
            <label>Seleccione los productos</label><br/><br/>
            

            <table>
                <tr>
                    <td>
                        <select name='Lproducto' onChange={handleChange} >
                        <option></option>
                        {opciones.map((value) => <option>{value.producto}</option>)}
                        </select>  
                    </td>
                    <td>
                        <p></p>
                    </td>
                    <td>
                        <button onClick={handleClick}>agregar</button>
                    </td>
               </tr>
            </table>


            
            <p>_________________________________</p>

            <h4> 
            {
                // Por cada elemento agregado generamos una tabla para organizar los datos de manera rapida
                Productos.map((valuePod, indexProd) => 
                    <table name='ResumenDatos'>
                        <tr>
                            <td>{valuePod}</td>
                            <td>${Precios.find((valuePrec, index2) => indexProd === index2)}</td>
                            <td><input type='number' name='SCantidad' min='1' 
                                onChange={(e) => {handleChangeCan(e, indexProd)}}></input></td>


                            <td><button className="btn-delete" onClick={() => deleteProducto(indexProd)}>x</button></td>
                        </tr>
                        <tr>
                            <td>
                            <p>_________________________________</p>
                            </td>
                        </tr>
                    </table>
                )
            }
            
            {
                <p>
                    Total ${FuncTotal()}
                </p>
            }
            </h4>
        </form>
        
        </>
    )
}

export default Form
