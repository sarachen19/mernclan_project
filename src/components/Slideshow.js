import React from 'react';
//import { SlideData } from '../components/SliderData';
import "../components/SlideShow.css"

const SlideShow = () => {
    const delay = 2500;
    const SliderData = [
        {
            image:'https://images.unsplash.com/photo-1526280760714-f9e8b26f318f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8am91cm5hbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
        },
        {
            image:'https://images.unsplash.com/photo-1517842645767-c639042777db?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bm90ZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
        },{
            image:'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGpvYiUyMGFwcGxpY2F0aW9ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
        
        },
        {
            image:'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8am9iJTIwYXBwbGljYXRpb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
        },{
            image:'https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGFza3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
        }
        ]

  const [index, setIndex] = React.useState(0);
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

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {SliderData.map((backgroundColor, index) => (
          <div
            className="slide"
            key={index}
            style={{ backgroundColor }}
          ></div>
        ))}
      </div>

      <div className="slideshowDots">
        {SliderData.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );

}

export default SlideShow;