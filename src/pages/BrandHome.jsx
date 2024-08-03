
import Hero from '../components/Hero/Hero'
import Category from '../components/Category/Category'
import Brand from '../components/Brand/Brand'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import BrandReview from '../components/BrandReview/BrandReview'

import ReviewComponent from '../components/CreatorReview/ReviewComponent'
import Home from '../components/Hero/Home'
const BrandHome = () => {
  return (
    <div>
    <Navbar/>
    <Hero />
    <Category />
    <Home />
    <ReviewComponent />
    <BrandReview />

    <Brand />
    <Footer />
    </div>
  )
}

export default BrandHome