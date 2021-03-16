import './styles.scss';
import { Button } from '../Button';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}


interface SelecionarCategoriaProps {
  categoriaSelecionada: number;
  selecionarCategoria(id: number): any;
}

export function SideBar( {categoriaSelecionada, selecionarCategoria}: SelecionarCategoriaProps ) {

  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${categoriaSelecionada}`).then(response => {
      setMovies(response.data);
    });
    api.get<GenreResponseProps>(`genres/${categoriaSelecionada}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [categoriaSelecionada]);

  return (
    <nav className="sidebar">
    <span>Watch<p>Me</p></span>
    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          key={String(genre.title)}
          id={String(genre.title)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => selecionarCategoria(genre.id)}
          selected={categoriaSelecionada === genre.id}
        />
      ))}
    </div>
  </nav>
  )
}