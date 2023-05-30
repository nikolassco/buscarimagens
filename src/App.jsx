import { useState } from 'react';
import './App.css';
import ACCESS_KEY from './helpers/AccesKey';
import api from './services/api';

function App() {
  const [inputQuery, setInputQuery] = useState('');
  const [images, setImages] = useState([]);
  const [imagesNotFound, setImagesNotFound] = useState(false);

  const searchImages = async (e) => {
    e.preventDefault();
    if (!inputQuery) {
      return alert('É obrigatório preencher o campo de pesquisa');
    }
    try {
      const res = await api.get(`/search/photos/?query=${inputQuery}&client_id=${ACCESS_KEY}&orientation=portrait`);
      const { results } = res.data;
      const { status } = res;
      if (status === 200 && results.length === 0) {
        setImages([]);
        return setImagesNotFound(true);
      }
      setImagesNotFound(false);
      setImages(results);
    } catch (error) {
      alert("Erro, tente novamente mais tarde");
    }
  }

  const clearSearch = () => {
    setImages([]);
    setInputQuery('');
    setImagesNotFound(false);
  }

  return (
    <div className='App'>
      <h1>Buscar Imagens</h1>
      <form onSubmit={searchImages}>
        <input type="text" className='input-text' placeholder='Digite aqui a sua pesquisa' value={inputQuery} onChange={(e) => setInputQuery(e.target.value)} />
        <button className='confirm'>Pesquisar</button>
        <button type='button' className='cancel' onClick={clearSearch}>Limpar</button>
      </form>
      {imagesNotFound && <p>Nenhuma imagem encontrada</p>}
      {!imagesNotFound && images.length === 0 ? <p>Pesquise para ver algumas imagens</p> : (
        <div className="cards">
          {images.map((image) =>
            <div className="card" key={image.id}>
              <img src={image.urls.thumb} alt={image.alt_description} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App;
