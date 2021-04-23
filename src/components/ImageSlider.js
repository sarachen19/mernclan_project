import React, {useState} from 'react';
import { SliderData } from '../components/SliderData';

import {FaArrowAltCircleRight,FaArrowAltCircleLeft} from 'react-icons/fa';

const ImageSlider = ({slides}) =>
{
    const[current,setCurrent] = useState(0);
    const length = slides.length;
    
    const [index, setIndex] = React.useState(0);
    const delay = 2500;
    const timeoutRef = React.useRef(null);

 

    React.useEffect(() => {
      const resetTimeOut = () => {
          if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
          }
      }
  
      resetTimeOut();
      timeoutRef.current = setTimeout(
        () =>
          setIndex((prevIndex) =>
            prevIndex === SliderData.length - 1 ? 0 : prevIndex + 1
          ),
        delay
      );
  
      return () => {
          resetTimeOut();
      };
    }, [index]);


    const nextSlide =() =>
    {
        setCurrent(current === length-1 ? 0 : current +1);
    }

    const prevSlide =() =>
    {
        setCurrent(current ===  0 ? length-1:current-1);
    }

    if(!Array.isArray(slides)|| slides.length <=0){
        return null;
    }
    return(
        <section className="slider">
      <div>
          <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide}/>
          <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide}/>
            {SliderData.map((slide,index) => {
                return(
                    <div className={index === current ? 'slideActive' : 'slide'} key={index}>
                        {index===current && (<img src ={slide.image} alt="note images" className="image"/>)}
                
                </div>
                )
             

            })}
       </div>
       </section>
    );
};

export default ImageSlider;