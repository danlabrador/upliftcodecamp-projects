import { useEffect } from 'react';
import './App.css';
import GoogleIdentity from './services/api/GoogleIdentity';

function App() {
  useEffect(() => {
    const googleIdentity = new GoogleIdentity();
    googleIdentity.renderButton();
  }, []);

  return (
    <>
      <div
        id="g_id_onload"
        data-client_id="744543541785-v89rrt123mnl76h2ek2e3fvbq15erpob.apps.googleusercontent.com"
      />
    </>
  );
}

export default App;
