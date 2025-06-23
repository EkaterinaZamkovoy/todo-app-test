'use client';

import { Button } from '@/components';
import { useState } from 'react';
import { ListWidget } from '../ListWidget/ListWidget';
import { Task } from '@/models/types';
import { Categories } from '@/models/constants';

export const MainToDoWidget = () => {
  const [view, setView] = useState<'list' | 'kanban'>('list');

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Починить баг в логике',
      status: 'in-progress',
      categoryId: 'bug',
      createdAt: '2025-06-22T10:00:00Z',
    },
    {
      id: '2',
      title: 'Написать тесты',
      status: 'todo',
      categoryId: 'test',
      createdAt: '2025-06-21T15:00:00Z',
    },
    {
      id: '3',
      title: 'Добавить новую фичу',
      status: 'done',
      categoryId: 'feature',
      createdAt: '2025-06-20T09:00:00Z',
    },
  ];

  const getCategoryName = (categoryId: string): string | undefined =>
    Categories.find((c) => c.id === categoryId)?.name;

  const classNames = {
    container: 'flex flex-col gap-[50px]',
    buttonsBlock: 'flex justify-between',
    createButtonsBlock: 'flex gap-[20px]',
  };

  return (
    <div className={classNames.container}>
      <div className={classNames.buttonsBlock}>
        <div className={classNames.createButtonsBlock}>
          <Button>Создать задачу</Button>
          <Button variant='secondary'>Создать категорию</Button>
        </div>
        <Button variant='switcher' value={view} onSwitchChange={setView} />
      </div>
      <div>
        {view === 'list' ? (
          <ListWidget tasks={tasks} getCategoryName={getCategoryName} />
        ) : (
          <div>Канбан пока не реализован</div>
        )}
      </div>
    </div>
  );
};
