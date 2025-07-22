import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import backgroundImage from '../assets/images/P1010346 1@2x.png'

gsap.registerPlugin(ScrollTrigger)

const QuiBoxPage = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [surveyData, setSurveyData] = useState({
    wellness_goals: [],
    experience_level: '',
    preferred_products: [],
    delivery_preference: '',
    budget_range: '',
    special_considerations: ''
  })
  const [showSurvey, setShowSurvey] = useState(false)
  
  const heroRef = useRef(null)
  const benefitsRef = useRef(null)

  const surveyQuestions = [
    {
      id: 'wellness_goals',
      question: 'What are your primary wellness goals?',
      type: 'multiple',
      options: [
        'Stress Relief & Relaxation',
        'Better Sleep Quality',
        'Pain Management',
        'Skin Health & Beauty',
        'Focus & Mental Clarity',
        'General Wellness'
      ]
    },
    {
      id: 'experience_level',
      question: 'What\'s your experience level with CBD?',
      type: 'single',
      options: [
        'Complete Beginner',
        'Some Experience',
        'Regular User',
        'Expert/Enthusiast'
      ]
    },
    {
      id: 'preferred_products',
      question: 'Which product types interest you most?',
      type: 'multiple',
      options: [
        'Tinctures & Oils',
        'Capsules & Gummies',
        'Topical Creams',
        'Skincare Products',
        'Bath & Body',
        'Wellness Supplements'
      ]
    },
    {
      id: 'delivery_preference',
      question: 'How often would you like your QuiBox delivered?',
      type: 'single',
      options: [
        'Monthly',
        'Bi-Monthly (Every 2 months)',
        'Quarterly (Every 3 months)'
      ]
    },
    {
      id: 'budget_range',
      question: 'What\'s your preferred budget range per box?',
      type: 'single',
      options: [
        '$50 - $75',
        '$75 - $100',
        '$100 - $150',
        '$150+'
      ]
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(heroRef.current.children,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2,
          delay: 0.3
        }
      )

      // Benefits animation
      gsap.fromTo(benefitsRef.current.children,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  const handleAnswerSelect = (questionId, answer, isMultiple = false) => {
    if (isMultiple) {
      setSurveyData(prev => ({
        ...prev,
        [questionId]: prev[questionId].includes(answer)
          ? prev[questionId].filter(item => item !== answer)
          : [...prev[questionId], answer]
      }))
    } else {
      setSurveyData(prev => ({
        ...prev,
        [questionId]: answer
      }))
    }
  }

  const nextStep = () => {
    if (currentStep < surveyQuestions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Survey completed
      console.log('Survey completed:', surveyData)
      alert('Thank you! Your personalized QuiBox recommendations will be emailed to you within 24 hours.')
      setShowSurvey(false)
      setCurrentStep(0)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentQuestion = surveyQuestions[currentStep]
  const currentAnswers = surveyData[currentQuestion?.id] || []
  const canProceed = currentQuestion?.type === 'multiple' 
    ? currentAnswers.length > 0 
    : currentAnswers !== ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-light-green)] via-white to-[var(--color-light-green)]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={heroRef} className="text-center max-w-4xl mx-auto">
            <h1 className="font-extralight text-[var(--color-dark-green)] mb-6"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  letterSpacing: '-0.02em',
                  fontSize: 'clamp(3rem, 6vw, 4.5rem)'
                }}>
              The QuiBox Experience
            </h1>
            <p className="text-[var(--color-dirt)] text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto mb-8">
              Your personalized CBD wellness journey, curated just for you based on your unique needs and preferences.
            </p>
            <button
              onClick={() => setShowSurvey(true)}
              className="px-8 py-4 bg-[var(--color-dark-red)] text-white rounded-lg font-medium text-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:scale-105"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Take Personalization Survey
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-extralight text-[var(--color-orange)] mb-4"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)'
                }}>
              How Your QuiBox is Created
            </h2>
          </div>
          
          <div ref={benefitsRef} className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center opacity-0">
              <div className="w-16 h-16 bg-[var(--color-light-pink)] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[var(--color-dark-red)]" style={{ fontFamily: 'Playfair Display, serif' }}>1</span>
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-dark-green)] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Take Survey
              </h3>
              <p className="text-[var(--color-dirt)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Answer questions about your wellness goals and preferences
              </p>
            </div>
            
            <div className="text-center opacity-0">
              <div className="w-16 h-16 bg-[var(--color-orange)] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>2</span>
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-dark-green)] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                AI Matching
              </h3>
              <p className="text-[var(--color-dirt)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Our algorithm matches you with perfect products from our curated selection
              </p>
            </div>
            
            <div className="text-center opacity-0">
              <div className="w-16 h-16 bg-[var(--color-light-green)] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[var(--color-dark-green)]" style={{ fontFamily: 'Playfair Display, serif' }}>3</span>
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-dark-green)] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Expert Curation
              </h3>
              <p className="text-[var(--color-dirt)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                CBD specialists review and finalize your personalized selection
              </p>
            </div>
            
            <div className="text-center opacity-0">
              <div className="w-16 h-16 bg-[var(--color-purple)] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>4</span>
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-dark-green)] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Delivered
              </h3>
              <p className="text-[var(--color-dirt)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Receive your custom QuiBox with detailed guides and usage tips
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-extralight text-[var(--color-dark-green)] mb-6"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)'
                }}>
              Why Choose QuiBox?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-[var(--color-dark-red)] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                100% Personalized
              </h3>
              <p className="text-[var(--color-dirt)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Every product is selected specifically for your needs, goals, and preferences. No generic boxes here.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-[var(--color-orange)] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Premium Quality
              </h3>
              <p className="text-[var(--color-dirt)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Only the highest quality, lab-tested CBD products from trusted artisans and sustainable sources.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-[var(--color-dark-green)] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Expert Guidance
              </h3>
              <p className="text-[var(--color-dirt)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Detailed usage guides, dosage recommendations, and wellness tips from CBD specialists.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-extralight text-[var(--color-clay)] mb-6"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2rem, 4vw, 3rem)'
              }}>
            Ready to Start Your Personalized Journey?
          </h2>
          <p className="text-[var(--color-dirt)] text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Take our quick survey to get your first personalized QuiBox recommendation, or explore our subscription options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setShowSurvey(true)}
              className="px-8 py-4 bg-[var(--color-dark-red)] text-white rounded-lg font-medium text-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:scale-105"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Take Survey Now
            </button>
            <Link to="/subscriptions">
              <button className="px-8 py-4 border-2 border-[var(--color-dark-green)] text-[var(--color-dark-green)] rounded-lg font-medium text-lg hover:bg-[var(--color-dark-green)] hover:text-white transition-all duration-300 hover:scale-105"
                      style={{ fontFamily: 'Poppins, sans-serif' }}>
                View Subscriptions
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Survey Modal */}
      {showSurvey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSurvey(false)} />
          
          <div className="relative bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-[var(--color-light-green)]/30">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-[var(--color-dark-green)]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Personalization Survey
                </h3>
                <button
                  onClick={() => setShowSurvey(false)}
                  className="text-[var(--color-dirt)] hover:text-[var(--color-dark-red)] transition-colors text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="mt-4">
                <div className="w-full bg-[var(--color-light-green)]/30 rounded-full h-2">
                  <div 
                    className="bg-[var(--color-dark-green)] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / surveyQuestions.length) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-[var(--color-dirt)] mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Question {currentStep + 1} of {surveyQuestions.length}
                </p>
              </div>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {currentQuestion && (
                <div>
                  <h4 className="text-xl font-semibold text-[var(--color-dark-green)] mb-6" 
                      style={{ fontFamily: 'Playfair Display, serif' }}>
                    {currentQuestion.question}
                  </h4>
                  
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(
                          currentQuestion.id, 
                          option, 
                          currentQuestion.type === 'multiple'
                        )}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                          (currentQuestion.type === 'multiple' 
                            ? currentAnswers.includes(option)
                            : currentAnswers === option)
                            ? 'border-[var(--color-dark-green)] bg-[var(--color-light-green)]/30' 
                            : 'border-[var(--color-light-green)] hover:border-[var(--color-dark-green)]/50'
                        }`}
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-[var(--color-light-green)]/30 flex justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentStep === 0 
                    ? 'text-[var(--color-dirt)]/50 cursor-not-allowed' 
                    : 'text-[var(--color-dark-green)] hover:bg-[var(--color-light-green)]/30'
                }`}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Previous
              </button>
              
              <button
                onClick={nextStep}
                disabled={!canProceed}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  canProceed 
                    ? 'bg-[var(--color-dark-green)] text-white hover:bg-[var(--color-dark-red)]' 
                    : 'bg-[var(--color-dirt)]/30 text-[var(--color-dirt)] cursor-not-allowed'
                }`}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {currentStep === surveyQuestions.length - 1 ? 'Complete Survey' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default QuiBoxPage
