/*import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
} from 'react-native-reanimated';

const SIZE = 100;

function App() {

  const handleRotation = (opacity) => {
    'worklet';
    return `${opacity.value * 2 * Math.PI}rad`;                                                               
  }

  const opacity = useSharedValue(1);
  const scale = useSharedValue(2);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      borderRadius: (opacity.value * SIZE) / 2,
      transform: [
        { scale: scale.value },
        { rotate: handleRotation(opacity) },
      ],
    };
  });

  useEffect(() => {
    opacity.value = withRepeat(withSpring(0.5), 3, true);
    scale.value = withRepeat(withSpring(1), 3, true);
  });


  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            height: SIZE,
            width: SIZE,
            backgroundColor: 'blue',
          },
          animatedStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default App;*/

/*import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const SIZE = 100;
const CIRCLE_RADIUS = SIZE * 2;

function App() {
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + startX.value;
      translateY.value = event.translationY + startY.value;
    })
    .onEnd(() => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if(distance < CIRCLE_RADIUS + SIZE/2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
      <GestureDetector gesture={panGestureEvent}>
        <Animated.View style={[styles.square, animatedStyle]} />
      </GestureDetector>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    height: CIRCLE_RADIUS * 2,
    width: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: 'rgba(0, 0, 255, 0.5)',
  },
  square: {
    height: SIZE,
    width: SIZE,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 255, 0.5)',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default App;*/

/*import { StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  Extrapolation,
  interpolate,
} from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');
const SIZE = width * 0.7;

const DATA = ["What's", 'up', 'mobile', 'devs'];

function App() {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });



  const Page = ({ title, index }) => {

    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

    const animatedSquare = useAnimatedStyle(() => {
      const scale = interpolate(translateX.value, inputRange, [0, 1, 0], Extrapolation.CLAMP);
      const borderRadius = interpolate(translateX.value, inputRange, [0, SIZE/2, 0], Extrapolation.CLAMP);
      const opacity = interpolate(translateX.value, inputRange, [0, 1, 0], Extrapolation.CLAMP);

      return {
        opacity: opacity,
        borderRadius: borderRadius,
        transform: [{scale}]
      }
    })

    const animatedText = useAnimatedStyle(() => {
      const translateY = interpolate(translateX.value, inputRange, [height/2, 0, -height/2], Extrapolation.CLAMP);

      const opacity = interpolate(translateX.value, inputRange, [-2, 1, -2], Extrapolation.CLAMP);

      return {
        opacity: opacity,
        transform: [{translateY: translateY}]
      }
    })

    return(
      <Animated.View
        style={[{...styles.page}, {backgroundColor: `rgba(0, 0, 255, 0.${index + 2})`}]}
      >
        <Animated.View
          style={[styles.square, animatedSquare]}
        >
        <Animated.Text style={[styles.text, animatedText]}>{title}</Animated.Text>
        </Animated.View>
      </Animated.View>
    )

  };

  return (
    <Animated.ScrollView
      pagingEnabled
      onScroll={scrollHandler}
      scrollHandlerThrottle={16}
      horizontal
      style={styles.container}>
      {DATA.map((title, index) => {
        return <Page title={title} index={index} key={index} />;
      })}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 60,
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'rgba(0, 0, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  page: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;*/

/*import { useState } from 'react';
import { StyleSheet, Dimensions, Switch } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';

const { height } = Dimensions.get('window');

const SIZE = height / 3;

function App() {

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const pageStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(isEnabled, [true, false], ['#1a1a1a', '#ffffff']);

    return {
      backgroundColor: backgroundColor,
    }
  });

  const textStyle = useAnimatedStyle(() => {
    const textColor = interpolateColor(isEnabled, [true, false], ['#fff', '#000']);

    return {
      color: textColor,
    }
  });

  const circleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(isEnabled, [true, false], ['#262626', '#fff']);

    return {
      backgroundColor: backgroundColor
    }
  })

  return (
    <Animated.View style={[styles.container, pageStyle]}>
      <Animated.Text style={[styles.text, textStyle]}>THEME</Animated.Text>
      <Animated.View style={[styles.circle, circleStyle]}>
        <Switch
          trackColor={{ false: '#d9d8d9', true: '#d9d8d9' }}
          thumbColor={isEnabled ? '#ebadd6' : '#ebadd6'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  circle: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: '#fff',
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  text: {
    fontSize: 75,
    marginBottom: 80,
    fontWeight: '600',
    letterSpacing: 16,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;*/

/*import { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');

function App() {
  const DATA = [
    {
      id: 1,
      color: '#8080ff',
      title: 'One',
    },
    {
      id: 2,
      color: '#33ff99',
      title: 'Two',
    },
    {
      id: 3,
      color: '#33ff99',
      title: 'One',
    },
    {
      id: 4,
      color: '#8080ff',
      title: 'Two',
    },
    {
      id: 5,
      color: '#8080ff',
      title: 'One',
    },
    {
      id: 6,
      color: '#33ff99',
      title: 'Two',
    },
    {
      id: 7,
      color: '#33ff99',
      title: 'One',
    },
    {
      id: 8,
      color: '#8080ff',
      title: 'Two',
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [paddingValue, setPaddingValue] = useState(220);

  const DABBA = ({ item, index }) => {
  const dheight = useSharedValue(220);
  const dwidth = useSharedValue(160);
  const dmarginHor = useSharedValue(10);

  const isSelected = index === selectedIndex;

  // Update animation values based on selected index
  useEffect(() => {
    if (selectedIndex === null) {
      // Reset all
      dheight.value = withTiming(220, { duration: 500 });
      dwidth.value = withTiming(160, { duration: 500 });
      dmarginHor.value = withTiming(10, { duration: 500 });
    } else if (isSelected) {
      // Expand selected
      dheight.value = withTiming(height, { duration: 500 });
      setPaddingValue(height);
      dwidth.value = withTiming(width, { duration: 500 });
      dmarginHor.value = withTiming(0, { duration: 500 });
    } else {
      // Shrink others
      dheight.value = withTiming(0, { duration: 500 });
      dwidth.value = withTiming(0, { duration: 500 });
      dmarginHor.value = withTiming(0, { duration: 500 });
    }
  }, [selectedIndex]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: dheight.value,
      width: dwidth.value,
      marginHorizontal: dmarginHor.value,
    };
  });

  const handlePress = () => {
    setSelectedIndex(index);
  };

  const handleCancel = () => {
    setSelectedIndex(null);
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.View
        style={[
          {
            backgroundColor: item.color,
            borderRadius: 8,
            marginBottom: 20,
            alignItems: 'center',
            justifyContent: 'center',
          },
          animatedStyle,
        ]}>
        <Text
          style={{
            fontSize: 25,
            color: '#fff',
          }}>
          {index + 1}
        </Text>
        {isSelected && (
          <TouchableOpacity
            onPress={handleCancel}
            style={{
              position: 'absolute',
              right: 15,
              top: 20,
            }}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios7/512/FFFFFF/cancel.png' }}
              style={{
                height: 30,
                width: 30,
              }}
            />
          </TouchableOpacity>
        )}
      </Animated.View>
    </Pressable>
  );
};


  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: 80,
        paddingTop: paddingValue == height ? 0 : 40,
        backgroundColor: '#595959',
      }}>
      <FlatList
        style={{
          alignSelf: 'center',
        }}
        data={DATA}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <DABBA item={item} index={index} key={index} />
        )}
        numColumns={2}
      />
    </View>
  );
}

export default App;*/

/*import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
  withSpring,
} from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const DATA = [
  {
    id: 1,
    name: 'Bangalore',
    image:
      'https://images.unsplash.com/vector-1749793541593-bb1594beb487?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: 'Hyderabad',
    image:
      'https://plus.unsplash.com/premium_vector-1721494020696-3329fda17bd4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI2fHx8ZW58MHx8fHx8',
  },
  {
    id: 3,
    name: 'Kolkata',
    image:
      'https://images.unsplash.com/vector-1749549739614-7ef4457d9e97?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMyfHx8ZW58MHx8fHx8',
  },
  {
    id: 4,
    name: 'Bhubaneswar',
    image:
      'https://plus.unsplash.com/premium_vector-1721494020657-79978645cb6a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIzfHx8ZW58MHx8fHx8',
  },
  {
    id: 5,
    name: 'USA',
    image:
      'https://images.unsplash.com/vector-1749730126421-31f04d0bb763?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDU2fHx8ZW58MHx8fHx8',
  },
  {
    id: 6,
    name: 'UK',
    image:
      'https://plus.unsplash.com/premium_vector-1711987563279-524661713381?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMyfHx8ZW58MHx8fHx8',
  },
  {
    id: 7,
    name: 'UK',
    image:'https://plus.unsplash.com/premium_vector-1739876197578-975b7af8f6ed?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8',
  },
];

function App() {
  const scrollX = useSharedValue(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const SCENE = ({ item, index }) => {
    const imageStyle = useAnimatedStyle(() => {
      const inputRange = [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
      ];

      const translateY = withSpring(interpolate(
        scrollX.value,
        inputRange,
        [0, -90, 0],
        Extrapolation.CLAMP
      ));

      return {
        transform: [{ translateY }],
      };
    });

    return (
      <View style={styles.scene}>
        <Animated.Image
          source={{ uri: item.image }}
          style={[styles.image, imageStyle]}
        />
      </View>
    );
  };

  const BlurImage = ({ item, index, scrollX }) => {

    const imageStyle = useAnimatedStyle(() => {
      const opacity = interpolate(scrollX.value, [(index - 1) * width, index * width, (index + 1) * width], [0, 1, 0], Extrapolation.CLAMP);

      return {
        opacity: opacity
      }
    })

    return (
      <Animated.Image
        source={{ uri: item.image }}
        style={[StyleSheet.absoluteFillObject, imageStyle]}
        blurRadius={50}
      />
    );
  };

  const Dot = ({index, scrollX}) => {

    const dotStyle = useAnimatedStyle(() => {

      const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

      const dotWidth = interpolate(scrollX.value, inputRange, [5, 26, 5], Extrapolation.CLAMP);
      const opacity = interpolate(scrollX.value, inputRange, [0.3, 0.8, 0.3], Extrapolation.CLAMP);
      

      return {
        width: dotWidth,
        height: 5,
        backgroundColor: `rgba(255, 255, 255, ${opacity})`,
        marginHorizontal: 6,
        borderRadius: 3,
      }
    })

    return(
      <Animated.View
        style={dotStyle}
      />
    )
  }

  const renderDot = () => {
    return(
      <View
        style={styles.dotView}
      >
        {
          DATA.map((_, index) => {
            return <Dot key={index} index={index} scrollX={scrollX}/>
          })
        }
      </View>
    )
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={StyleSheet.absoluteFillObject}>
        {DATA.map((item, index) => {
          return <BlurImage item={item} index={index} key={index} scrollX={scrollX}/>;
        })}
      </View>
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.id.toString()}
        pagingEnabled={true}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScrollHandler={onScrollHandler}
        renderItem={({ item, index }) => {
          return <SCENE item={item} index={index} key={index} />;
        }}
      />
      {renderDot()}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  dotView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 60,
  },
  scene: {
    width: width,
    alignSelf: 'center',
  },
  image: {
    height: 450,
    width: '70%',
    alignSelf: 'center',
    borderRadius: 16,
    marginTop: 180,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default App;*/

