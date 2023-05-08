import React, { useState } from 'react';
import './styles/sliderImg.css'

const SliderImg = ( { listImgs } ) =>
{
  const [ indexImg, setIndexImg ] = useState( 0 )

  const styleContainer = {
    transform: `translateX(calc(100% * -${ indexImg }/3))`
  }
  const handleBack = () =>
  {
    if ( indexImg - 1 < 0 )
    {
      setIndexImg( 2 )
    } else
    {
      setIndexImg( indexImg - 1 )
    }
  }
  const handleNext = () =>
  {
    if ( indexImg + 1 > 2 )
    {
      setIndexImg( 0 )
    } else
    {
      setIndexImg( indexImg + 1 )
    }
  }

  return (
    <div className='slider'>
      <button onClick={ handleBack } className='slider-back' type=""><i className="fa-solid fa-chevron-left"></i></button>
      <div style={ styleContainer } className='slider-container'>
        { listImgs?.map( ( img ) => (
          <div className='slider-img-container' key={ img.id }>
            <img className='slider-img' src={ img.url } alt="" />
          </div>
        ) ) }
      </div>
      <button onClick={ handleNext } className='slider-next' type=""><i className="fa-solid fa-angle-right"></i></button>
      <ul className='slider-ul'>
        {
          listImgs?.map( ( img, index ) => (
            <li className={ `slider-img-container ${ index === indexImg && 'slider-border' }` } onClick={ () => setIndexImg( index ) } key={ img.id }>
              <img className='slider-img' src={ img.url } alt="" />
            </li>
          ) )
        }
      </ul>
    </div>
  );
};

export default SliderImg;