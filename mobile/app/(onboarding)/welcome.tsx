import { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';

import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { PagerDots } from '@/components/onboarding/PagerDots';
import { PillButton } from '@/components/onboarding/PillButton';
import { ONBOARDING_SLIDES, OnboardingSlide } from '@/constants/onboarding';
import { theme } from '@/constants/theme';
import { typeScale } from '@/constants/typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SLIDE_WIDTH = SCREEN_WIDTH - theme.spacing.screenX * 2;

export default function WelcomeScreen() {
  const listRef = useRef<FlatList<OnboardingSlide>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === ONBOARDING_SLIDES.length - 1;

  const goNext = () => {
    if (isLastSlide) {
      router.push('/auth');
      return;
    }

    const nextIndex = activeIndex + 1;
    listRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    setActiveIndex(nextIndex);
  };

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SLIDE_WIDTH);
    setActiveIndex(index);
  };

  const renderSlide: ListRenderItem<OnboardingSlide> = ({ item }) => (
    <View style={[styles.slide, { width: SLIDE_WIDTH }]}>
      <Image
        source={require('@/assets/images/onboarding-hero.png')}
        style={styles.hero}
        accessibilityLabel="Student checking their phone with a campus map"
      />
      <Text style={styles.headline}>{item.headline}</Text>
      {item.body ? <Text style={styles.body}>{item.body}</Text> : null}
    </View>
  );

  return (
    <OnboardingScreen
      footer={
        <>
          <PagerDots count={ONBOARDING_SLIDES.length} activeIndex={activeIndex} />
          <PillButton
            label={isLastSlide ? 'Get Started' : 'Next'}
            onPress={goNext}
            accessibilityHint={
              isLastSlide ? 'Continue to sign in or create an account' : 'Go to the next intro screen'
            }
          />
        </>
      }>
      <FlatList
        ref={listRef}
        data={ONBOARDING_SLIDES}
        keyExtractor={(item) => item.id}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollToIndexFailed={() => {
          listRef.current?.scrollToOffset({ offset: activeIndex * SLIDE_WIDTH, animated: true });
        }}
        getItemLayout={(_, index) => ({
          length: SLIDE_WIDTH,
          offset: SLIDE_WIDTH * index,
          index,
        })}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    alignItems: 'flex-start',
  },
  slide: {
    alignItems: 'center',
    paddingTop: theme.spacing.sm,
  },
  hero: {
    width: theme.layout.heroSize,
    height: theme.layout.heroSize,
    borderRadius: theme.radius.card,
    marginBottom: theme.spacing.section,
  },
  headline: {
    ...typeScale.largeTitle,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  body: {
    ...typeScale.body,
    color: theme.colors.text,
    textAlign: 'center',
    maxWidth: 277,
  },
});
