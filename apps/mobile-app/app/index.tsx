import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, Dimensions, Image, TouchableOpacity, StatusBar } from 'react-native';
import { onBoard1, onBoard2, onBoard3 } from '~/assets/images';
import { ConnectButtonAuth } from '~/components/ConnectButtonAuth';

const { width, height } = Dimensions.get('window');

// --- Onboarding Data ---
// This array holds the content for each slide.
const onboardingSlides = [
  {
    key: '1',
    title: 'Best Finance\nAdvice',
    description:
      'Expert-backed insights to help you make smarter money decisions—every step of the way.',
    image: onBoard1,
    backgroundColor: '#1E1A3E',
    textColor: 'text-[#949FFF]',
    indicatorBg: 'bg-white/30',
    indicatorActiveBg: 'bg-white',
    textSmall: 'text-[#D7D6FF]',
  },
  {
    key: '2',
    title: 'Easy To\nInvest',
    description: 'Start your investment journey with just a few taps. Simple, fast, and secure.',
    image: onBoard2,
    backgroundColor: '#D4FF00',
    textColor: 'text-black',
    indicatorBg: 'bg-black/30',
    indicatorActiveBg: 'bg-black',
  },
  {
    key: '3',
    title: 'End-to-End\nDesign Process For A Next-Gen Investment App',
    description: 'Track your portfolio performance with our next-gen investment tracking tools.',
    image: onBoard3,
    backgroundColor: '#EAE8FF',
    textColor: 'text-[#1E1F4B]',
    indicatorBg: 'bg-slate-400/50',
    indicatorActiveBg: 'bg-slate-800',
  },
];

const SLIDE_INTERVAL = 4000; // 4 seconds

// --- Main App Component ---
export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  // --- Auto-scroll Logic ---
  useEffect(() => {
    const timer = setInterval(() => {
      // Move to the next slide, or loop back to the first
      const nextIndex = (currentIndex + 1) % onboardingSlides.length;
      flatListRef.current?.scrollToIndex({ animated: true, index: nextIndex });
      setCurrentIndex(nextIndex);
    }, SLIDE_INTERVAL);

    // Clear the interval when the component is unmounted or index changes
    return () => clearInterval(timer);
  }, [currentIndex]);

  // --- Handle scroll to update the current index ---
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  // --- Renders each slide item ---
  const renderItem = ({ item }) => (
    <View
      className="flex-1 items-center"
      style={{ width: width, backgroundColor: item.backgroundColor }}>
      <View className="w-full flex-1 items-start px-4 pt-32">
        <Text className={`font-heading text-5xl uppercase leading-none ${item.textColor}`}>
          {item.title}
        </Text>
        <Text
          className={`font-body-light mt-4 max-w-xs text-base font-bold ${item.textSmall} opacity-80`}>
          {item.description}
        </Text>
      </View>

      <Image
        source={item.image}
        style={{ width: width, height: height * 0.7 }}
        className="absolute bottom-0"
        resizeMode="cover"
        onError={(e) => console.log('Image failed to load', e.nativeEvent.error)}
      />
    </View>
  );

  // --- Renders the top progress indicators ---
  const renderIndicators = () => {
    const currentSlide = onboardingSlides[currentIndex];
    return (
      <View className="absolute left-6 right-6 top-16 flex-row space-x-2">
        {onboardingSlides.map((_, index) => (
          <View
            key={index}
            className={`h-1 flex-1 rounded-full ${index === currentIndex ? currentSlide.indicatorActiveBg : currentSlide.indicatorBg}`}>
            {index === currentIndex && (
              <View
                className={`h-1 rounded-full ${currentSlide.indicatorActiveBg}`}
                style={{ width: '100%', transition: `width ${SLIDE_INTERVAL}ms linear` }}
              />
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar
        barStyle={
          onboardingSlides[currentIndex].backgroundColor === '#D4FF00'
            ? 'dark-content'
            : 'light-content'
        }
      />
      <FlatList
        ref={flatListRef}
        data={onboardingSlides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
      />
      {renderIndicators()}

      {/* --- "Get Started" Button --- */}
      {/* This button only shows on the last slide */}

      {/* <View className="absolute bottom-10 w-full items-center px-6">

        <TouchableOpacity
          className="w-full rounded-xl bg-slate-900 p-4"
          onPress={() => console.log('Get Started Pressed!')}>
          <Text className="text-center text-lg font-bold text-white">Get Started</Text>
        </TouchableOpacity>
      </View> */}
        <ConnectButtonAuth />
    </View>
  );
}
