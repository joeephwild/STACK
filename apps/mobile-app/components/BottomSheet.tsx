import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

export interface BottomSheetRef {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
}

interface BottomSheetProps {
  children: React.ReactNode;
  onClose?: () => void;
}

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ children, onClose }, ref) => {
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);

    const scrollTo = (destination: number) => {
      'worklet';
      active.value = destination !== 0;

      translateY.value = withSpring(destination, { damping: 50 });
    };

    const isActive = () => {
      return active.value;
    };

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), []);

    const context = useSharedValue({ y: 0 });
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        if (translateY.value > -SCREEN_HEIGHT / 3) {
          scrollTo(0);
          if (onClose) {
            runOnJS(onClose)();
          }
        } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
          scrollTo(MAX_TRANSLATE_Y);
        }
      });

    const rBottomSheetStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateY.value }],
      };
    });

    const rBackdropStyle = useAnimatedStyle(() => {
      return {
        opacity: withTiming(active.value ? 1 : 0),
      };
    }, []);

    const handleBackdropPress = () => {
      scrollTo(0);
      onClose?.();
    };

    return (
      <>
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 1,
            },
            rBackdropStyle,
          ]}
          pointerEvents={active.value ? 'auto' : 'none'}
        >
          <TouchableWithoutFeedback onPress={handleBackdropPress}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
        </Animated.View>

        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[
              {
                height: SCREEN_HEIGHT,
                width: '100%',
                backgroundColor: 'white',
                position: 'absolute',
                top: SCREEN_HEIGHT,
                borderRadius: 25,
                zIndex: 2,
              },
              rBottomSheetStyle,
            ]}
          >
            <View className="w-full items-center py-4">
              <View className="h-1 w-12 rounded-full bg-gray-300" />
            </View>
            <View className="flex-1 px-6">{children}</View>
          </Animated.View>
        </GestureDetector>
      </>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';

export default BottomSheet;