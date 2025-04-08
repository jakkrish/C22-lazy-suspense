import { lazy, Suspense, useEffect, useState } from 'react';

import Loading from './Loading.tsx';

import './App.css';

// const LoadBigData = lazy(() => (import('./LoadBigData.tsx')));
const LoadBigData = lazy(() => (import('./ImprovedLazyLoading.tsx')));

function App() {
  const [isLoading,setIsLoading] = useState(false)

  return (
    <>
    <div>
      <button onClick={()=>{setIsLoading(true)}}>Load Images</button>
    </div>
     {isLoading && <Suspense fallback={<Loading />}>  
      <LoadBigData />
    </Suspense>}
    
    </>
  );
}

export default App;


// When you use React.lazy + Suspense, the fallback={<Loading />} only handles the loading of the component's JavaScript code, not the asynchronous data fetching or image loading inside that component.

// So in your case:

// LoadBigData.tsx is dynamically imported — this is what Suspense waits for.

// Once that import resolves, Suspense stops showing the <Loading /> fallback and renders LoadBigData.

// Inside LoadBigData, the fetch for images starts.

// The images themselves are fetched, then rendered — but they may still be loading visually (from the browser/network) even after being placed in the DOM.