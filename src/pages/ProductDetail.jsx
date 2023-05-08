import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CardProduct from '../components/Home/CardProduct'
import ProductDescription from '../components/ProductDetail/ProductDescription'
import SliderImg from '../components/ProductDetail/SliderImg'
import { setIsLoading } from '../store/slices/isLoading.slice'
import './styles/productDetail.css'

const ProductDetail = () =>
{
  const { id } = useParams()

  const [ product, setProduct ] = useState()
  const [ similarProducts, setSimilarProducts ] = useState()
  const dispatch = useDispatch()

  const allProducts = useSelector( state => state.products )

  useEffect( () =>
  {
    dispatch( setIsLoading( true ) )
    const URL = `https://e-commerce-api-v2.academlo.tech/api/v1/products/${ id }`
    axios.get( URL )
      .then( res => setProduct( res.data ) )
      .catch( err => console.log( err ) )
      .finally( () => dispatch( setIsLoading( false ) ) )
  }, [ id ] )

  useEffect( () =>
  {
    if ( allProducts && product )
    {
      dispatch( setIsLoading( true ) )
      const pivot = allProducts.filter( prod => prod.category.name === product.category.name )
      setSimilarProducts( pivot )
      dispatch( setIsLoading( false ) )
    }
  }, [ allProducts, product ] )

  return (
    <div>
      <section className='product-selected'>
        <SliderImg className='product-slider' listImgs={ product?.images } />
        <ProductDescription className='product-description' product={ product } />
      </section>
      <section className='similar-items-container'>
        <h2>Discover similar items</h2>
        <div className='similar-products-container'>
          { similarProducts?.map( simProd =>
          {
            if ( simProd.title !== product.title )
            {
              return ( <CardProduct
                key={ simProd.id }
                product={ simProd } /> )
            }
          } ) }
        </div>
      </section>
    </div> )
}

export default ProductDetail;