/*import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DATA = [
  {
    id: 1,
    name: 'Bangalore',
    image:
      'https://plus.unsplash.com/premium_vector-1697729623881-75ef547e7880?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDg0fHx8ZW58MHx8fHx8',
  },
  {
    id: 2,
    name: 'Kolkata',
    image:
      'https://plus.unsplash.com/premium_vector-1716429471828-a946ace6289d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM2fHx8ZW58MHx8fHx8',
  },
  {
    id: 3,
    name: 'Bhubaneswar',
    image:
      'https://plus.unsplash.com/premium_vector-1739235854583-783d8c0202ac?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDUzfHx8ZW58MHx8fHx8',
  },
  {
    id: 4,
    name: 'UK',
    image: 'https://plus.unsplash.com/premium_vector-1698192237740-668e12593412?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI0fHx8ZW58MHx8fHx8',
      
  },
];

function App() {
  const [arranged, setArranged] = useState(false);

  const handleBack = () => {
    setArranged(true);
    setTimeout(() => setArranged(false), 300); 
  };

  const PIC = ({ item, index }) => {
    const startX = useSharedValue(0);
    const startY = useSharedValue(0);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    useEffect(() => {
      if (arranged) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    }, [arranged]);

    const panGestureEvent = Gesture.Pan()
      .onStart(() => {
        startX.value = translateX.value;
        startY.value = translateY.value;
      })
      .onUpdate((event) => {
        translateX.value = event.translationX + startX.value;
        translateY.value = event.translationY + startY.value;
      })
      .onEnd(() => {
      });

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: translateX.value },
          { translateY: translateY.value },
        ],
      };
    });

    return (
      <GestureDetector gesture={panGestureEvent}>
        <Animated.View style={[styles.view, animatedStyle]}>
          <Image source={{ uri: item.image }} style={styles.image}/>
        </Animated.View>
      </GestureDetector>
    );
  };

  return (
    <View style={styles.container}>
      {DATA.map((item, index) => {
        return <PIC item={item} index={index} key={index} />;
      })}
      <TouchableOpacity style={styles.back} onPress={handleBack}>
        <Icon name="delete" color="#fff" size={25} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    height: 50,
    width: 65,
    borderRadius: 30,
    backgroundColor: '#8533ff',
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#00f',
    shadowOpacity: 0.6,
    shadowRadius: 5,
    shadowOffset: {
      height: 8,
      width: 5,
    }
  },
  image: {
    height: 180,
    width: 130,
    borderRadius: 10,
  },
  view: {
    position: 'absolute',
    borderWidth: 10,
    borderColor: '#fff',
    borderRadius: 18,
    shadowColor: '#00f',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      height: 3,
      width: 3,
    }
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a366ff',
  },
});

export default App;*/

//Painting Board
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window');

const COLORS = [
  'red',
  'purple',
  'blue',
  'cyan',
  'green',
  'yellow',
  'orange',
  'black',
  'white',
];
const CIRCLE_PICKER_SIZE = 45;
const PICKER_WIDTH = width * 0.9;
const BACKGROUND_COLOR = 'rgba(0, 0, 0, 0.3)';

