import { Category, TaskStatus } from './types';

export const Categories: Category[] = [
  { id: 'allCategories', name: 'Все категории' },
  { id: 'feature', name: 'Задача' },
  { id: 'bug', name: 'Баг' },
  { id: 'test', name: 'Тест' },
];

export const Statuses: { id: TaskStatus; name: string }[] = [
  { id: 'all', name: 'Все' },
  { id: 'todo', name: 'К выполнению' },
  { id: 'in-progress', name: 'В процессе' },
  { id: 'done', name: 'Готово' },
];
