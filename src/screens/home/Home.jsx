
import React, { useEffect, useState } from 'react';
import '../../styles/default.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { wikiServices } from '../../services/wiki';
import WikiElement from '../../components/wiki/WikiElement';

const Home = () => {
  const [wikis, setWikis] = useState([]);

  useEffect(() => {
    wikiServices.getAllWikis(setWikis)
  }, [])

  return (
    <>
      <div className="card my-3" >
        <div className="card-body"></div>
        <h1 className="card-title">LA WIKI</h1>

        <div className='container-general'>
          <div className='py-4'>
            <ul className='lista'>
              {wikis?.map(wiki =>
                <li key={wiki._id}>
                  <WikiElement wiki={wiki} />
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
