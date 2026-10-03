import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedRef,
  measure,
  runOnJS,
} from 'react-native-reanimated';
import { 
  Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

const SIZE = 50;
const { HEIGHT, WIDTH } = Dimensions.get('window');

function App() {

  const [isOverlapping1, setIsOverlapping1] = useState(false);
  const [isOverlapping2, setIsOverlapping2] = useState(false);
  const [isOverlapping3, setIsOverlapping3] = useState(false);
  const [isOverlapping4, setIsOverlapping4] = useState(false);

  const target1X = useSharedValue(-40);
  const target1Y = useSharedValue(-10);
  const target11X = useSharedValue(-45);
  const target11Y = useSharedValue(0);
  const startX11 = useSharedValue(0);
  const startY11 = useSharedValue(0);
  const draggble1Ref = useAnimatedRef();
  const target1Ref = useAnimatedRef();

  const target2X = useSharedValue(190);
  const target2Y = useSharedValue(-60);
  const target22X = useSharedValue(-15);
  const target22Y = useSharedValue(0);
  const startX22 = useSharedValue(0);
  const startY22 = useSharedValue(0);
  const draggble2Ref = useAnimatedRef();
  const target2Ref = useAnimatedRef();

  const target3X = useSharedValue(-40);
  const target3Y = useSharedValue(60);
  const target33X = useSharedValue(15);
  const target33Y = useSharedValue(0);
  const startX33 = useSharedValue(0);
  const startY33 = useSharedValue(0);
  const draggble3Ref = useAnimatedRef();
  const target3Ref = useAnimatedRef();
  

  const target4X = useSharedValue(190);
  const target4Y = useSharedValue(10);
  const target44X = useSharedValue(45);
  const target44Y = useSharedValue(0);
  const startX44 = useSharedValue(0);
  const startY44 = useSharedValue(0);
  const draggble4Ref = useAnimatedRef();
  const target4Ref = useAnimatedRef();

  const translateX11 = useSharedValue(0);
  const translateY11 = useSharedValue(0);

  const redPanGestureEvent = Gesture.Pan()
  .onStart(() => {
    startX11.value = target11X.value;
    startY11.value = target11Y.value;

  })
  .onUpdate((event) => {
      target11X.value = event.translationX + startX11.value;
      target11Y.value = event.translationY + startY11.value;

      const targetLayout = measure(target1Ref);
      const draggableLayout = measure(draggble1Ref);

      if(draggableLayout && targetLayout) {

                    /* 1ST APPROACH - TO GET THE PARTIAL OVERLAPPING */

        const overlapDetected = 
          draggableLayout.pageX < targetLayout.pageX + targetLayout.width &&
          draggableLayout.pageX + draggableLayout.width > targetLayout.pageX &&
          draggableLayout.pageY < targetLayout.pageY + targetLayout.height &&
          draggableLayout.pageY + draggableLayout.height > targetLayout.pageY;

                    /* 2ND APPROACH - TO GET THE EXACT OVERLAPPING */ 
          // 1. Find the centers
        const dragCenterX = draggableLayout.pageX + (draggableLayout.width / 2);
        const dragCenterY = draggableLayout.pageY + (draggableLayout.height / 2);
        const targetCenterX = targetLayout.pageX + (targetLayout.width / 2);
        const targetCenterY = targetLayout.pageY + (targetLayout.height / 2);

        // 2. Set pixel buffer allowance 
        const TOLERANCE = 8; 

        // 3. Check alignment
        const exactMatch = 
          Math.abs(dragCenterX - targetCenterX) <= TOLERANCE &&
          Math.abs(dragCenterY - targetCenterY) <= TOLERANCE;

        runOnJS(setIsOverlapping1)(exactMatch);

      }

  });

  const bluePanGestureEvent = Gesture.Pan()
  .onStart(() => {
    startX22.value = target22X.value;
    startY22.value = target22Y.value;
  })
  .onUpdate((event) => {
    target22X.value = event.translationX + startX22.value;
    target22Y.value = event.translationY + startY22.value;

    const targetLayout = measure(target2Ref);
    const draggableLayout = measure(draggble2Ref);

      if(draggableLayout && targetLayout) {
  
        const dragCenterX = draggableLayout.pageX + (draggableLayout.width / 2);
        const dragCenterY = draggableLayout.pageY + (draggableLayout.height / 2);
        const targetCenterX = targetLayout.pageX + (targetLayout.width / 2);
        const targetCenterY = targetLayout.pageY + (targetLayout.height / 2);

        const TOLERANCE = 8; 
        
        const exactMatch = 
          Math.abs(dragCenterX - targetCenterX) <= TOLERANCE &&
          Math.abs(dragCenterY - targetCenterY) <= TOLERANCE;

          runOnJS(setIsOverlapping2)(exactMatch);
      }
  });

  const greenPanGestureEvent = Gesture.Pan()
  .onStart(() => {
    startX33.value = target33X.value;
    startY33.value = target33Y.value;
  })
  .onUpdate((event) => {
    target33X.value = event.translationX + startX33.value;
    target33Y.value = event.translationY + startY33.value;

    const targetLayout = measure(target3Ref);
      const draggableLayout = measure(draggble3Ref);

      if(draggableLayout && targetLayout) {
        
        const dragCenterX = draggableLayout.pageX + (draggableLayout.width / 2);
        const dragCenterY = draggableLayout.pageY + (draggableLayout.height / 2);
        const targetCenterX = targetLayout.pageX + (targetLayout.width / 2);
        const targetCenterY = targetLayout.pageY + (targetLayout.height / 2);


        const TOLERANCE = 8; 

        const exactMatch = 
          Math.abs(dragCenterX - targetCenterX) <= TOLERANCE &&
          Math.abs(dragCenterY - targetCenterY) <= TOLERANCE;

        runOnJS(setIsOverlapping3)(exactMatch);
      }
  });

  const orangePanGestureEvent = Gesture.Pan()
  .onStart(() => {
    startX44.value = target44X.value;
    startY44.value = target44Y.value;
  })
  .onUpdate((event) => {
    target44X.value = event.translationX + startX44.value;
    target44Y.value = event.translationY + startY44.value;

    const targetLayout = measure(target4Ref);
      const draggableLayout = measure(draggble4Ref);

      if(draggableLayout && targetLayout) {

        const dragCenterX = draggableLayout.pageX + (draggableLayout.width / 2);
        const dragCenterY = draggableLayout.pageY + (draggableLayout.height / 2);
        const targetCenterX = targetLayout.pageX + (targetLayout.width / 2);
        const targetCenterY = targetLayout.pageY + (targetLayout.height / 2);

        const TOLERANCE = 8; 

        const exactMatch = 
          Math.abs(dragCenterX - targetCenterX) <= TOLERANCE &&
          Math.abs(dragCenterY - targetCenterY) <= TOLERANCE;

        runOnJS(setIsOverlapping4)(exactMatch);
      }
  });

  const animatedStyle1 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: target1X.value },
        { translateY: target1Y.value }
      ],

      borderWidth: isOverlapping1 ? 3 : 1.2,

      shadowColor: 'black',
      shadowOpacity: isOverlapping1 ? 1 : 0,
      shadowRadius: isOverlapping1 ? 15 : 0,
      shadowOffset: {
        width: 0,
        height: 0,
      },

    }
  });
  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: target2X.value },
        { translateY: target2Y.value }
      ],

      borderWidth: isOverlapping2 ? 3 : 1.2,

      shadowColor: 'black',
      shadowOpacity: isOverlapping2 ? 1 : 0,
      shadowRadius: isOverlapping2 ? 15 : 0,
      shadowOffset: {
        width: 0,
        height: 0,
      },
    }
  });
  const animatedStyle3 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: target3X.value },
        { translateY: target3Y.value }
      ],

      borderWidth: isOverlapping3 ? 3 : 1.2,

      shadowColor: 'black',
      shadowOpacity: isOverlapping3 ? 1 : 0,
      shadowRadius: isOverlapping3 ? 15 : 0,
      shadowOffset: {
        width: 0,
        height: 0,
      },
    }
  });
  const animatedStyle4 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: target4X.value },
        { translateY: target4Y.value }
      ],

      borderWidth: isOverlapping4 ? 3 : 1.2,

      shadowColor: 'black',
      shadowOpacity: isOverlapping4 ? 1 : 0,
      shadowRadius: isOverlapping4 ? 15 : 0,
      shadowOffset: {
        width: 0,
        height: 0,
      },
    }
  });

  const animatedStyle11 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: target11X.value },
        { translateY: target11Y.value }
      ]
    }
  });
  const animatedStyle22 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: target22X.value },
        { translateY: target22Y.value }
      ]
    }
  });
  const animatedStyle33 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: target33X.value },
        { translateY: target33Y.value }
      ]
    }
  });
  const animatedStyle44 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: target44X.value },
        { translateY: target44Y.value }
      ]
    }
  });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
          
          /*<Text style={[styles.statusText, 
            { color: isOverlapping1 ? 'green' : 'red' }]}
            >
            {isOverlapping1 ? '🔥 OVERLAPPING!' : '❌ Not Overlapping'}
          </Text>*/

          <Animated.View style={{
              // backgroundColor: 'pink',
              width: WIDTH,
            }}>
            <Animated.View
              ref={target1Ref}
              style={[
                styles.one,
                animatedStyle1
              ]}
            />
            <Animated.View
              ref={target2Ref}
              style={[
                styles.two,
                animatedStyle2
              ]}
            />
            <Animated.View
              ref={target3Ref}
              style={[
                styles.three,
                animatedStyle3
              ]}
            />
            <Animated.View
              ref={target4Ref}
              style={[{...styles.four, marginBottom: 160,}, 
              animatedStyle4
            ]}
            />

            <Animated.View
              style={{
                // backgroundColor: 'black',
                flexDirection: 'row',
                marginTop: 150,
              }}
            >
            <GestureDetector gesture={redPanGestureEvent}>
              <Animated.View
                ref={draggble1Ref}
                style={[
                  {...styles.one, backgroundColor: 'red'},
                  animatedStyle11
                ]}
              />
            </GestureDetector>
            <GestureDetector gesture={bluePanGestureEvent}>
              <Animated.View
                ref={draggble2Ref}
                style={[
                  {...styles.two, backgroundColor: 'blue'},
                  animatedStyle22
                ]}
              />
            </GestureDetector>
            <GestureDetector gesture={greenPanGestureEvent}>
              <Animated.View
                ref={draggble3Ref}
                style={[
                  {...styles.three, backgroundColor: 'green'},
                  animatedStyle33
                ]}
              />
            </GestureDetector>
            <GestureDetector gesture={orangePanGestureEvent}>
              <Animated.View
                ref={draggble4Ref}
                style={[
                  {...styles.four, backgroundColor: 'orange'},
                  animatedStyle44
                ]}
              />
            </GestureDetector>

            </Animated.View>

          </Animated.View>
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
   statusText: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    top: 80,
  },
  one: {
    height: SIZE,
    width: SIZE,
    borderColor: 'red',
    borderWidth: 1.2,
    borderRadius: 4,
  },
  two: {
    height: SIZE,
    width: SIZE,
    borderColor: 'blue',
    borderWidth: 1.2,
    borderRadius: 4,
  },
  three: {
    height: SIZE,
    width: SIZE,
    borderColor: 'green',
    borderWidth: 1.2,
    borderRadius: 4,
  },
  four: {
    height: SIZE,
    width: SIZE,
    borderColor: 'orange',
    borderWidth: 1.2,
    borderRadius: 4,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  }
})

export default App;
