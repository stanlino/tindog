import { AnimatedBackground } from './components/animated_background'
import { Header } from './components/header'
import { Body } from './components/body'
import { Tutorial } from './components/tutorial_modal'
import { ScopeChanger } from './components/scope_changer'

import { Container } from './styles'
import { Footer } from './components/footer'
import { HomeProvider } from './contexts/home'

export function Home(){

  return (
    <HomeProvider>
      <Container>
        
        <AnimatedBackground />
        <Header />
      
        <Body />

        <Footer />

        <Tutorial />

        <ScopeChanger />

      </Container>
    </HomeProvider>
  )
}