function App() {
  const startX = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);  

  const strictMovement = useDerivedValue(() => {
    return Math.min(Math.max(translateX.value, 0), PICKER_WIDTH - CIRCLE_PICKER_SIZE);
  })

  const gesture = Gesture.Pan()
    .onStart((event) => {
      startX.value = strictMovement.value;
      translateY.value = withSpring(-CIRCLE_PICKER_SIZE - 5);
      scale.value = 1.2;
    })
    .onChange((event) => {
      translateX.value = startX.value + event.translationX;
    })
    .onEnd((event) => {
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: strictMovement.value },
        { translateY: translateY.value },
        { scale: scale.value }
      ],
    };
  });

  const colorAnimation = useAnimatedStyle(() => {
    const inputRange = COLORS.map((item, index) => (index/COLORS.length) * PICKER_WIDTH);
    const backgroundColor = interpolateColor(
      translateX.value,
      inputRange,
      COLORS,
    );

    return {
      backgroundColor
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.first}>
        <Animated.View style={[styles.firstCircle, colorAnimation]}>
        </Animated.View>
      </View>
      <View style={styles.second}>
        <GestureDetector gesture={gesture}>
          <View style={{ justifyContent: 'center' }}>
            <LinearGradient
              colors={COLORS}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            />
            <Animated.View style={[styles.circle, rStyle]}>
              <Animated.View style={[styles.innerCircle, colorAnimation ]}/>
            </Animated.View>
          </View>
        </GestureDetector>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  firstCircle: {
    height: height/2.5,
    width: height/2.5,
    borderRadius: height/2,
  },
  innerCircle: {
    height: CIRCLE_PICKER_SIZE/2,
    width: CIRCLE_PICKER_SIZE/2,
    borderRadius: CIRCLE_PICKER_SIZE/4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: CIRCLE_PICKER_SIZE,
    width: CIRCLE_PICKER_SIZE,
    borderRadius: CIRCLE_PICKER_SIZE / 2,
    backgroundColor: '#fff',
    position: 'absolute',
  },
  gradient: {
    width: PICKER_WIDTH,
    height: 40,
    borderRadius: 20,
  },
  first: {
    flex: 3,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  second: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
});

export default App;

/*import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');

const DATA = [
  {
    id: 1,
    color: '#39ac73',
    image: require('./components/one.png'),
    price: require('./components/price1.png'),
    value: '5$',
  },
  {
    id: 2,
    color: '#9900ff',
    image: require('./components/eight.png'),
    price: require('./components/price2.png'),
    value: '4$',
  },
  {
    id: 3,
    color: '#6699cc',
    image: require('./components/six.png'),
    price: require('./components/price3.png'),
    value: '5$',
  },
  {
    id: 4,
    color: '#ea6e82',
    image: require('./components/three.png'),
    price: require('./components/price4.png'),
    value: '4$',
  },
  {
    id: 5,
    color: '#77b300',
    image: require('./components/one.png'),
    price: require('./components/price5.png'),
    value: '5$',
  },
];

function App() {
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const backStyle = useAnimatedStyle(() => {
    const inputRange = DATA.map((_, index) => index * width);
    const outputRange = DATA.map((item, _) => item.color);

    const backgroundColor = interpolateColor(
      scrollX.value,
      inputRange,
      outputRange
    );

    return {
      backgroundColor,
    };
  });

  const PALTATTE = ({ item, index }) => {
    return (
      <View style={[{ ...styles.palatte }, { backgroundColor: item.color }]}>
        <Image source={item.price} resizeMode="contain" style={styles.price} />
        <Text style={[styles.value, {transform: [
      {
        rotate: '45deg',
      },
    ],}]}>{item.value}</Text>
        <Image source={item.image} resizeMode="contain" style={styles.image} />
        <View
          style={[
            { ...styles.first, ...styles.same },
            { backgroundColor: item.color },
          ]}></View>
        <View
          style={[
            { ...styles.second, ...styles.same },
            { backgroundColor: item.color },
          ]}></View>
        <View
          style={[
            { ...styles.third, ...styles.same },
            { backgroundColor: item.color },
          ]}></View>
        <View
          style={[
            { ...styles.forth, ...styles.same },
            { backgroundColor: item.color },
          ]}></View>
        <View
          style={[
            { ...styles.fifth, ...styles.same },
            { backgroundColor: item.color },
          ]}></View>
        <View
          style={[
            { ...styles.sixth, ...styles.same },
            { backgroundColor: item.color },
          ]}></View>
      </View>
    );
  };

  return (
    <Animated.View style={[styles.container, backStyle]}>
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        renderItem={({ item, index }) => {
          return <PALTATTE item={item} index={index} key={index} />;
        }}
        contentContainerStyle={{ alignItems: 'center' }}
        style={{ flexGrow: 0, height: height * 0.7 }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  value: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    position: 'absolute',
    top: 38,
    left: 38,
  },
  price: {
    height: 58,
    width: 58,
    position: 'absolute',
    top: 20,
    left: 20,
    shadowColor: '#fff',
    shadowOpacity: 0.5,
    shadowRadius: 4.5,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 8,
  },
  image: {
    height: 300,
    width: 300,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    right: -50,
  },
  sixth: {
    width: 30,
    height: 60,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    bottom: 140,
    left: 0,
  },
  fifth: {
    width: 30,
    height: 60,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    bottom: 80,
    left: 0,
  },
  forth: {
    width: 40,
    height: 80,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    position: 'absolute',
    bottom: 1,
    left: 0,
  },
  third: {
    width: 20,
    height: 40,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    position: 'absolute',
    top: 140,
    right: 0,
  },
  second: {
    width: 30,
    height: 60,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    position: 'absolute',
    top: 80,
    right: 0,
  },
  first: {
    width: 40,
    height: 80,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    position: 'absolute',
    top: 1,
    right: 0,
  },
  same: {
    shadowColor: '#fff',
    shadowOpacity: 0.5,
    shadowRadius: 15,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 8,
  },
  palatte: {
    height: 550,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: 50,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 8,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;*/

/*import { useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { height, width } = Dimensions.get('window');
const COLORS = [
  'red',
  'purple',
  'blue',
  'cyan',
  'green',
  'yellow',
  'orange',
  'black',
  'white',
];
const PICKER_HEIGHT = height * 0.7;
const PICKER_WIDTH = 30;
const PICKER_RADIUS = 15;
const CIRCLE_SIZE = 30;

function App() {
  const [_, forceUpdate] = useState(false); // Just to re-render
  const [color, setColor] = useState('#f00');
  const pathRef = useRef([]);
  const translateY = useSharedValue(0);
  const moveY = useSharedValue(0);
  const scale = useSharedValue(1);

  // canvas gesture co-ordinates
  const ctranslateX = useSharedValue(0);
  const ctranslateY = useSharedValue(0);
  const cmoveX = useSharedValue(0);
  const cmoveY = useSharedValue(0);

  const restrictedWidth = useDerivedValue(() => {
    return Math.min(Math.max(0, translateY.value), PICKER_HEIGHT - CIRCLE_SIZE);
  });

  const handleColor = (color) => {
    setColor(color);
  };
  const handleClear = () => {
    pathRef.current = [];
    forceUpdate((prev) => !prev);
  };

  const gesture = Gesture.Pan()
    .onStart((event) => {
      moveY.value = restrictedWidth.value;
    })
    .onChange((event) => {
      translateY.value = moveY.value + event.translationY;
      scale.value = 1.3;
    })
    .onEnd((event) => {
      translateY.value = moveY.value + event.translationY;
      scale.value = 1;
    });

  const selectorStyle = useAnimatedStyle(() => {
    const inputRange = COLORS.map(
      (item, index) => (index / COLORS.length) * PICKER_HEIGHT
    );
    const backgroundColor = interpolateColor(
      translateY.value,
      inputRange,
      COLORS
    );

    runOnJS(handleColor)(backgroundColor);

    return {
      backgroundColor: backgroundColor,
    };
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: restrictedWidth.value,
        },
        {
          scale: scale.value,
        },
      ],
    };
  });

  const getPathFromPoints = (points) => {
    if (!Array.isArray(points) || points.length === 0) {
      return '';
    }

    // Safely get the first point
    const firstPoint = points[0];
    if (
      typeof firstPoint?.x !== 'number' ||
      typeof firstPoint?.y !== 'number'
    ) {
      return '';
    }

    return (
      `M ${firstPoint.x} ${firstPoint.y} ` +
      points
        .slice(1)
        .map((p) => `L ${p.x} ${p.y}`)
        .join(' ')
    );
  };

  const startLogs = (x, y) => {
    console.log('SX: ' + x, 'SY: ' + y);
  };
  const updateLogs = (x, y) => {
    console.log('UX: ' + x, 'UY: ' + y);
  };
  const endLogs = (x, y) => {
    console.log('EX: ' + x, 'EY: ' + y);
  };

  const show = (path) => {
    console.log('---------------------------');
    console.log(path);
    console.log('---------------------------');
  };

  const handleDraw = (x, y) => {
    pathRef.current.push({ x, y });
    forceUpdate((prev) => !prev);
  };

  const cgesture = Gesture.Pan()
    .onStart((event) => {
      ctranslateX.value = event.translationX;
      ctranslateY.value = event.translationY;
      runOnJS(startLogs)(event.x, event.y);

      cmoveX.value = event.translationX;
    })
    .onChange((event) => {
      ctranslateX.value = cmoveX.value + event.translationX;
      ctranslateY.value = cmoveY.value + event.translationY;

      runOnJS(updateLogs)(event.x, event.y);
      runOnJS(handleDraw)(event.x, event.y);
    })
    .onEnd((event) => {
      runOnJS(endLogs)(event.x, event.y);
    });

  const canvasStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: ctranslateX.value,
        },
        {
          translateY: ctranslateY.value,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.clear} onPress={handleClear}>
        <Icon name="broom" color="#fff" size={20} />
      </TouchableOpacity>
      <GestureDetector gesture={gesture}>
        <View>
          <LinearGradient colors={COLORS} style={styles.gradient} />
          <Animated.View style={[styles.circle, rStyle]}>
            <Animated.View
              style={[styles.selector, selectorStyle]}></Animated.View>
          </Animated.View>
        </View>
      </GestureDetector>
      <GestureDetector gesture={cgesture}>
        <Animated.View style={styles.canvas}>
          <Svg height="610" width="300" viewBox="0 0 300 610">
            <Path
              d={getPathFromPoints(pathRef.current)}
              fill="none"
              stroke={color}
              strokeWidth="2"
            />
          </Svg>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  clear: {
    height: 42,
    width: 42,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 70,
    right: 30,
    shadowColor: '#fff',
    shadowRadius: 10,
    shadowOpacity: 0.6,
    shadowOffset: {
      height: -3,
      width: 5,
    },
  },
  canvas: {
    height: 610,
    width: 300,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    // backgroundColor: 'white',
    marginLeft: 25,
    borderRadius: 10,
    shadowColor: '#fff',
    shadowRadius: 10,
    shadowOpacity: 0.6,
    shadowOffset: {
      height: -5,
      width: 5,
    },
  },
  selector: {
    height: CIRCLE_SIZE / 2 + 4,
    width: CIRCLE_SIZE / 2 + 4,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 0.1,
    borderColor: 'grey',
    shadowColor: '#00f',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: {
      height: 5,
      width: 5,
    },
  },
  circle: {
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#fff',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    height: PICKER_HEIGHT,
    width: PICKER_WIDTH,
    borderRadius: PICKER_RADIUS,
  },
  container: {
    flex: 1,
    backgroundColor: '#333333',
    paddingTop: 120,
    paddingLeft: 20,
    flexDirection: 'row',
  },
});

export default App;*/

/*import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

function App() {
  const[percent, setPercent] = useState(0);
  const opacity = useSharedValue(0.3);
  const radius = useSharedValue(8);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000 }),
        withTiming(0.3, { duration: 3000 })
      ),
      -1,
    );
    radius.value = withRepeat(
      withSequence(
        withTiming(25, { duration: 3000 }),
        withTiming(8, { duration: 3000 })
      ),
      -1,
    );0

    const interval = setInterval(() => {
      setPercent(pre => pre+1);
    }, 4000);

    return () => clearInterval(interval);

  },[]);

  const animation = useAnimatedStyle(() => {
    return {
      shadowColor: '#fff',
      shadowOpacity: opacity.value,
      shadowRadius: radius.value,
      shadowOffset: {
        height: 0,
        width: 0,
      },
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, animation]}>
        <Text style={styles.number}>{percent}
          <Text style={styles.percent}>%</Text>
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  percent: {
    fontSize: 20,
  },
  number: {
    fontSize: 35,
    color: '#fff',
  },
  circle: {
    height: 250,
    width: 250,
    borderRadius: 200,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});

export default App;*/

/*import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  useAnimatedScrollHandler,
  Extrapolation,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { height, width } = Dimensions.get('window');
const CARD_HEIGHT = height * 0.45;
const CARD_WIDTH = width * 0.62;
const MARGIN_HORIZONTAL = 25;
const SNAP_INTERVAL = CARD_WIDTH + 2 * MARGIN_HORIZONTAL;
const SPACER_ITEM = { id: 'left-spacer' };
const SPACER_ITEM_END = { id: 'right-spacer' };

const DATA = [
  {
    id: 1,
    image:
      'https://plus.unsplash.com/premium_photo-1700166363803-69b3462557a0?q=80&w=429&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1688447042550-37e06c6e0109?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    image:
      'https://plus.unsplash.com/premium_photo-1722178429928-caa36778a04b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1750466594497-66529efb8a14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D',
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1737562963380-3a7e45c0bf31?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    image:
      'https://plus.unsplash.com/premium_photo-1729232823278-940b85cd6e0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQ4fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D',
  },
  {
    id: 7,
    image:
      'https://images.unsplash.com/photo-1750173588233-8cd7ba259c15?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 8,
    image:
      'https://plus.unsplash.com/premium_photo-1747850966530-196bd76f5177?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];
const DATA_WITH_SPACERS = [SPACER_ITEM, ...DATA, SPACER_ITEM_END];

function App() {
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const Card = ({ item, index }) => {
    //Alternative
    // const inputRange = [(index - 2) * SNAP_INTERVAL,(index - 1) * SNAP_INTERVAL ,index * SNAP_INTERVAL];
    const inputRange = [
      (index - 1) * SNAP_INTERVAL,
      index * SNAP_INTERVAL,
      (index + 1) * SNAP_INTERVAL,
    ];
    const animatedStyle = useAnimatedStyle(() => {
      const translateY = interpolate(scrollX.value, inputRange, [0, -60, 0]);
      const scale = interpolate(scrollX.value, inputRange, [1, 1.1, 1]);

      return {
        transform: [
          {
            translateY,
          },
          {
            scale,
          },
        ],
      };
    });

    return (
      <Animated.View style={[styles.card, animatedStyle]}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.heart}>
          <Icon name="heart" size={28} color="#fff" fill='#f00'/>
        </View>
        <View style={styles.play}>
          <Icon name="play" size={15} color="#fff" />
        </View>
      </Animated.View>
    );
  };

  const BlurImage = ({ item, index, scrollX }) => {
    const inputRange = [
      (index - 1) * SNAP_INTERVAL,
      index * SNAP_INTERVAL,
      (index + 1) * SNAP_INTERVAL,
    ];

    const imageStyle = useAnimatedStyle(() => {
      const opacity = interpolate(scrollX.value, inputRange, [0, 1, 0], Extrapolation.CLAMP);

      return {
        opacity: opacity
      }
    })

    return (
      <Animated.Image
        source={{ uri: item.image }}
        style={[StyleSheet.absoluteFillObject, imageStyle]}
        blurRadius={20}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={StyleSheet.absoluteFillObject}>
        {DATA_WITH_SPACERS.map((item, index) => {
          return <BlurImage item={item} index={index-1} key={index} scrollX={scrollX}/>;
        })}
      </View>
      <Animated.FlatList
        data={DATA_WITH_SPACERS}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        decelerationRate={0}
        onScroll={scrollHandler}
        snapToInterval={SNAP_INTERVAL}
        bounces={false}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
        renderItem={({ item, index }) => {
          if (item.id === 'left-spacer' || item.id === 'right-spacer') {
            return (
              <View
                style={{
                  width: (width - CARD_WIDTH - 2 * MARGIN_HORIZONTAL) / 2,
                }}
              />
            );
          }
          return <Card item={item} index={index - 1} />; // index-1 due to spacer
          //Alternative
          // return <Card item={item} index={index}/>;
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heart: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  play: {
    position: 'absolute',
    height: 38,
    width: 60,
    borderRadius: 140,
    borderColor: '#fff',
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 15,
    right: 15,
  },
  image: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderRadius: 25,
  },
  card: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    marginHorizontal: MARGIN_HORIZONTAL,
    backgroundColor: 'rgba(0, 0, 255, 0.4)',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 2,
    }
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;*/

/*import {
  View,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  useAnimatedScrollHandler,
  Extrapolation,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('window');
const CARD_HEIGHT = height * 0.45;
const CARD_WIDTH = width * 0.62;
const MARGIN_HORIZONTAL = 25;
const SNAP_INTERVAL = CARD_WIDTH + 2 * MARGIN_HORIZONTAL;
const SPACER_ITEM = { id: 'left-spacer' };
const SPACER_ITEM_END = { id: 'right-spacer' };

const DATA = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1469259943454-aa100abba749?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZsb3dlcnN8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1468327768560-75b778cbb551?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    image:
      'https://plus.unsplash.com/premium_photo-1677170014257-16e491ea6516?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1587471577460-bdb4891711ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fGZsb3dlcnN8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1602934585418-f588bea4215c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGZsb3dlcnN8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 6,
    image:
      'https://plus.unsplash.com/premium_photo-1676478746990-4ef5c8ef234a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zmxvd2Vyc3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: 7,
    image:
      'https://images.unsplash.com/photo-1460039230329-eb070fc6c77c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZsb3dlcnN8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 8,
    image:
      'https://images.unsplash.com/photo-1720475982311-94a0dac1f32f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGZsb3dlcnN8ZW58MHx8MHx8fDA%3D',
  },
];
const DATA_WITH_SPACERS = [SPACER_ITEM, ...DATA, SPACER_ITEM_END];

function App() {
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const Card = ({ item, index }) => {
    //Alternative
    // const inputRange = [(index - 2) * SNAP_INTERVAL,(index - 1) * SNAP_INTERVAL ,index * SNAP_INTERVAL];
    const inputRange = [
      (index - 1) * SNAP_INTERVAL,
      index * SNAP_INTERVAL,
      (index + 1) * SNAP_INTERVAL,
    ];
    const animatedStyle = useAnimatedStyle(() => {
      const translateY = interpolate(scrollX.value, inputRange, [0, -60, 0]);
      const scale = interpolate(scrollX.value, inputRange, [1, 1.1, 1]);
      const rotate = interpolate(
        scrollX.value,
        inputRange,
        [-5, 0, 5],
        Extrapolation.CLAMP
      );

      return {
        transform: [
          {
            scale: scale,
          },
          {
            translateY,
          },
          {
            rotate: `${rotate}deg`,
          },
        ],
      };
    });

    return (
      <Animated.View style={[styles.card, animatedStyle]}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </Animated.View>
    );
  };

  return (
    <LinearGradient
      colors={['#264653', '#2A9D8F', '#1D3557', '#0B132B']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={StyleSheet.absoluteFill}>
      <Animated.FlatList
        data={DATA_WITH_SPACERS}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        decelerationRate="fast"
        onScroll={scrollHandler}
        snapToInterval={SNAP_INTERVAL}
        bounces={false}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
        initialScrollIndex={1}
        getItemLayout={(data, index) => ({
          length: SNAP_INTERVAL,
          offset: SNAP_INTERVAL * index,
          index,
        })}
        renderItem={({ item, index }) => {
          if (item.id === 'left-spacer' || item.id === 'right-spacer') {
            return (
              <View
                style={{
                  width: (width - CARD_WIDTH - 2 * MARGIN_HORIZONTAL) / 2,
                }}
              />
            );
          }
          return <Card item={item} index={index - 1} />; // index-1 due to spacer
          //Alternative
          // return <Card item={item} index={index}/>;
        }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  image: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderRadius: 25,
  },
  card: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    marginHorizontal: MARGIN_HORIZONTAL,
    backgroundColor: 'rgba(0, 0, 255, 0.4)',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 2,
    },
  },
});

export default App;*/

/*import { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  useAnimatedScrollHandler,
  interpolate,
  interpolateColor,
  Extrapolation,
  FadeInUp,
  FadeInDown,
  ZoomIn,
  FadeInLeft,
} from 'react-native-reanimated';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
const { height, width } = Dimensions.get('window');

const CARD_SIZE = 140;
const SPACING = 45;
const TOTAL_SIZE = CARD_SIZE + SPACING;

const DATA = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1610361418971-50cb8d1f8339?q=80&w=1336&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    video: require('./components/rain.mp4'),
    state: 'India',
    weather: 'Rainy',
    temperature: '24°',
    others: 'RAINY | CLOUDY | DRIZZLE',
    month: 'July',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1712976692892-07d78428215d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI1fHx8ZW58MHx8fHx8',
    video: require('./components/sunny.mp4'),
    state: 'Japan',
    weather: 'Sunny',
    temperature: '32°',
    others: 'SUNNY | CLEAR SKIES | BRIGHT',
    month: 'August',
  },
  {
    id: 3,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Macropus_giganteus_-_Brunkerville.jpg/1200px-Macropus_giganteus_-_Brunkerville.jpg',
    video: require('./components/winter.mp4'),
    state: 'Australia',
    weather: 'Cloudy',
    temperature: '17°',
    others: 'CLOUDY | OVERCAST | GRAY SKIES',
    month: 'April',
  },
  {
    id: 4,
    image:
      'https://plus.unsplash.com/premium_photo-1694475496945-238ac1177291?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D',
    video: require('./components/spring.mp4'),
    state: 'Egypt',
    weather: 'Windy',
    temperature: '28°',
    others: 'WINDY | BREEZY | GUSTY',
    month: 'March',
  },
  {
    id: 5,
    image:
      'https://preview.redd.it/a-collection-of-photos-showing-how-breathtaking-switzerland-v0-mmk16xuaj8we1.jpg?width=1080&crop=smart&auto=webp&s=d7680ad299e89c2d1a83c8e5d9a8d4eb060d5d56',
    video: require('./components/thunder.mp4'),
    state: 'Switzerland',
    weather: 'Thunder',
    temperature: '24°',
    others: 'THUNDER | LIGHTNING | STORMY',
    month: 'June',
  },
  {
    id: 6,
    image:
      'https://images.unsplash.com/photo-1585155967849-91c736589c84?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFN0YXR1ZSUyMG9mJTIwTGliZXJ0eXxlbnwwfHwwfHx8MA%3D%3D',
    video: require('./components/foggy.mp4'),
    state: 'USA',
    weather: 'Foggy',
    temperature: '25°',
    others: 'FOGGY | MISTY | HAZY',
    month: 'January',
  },
  {
    id: 7,
    image:
      'https://plus.unsplash.com/premium_photo-1697729867696-5a9b4b995e9f?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    video: require('./components/snow.mp4'),
    state: 'South Africa',
    weather: 'Snowy',
    temperature: '-15°',
    others: 'SNOWY | FLURRIES | BLIZZARD',
    month: 'April',
  },
  {
    id: 8,
    image:
      'https://plus.unsplash.com/premium_photo-1702598754680-e49cb0e6eff8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D',
    video: require('./components/autumn.mp4'),
    state: 'Chile',
    weather: 'Autumn',
    temperature: '11°',
    others: 'AUTUMN | FALLING LEAVES | BREEZY',
    month: 'May',
  },
];

function App() {
  const [currentVideo, setCurrentVideo] = useState(DATA[0].video);
  const [currentState, setCurrentState] = useState(DATA[0].state);
  const [currentWeather, setCurrentWeather] = useState(DATA[0].weather);
  const [currentTemp, setCurrentTemp] = useState(DATA[0].temperature);
  const [currentOther, setCurrentOther] = useState(DATA[0].others);
  const [currentMonth, setCurrentMonth] = useState(DATA[0].month);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y / TOTAL_SIZE;
    },
  });

  const onVideoReady = () => {
    setIsVideoReady(true);
  };

  const handleScrollEnd = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / TOTAL_SIZE);
    const safeIndex = Math.max(0, Math.min(DATA.length - 1, index));
    setCurrentVideo(DATA[safeIndex].video);
    setCurrentState(DATA[safeIndex].state);
    setCurrentWeather(DATA[safeIndex].weather);
    setCurrentTemp(DATA[safeIndex].temperature);
    setCurrentOther(DATA[safeIndex].others);
    setCurrentMonth(DATA[safeIndex].month);
  };

  const Card = ({ item, index, scrollY }) => {
    const itemStyle = useAnimatedStyle(() => {
      const translateX = interpolate(
        scrollY.value,
        [index - 1, index, index + 1],
        [CARD_SIZE / 3 + 20, 0, CARD_SIZE / 3 + 20]
      );
      const scale = interpolate(
        scrollY.value,
        [index - 1, index, index + 1],
        [0.9, 1.55, 0.9],
        Extrapolation.CLAMP
      );
      const rotate = interpolate(
        scrollY.value,
        [index - 1, index, index + 1],
        [-50, 0, 50],
        Extrapolation.CLAMP
      );
      const marginVertical = interpolate(
        scrollY.value,
        [index - 1, index, index + 1],
        [0, 40, 0],
        Extrapolation.CLAMP
      );
      const opacity = interpolate(
        scrollY.value,
        [index - 2, index - 1, index, index + 1, index + 2],
        [0, 1, 1, 1, 0],
        Extrapolation.CLAMP
      );
      return {
        opacity: opacity,
        transform: [
          {
            translateX,
          },
          { scale },
          {
            rotate: `${rotate}deg`,
          },
        ],
        marginVertical: marginVertical,
      };
    });

    const imageStyle = useAnimatedStyle(() => {
      const borderWidth = interpolate(
        scrollY.value,
        [index - 1, index, index + 1],
        [4, 7, 4],
        Extrapolation.CLAMP
      );
      const borderColor = interpolateColor(
        scrollY.value,
        [index - 1, index, index + 1],
        ['#fff', '#fff', '#fff']
      );

      return {
        borderWidth: borderWidth,
        borderColor: borderColor,
      };
    });

    const animatedProps = useAnimatedProps(() => {
      const blurRadius = interpolate(
        scrollY.value,
        [index - 1, index, index + 1],
        [2, 0, 2]
      );
      return {
        blurRadius: blurRadius,
      }
    })

    return (
      <Animated.View style={[styles.imageBack, itemStyle]}>
        <Animated.Image
          source={{ uri: item.image }}
          style={[styles.image, imageStyle]}
          animatedProps={animatedProps}
        />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFillObject}>
        <Image
          source={{
            uri: DATA.find((item) => item.video === currentVideo).image,
          }}
          style={StyleSheet.absoluteFillObject}
          blurRadius={0} // Blurred placeholder
        />
        <Video
          source={currentVideo}
          style={StyleSheet.absoluteFillObject}
          shouldPlay
          isLooping
          resizeMode="cover"
        />
      </View>
      <LinearGradient
        colors={[
          'rgba(10, 10, 20, 0.2)',
          'rgba(200, 200, 210, 0.25)', // Light foggy gray (left)
          'rgba(80, 85, 95, 0.8)', // Mid-tone misty gray
          'rgba(10, 10, 20, 0.95)', // Deep charcoal (right)
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        //start={{ x: 0.5, y: 0 }}
        //end={{ x: 0.5, y: 1 }}
        style={{ ...StyleSheet.absoluteFillObject }}
      />
      <Animated.View style={styles.details}>
        <Animated.Text
          key={currentState}
          entering={FadeInLeft.duration(500)}
          style={styles.state}>
          {currentState}
        </Animated.Text>
        <Animated.Text
          key={currentWeather}
          entering={FadeInLeft.duration(500)}
          style={styles.weather}>
          {currentWeather}
        </Animated.Text>
        <Animated.Text
          key={currentTemp}
          entering={FadeInLeft.duration(500)}
          style={styles.degree}>
          {currentTemp}
        </Animated.Text>
        <Animated.Text
          key={currentState + '-others'}
          entering={FadeInLeft.duration(500)}
          style={styles.others}>
          {currentOther}
        </Animated.Text>
        <Animated.Text
          key={currentState + '-month'}
          entering={FadeInLeft.duration(500)}
          style={styles.month}>
          SEPT
        </Animated.Text>
      </Animated.View>
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.id.toString()}
        onScroll={scrollHandler}
        scrollEventTrottle={16}
        snapToInterval={TOTAL_SIZE}
        decelerationRate={'fast'}
        inverted={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: (height - CARD_SIZE) / 2 - 40,
          alignItems: 'center',
          gap: 45,
        }}
        style={styles.flatlist}
        onMomentumScrollEnd={handleScrollEnd}
        renderItem={({ item, index }) => {
          return <Card item={item} index={index} scrollY={scrollY} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  month: {
    fontSize: 25,
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 1.5,
    marginTop: 410,
    textShadowColor: '#000',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },
  others: {
    fontSize: 16,
    color: '#fff',
    letterSpacing: 2,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  degree: {
    fontSize: 100,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  weather: {
    fontSize: 31,
    fontWeight: '700',
    color: '#6254C2', // Soft bluish-purple
    marginTop: 1,
    letterSpacing: 2,
  },
  state: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },
  details: {
    position: 'absolute',
    top: 50,
    left: 25,
    //borderColor: 'red',
    //borderWidth: 1,
  },
  flatlist: {
    paddingLeft: CARD_SIZE / 2,
    // backgroundColor: 'blue',
    // flex: 1,
  },
  image: {
    height: CARD_SIZE,
    width: CARD_SIZE,
    borderRadius: CARD_SIZE,
  },
  imageBack: {
    height: CARD_SIZE,
    width: CARD_SIZE,
    borderRadius: CARD_SIZE,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 6,
    shadowOffset: {
      height: 3,
      width: 3,
    },
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default App;*/

/*import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get('window');

function App() {
  const translateX = useSharedValue(0);
  const contextX = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onStart((event) => {
      contextX.value = translateX.value;
    })
    .onUpdate((event) => {
      translateX.value = contextX.value + event.translationX;
    })
    .onEnd((event) => {
      translateX.value = withTiming(0);
    });

  const animatedView = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [0, width / 2],
      [0, 5]
    );

    return {
      transform: [
        {
          perspective: 100
        },
        {
          rotateY: `-${rotate}deg`
        },
        {
          translateX: translateX.value
        },
      ]
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='inverted'/>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.one, animatedView]}></Animated.View>
      </GestureDetector>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  one: {
    height: height/3,
    width: height/3.5,
    backgroundColor: 'rgba(0, 0, 255, 0.4)',
    borderRadius: 6,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default App;*/

// No completed
/*import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Text,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get('window');

function App() {
  const translateX = useSharedValue(0);
  const contextX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
  const rotateY = interpolate(translateX.value, [-200, 0, 200], [30, 0, -30]);

  return {
    transform: [
      { perspective: -800 }, // ✅ Apply perspective always
      { rotateY: `${rotateY}deg` },
    ],
  };
});


  const gesture = Gesture.Pan()
    .onStart((event) => {
      contextX.value = translateX.value;
    })
    .onUpdate((event) => {
      translateX.value = contextX.value + event.translationX;
    })
    .onEnd((event) => {
      translateX.value = withTiming(0);
    });

  
  const frontView = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [0, width/2],
      [16, 0]
    );
    const rotateY = interpolate(
      translateX.value,
      [0, width/2],
      [20, 0]
    );
    const rotateX = interpolate(
      translateX.value,
      [0, width/2],
      [0, 80]
    );

    return {
      transform: [
        { perspective: -800 },
        {rotate: `${rotate}deg`},
        {rotateX: `${rotateX}deg`},
      ]
    }
  });

  const topView = useAnimatedStyle(() => {
    const rotateX = interpolate(
      translateX.value,
      [0, width/2],
      [90, 90]
    );
    const rotate = interpolate(
      translateX.value,
      [0, width/2],
      [45, 45]
    )

    return {
      transform: [
        {
          rotateX: rotateX,
        },
        {
          rotate: rotate,
        }
      ]
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='inverted'/>
      <Animated.View style={[styles.top, topView]}>
        <Text style={styles.text}>Top</Text>
      </Animated.View>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.front, animatedStyle]}>
          <Text style={styles.text}>Front</Text>
        </Animated.View>
      </GestureDetector>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    text: {
      fontSize: 35,
      color: '#fff',
      fontWeight: '700',
    },
    front: {
    height: width/2.3,
    width: width/2.5,
    backgroundColor: 'rgba(0, 0, 255, 0.4)',
    borderRadius: 6,
    borderWidth: 4,
    borderTopColor: 'blue',
    borderBottomColor: 'green',
    borderLeftColor: 'red',
    borderRightColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -58,
    marginLeft: -100,
  },
  top: {
    height: width/2.2,
    width: width/2.2,
    backgroundColor: 'rgba(255, 0, 0, 0.4)',
    borderRadius: 6,
    borderWidth: 4,
    borderTopColor: 'blue',
    borderBottomColor: 'green',
    borderLeftColor: 'red',
    borderRightColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingBottom: 300,
  },
});

export default App;*/
// No completed

/*import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withSpring,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

function App() {
  const [done, setDone] = useState(false);
  const startY = useSharedValue(0);
  const translateY = useSharedValue(0);
  const translateColor = useSharedValue('#000');

  const gesture = Gesture.Pan()
    .onStart((event) => {
      translateY.value = startY.value;
    })
    .onUpdate((event) => {
      startY.value = translateY.value + event.translationY;
    })
    .onEnd(() => {
      startY.value = withSpring(0, {}, (finished) => {
        if (finished) {
          runOnJS(setDone)(!done);
          if(!done)
            translateColor.value = withTiming('#fff5cc', { duration: 3000 });
          else 
            translateColor.value = withTiming('#000', { duration: 3000 });
        }
      });
    });

  const animatedRope = useAnimatedStyle(() => {
    const height = interpolate(
      startY.value,
      [0, 20],
      [80, 160],
      Extrapolation.CLAMP
    );

    return {
      height: height,
    };
  });
  const animatedHold = useAnimatedStyle(() => {
    const top = interpolate(
      startY.value,
      [0, 20],
      [140, 220],
      Extrapolation.CLAMP
    );

    return {
      top: top,
    };
  });
  const animatedCircle = useAnimatedStyle(() => {
    const top = interpolate(
      startY.value,
      [0, 20],
      [170, 250],
      Extrapolation.CLAMP
    );

    return {
      top: top,
    };
  });
  const animatedContainer = useAnimatedStyle(() => {
    return {
      backgroundColor: translateColor.value,
    };
  });
  

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, animatedContainer]}>
        <Animated.View style={styles.views}>
          <View style={[{...styles.blubcontainer}, {shadowColor: done ? '#000' : '#fff',}]}>
            {done === true ? (
              <Icon name="lightbulb" size={120} color="#ffd11a" solid />
            ) : (
              <Icon name="lightbulb" size={120} color="#fff" />
            )}
          </View>
          <Animated.View style={[styles.rope, animatedRope]}></Animated.View>
          <Animated.View style={[styles.hold, animatedHold]}></Animated.View>
          <Animated.View
            style={[styles.circle, animatedCircle]}></Animated.View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  blubcontainer: {
    marginTop: -60,
    position: 'absolute',
    left: -41,
    shadowRadius: 5,
    shadowOpacity: 0.6,
    shadowOffset: {
      height: 3,
      width: 4,
    }
  },
  views: {
    position: 'relative',
  },
  circle: {
    height: 30,
    width: 30,
    borderRadius: 35,
    backgroundColor: '#fff',
    marginTop: -4,
    alignSelf: 'center',
    borderColor: 'grey',
    borderWidth: 2.5,
    position: 'absolute',
  },
  hold: {
    height: 30,
    width: 15,
    backgroundColor: '#fff',
    marginTop: -5,
    borderRadius: 3,
    alignSelf: 'center',
    borderColor: 'grey',
    borderWidth: 2,
    position: 'absolute',
  },
  rope: {
    width: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderTopColor: '#fff',
    borderBottomColor: '#fff',
    borderTopWidth: 10,
    borderBottomWidth: 10,
    alignSelf: 'center',
    borderColor: 'grey',
    borderWidth: 2.5,
    position: 'absolute',
    top: 60,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
    paddingTop: 350,
  },
});

export default App;*/

// Tap the bunny game
/*import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const SPRITE = require('./components/sprite.gif');
const FIELD =
  'https://images.unsplash.com/photo-1671733437699-ff0e7ff602df?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM5fHx8ZW58MHx8fHx8';
const SLOW = 1600;
const MEDIUM = 800;
const FAST = 200;

function App() {
  const [score, setScore] = useState(0);
  const [rabbitIndex, setRabbitIndex] = useState(null);
  const [paceValue, setPaceValue] = useState(SLOW);
  const [floatingScores, setFloatingScores] = useState([]);
  const caveRefs = useRef(
    Array(9)
      .fill()
      .map(() => React.createRef())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 9);
      setRabbitIndex(randomIndex);
    }, paceValue); // Change every 1 second

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  const handleSpriteTouch = (caveIndex) => {
    if (caveIndex === rabbitIndex) {
      setScore((prev) => prev + 1);

      caveRefs.current[caveIndex].current.measure(
        (fx, fy, width, height, px, py) => {
          const id = Date.now(); // unique ID

          setFloatingScores((prev) => [
            ...prev,
            { id, x: px + width / 2 - 10, y: py, visible: true },
          ]);

          // Remove after animation completes (e.g., 1000ms)
          setTimeout(() => {
            setFloatingScores((prev) => prev.filter((item) => item.id !== id));
          }, 1000);
        }
      );
    }
  };

  const renderGrid = () => {
    const views = [];
    for (let i = 0; i < 9; i++) {
      views.push(
        <Pressable
          style={styles.cave}
          key={i}
          ref={caveRefs.current[i]}
          onPress={() => handleSpriteTouch(i)}>
          <View style={styles.rabbitWrapper}>
            {i === rabbitIndex && (
              <Image style={styles.rabbit} source={SPRITE} />
            )}
          </View>
        </Pressable>
      );
    }
    return views;
  };

  const FloatingScore = ({ x, y }) => {
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(1);

    useEffect(() => {
      translateY.value = withTiming(-60, { duration: 800 });
      opacity.value = withTiming(0, { duration: 800 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
      position: 'absolute',
      left: x,
      top: y,
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    }));

    return (
      <Animated.View style={animatedStyle}>
        <Text
          style={{
            color: '#000',
            fontSize: 30,
            fontWeight: 'bold',
            textShadowColor: 'blue',
            textShadowRadius: 2,
          }}>
          +1
        </Text>
      </Animated.View>
    );
  };

  return (
    <ImageBackground
      style={styles.container}
      source={{
        uri: FIELD,
      }}>
      <View style={styles.scoreBoard}>
        <Text style={styles.score}></Text>
        <Text style={styles.score}> {score} </Text>
        <Image
          source={SPRITE}
          style={{ height: 25, width: 25, marginTop: 4 }}
        />
      </View>
      {floatingScores.map((item) => (
        <FloatingScore key={item.id} x={item.x} y={item.y} />
      ))}

      <View style={styles.row}>{renderGrid().slice(0, 3)}</View>
      <View style={styles.row}>{renderGrid().slice(3, 6)}</View>
      <View style={styles.row}>{renderGrid().slice(6, 9)}</View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            { ...styles.pace },
            { backgroundColor: paceValue === SLOW ? '#e6f2ff' : 'none' },
          ]}
          onPress={() => setPaceValue(SLOW)}>
          <Text style={styles.paceValue}>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            { ...styles.pace },
            { backgroundColor: paceValue === MEDIUM ? '#e6f2ff' : 'none' },
          ]}
          onPress={() => setPaceValue(MEDIUM)}>
          <Text style={styles.paceValue}>Mediun</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            { ...styles.pace },
            { backgroundColor: paceValue === FAST ? '#e6f2ff' : 'none' },
          ]}
          onPress={() => setPaceValue(FAST)}>
          <Text style={styles.paceValue}>Fast</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  paceValue: {
    color: '#fff',
    fontSize: 20,
    textShadowColor: 'blue',
    textShadowRadius: 2,
    textShadowOffset: {
      height: 2,
      width: 2,
    },
  },
  pace: {
    height: 50,
    width: 105,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 2,
    shadowColor: 'blue',
    shadowRadius: 3,
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  footer: {
    height: 100,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  score: {
    color: '#fff',
    fontSize: 30,
    textShadowColor: 'blue',
    textShadowRadius: 2,
    textShadowOffset: {
      height: 2,
      width: 2,
    },
  },
  scoreBoard: {
    height: 56,
    position: 'absolute',
    top: 60,
    left: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 25,
    shadowColor: 'blue',
    shadowRadius: 2,
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 3,
      width: 4,
    },
  },
  rabbitWrapper: {
    position: 'absolute',
    bottom: 5, // Pull it up from cave
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rabbit: {
    height: 140,
    width: 140,
    resizeMode: 'contain',
  },
  cave: {
    width: 80,
    height: 80,
    backgroundColor: '#f2f2f2',
    borderRadius: 100,
    transform: [{ scaleY: 0.45 }],
    marginHorizontal: 15,
    shadowColor: 'blue',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: {
      height: -10,
      width: 0,
    },
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    borderColor: '#e6f2ff',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default App;*/

// Catch the flower game
/*import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ImageBackground,
  Image,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  useAnimatedReaction,
  runOnJS,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const BASKET =
  'https://static.vecteezy.com/system/resources/thumbnails/039/630/618/small/ai-generated-empty-wicker-basket-isolated-transparent-background-free-png.png';

// Make sure these paths are correct
const SPRITE1 = require('./components/flower1.png');
const SPRITE2 = require('./components/flower2.png');
const SPRITE3 = require('./components/flower3.png');
const SPRITE5 = require('./components/flower5.png');
const SPRITE6 = require('./components/flower6.png');

const END = 700;
const SPRITE_SIZE = 50;
const BASKET_WIDTH = 100;
const BASKET_HEIGHT = 80;
const MARGIN_BOTTOM = 50;

const App = () => {
  const [randomX, setRandomX] = useState(0);
  const [score, setScore] = useState(0);
  const { width, height } = useWindowDimensions();

  const spriteY = useSharedValue(END);
  const spriteX = useSharedValue(0);

  const basketX = useSharedValue(width / 2 - BASKET_WIDTH / 2);
  const basketContextX = useSharedValue(width / 2 - BASKET_WIDTH / 2);

  const sprite1X = useSharedValue(basketX.value);

  const wasCaught = useSharedValue(false);
  const isActive = useSharedValue(false);

  const angle = useSharedValue(-0.2);
  const birdAngle = useSharedValue(-0.5);


  const cycleScore = score % 5;

  // Generate new sprites
  useEffect(() => {
    const interval = setInterval(() => {
      const newX = Math.floor(Math.random() * (width - SPRITE_SIZE));
      setRandomX(newX);
    }, 4000);

    return () => clearInterval(interval);
  }, [width]);

  // Animate sprite when randomX changes
  useEffect(() => {
    if (randomX === 0) return;

    spriteX.value = randomX;
    spriteY.value = 200;
    wasCaught.value = false;
    isActive.value = true;

    spriteY.value = withTiming(END, { duration: 4000 }, (finished) => {
      if (finished) {
        isActive.value = false;
      }
    });
  }, [randomX]);

  // Collision detection
  const caught = useDerivedValue(() => {
    if (!isActive.value) return false;

    const spriteRight = spriteX.value + SPRITE_SIZE;
    const spriteBottom = spriteY.value + SPRITE_SIZE;
    const basketRight = basketX.value + BASKET_WIDTH;
    const basketTop = height - BASKET_HEIGHT - MARGIN_BOTTOM;

    return (
      spriteBottom >= basketTop &&
      spriteRight > basketX.value &&
      spriteX.value < basketRight
    );
  });

  const getScore = (score) => {
    setScore(score);
  };

  // Handle caught event
  useAnimatedReaction(
    () => caught.value,
    (isCaught, prevCaught) => {
      if (isCaught && !wasCaught.value && isActive.value) {
        wasCaught.value = true;
        isActive.value = false;
        runOnJS(getScore)(score + 1);
      }
    }
  );

  // Basket gesture handler
  const gesture = Gesture.Pan()
    .onStart(() => {
      basketContextX.value = basketX.value;
    })
    .onUpdate((event) => {
      const newX = basketContextX.value + event.translationX;
      basketX.value = Math.max(0, Math.min(width - BASKET_WIDTH, newX));

      sprite1X.value = Math.max(0, Math.min(width - BASKET_WIDTH, newX));
    });

  // Basket animation style
  const basketAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: basketX.value }],
    };
  });

  // Sprite animation style
  const spriteAnimation = useAnimatedStyle(() => {
    return {
      opacity: isActive.value ? 1 : 0,
      left: spriteX.value,
      transform: [{ translateY: spriteY.value }],
    };
  });

  const sprite1Animation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: sprite1X.value }],
    };
  });

  useEffect(() => {
    angle.value = withRepeat(
      withTiming(Math.PI / 6, {
        duration: 3000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true // reverse
    );
    birdAngle.value = withRepeat(
      withTiming(Math.PI / 50, {
        duration: 11000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true // reverse
    );
  }, []);

  const pendulumStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateZ: `${angle.value}rad` }, // swing like a pendulum
      ],
    };
  });

  const birdStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateZ: `${birdAngle.value}rad` }, // swing like a pendulum
      ],
    };
  });



  return (
    <ImageBackground
      source={require('./components/tree.png')}
      style={styles.background}>
      <Animated.Image
        source={require('./components/parrot.png')}
        style={[styles.parrot, birdStyle]}
      />
      <Animated.View style={styles.hanger}></Animated.View>
      <Animated.View style={[styles.board, pendulumStyle]}>
        <Text style={styles.scoreValue}>{score}</Text>
      </Animated.View>
      <GestureDetector gesture={gesture}>
        <View style={styles.container}>
          <View style={styles.flowerContainer}>
            <Image source={SPRITE1} style={styles.sprite} />
            <Image
              source={SPRITE1}
              style={[
                { ...styles.sprite },
                { left: 30, height: 50, width: 50, top: 45 },
              ]}
            />
            <Image
              source={SPRITE3}
              style={[
                { ...styles.sprite },
                { left: 50, height: 50, width: 50, top: 30 },
              ]}
            />
            <Image
              source={SPRITE3}
              style={[
                { ...styles.sprite },
                { left: 55, height: 30, width: 30, top: 15 },
              ]}
            />
            <Image
              source={SPRITE5}
              style={[
                { ...styles.sprite },
                { left: 25, height: 35, width: 35, top: 15 },
              ]}
            />
            <Image
              source={SPRITE5}
              style={[
                { ...styles.sprite },
                { left: 35, height: 30, width: 30, top: 25 },
              ]}
            />
            <Image
              source={SPRITE6}
              style={[{ ...styles.sprite }, { top: 40, height: 30, width: 30 }]}
            />
            <Image
              source={SPRITE2}
              style={[{ ...styles.sprite }, { top: 15, height: 30, width: 30 }]}
            />
            <Image
              source={SPRITE3}
              style={[{ ...styles.sprite }, { top: -10 }]}
            />
            <Image
              source={SPRITE2}
              style={[
                { ...styles.sprite },
                { top: -10, left: 35, height: 30, width: 30 },
              ]}
            />
            <Image
              source={SPRITE2}
              style={[
                { ...styles.sprite },
                { top: -10, left: 50, height: 30, width: 30 },
              ]}
            />
          </View>
          <View
            style={([{ ...styles.flowerContainer }], { top: 350, left: 30 })}>
            <Image
              source={SPRITE1}
              style={[
                { ...styles.sprite },
                { left: 30, height: 50, width: 50, top: 45 },
              ]}
            />
            <Image
              source={SPRITE3}
              style={[
                { ...styles.sprite },
                { left: 50, height: 50, width: 50, top: 30 },
              ]}
            />
            <Image
              source={SPRITE3}
              style={[
                { ...styles.sprite },
                { left: 55, height: 30, width: 30, top: 15 },
              ]}
            />
            <Image
              source={SPRITE5}
              style={[
                { ...styles.sprite },
                { left: 25, height: 35, width: 35, top: 15 },
              ]}
            />
            <Image
              source={SPRITE5}
              style={[
                { ...styles.sprite },
                { left: 35, height: 30, width: 30, top: 25 },
              ]}
            />
            <Image
              source={SPRITE6}
              style={[{ ...styles.sprite }, { top: 40, height: 30, width: 30 }]}
            />
            <Image
              source={SPRITE2}
              style={[{ ...styles.sprite }, { top: 15, height: 30, width: 30 }]}
            />
            <Image
              source={SPRITE3}
              style={[{ ...styles.sprite }, { top: -10 }]}
            />
            <Image
              source={SPRITE2}
              style={[
                { ...styles.sprite },
                { top: -10, left: 35, height: 30, width: 30 },
              ]}
            />
          </View>
          <View
            style={([{ ...styles.flowerContainer }], { top: 350, left: 300 })}>
            <Image
              source={SPRITE6}
              style={[
                { ...styles.sprite },
                { left: 55, height: 30, width: 30, top: 15 },
              ]}
            />
            <Image
              source={SPRITE6}
              style={[
                { ...styles.sprite },
                { left: 25, height: 35, width: 35, top: 15 },
              ]}
            />
            <Image
              source={SPRITE5}
              style={[
                { ...styles.sprite },
                { left: 35, height: 30, width: 30, top: 25 },
              ]}
            />
            <Image
              source={SPRITE6}
              style={[{ ...styles.sprite }, { top: 40, height: 30, width: 30 }]}
            />
            <Image
              source={SPRITE2}
              style={[{ ...styles.sprite }, { top: 15, height: 30, width: 30 }]}
            />
            <Image
              source={SPRITE3}
              style={[{ ...styles.sprite }, { top: -10 }]}
            />
            <Image
              source={SPRITE1}
              style={[
                { ...styles.sprite },
                { left: 30, height: 50, width: 50, top: 45 },
              ]}
            />
          </View>
          <View
            style={([{ ...styles.flowerContainer }], { top: 250, left: 180 })}>
            <Image
              source={SPRITE1}
              style={[
                { ...styles.sprite },
                { left: 55, height: 30, width: 30, top: 15 },
              ]}
            />
            <Image
              source={SPRITE6}
              style={[
                { ...styles.sprite },
                { left: 25, height: 35, width: 35, top: 15 },
              ]}
            />
            <Image
              source={SPRITE5}
              style={[
                { ...styles.sprite },
                { left: 35, height: 30, width: 30, top: 25 },
              ]}
            />
            <Image
              source={SPRITE6}
              style={[{ ...styles.sprite }, { top: 40, height: 30, width: 30 }]}
            />
            <Image
              source={SPRITE1}
              style={[{ ...styles.sprite }, { top: 15, height: 30, width: 30 }]}
            />
            <Image
              source={SPRITE1}
              style={[{ ...styles.sprite }, { top: -10 }]}
            />
            <Image
              source={SPRITE1}
              style={[
                { ...styles.sprite },
                { left: 30, height: 50, width: 50, top: 45 },
              ]}
            />
          </View>
          <View
            style={([{ ...styles.flowerContainer }], { top: 150, left: 50 })}>
            <Image
              source={SPRITE3}
              style={[
                { ...styles.sprite },
                { left: 55, height: 30, width: 30, top: 15 },
              ]}
            />
            <Image
              source={SPRITE6}
              style={[
                { ...styles.sprite },
                { left: 25, height: 35, width: 35, top: 15 },
              ]}
            />
            <Image
              source={SPRITE5}
              style={[
                { ...styles.sprite },
                { left: 35, height: 30, width: 30, top: 25 },
              ]}
            />
            <Image
              source={SPRITE6}
              style={[{ ...styles.sprite }, { top: 40, height: 30, width: 30 }]}
            />
            <Image
              source={SPRITE3}
              style={[{ ...styles.sprite }, { top: 15, height: 30, width: 30 }]}
            />
            <Image
              source={SPRITE2}
              style={[{ ...styles.sprite }, { top: -10 }]}
            />
          </View>
          <View
            style={([{ ...styles.flowerContainer }], { top: 90, left: 100 })}>
            <Image
              source={SPRITE3}
              style={[
                { ...styles.sprite },
                { left: 55, height: 30, width: 30, top: 15 },
              ]}
            />
            <Image
              source={SPRITE5}
              style={[
                { ...styles.sprite },
                { left: 35, height: 30, width: 30, top: 25 },
              ]}
            />
            <Image
              source={SPRITE3}
              style={[{ ...styles.sprite }, { top: 15, height: 30, width: 30 }]}
            />
            <Image
              source={SPRITE2}
              style={[
                { ...styles.sprite },
                { top: -10, height: 30, width: 30 },
              ]}
            />
          </View>
          <View
            style={
              ([{ ...styles.flowerContainer }],
              { top: 90, left: 10, height: 480, width: 380 })
            }>
            <Image
              source={SPRITE3}
              style={[
                { ...styles.sprite },
                { left: 5, height: 35, width: 35, top: 400 },
              ]}
            />
            <Image
              source={SPRITE5}
              style={[
                { ...styles.sprite },
                { left: 25, height: 35, width: 35, top: 380 },
              ]}
            />
            <Image
              source={SPRITE5}
              style={[
                { ...styles.sprite },
                { left: 25, height: 25, width: 25, top: 400 },
              ]}
            />
            <Image
              source={SPRITE5}
              style={[
                { ...styles.sprite },
                { left: 35, height: 30, width: 30, top: 25 },
              ]}
            />
            <Image
              source={SPRITE3}
              style={[
                { ...styles.sprite },
                { top: 390, height: 30, width: 30, left: 305 },
              ]}
            />
            <Image
              source={SPRITE6}
              style={[
                { ...styles.sprite },
                { top: 410, height: 20, width: 20, left: 305 },
              ]}
            />
            <Image
              source={SPRITE6}
              style={[
                { ...styles.sprite },
                { top: 410, height: 20, width: 20, left: 320 },
              ]}
            />
            <Image
              source={SPRITE2}
              style={[{ ...styles.sprite }, { top: 60, height: 30, width: 30 }]}
            />
            <Image
              source={SPRITE2}
              style={[
                { ...styles.sprite },
                { top: 100, left: 300, height: 30, width: 30 },
              ]}
            />
            <Image
              source={SPRITE2}
              style={[
                { ...styles.sprite },
                { top: 200, left: 200, height: 30, width: 30 },
              ]}
            />
            <Image
              source={SPRITE2}
              style={[
                { ...styles.sprite },
                { top: 300, left: 110, height: 30, width: 30 },
              ]}
            />
            <Image
              source={SPRITE6}
              style={[
                { ...styles.sprite },
                { top: 360, left: 180, height: 30, width: 30 },
              ]}
            />
            <Image
              source={SPRITE6}
              style={[
                { ...styles.sprite },
                { top: 60, left: 100, height: 30, width: 30 },
              ]}
            />
            <Image
              source={SPRITE6}
              style={[
                { ...styles.sprite },
                { top: 260, left: 20, height: 30, width: 30 },
              ]}
            />
            <Image
              source={SPRITE6}
              style={[
                { ...styles.sprite },
                { top: 290, left: 320, height: 30, width: 30 },
              ]}
            />
            <Image
              source={SPRITE5}
              style={[
                { ...styles.sprite },
                { top: 320, left: 280, height: 30, width: 30 },
              ]}
            />
            <Image
              source={SPRITE5}
              style={[
                { ...styles.sprite },
                { top: 40, left: 180, height: 30, width: 30 },
              ]}
            />
            <Image
              source={SPRITE5}
              style={[
                { ...styles.sprite },
                { top: 180, left: 80, height: 30, width: 30 },
              ]}
            />
            <Image
              source={SPRITE3}
              style={[
                { ...styles.sprite },
                { top: 150, left: 40, height: 30, width: 30 },
              ]}
            />
            <Image
              source={SPRITE3}
              style={[
                { ...styles.sprite },
                { top: 60, left: 140, height: 30, width: 30 },
              ]}
            />
            <Image
              source={SPRITE3}
              style={[
                { ...styles.sprite },
                { top: 138, left: 140, height: 30, width: 30 },
              ]}
            />
            <Image
              source={SPRITE3}
              style={[
                { ...styles.sprite },
                { top: 310, left: 190, height: 30, width: 30 },
              ]}
            />
            <Image
              source={SPRITE3}
              style={[
                { ...styles.sprite },
                { top: 220, left: 280, height: 30, width: 30 },
              ]}
            />
          </View>
          // grounds flowers
          <View
            style={
              ([{ ...styles.flowerContainer }],
              { top: 250, left: 0, height: 130, width: '100%' })
            }>
            <Image
              source={SPRITE3}
              style={[
                { ...styles.sprite },
                { left: 55, height: 15, width: 15, top: 15 },
              ]}
            />
            <Image
              source={SPRITE3}
              style={[
                { ...styles.sprite },
                { top: 15, left: 300, height: 20, width: 20 },
              ]}
            />
            <Image
              source={SPRITE3}
              style={[
                { ...styles.sprite },
                { top: 105, left: 360, height: 20, width: 20 },
              ]}
            />
            <Image
              source={SPRITE3}
              style={[
                { ...styles.sprite },
                { top: 75, left: 260, height: 20, width: 20 },
              ]}
            />
            <Image
              source={SPRITE3}
              style={[
                { ...styles.sprite },
                { top: 75, left: 100, height: 20, width: 20 },
              ]}
            />
            <Image
              source={SPRITE2}
              style={[{ ...styles.sprite }, { top: 40, height: 16, width: 16 }]}
            />
            <Image
              source={SPRITE2}
              style={[
                { ...styles.sprite },
                { top: 20, left: 360, height: 15, width: 15 },
              ]}
            />
            <Image
              source={SPRITE2}
              style={[
                { ...styles.sprite },
                { top: 90, left: 320, height: 15, width: 15 },
              ]}
            />
            <Image
              source={SPRITE2}
              style={[
                { ...styles.sprite },
                { top: 85, left: 210, height: 15, width: 15 },
              ]}
            />
            <Image
              source={SPRITE2}
              style={[
                { ...styles.sprite },
                { top: 100, left: 60, height: 15, width: 15 },
              ]}
            />
            <Image
              source={SPRITE2}
              style={[
                { ...styles.sprite },
                { top: 10, left: 110, height: 15, width: 15 },
              ]}
            />
            <Image
              source={SPRITE5}
              style={[
                { ...styles.sprite },
                { left: 35, height: 15, width: 15, top: 25 },
              ]}
            />
            <Image
              source={SPRITE5}
              style={[
                { ...styles.sprite },
                { left: 345, height: 15, width: 15, top: 55 },
              ]}
            />
            <Image
              source={SPRITE5}
              style={[
                { ...styles.sprite },
                { left: 15, height: 15, width: 15, top: 95 },
              ]}
            />
            <Image
              source={SPRITE1}
              style={[
                { ...styles.sprite },
                { left: 55, height: 25, width: 25, top: 50 },
              ]}
            />
            <Image
              source={SPRITE1}
              style={[
                { ...styles.sprite },
                { left: 155, height: 25, width: 25, top: 80 },
              ]}
            />
            <Image
              source={SPRITE1}
              style={[
                { ...styles.sprite },
                { left: 240, height: 20, width: 20, top: 20 },
              ]}
            />
            <Image
              source={SPRITE6}
              style={[
                { ...styles.sprite },
                { left: 240, height: 15, width: 15, top: 100 },
              ]}
            />
            <Image
              source={SPRITE6}
              style={[
                { ...styles.sprite },
                { left: 250, height: 10, width: 10, top: 100 },
              ]}
            />
          </View>
          <Animated.Image
            source={
              cycleScore == 0
                ? SPRITE1
                : cycleScore == 1
                ? SPRITE2
                : cycleScore == 2
                ? SPRITE3
                : cycleScore == 3
                ? SPRITE5
                : SPRITE6
            }
            style={[styles.sprite, spriteAnimation]}
          />
          {cycleScore >= 1 ? (
            <Animated.Image
              source={SPRITE1}
              style={[styles.sprite1, sprite1Animation]}
            />
          ) : null}
          {cycleScore >= 2 ? (
            <Animated.Image
              source={SPRITE2}
              style={[
                styles.sprite1,
                { left: 10, height: 30, width: 30 },
                sprite1Animation,
              ]}
            />
          ) : null}
          {cycleScore >= 3 ? (
            <Animated.Image
              source={SPRITE3}
              style={[
                styles.sprite1,
                { left: 50, height: 40, width: 40 },
                sprite1Animation,
              ]}
            />
          ) : null}
          {cycleScore >= 4 ? (
            <Animated.Image
              source={SPRITE5}
              style={[
                styles.sprite1,
                {
                  left: 55,
                  height: 30,
                  width: 30,
                  marginBottom: MARGIN_BOTTOM - 30,
                },
                sprite1Animation,
              ]}
            />
          ) : null}
          {cycleScore === 0 && score !== 0 ? null : cycleScore >= 5 ? (
            <Animated.Image
              source={SPRITE6}
              style={[
                styles.sprite1,
                {
                  left: 15,
                  height: 28,
                  width: 28,
                  marginBottom: MARGIN_BOTTOM - 30,
                },
                sprite1Animation,
              ]}
            />
          ) : null}
          <Animated.Image
            source={{ uri: BASKET }}
            style={[styles.basket, basketAnimation]}
          />
        </View>
      </GestureDetector>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  hanger: {
    height: 17,
    width: 12,
    backgroundColor: 'rgba(165, 42, 42, 0.8)',
    position: 'absolute',
    right: 25,
    top: 107,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    borderColor: '#fff',
    borderWidth: 0.3,
  },
  board: {
    height: 50,
    width: 45,
    backgroundColor: 'rgba(0, 255, 0, 0.35)',
    position: 'absolute',
    right: 8,
    top: 125,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    borderColor: 'rgba(165, 42, 42, 0.6)',
    borderWidth: 3,
  },
  parrot: {
    height: 90,
    width: 90,
    position: 'absolute',
    top: 40,
    right: -15,
  },
  flowerContainer: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderColor: 'blue',
    position: 'absolute',
    top: 100,
    left: 200,
  },
  sprite1: {
    height: SPRITE_SIZE,
    width: SPRITE_SIZE,
    position: 'absolute',
    bottom: MARGIN_BOTTOM + 35,
    left: 25,
  },
  background: {
    flex: 1,
  },
  scoreValue: {
    color: 'yellow',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sprite: {
    height: SPRITE_SIZE,
    width: SPRITE_SIZE,
    position: 'absolute',
    top: 50,
  },
  basket: {
    height: BASKET_HEIGHT,
    width: BASKET_WIDTH,
    position: 'absolute',
    bottom: MARGIN_BOTTOM,
    zIndex: -1,
  },
  container: {
    flex: 1,
  },
});

export default App;
*/






// import React, { useEffect } from 'react';
// import { View, StyleSheet } from 'react-native';
// import Animated, { 
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   withRepeat
//  } from 'react-native-reanimated';

// const SIZE = 100;

// function App() {

//   const opacity = useSharedValue(1);
//   const scale = useSharedValue(2);

//   const handleRotation = (opacity) => {
//       'worklet';
//       return `${opacity.value * 2 * Math.PI}rad`;
//   }
  
//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       opacity: opacity.value,
//       borderRadius: (opacity.value * SIZE) / 3,
//       transform: [
//         { scale: scale.value },
//         { rotate: handleRotation(opacity) }
//       ]
//     }
//   })


//   useEffect(() => {
//     opacity.value = withRepeat(withTiming(0.3), 10, true);
//     scale.value = withRepeat(withTiming(1), 10, true);
//   });

//   return(
//     <View style={styles.container}>
//       <Animated.View
//         style={
//           [
//             {
//               height: SIZE,
//               width: SIZE,
//               backgroundColor: 'blue'
//             },
//             animatedStyle
//           ]
//         }
//       />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   }
// })

// export default App;
