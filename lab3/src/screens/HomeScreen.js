import React, { useRef } from 'react';
import { Animated } from 'react-native';
import { Directions, FlingGestureHandler, LongPressGestureHandler, PanGestureHandler, PinchGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler';
import PointsList from '../components/PointsList';
import { Screen, Header, Title, Content, Card, Row, Label, BigScore, TouchTarget, TargetText } from '../styles/ui';

const SCORE = {
  TAP: 1,
  DOUBLE_TAP: 2,
  LONG_PRESS: 5,
  PINCH: 3,
  FLING_MIN: 1,
  FLING_MAX: 10,
};

const randomFlingScore = () =>
  Math.floor(Math.random() * (SCORE.FLING_MAX - SCORE.FLING_MIN + 1)) + SCORE.FLING_MIN;

export default function HomeScreen({ stats, actions }) {
  const {
    score,
  } = stats;
  const {
    setScore,
    setTaps,
    setDoubleTaps,
    setLongPressCount,
    setPanCount,
    setFlingLeftCount,
    setFlingRightCount,
    setPinchCount,
  } = actions;

  const doubleTapRef = useRef(null);
  const translate = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scale = useRef(new Animated.Value(1)).current;

  const onPanEvent = Animated.event(
    [{ nativeEvent: { translationX: translate.x, translationY: translate.y } }],
    { useNativeDriver: false }
  );

  const onPinchEvent = Animated.event(
    [{ nativeEvent: { scale } }],
    { useNativeDriver: false }
  );

  const increment = (setter, value = 1) => setter((prev) => prev + value);
  const addScore = (value) => increment(setScore, value);

  const handleSingleTap = (event) => {
    if (event.nativeEvent.state === State.END) {
      increment(setTaps);
      addScore(SCORE.TAP);
    }
  };

  const handleDoubleTap = (event) => {
    if (event.nativeEvent.state === State.END) {
      increment(setDoubleTaps);
      addScore(SCORE.DOUBLE_TAP);
    }
  };

  const handleLongPress = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      increment(setLongPressCount);
      addScore(SCORE.LONG_PRESS);
    }
  };

  const handlePanState = (event) => {
    if (event.nativeEvent.state === State.END) {
      translate.setValue({ x: 0, y: 0 });
      increment(setPanCount);
    }
  };

  const handleFlingRight = (event) => {
    if (event.nativeEvent.state === State.END) {
      increment(setFlingRightCount);
      addScore(randomFlingScore());
    }
  };

  const handleFlingLeft = (event) => {
    if (event.nativeEvent.state === State.END) {
      increment(setFlingLeftCount);
      addScore(randomFlingScore());
    }
  };

  const handlePinchState = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const pinchScale = event.nativeEvent.scale;
      if (pinchScale > 1.1 || pinchScale < 0.9) {
        increment(setPinchCount);
        addScore(SCORE.PINCH);
      }
      scale.setValue(1);
    }
  };

  return (
    <Screen>
      <Header>
        <Title>Гра-клікер</Title>
      </Header>
      <Content>
        <Card>
          <Row>
            <Label>Очки</Label>
            <BigScore>{score}</BigScore>
          </Row>
        </Card>

        <Card style={{ marginTop: 16, alignItems: 'center' }}>
          <FlingGestureHandler
            direction={Directions.RIGHT}
            onHandlerStateChange={handleFlingRight}
          >
            <FlingGestureHandler
              direction={Directions.LEFT}
              onHandlerStateChange={handleFlingLeft}
            >
              <PanGestureHandler
                onGestureEvent={onPanEvent}
                onHandlerStateChange={handlePanState}
              >
                <PinchGestureHandler
                  onGestureEvent={onPinchEvent}
                  onHandlerStateChange={handlePinchState}
                >
                  <LongPressGestureHandler
                    minDurationMs={3000}
                    onHandlerStateChange={handleLongPress}
                  >
                    <TapGestureHandler
                      ref={doubleTapRef}
                      numberOfTaps={2}
                      onHandlerStateChange={handleDoubleTap}
                    >
                      <TapGestureHandler
                        waitFor={doubleTapRef}
                        onHandlerStateChange={handleSingleTap}
                      >
                        <TouchTarget
                          style={{
                            transform: [
                              { translateX: translate.x },
                              { translateY: translate.y },
                              { scale },
                            ],
                          }}
                        >
                          <TargetText>Натисни кнопку</TargetText>
                        </TouchTarget>
                      </TapGestureHandler>
                    </TapGestureHandler>
                  </LongPressGestureHandler>
                </PinchGestureHandler>
              </PanGestureHandler>
            </FlingGestureHandler>
          </FlingGestureHandler>
        </Card>

        <Card style={{ marginTop: 16 }}>
          <PointsList />
        </Card>
      </Content>
    </Screen>
  );
}
