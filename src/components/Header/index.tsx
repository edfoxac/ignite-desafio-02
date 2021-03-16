import './styles.scss';

interface SelecionarCategoriaProps {
  nomeGeneroSelecionado: string;
}
export function Header({nomeGeneroSelecionado}: SelecionarCategoriaProps ) {

  return (
    <>
    <header>
      <span className="category">Categoria:<span>{nomeGeneroSelecionado}</span></span>
    </header>
    </>
  )
}