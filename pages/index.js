import Hero from '@/components/hero'
import Container from '@/components/container'

import React, { useState } from "react";

import IsOpenContext from '@/contexts/isOpenContext'

export default function Home() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <IsOpenContext.Provider value={{ isOpen, setIsOpen }}>
        <Hero />
      </IsOpenContext.Provider>
    </Container>
  )
}
