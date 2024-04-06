import { StatusBar } from "expo-status-bar";
import { LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import {
  BlurMask,
  Canvas,
  Circle,
  Group,
  RoundedRect,
  SweepGradient,
  vec,
} from "@shopify/react-native-skia";
import Animated, {
  ReanimatedEvent,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
} from "react-native-reanimated";
import "./index.css";
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGesture,
} from "react-native-gesture-handler";

// function Square() {
//   const isPressed = useSharedValue(false);
//   const offset = useSharedValue({ x: 0, y: 0 });
//   const layoutDimensions = useSharedValue({ width: 0, height: 0 });

//   const onLayout = (event: LayoutChangeEvent) => {
//     layoutDimensions.value = {
//       width: event.nativeEvent.layout.width,
//       height: event.nativeEvent.layout.height,
//     };
//   };

//   const animatedStyles = useAnimatedStyle(() => {
//     return {
//       transform: [
//         { translateX: offset.value.x },
//         { translateY: offset.value.y },
//         {
//           scale: withSpring(isPressed.value ? 1.2 : 1, {
//             mass: 1,
//             damping: 100,
//             stiffness: 500,
//           }),
//         },
//       ],
//       backgroundColor: isPressed.value ? "#eed49f" : "#f9e2af",
//     };
//   });

//   const gesture = Gesture.Pan()
//     .onBegin(() => {
//       isPressed.value = true;
//     })
//     .onChange((e) => {
//       offset.value = {
//         x: e.changeX + offset.value.x,
//         y: e.changeY + offset.value.y,
//       };
//     })
//     .onFinalize((e: any) => {
//       offset.value = {
//         x: withDecay({ velocity: 1 }),
//         y: withDecay({ velocity: 1 }),
//       };

//       isPressed.value = false;
//     });

//   return (
//     <GestureDetector gesture={gesture}>
//       <Animated.View
//         onLayout={onLayout}
//         style={[styles.ball, animatedStyles]}
//       />
//     </GestureDetector>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   ball: {
//     width: 200,
//     height: 200,
//     borderRadius: 25,
//     alignSelf: "center",
//   },
// });

// function App() {
//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <Square />
//     </GestureHandlerRootView>
//   );
// }

const SIZE = 120;

function App() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const width = useSharedValue(0);
  const height = useSharedValue(0);
  const isPressed = useSharedValue(false);

  const onLayout = (event: LayoutChangeEvent) => {
    width.value = event.nativeEvent.layout.width;
    height.value = event.nativeEvent.layout.height;
  };

  const pan = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onChange((event) => {
      x.value += event.changeX;
      y.value += event.changeY;
    })
    .onFinalize((event) => {
      isPressed.value = false;
      x.value = withDecay({
        velocity: event.velocityX,
        rubberBandEffect: true,
        clamp: [-(width.value / 2) + SIZE / 2, width.value / 2 - SIZE / 2],
      });
      y.value = withDecay({
        velocity: event.velocityY,
        rubberBandEffect: true,
        clamp: [-(height.value / 2) + SIZE / 2, height.value / 2 - SIZE / 2],
      });
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { scale: withSpring(isPressed.value ? 1.2 : 1) },
    ],
    backgroundColor: isPressed.value ? "#eed49f" : "#f9e2af",
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <View onLayout={onLayout} style={styles.wrapper}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.box, animatedStyles]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  wrapper: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: SIZE,
    width: SIZE,
    backgroundColor: "#b58df1",
    borderRadius: 20,
    cursor: "grab",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default App;
