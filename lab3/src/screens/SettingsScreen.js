import React from 'react';
import { Screen, Header, Title, Content, Card, Row, Label, Badge, Muted, ActionButton, ActionText } from '../styles/ui';

export default function SettingsScreen({ completedCount, totalCount, onReset }) {
  return (
    <Screen>
      <Header>
        <Title>Налаштування</Title>
      </Header>
      <Content>
        <Card>
          <Row>
            <Label>Виконано завдань</Label>
            <Badge $done={completedCount === totalCount}>
              {completedCount}/{totalCount}
            </Badge>
          </Row>
          <Muted style={{ marginTop: 8 }}>
            Після скидання рахунок і прогрес повертаються до нуля.
          </Muted>
          <ActionButton onPress={onReset}>
            <ActionText>Скинути прогрес</ActionText>
          </ActionButton>
        </Card>
      </Content>
    </Screen>
  );
}
