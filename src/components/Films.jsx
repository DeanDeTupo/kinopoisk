import React from 'react';
import Film from './Film';
import data from '../data/test.json';

const filmList = data.docs;

const Films = () => {
  return (
    <div>
      <h2>Топ-100 лучших фильмов 2015-2024 </h2>
      {filmList.map((item, index) => {
        return <Film {...item} key={item.id} index={index} />;
      })}
    </div>
  );
};

export default Films;
