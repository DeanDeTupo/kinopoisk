import './App.css';
import Films from './components/Films';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import SimpleLayout from './layouts/SimpleLayout';
import SingleFilmPage from './components/Page/SingleFilmPage';
import PageContent from './components/Page/PageContent';
import recommend from './data/recommendation.json';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              index={true}
              element={
                <>
                  <h1>Кинопоиск</h1>
                </>
              }
            ></Route>
            {/*  */}
            <Route path="films" element={<SimpleLayout />}>
              <Route index={true} element={<Films />}></Route>
              <Route path=":filmId" element={<SingleFilmPage />}></Route>
            </Route>
            <Route path="demo" element={<SingleFilmPage isDemo={true} />} />
            <Route path="recommend" element={<PageContent {...recommend} />} />

            <Route path="*" element={<h1>404... Такого тут нет</h1>} />
          </Route>
        </Routes>
        {/* <Films /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
