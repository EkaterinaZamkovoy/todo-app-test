'use client';

import { format } from 'date-fns';
import clsx from 'clsx';
import { Task, TaskStatus } from '@/models/types';

type Props = {
  task: Task;
  categoryName?: string;
};

const statusColors: Record<TaskStatus, string> = {
  all: '',
  todo: 'bg-statusTodo text-statusTodoText',
  'in-progress': 'bg-statusInProgress text-statusInProgressText',
  done: 'bg-statusDone text-statusDoneText',
};

export const TaskCard = ({ task, categoryName }: Props) => {
  const classNames = {
    container:
      'w-full rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] bg-white p-4 flex flex-col gap-2',
    statusAndDateBlock:
      'flex justify-between items-center text-sm text-greyDark',
    status: clsx(
      'px-2 py-1 rounded-full text-xs font-semibold',
      statusColors[task.status]
    ),
    title: 'text-lg font-semibold text-taskTitle',
    category: 'text-xs text-greyDark italic',
  };
  return (
    <div className={classNames.container}>
      <div className={classNames.statusAndDateBlock}>
        <span className={classNames.status}>
          {task.status === 'todo'
            ? 'К выполнению'
            : task.status === 'in-progress'
            ? 'В процессе'
            : 'Готово'}
        </span>
        <span>{format(new Date(task.createdAt), 'dd.MM.yyyy')}</span>
      </div>

      <h3 className={classNames.title}>{task.title}</h3>

      {categoryName && (
        <div className={classNames.category}>Категория: {categoryName}</div>
      )}
    </div>
  );
};
