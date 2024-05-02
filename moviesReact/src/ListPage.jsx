import { useEffect, useState } from 'react';

import Header from './Header.jsx'
import Footer from './Footer.jsx'

const INITIAL_PAGE = 1;
const PRODUCTS_PER_PAGE = 3;

function ListPage({productList, currentPage, setCurrentPage}) {
  return <div className="container">
    <h2>Nuestros productos</h2>
    <PageFilter currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    <ProductList productList={productList}/>
  </div>
}

function PageFilter({currentPage, setCurrentPage}) {

  function changePage(page) {
    page = Math.max(1, page);
    setCurrentPage(page);
  }

  return <>
    <div className="buttons">
      <button onClick={() => changePage(currentPage - 1)} disabled={currentPage==INITIAL_PAGE}>&lt;</button>
      <input type="number" value={currentPage} onChange={(e) => changePage(e.target.value)}/>
      <button onClick={() => changePage(currentPage + 1)}>&gt;</button>
    </div>
  </>
}

function ProductList({productList}) {
  return (<div>
    {productList.map(product =>
        <Product key={product.id} product={product} />
      )}
  </div>);
}

function Product({product}) {
  return (
    <div className="product-details" id="productDetails">
      <img src={product.thumbnail} alt="Thumbnail" id="thumbnail" />
      <div className="info">
        <h2>Producto</h2>
        <p>{product.description}</p>
        <p>
          <strong>Precio:</strong><span>{product.price}€</span>
        </p>
        <p>
          <strong>Stock:</strong> <span>{product.stock}</span>
        </p>
      </div>
    </div>)
}

function App() {
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    let skip = (currentPage - INITIAL_PAGE) * PRODUCTS_PER_PAGE;
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de productos');
        }
        const data = await response.json();
        //console.log(data.products[0]);
        setProductList(data.products);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  return (
      <ListPage productList={productList} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
  )
}

export default App
