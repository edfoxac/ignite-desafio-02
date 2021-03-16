import { SideBar } from './components/Sidebar';
import { Content } from './components/Content';

import './styles/global.scss';
import { useState } from 'react';

export function App() {

  const [selectedGenreId, setSelectedGenreId] = useState(1);

  function handleClickButton(id: number) {
    // console.log(id);
    setSelectedGenreId(id);
  } 
  return ( 
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar 
      categoriaSelecionada={selectedGenreId}
      selecionarCategoria={handleClickButton} 
      />
      <Content 
        categoriaSelecionadaLista={selectedGenreId}
      />
    </div>
  )
}