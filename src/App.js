import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainMenu from './components/Home/MainMenu';
import Game from './components/Game/Game';
import Credits from './components/Home/Credits';
import Settings from './components/Home/Settings';


function App() {
  return <>
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<MainMenu/>}/>
        <Route path="/game" element={<Game/>}/>
        <Route path="/credits" element={<Credits/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="*" element={<h1>Error 404: Page not found!!!</h1>}/>
      </Routes>

    </BrowserRouter>
  </>;
}

export default App;
