import { MainToDoWidget } from '@/widget';

export default function Home() {
  const classNames = {
    container: 'flex flex-col gap-[50px] px-[100px] py-[100px]',
    title:
      'text-6xl font-bold text-primary text-center border border-greyLight p-5 rounded-[20px] shadow-[0_0_10px_rgba(0,0,0,0.1)]',
  };

  return (
    <main className={classNames.container}>
      <div className={classNames.title}>
        <h1>TODO LIST</h1>
      </div>
      <MainToDoWidget />
    </main>
  );
}
