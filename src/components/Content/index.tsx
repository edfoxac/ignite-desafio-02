import './styles.scss';
import { MovieCard } from '../MovieCard';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Header } from '../Header';

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
  categoriaSelecionadaLista: number;
}

export function Content({categoriaSelecionadaLista}: SelecionarCategoriaProps ) {
  
  // const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  // console.log(categoriaSelecionadaLista);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${categoriaSelecionadaLista}`).then(response => {
      setMovies(response.data);
    });
    api.get<GenreResponseProps>(`genres/${categoriaSelecionadaLista}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [categoriaSelecionadaLista]);
  return (
    <div className="container">
    <Header nomeGeneroSelecionado={selectedGenre.title} />
    <main>
      <div className="movies-list">
        {movies.map(movie => (
          <MovieCard key={movie.Title} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
        ))}
      </div>
    </main>
  </div>
  )
}