import React, { useState } from 'react';
import { Map } from './Map';
import { YearSelector } from './YearSelector';
import { Header } from './Header';

function App() {
  const years = [
    1946,
    1956,
    1966,
    1974,
    1987,
    1995,
    2011,
    2020
  ];
  const [year, setYear] = useState(years[years.length - 1]);
  return (
    <>
      <Header>
        <YearSelector
          years={years}
          defaultYear={years[years.length - 1]}
        updateLayer={(a) => setYear(a)} />
      </Header>
      <Map year={year}/>
    </>
  );
}

export default App;
