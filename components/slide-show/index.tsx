import React from 'react';
import Slider from 'react-slick';
import Slide from './Slide';
import { HiOutlineChevronRight, HiOutlineChevronLeft } from 'react-icons/hi';
import { baseURL } from '@/config';
import axios from 'axios';
const Carousel = () => {
  const settings = {
    infinite: true,
      dots: false, // show pagination dots
  arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    appendDots: (dots: string) => (
      <div className="bg-transparent !pb-[40px]">
        <ul> {dots} </ul>
      </div>
    ),
  };
  const[adds,setAdds]=React.useState<any>([])
    React.useEffect(() => {
    
      async function fetchAdds() {
        try {
          const { data } = await axios.get(`${baseURL}api/advertisement`);
          setAdds(data.data);
        
        } catch (error: any) {
        }
      }
      fetchAdds();
    }, []);

  return (
    <div className="relative z-0">
      <Slider {...settings}>
        {adds.map((slideContent:any) => {
          return <Slide  slideContent={slideContent} />;
        })}
      </Slider>
      <>
      
      
      </>
    </div>
  );
};

export default Carousel;
