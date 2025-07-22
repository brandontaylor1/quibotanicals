import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import FeaturedProductCard from '../components/FeaturedProductCard'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import Slider from 'react-slick'

gsap.registerPlugin(ScrollTrigger)

const FeaturedProducts = () => {
    const sectionRef = useRef(null)
    const titleRef = useRef(null)
    const sliderRef = useRef(null)
    const buttonRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate title
            gsap.fromTo(titleRef.current.children, 
                { opacity: 0, y: 50 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8, 
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            )

            // Animate slider
            gsap.fromTo(sliderRef.current, 
                { opacity: 0, y: 30 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8,
                    delay: 0.4,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            )

            // Animate button
            gsap.fromTo(buttonRef.current, 
                { opacity: 0, y: 30 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8,
                    delay: 0.6,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const PrevArrow = ({ onClick }) => (
        <div className="absolute left-[-30px] sm:left-[-50px] top-[50%] transform -translate-y-1/2 cursor-pointer z-10"
        onClick={onClick}>
            <MdArrowBackIos size={30} className="sm:w-[40px] sm:h-[40px]" color='var(--color-dark-green)' />
        </div>
    );

    const NextArrow = ({ onClick }) => (
        <div
        className="absolute right-[-30px] sm:right-[-50px] top-[50%] transform -translate-y-1/2 cursor-pointer z-10"
        onClick={onClick}
        >
        <MdArrowForwardIos size={30} className="sm:w-[40px] sm:h-[40px]" color="var(--color-dark-green)" />
        </div>
    );

    const settings = {
        dots: true, 
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

  return (
    <section ref={sectionRef} className='py-12 sm:py-16 md:py-20'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12 sm:mb-16">
          <h1 className='font-extralight text-[var(--color-dark-green)] mb-4 opacity-0'
              style={{
                fontFamily: 'Playfair Display, serif',
                letterSpacing: '-0.02em',
                fontSize: 'clamp(3rem, 6vw, 4.5rem)'
              }}>
            Featured Products
          </h1>
          <p className="text-[var(--color-dirt)] text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-0 px-4 sm:px-0">
            Discover our most loved CBD products, carefully selected for their quality and effectiveness
          </p>
        </div>
        
        <div ref={sliderRef} className='relative max-w-6xl mx-auto opacity-0'>
          <Slider {...settings}>
            <FeaturedProductCard />
            <FeaturedProductCard />
            <FeaturedProductCard />
            <FeaturedProductCard />
          </Slider>
        </div>
        
        <div ref={buttonRef} className="text-center mt-8 sm:mt-12 opacity-0">
          <Link to="/all-products">
            <button 
              className="px-6 sm:px-8 py-3 sm:py-4 bg-[var(--color-dark-green)] text-white rounded-lg font-medium text-base sm:text-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:scale-105"
            >
              VIEW ALL PRODUCTS
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts