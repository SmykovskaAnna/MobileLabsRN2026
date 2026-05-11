import React from 'react';
import TaskList from '../components/TaskList';
import { Screen, Header, Title, Content, Card } from '../styles/ui';

export default function TasksScreen({ tasks }) {
  return (
    <Screen>
      <Header>
        <Title>Завдання</Title>
      </Header>
      <Content>
        <Card>
          <TaskList tasks={tasks} />
        </Card>
      </Content>
    </Screen>
  );
}
