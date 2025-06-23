'use client';

import { FilterButtonGroup, TaskCard } from '@/components';
import { Categories, Statuses } from '@/models/constants';
import { Task } from '@/models/types';
import { useState } from 'react';

type Props = {
  tasks: Task[];
  getCategoryName: (categoryId: string) => string | undefined;
};

export const ListWidget = ({ tasks, getCategoryName }: Props) => {
  const [sortBy, setSortBy] = useState<'createdAt' | 'title' | 'status'>(
    'createdAt'
  );
  const [activeStatus, setActiveStatus] = useState<string>('all');
  const [activeCategory, setActiveCategory] = useState<string>('allCategories');

  const sortLabels: Record<typeof sortBy, string> = {
    createdAt: 'По дате',
    title: 'По алфавиту',
    status: 'По статусу',
  };

  const filteredTasks = tasks.filter((task) => {
    const statusMatches =
      activeStatus === 'all' || task.status === activeStatus;
    const categoryMatches =
      activeCategory === 'allCategories' || task.categoryId === activeCategory;
    return statusMatches && categoryMatches;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'createdAt':
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'title':
        return a.title.localeCompare(b.title);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const classNames = {
    container: 'flex flex-col gap-6',
    filtersAndTasksGroups: 'flex flex-col gap-4',
  };

  return (
    <div className={classNames.container}>
      <div className={classNames.filtersAndTasksGroups}>
        <FilterButtonGroup
          title='Статус:'
          filters={Statuses.map((s) => s.name)}
          active={Statuses.find((s) => s.id === activeStatus)?.name ?? 'Все'}
          onChange={(selectedName) => {
            const match = Statuses.find((s) => s.name === selectedName);
            if (match) setActiveStatus(match.id);
          }}
        />
        <FilterButtonGroup
          title='Категория:'
          filters={Categories.map((c) => c.name)}
          active={
            Categories.find((c) => c.id === activeCategory)?.name ??
            'Все категории'
          }
          onChange={(selectedName) => {
            const match = Categories.find((c) => c.name === selectedName);
            if (match) setActiveCategory(match.id);
          }}
        />
        <FilterButtonGroup
          title='Сортировать:'
          filters={Object.values(sortLabels)}
          active={sortLabels[sortBy]}
          onChange={(selectedLabel) => {
            const key = Object.entries(sortLabels).find(
              ([, label]) => label === selectedLabel
            )?.[0];
            if (key) setSortBy(key as typeof sortBy);
          }}
        />
      </div>

      <div className={classNames.filtersAndTasksGroups}>
        {sortedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            categoryName={getCategoryName(task.categoryId)}
          />
        ))}
      </div>
    </div>
  );
};
