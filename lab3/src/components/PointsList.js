import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { PointsRow, PointsText } from '../styles/ui';

export default function PointsList() {
  return (
    <>
      <PointsRow>
        <Ionicons name="finger-print" size={18} color="#60a5fa" />
        <PointsText>Одиночний тап: +1</PointsText>
      </PointsRow>
      <PointsRow>
        <Ionicons name="flash" size={18} color="#fbbf24" />
        <PointsText>Подвійний тап: +2</PointsText>
      </PointsRow>
      <PointsRow>
        <Ionicons name="hand-left" size={18} color="#34d399" />
        <PointsText>Довге натискання (3с): +5</PointsText>
      </PointsRow>
      <PointsRow>
        <Ionicons name="swap-horizontal" size={18} color="#f472b6" />
        <PointsText>Свайп: випадкові +1..10</PointsText>
      </PointsRow>
      <PointsRow style={{ borderBottomWidth: 0 }}>
        <Ionicons name="resize" size={18} color="#a78bfa" />
        <PointsText>Масштабування: +3</PointsText>
      </PointsRow>
    </>
  );
}
