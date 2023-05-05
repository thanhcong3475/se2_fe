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
  const [products, setProducts] = useState(useSelector(getAllProducts))
  const categories = useSelector(getAllCategories);
  const productStatus = useSelector(getAllProductsStatus);

  useEffect(() => {
    dispatch(fetchAsyncProducts(50));  
  }, []);

  // let products = useSelector(getAllProducts);
  // setProducts(products )
  
  const handleSortByNameAtoZ = () => {
    let productCopy = [...products]
    productCopy.sort((a, b) => {
      let title1 = a.title
      let title2 = b.title
      return (title1).localeCompare(title2)
    })
    setProducts(productCopy)
    // products = productss
  }

  const handleSortByNameZtoA = () => {
    const productCopy = [...products]
    productCopy.sort((a, b) => {
      let title1 = a.title
      let title2 = b.title
      return (title2).localeCompare(title1)
    })
    setProducts(productCopy)
    // products = productss
  }

  const handleSortByPriceLowest = () => {
    const productCopy = [...products]
    productCopy.sort((a, b) => {
      let priceA = (a.price) - (a.price * (a.discountPercentage / 100))
      let priceB = (b.price) - (b.price * (b.discountPercentage / 100))
      return (priceA) - (priceB)
    })
    setProducts(productCopy)
    // products = productss
  }

  const handleSortByPriceHighest = () => {
    const productCopy = [...products]
    productCopy.sort((a, b) => {
      let priceA = (a.price) - (a.price * (a.discountPercentage / 100))
      let priceB = (b.price) - (b.price * (b.discountPercentage / 100))
      return (priceB) - (priceA)
    })
    setProducts(productCopy)
    // products = productss
  }

  let catProductsOne = products.filter(product => product.category === categories[0]);
  let catProductsTwo = products.filter(product => product.category === categories[1]);
  let catProductsThree = products.filter(product => product.category === categories[2]);
  let catProductsFour = products.filter(product => product.category === categories[3]);

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
              { productStatus === STATUS.LOADING ? <Loader /> : <ProductList products = {products} />}
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