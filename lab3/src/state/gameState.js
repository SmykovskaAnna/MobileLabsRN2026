import { useMemo, useState } from 'react';

export const buildTasks = (stats) => {
  const {
    taps,
    doubleTaps,
    longPressCount,
    panCount,
    flingLeftCount,
    flingRightCount,
    pinchCount,
    score,
  } = stats;

  const clamp = (value, max) => Math.min(value, max);

  return [
    { id: 'taps10', label: 'Зробити 10 кліків', progress: clamp(taps, 10), target: 10, done: taps >= 10 },
    { id: 'double5', label: 'Подвійний клік 5 разів', progress: clamp(doubleTaps, 5), target: 5, done: doubleTaps >= 5 },
    { id: 'long3s', label: 'Утримувати 3 секунди', progress: clamp(longPressCount, 1), target: 1, done: longPressCount >= 1 },
    { id: 'pan', label: 'Перетягнути об\'єкт', progress: clamp(panCount, 1), target: 1, done: panCount >= 1 },
    { id: 'flingR', label: 'Свайп вправо', progress: clamp(flingRightCount, 1), target: 1, done: flingRightCount >= 1 },
    { id: 'flingL', label: 'Свайп вліво', progress: clamp(flingLeftCount, 1), target: 1, done: flingLeftCount >= 1 },
    { id: 'pinch', label: 'Змінити розмір об\'єкта', progress: clamp(pinchCount, 1), target: 1, done: pinchCount >= 1 },
    { id: 'score100', label: 'Отримати 100 очок', progress: clamp(score, 100), target: 100, done: score >= 100 },
    {
      id: 'custom',
      label: 'Власне: зробити 3 свайпи',
      progress: clamp(flingLeftCount + flingRightCount, 3),
      target: 3,
      done: flingLeftCount + flingRightCount >= 3,
    },
  ];
};

export const useGameState = () => {
  const [score, setScore] = useState(0);
  const [taps, setTaps] = useState(0);
  const [doubleTaps, setDoubleTaps] = useState(0);
  const [longPressCount, setLongPressCount] = useState(0);
  const [panCount, setPanCount] = useState(0);
  const [flingLeftCount, setFlingLeftCount] = useState(0);
  const [flingRightCount, setFlingRightCount] = useState(0);
  const [pinchCount, setPinchCount] = useState(0);

  const stats = {
    score,
    taps,
    doubleTaps,
    longPressCount,
    panCount,
    flingLeftCount,
    flingRightCount,
    pinchCount,
  };

  const actions = {
    setScore,
    setTaps,
    setDoubleTaps,
    setLongPressCount,
    setPanCount,
    setFlingLeftCount,
    setFlingRightCount,
    setPinchCount,
  };

  const tasks = useMemo(
    () => buildTasks(stats),
    [
      score,
      taps,
      doubleTaps,
      longPressCount,
      panCount,
      flingLeftCount,
      flingRightCount,
      pinchCount,
    ]
  );

  const resetAll = () => {
    setScore(0);
    setTaps(0);
    setDoubleTaps(0);
    setLongPressCount(0);
    setPanCount(0);
    setFlingLeftCount(0);
    setFlingRightCount(0);
    setPinchCount(0);
  };

  const completedCount = tasks.filter((task) => task.done).length;

  return {
    stats,
    actions,
    tasks,
    completedCount,
    resetAll,
  };
};
