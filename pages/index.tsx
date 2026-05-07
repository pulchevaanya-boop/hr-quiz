import Head from 'next/head';
import { QuizContainer } from '../components/QuizContainer';

export default function Home() {
  return (
    <>
      <Head>
        <title>HireFlow — Диагностика бизнеса</title>
        <meta name="description" content="Узнайте, что мешает вашему росту. Диагностика для владельцев малых и средних бизнесов." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <QuizContainer />
      </main>
    </>
  );
}
