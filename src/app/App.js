import './App.css';
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InfiniteCanvas } from '../components/Canvas/InfiniteCanvas';

function App() {

  const config = {};

  useEffect(() => {
    const originalTitle = document.title;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        document.title = originalTitle;
      } else {
        document.title = "Chotto matte Onee-san!";
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className='App'>
        <InfiniteCanvas />
    </div>
  );
}

export default App;
