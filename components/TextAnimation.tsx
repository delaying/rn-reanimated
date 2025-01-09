// https://www.animatereactnative.com/post/animated-sentence-reanimated-and-moti

import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  withDelay,
  useAnimatedStyle,
} from "react-native-reanimated";

const DELAY = 150;
const DURATION = 300;

const text = ["Hello", "World", "React Native"];

export default function TextAnimation({ width }: { width: number }) {
  const [isShown, setShown] = useState(false);

  const opacity1 = useSharedValue<number>(0);
  const opacity2 = useSharedValue<number>(0);
  const opacity3 = useSharedValue<number>(0);
  const translateY1 = useSharedValue<number>(4);
  const translateY2 = useSharedValue<number>(4);
  const translateY3 = useSharedValue<number>(4);

  const show = () => {
    if (isShown) {
      opacity3.value = 0;
      opacity2.value = 0;
      opacity1.value = 0;
      translateY3.value = 4;
      translateY2.value = 4;
      translateY1.value = 4;
    } else {
      opacity1.value = withDelay(
        0 * DELAY,
        withTiming(1, { duration: DURATION })
      );
      opacity2.value = withDelay(
        1 * DELAY,
        withTiming(1, { duration: DURATION })
      );
      opacity3.value = withDelay(
        2 * DELAY,
        withTiming(1, { duration: DURATION })
      );
      translateY1.value = withDelay(
        0 * DELAY,
        withTiming(0, { duration: DURATION })
      );
      translateY2.value = withDelay(
        1 * DELAY,
        withTiming(0, { duration: DURATION })
      );
      translateY3.value = withDelay(
        2 * DELAY,
        withTiming(0, { duration: DURATION })
      );
    }

    setShown(!isShown);
  };

  const animatedStyle1 = useAnimatedStyle(() => ({
    opacity: opacity1.value,
    transform: [{ translateY: translateY1.value }],
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    opacity: opacity2.value,
    transform: [{ translateY: translateY2.value }],
  }));

  const animatedStyle3 = useAnimatedStyle(() => ({
    opacity: opacity3.value,
    transform: [{ translateY: translateY3.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Animated.Text style={[styles.label, animatedStyle1]}>
          {text[0]}
        </Animated.Text>
        <Animated.Text style={[styles.label, animatedStyle2]}>
          {text[1]}
        </Animated.Text>
        {width > 450 && (
          <Animated.Text style={[styles.label, animatedStyle3]}>
            {text[2]}
          </Animated.Text>
        )}
      </View>
      {width <= 450 && (
        <Animated.Text style={[styles.label, animatedStyle3]}>
          {text[2]}
        </Animated.Text>
      )}
      <Button title={isShown ? "Hide" : "Show"} onPress={show} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    color: "white",
  },
});
