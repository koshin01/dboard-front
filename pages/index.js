import Hero from '@/components/hero'
import Container from '@/components/container'

import Meta from '@/components/meta'

import React, { useState } from "react";

import IsOpenContext from '@/contexts/isOpenContext'

import eyecatch from '@/images/opg.jpeg'

export default function Home({alchmeyURL}) {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <Meta pageImg = {eyecatch.src} pageImgW = {eyecatch.width} pageImgH = {eyecatch.height}/>
      <IsOpenContext.Provider value={{ isOpen, setIsOpen }}>
        <Hero alchmeyURL = { alchmeyURL }/>
      </IsOpenContext.Provider>
    </Container>
  )
}

export async function getStaticProps() {
  const alchmeyURL = process.env.YOUR_ALCHEMY_API_URL;
  return{
    props: {
      "alchmeyURL":alchmeyURL,
    }
  }
}
