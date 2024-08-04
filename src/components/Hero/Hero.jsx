
import Slider from 'react-slick' 
import { useNavigate } from 'react-router-dom'
import Image1 from "../../assets/influencer/—Pngtree—instagram post frame template vector_6492066.png"
import Image2 from "../../assets/influencer/png-clipart-social-media-marketing-influencer-marketing-social-media-company-text-thumbnail-removebg-preview.png"
import Image3 from "../../assets/influencer/png-transparent-target-market-target-audience-influencer-marketing-advertising-audience-company-content-marketing-service-thumbnail-removebg-preview.png"
import Image4 from "../../assets/brand/png-transparent-social-media-marketing-influencer-marketing-business-social-media-text-friendship-logo-removebg-preview.png"
import Image5 from "../../assets/brand/180758.png"
import Button from '../Shared/Button'
const HeroData=[
    {
        id:1,
        img: Image1,
        subtitle: "Connect me",
        title:"Social Media",
        title2:"Instagram"
    },
    {
        id:2,
        img: Image2,
        subtitle: "Connect me",
        title:"Social Media",
        title2:"Facebook"
    },
    {
        id:3,
        img: Image3,
        subtitle: "Connect me",
        title:"Social Media",
        title2:"Reels"
    },
    {
        id:4,
        img: Image4,
        subtitle: "Join me",
        title:"Brand value",
        title2:"Brand"
    },
    {
        id:5,
        img: Image5,
        subtitle: "Join me",
        title:"Brand value",
        title2:"Instagram"
    }
]

const Hero = () => {
  const navigate=useNavigate();
    const settings={
        dots:false,
        arrows:false,
        infinite: true,
        speedd: 800,
        slideToScroll:1,
        autoplay:true,
        autoplaySpeed:4000,
        cssEase: "ease-in-out",
        pauseOnHover: false,
        pauseOnFocus:true,
    };
  return (
    <div className='container'>
        <div className=' overflow-hidden rounded-3xl min-h-[550px] 
        sm:min-h-[650px] flex justify-center items-center
        hero-bg-color'>
            <div className='container pb-8 sm:pb-0'>
            <Slider {...settings}>
                {
                    HeroData.map((data)=>(
                        <div key={data.id}>
                            <div className='grid grid-cols-1 sm:grid-cols-2'>
                                <div className='flex flex-col justify-center gap-4 sm:pl-3 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10'>
                                    <h1 className='text-2xl sm:text-6xl lg:text-2xl font-bold  '>{data.subtitle}</h1>
                                    <h1 className='text-5xl sm:text-6xl lg:text-4xl font-bold'>{data.title}</h1>
                                    <h1 className='text-5xl uppercase text-white dark:text-white/5  sm:text-[80px] md:text-[100px] xl:text-[150px] font-bold'>{data.title2}</h1>
                                    <h3> Find the perfect partnerships for your niche with Infusion using powerful search and analytics tools by channels, requirements, interests, and more!</h3>
                                    <div
                      data-aos="fade-up"
                      data-aos-offset="0"
                      data-aos-duration="500"
                      data-aos-delay="300"
                      className='py-4'
                      
                    >
                      <Button
                        text="I am brand"
                        bgColor="bg-primary"
                        textColor="text-white"
                        handler={()=>{navigate('/brand/dashboard')}}
                      />
                    </div>
                    <div
                      data-aos="fade-up"
                      data-aos-offset="0"
                      data-aos-duration="500"
                      data-aos-delay="300"
                    >
                      <Button
                        text="I am creator"
                        bgColor="bg-white"
                        textColor="text-red"
                        handler={()=>{navigate('/creator/dashboard')}}
                      />
                    </div>
                                </div>
                                <div className='order-1 sm:order-2'>
                                <div>
                                <img src={data.img} alt='brand-img'
                                className='w-[300px] h-[300px] sm:h-[450px] sm:scale-105 lg:scale-110 object-contain bg-transparent mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] relative'/>    

                                </div>
                                </div>

                            </div>

                        </div>
                    ))
                }

            </Slider>
            </div>

        </div>
    </div>
  )
}

export default Hero;