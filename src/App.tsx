import React, { useState } from 'react';
import { Map } from './Map';
import { YearSelector } from './YearSelector';

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
      <YearSelector
        years={years}
        defaultYear={years[years.length - 1]}
      updateLayer={(a) => setYear(a)} />
      <Map year={year}/>
    </>
  );
}

export default App;
