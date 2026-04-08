import React from 'react';
import { TaskRow, TaskLeft, TaskTitle, TaskMeta, ProgressBar, ProgressFill, Badge } from '../styles/ui';

export default function TaskList({ tasks }) {
  return tasks.map((task, index) => (
    <TaskRow
      key={task.id}
      style={index === tasks.length - 1 ? { borderBottomWidth: 0 } : null}
    >
      <TaskLeft>
        <TaskTitle>{task.label}</TaskTitle>
        <TaskMeta>
          {task.progress}/{task.target}
        </TaskMeta>
        <ProgressBar>
          <ProgressFill $width={Math.min((task.progress / task.target) * 100, 100)} />
        </ProgressBar>
      </TaskLeft>
      <Badge $done={task.done}>{task.done ? 'OK' : '...'}</Badge>
    </TaskRow>
  ));
}
