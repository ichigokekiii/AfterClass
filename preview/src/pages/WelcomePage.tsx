import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import heroImage from '@assets/onboarding-hero.png';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { PagerDots } from '@/components/onboarding/PagerDots';
import { PillButton } from '@/components/onboarding/PillButton';
import { ONBOARDING_SLIDES } from '@/constants/onboarding';

export function WelcomePage() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = ONBOARDING_SLIDES[activeIndex];
  const isLastSlide = activeIndex === ONBOARDING_SLIDES.length - 1;

  const goNext = () => {
    if (isLastSlide) {
      navigate('/auth');
      return;
    }
    setActiveIndex((index) => index + 1);
  };

  return (
    <OnboardingScreen
      footer={
        <>
          <PagerDots count={ONBOARDING_SLIDES.length} activeIndex={activeIndex} />
          <PillButton label={isLastSlide ? 'Get Started' : 'Next'} onClick={goNext} />
        </>
      }>
      <div className="welcome-slide">
        <img
          src={heroImage}
          alt="Student checking their phone with a campus map"
          className="welcome-slide__hero"
          width={280}
          height={280}
        />
        <h1 className="welcome-slide__headline">{slide.headline}</h1>
        {slide.body ? <p className="welcome-slide__body">{slide.body}</p> : null}
      </div>
    </OnboardingScreen>
  );
}
