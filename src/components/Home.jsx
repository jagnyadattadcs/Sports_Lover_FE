import React from 'react'
import Hero from './Hero'
import ShopByCategory from './ShopByCategory'
import BestOffers from './BestOffers'
import TrustedBrands from './TrustedBrands'
import BestSellers from './BestSellers'
import WhyChooseUs from './WhyChooseUs'
import HappyCustomers from './HappyCustomers'
import GetInTouch from './GetInTouch'

const Home = () => {
  return (
    <div>
      <Hero/>
      <ShopByCategory/>
      <BestOffers/>
      <TrustedBrands />
      <BestSellers/>
      <WhyChooseUs />
      <HappyCustomers/>
      <GetInTouch />
    </div>
  )
}

export default Home
