import { Stack } from '@mui/joy';
import clsx from 'clsx';
import { shuffle } from 'radash';
import React, { useEffect } from 'react';

type Props = {};

const flags = [
  'Halló',
  'Olá',
  'Buongiorno',
  'Como podemos ajudar?',
  'God morgon',
  'Ahoj',
  'Hej',
  'Vi ses',
  'Do widzenia',
  'À bientôt',
  'How can we help?',
  'Tot ziens',
  'Guten Morgen',
  'Dank je',
  'Bom dia',
  'Köszönöm',
  'Näkemiin',
  'Takk fyrir',
  'Ďakujem',
  'Dzień dobry',
  'Kiitos',
  'Buenos días',
  'Dziękuję',
  'Bonjour',
  'Gracias',
  '¿Cómo podemos ayudar?',
  'Hasta luego',
  'Takk',
  'Hogyan segíthetünk?',
  'Hello',
  'Viszlát',
  'Danke',
  'Dobro jutro',
  'Hola',
  'Doviđenja',
  'Jak můžeme pomoci?',
  'Hvala',
  'Merci',
  'Hei',
  'Bis später',
  'Until later',
  'Jó reggelt',
  'Thank you',
  'Goedemorgen',
  'Godmorgen',
  'Ako môžeme pomôcť?',
  'Até mais',
  'Jak możemy pomóc?',
  'Dobro jutro',
  'Vi sees',
  'Ciao',
  'Cześć',
  'Gratias tibi',
  'Salut',
  'Dobré ráno',
  'Vi ses',
  'Tak',
  'Hei',
  'Na shledanou',
  'Good morning',
  'Ahoj',
  'Hallo',
  'Tack',
  'Arrivederci',
  'Hallo',
  'Do videnia',
  'Bless',
  'Dobré ráno',
  'Doviđenja',
  'Bonjour',
  'Hvala',
  'God morgen',
  'Zdravo',
  'Bună dimineața',
  'Děkuji',
  'Hej',
  'Grazie',
  'La revedere',
  'Bok',
  'Obrigado',
  'Mulțumesc',
];

function Languages({}: Props) {
  const [randomFlags, setFlags] = React.useState(flags);

  useEffect(() => {
    setFlags(shuffle(flags));
  }, []);
  return (
    <Stack
      sx={(theme) => ({
        maxWidth: '100%',
        overflow: 'hidden',
        ['.slide-left, .slide-right']: {
          display: 'flex',
          flexDirection: 'row',
          animation: 'infinite-scroll 60s linear infinite',
        },
        ['.slide-right']: {
          animationDirection: 'reverse',
        },
        ['.slide-item']: {
          fontSize: '1rem',
        },
        ['@keyframes infinite-scroll']: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      })}
      suppressHydrationWarning
    >
      <Stack sx={{ position: 'relative' }}>
        <Stack sx={{ textAlign: 'center' }}>
          <span className="text-base font-semibold leading-7 text-indigo-500">
             MULTILÍNGUE
          </span>
          <h3 className="mb-6 text-3xl font-bold text-center sm:text-4xl">
             Suporte automático a mais de 100 línguas
          </h3>
        </Stack>
        <div
          className={clsx(
            'absolute left-0 h-full w-14 sm:w-32 pointer-events-none bg-gradient-to-r z-10',
            'via-black from-black'
          )}
        />
        <div
          className={clsx(
            'absolute right-0 h-full w-14 sm:w-32 pointer-events-none bg-gradient-to-l z-10',
            'via-black from-black'
          )}
        />
        <section className="relative flex flex-col -space-y-8">
          <div className="slider">
            <div
              className="space-x-4 slide-left"
              style={
                {
                  // width: 'calc(12240px)',
                }
              }
            >
              {randomFlags.map((each) => (
                <div key={each} className="slide">
                  <span className="slide-item ">{each}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="slider">
            <div
              className="h-auto space-x-4 slide-right"
              style={
                {
                  // width: 'calc(12240px)',
                }
              }
            >
              {flags.map((each) => (
                <div key={each} className="slide">
                  <span className="slide-item ">{each}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Stack>
    </Stack>
  );
}

export default Languages;
