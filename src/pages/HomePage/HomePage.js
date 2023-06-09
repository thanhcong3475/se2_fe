import React, {useEffect, useState} from 'react';
import "./HomePage.scss";
import HeaderSlider from "../../components/Slider/HeaderSlider";
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../../store/categorySlice';
import ProductList from "../../components/ProductList/ProductList";
import { fetchAsyncProducts, getAllProducts, getAllProductsStatus } from '../../store/productSlice';
import Loader from "../../components/Loader/Loader";
import { STATUS } from '../../utils/status';

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const productStatus = useSelector(getAllProductsStatus);
  useEffect(() => {
    dispatch(fetchAsyncProducts(20));  
  }, []);
  let productss = useSelector(getAllProducts);
  
  const [products, setProducts] = useState([])
  
  
  let productCopy = [...productss]
  const handleSortByNameAtoZ = () => {
    productCopy.sort((a, b) => {
      let title1 = a.title
      let title2 = b.title
      return (title1).localeCompare(title2)
    })
    productss = []
    setProducts(productCopy)
  }
  console.log(products)
  const handleSortByNameZtoA = () => {
    productCopy.sort((a, b) => {
      let title1 = a.title
      let title2 = b.title
      return (title2).localeCompare(title1)
    })
    productss = []
    setProducts(productCopy)
  }

  const handleSortByPriceLowest = () => {
    productCopy.sort((a, b) => {
      let priceA = (a.price) - (a.price * (a.discountPercentage / 100))
      let priceB = (b.price) - (b.price * (b.discountPercentage / 100))
      return (priceA) - (priceB)
    })
    productss = []
    setProducts(productCopy)
  }

  const handleSortByPriceHighest = () => {
    productCopy.sort((a, b) => {
      let priceA = (a.price) - (a.price * (a.discountPercentage / 100))
      let priceB = (b.price) - (b.price * (b.discountPercentage / 100))
      return (priceB) - (priceA)
    })
    productss = []
    setProducts(productCopy)
  }

  let catProductsOne = productss.filter(product => product.category === categories[0]);
  let catProductsTwo = productss.filter(product => product.category === categories[1]);
  let catProductsThree = productss.filter(product => product.category === categories[2]);
  let catProductsFour = productss.filter(product => product.category === categories[3]);

  return (
    <main>
      <div className='slider-wrapper'>
        <HeaderSlider />
      </div>
      <div className='main-content bg-whitesmoke'>
        <div className='container'>
          <div className='categories py-5'>
            <div className='categories-item'>
              <div className='title-md'>
                <h3>See our products</h3>
                <div class="dropdown">
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" onClick={handleSortByNameAtoZ}>a to z</a></li>
    <li><a class="dropdown-item" onClick={handleSortByNameZtoA}>z to a</a></li>
    <li><a class="dropdown-item" onClick={handleSortByPriceLowest}>price (lowest)</a></li>
    <li><a class="dropdown-item" onClick={handleSortByPriceHighest}>price (highest)</a></li>
  </ul>
</div>
              </div>
              { productStatus === STATUS.LOADING ? <Loader /> : <ProductList products = {products.length > 0 ? products : productss} />}
            </div>

            <div className='categories-item'>
              <div className='title-md'>
                <h3>{categories[0]}</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsOne} />}
            </div>

            <div className='categories-item'>
              <div className='title-md'>
                <h3>{categories[1]}</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsTwo} />}
            </div>

            <div className='categories-item'>
              <div className='title-md'>
                <h3>{categories[2]}</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsThree} />}
            </div>

            <div className='categories-item'>
              <div className='title-md'>
                <h3>{categories[3]}</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsFour} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default HomePage