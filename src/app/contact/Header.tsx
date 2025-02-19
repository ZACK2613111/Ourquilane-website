'use client'
import { useLanguage } from '@/context/LanguageContext'
import WhiteButton from '@/components/shared/WhiteButton'

const Header = () => {
  const { language } = useLanguage()

  // Text translations based on the language
  const buttonText = language === "FR" ? "COMMENT NOUS TRAVAILLONS" : "HOW WE WORK"
  const heading1 = language === "FR" ? "Vous avez un projet ?" : "Got a Project?"
  const heading2 = language === "FR" ? "Ourquilane est là" : "Ourquilane is Here"
  const paragraph = language === "FR" 
    ? "Nous sommes là pour vous aider et vous accompagner à chaque étape de votre transformation numérique." 
    : "We are here to help and support you through every step of your digital transformation journey."

  return (
    <section className="mb-16 md:mb-24 text-center relative z-10">
      <div className="mb-8">
        <WhiteButton 
          title={buttonText} 
          handleClick={() => {}}
        />
      </div>
      
      <h1 className="text-4xl md:text-6xl font-semibold text-white mb-6 font-gabarito leading-tight">
        <span className="block">{heading1}</span>
        <span className="block">{heading2}</span>
      </h1>

      <p className="text-lg md:text-xl text-grayDescription max-w-3xl mx-auto font-dmSans">
        {paragraph}
      </p>
    </section>
  )
}

export default Header
