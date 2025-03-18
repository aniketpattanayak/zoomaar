import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import Categories from '../components/Categories'
import ContentCarousel from '../components/ContentCarousel'
// import CustomerLiveStreams from '../components/CustomerLiveStreams'
// import Viewer from '../components/Viewer'
import StoryFeed from '../components/StoryFeed'
import Viewer from '../components/Viewer'
import ViewerLiveStream from '../components/ViewerLiveStream'

const Home = () => {
  return (
    <div>
      <Categories/>
      <Hero />
      <ContentCarousel/>
      <ViewerLiveStream/>
      {/* <Viewer/> */}
      {/* <StoryFeed/> */}
      {/* //<CustomerLiveStreams/> */}
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home
