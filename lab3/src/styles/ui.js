import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Screen = styled.SafeAreaView`
  flex: 1;
  background-color: ${(p) => p.theme.bg};
`;

export const Header = styled.View`
  padding: 12px 16px 8px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${(p) => p.theme.text};
`;

export const SubTitle = styled.Text`
  margin-top: 4px;
  color: ${(p) => p.theme.muted};
`;

export const Content = styled.View`
  flex: 1;
  padding: 0 16px 16px;
`;

export const Card = styled.View`
  background-color: ${(p) => p.theme.card};
  border-radius: 16px;
  padding: 16px;
  border-width: 1px;
  border-color: ${(p) => p.theme.border};
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled.Text`
  color: ${(p) => p.theme.text};
  font-size: 16px;
  font-weight: 600;
`;

export const Muted = styled.Text`
  color: ${(p) => p.theme.muted};
`;

export const TaskRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${(p) => p.theme.border};
`;

export const TaskLeft = styled.View`
  flex: 1;
  padding-right: 12px;
`;

export const TaskTitle = styled.Text`
  color: ${(p) => p.theme.text};
  font-size: 15px;
  font-weight: 600;
`;

export const TaskMeta = styled.Text`
  color: ${(p) => p.theme.muted};
  margin-top: 4px;
  font-size: 12px;
`;

export const ProgressBar = styled.View`
  height: 6px;
  border-radius: 999px;
  background-color: ${(p) => p.theme.border};
  overflow: hidden;
  margin-top: 6px;
`;

export const ProgressFill = styled.View`
  height: 6px;
  border-radius: 999px;
  background-color: ${(p) => p.theme.accent};
  width: ${(p) => p.$width}%;
`;

export const Badge = styled.Text`
  color: ${(p) => (p.$done ? '#16a34a' : p.theme.muted)};
  font-weight: 700;
`;

export const BigScore = styled.Text`
  font-size: 36px;
  font-weight: 800;
  color: ${(p) => p.theme.text};
`;

export const Hint = styled.Text`
  margin-top: 10px;
  color: ${(p) => p.theme.muted};
  line-height: 20px;
`;

export const ActionButton = styled.Pressable`
  margin-top: 16px;
  padding: 12px 14px;
  border-radius: 12px;
  background-color: ${(p) => p.theme.accent};
`;

export const ActionText = styled.Text`
  color: #ffffff;
  font-weight: 700;
  text-align: center;
`;

export const TouchTarget = styled(Animated.View)`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: #f97316;
  align-items: center;
  justify-content: center;
  shadow-color: #000000;
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  elevation: 3;
`;

export const TargetText = styled.Text`
  color: #ffffff;
  font-weight: 700;
`;

export const PointsRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${(p) => p.theme.border};
`;

export const PointsText = styled.Text`
  color: ${(p) => p.theme.text};
  margin-left: 10px;
`;
