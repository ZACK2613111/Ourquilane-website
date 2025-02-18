import Navbar from '@/components/layout/Navbar'
import React from 'react'
import Header from './Header'
import TechBackground from '@/components/common/Background'
import Training from './Training'
import TraineeWord from './TraineeWord'
import JoinUs from './JoinUs'
import Footer from '@/components/common/Footer'

const page = () => {
  return (
    <>
    <TechBackground />
        <Navbar />
        <Header />
        <Training />
        <TraineeWord />
        <JoinUs />
        <Footer />
    </>
  )
}

export default page