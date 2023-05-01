import Hero from '@/components/hero'
import Container from '@/components/container'

import Meta from '@/components/meta'

import React, { useState } from "react";

import IsOpenContext from '@/contexts/isOpenContext'

import eyecatch from '@/images/opg.jpeg'

export default function Home() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <Meta pageImg = {eyecatch.src} pageImgW = {eyecatch.width} pageImgH = {eyecatch.height}/>
      <IsOpenContext.Provider value={{ isOpen, setIsOpen }}>
        <Hero />
      </IsOpenContext.Provider>
    </Container>
  )
}
