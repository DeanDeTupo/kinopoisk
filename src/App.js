import './App.css';
import Films from './components/Films';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import SimpleLayout from './layouts/SimpleLayout';
import SingleFilmPage from './components/Page/SingleFilmPage';
import PageContent from './components/Page/PageContent';
import recommend from './data/recommendation.json';
import recFootage from './data/demo/recomend_footage.json';
import NotFound from './components/NotFound';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              index={true}
              element={
                <section>
                  <h1>Кинопоиск</h1>
                  <p>ТОПовые фильмы кинопоиска за 15-20 год</p>
                  <Link to="films">
                    <button style={{ padding: '10px', borderRadius: '5px' }}>
                      Смотреть
                    </button>
                  </Link>
                </section>
              }
            ></Route>
            {/*  */}
            <Route path="films" element={<SimpleLayout />}>
              <Route index={true} element={<Films />}></Route>
              <Route path=":filmId" element={<SingleFilmPage />}></Route>
            </Route>
            <Route path="demo" element={<SingleFilmPage isDemo={true} />} />
            <Route
              path="recommend"
              element={<PageContent {...recommend} footage={recFootage} />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        {/* <Films /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
