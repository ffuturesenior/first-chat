import React, { useEffect, useState } from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { publicRoutes, userRoutes } from './routes/routes';
import Header from './components/Header'
import { useDispatch, useSelector } from 'react-redux';
import { rehost } from './servFunctions/functions';
import { AdminContext } from '.';


function App() {
  const isAuth=useSelector(state=>state.user.isAuth)
  const  [isAdmin,setIsAdmin]=useState(false)
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(rehost(setIsAdmin))
  },[])

  return (
    <div className="App">
      <AdminContext.Provider value={{isAdmin,setIsAdmin}}>
          <BrowserRouter>
            <Header/>
              <>
                {isAuth?
                  <>
                    <Switch>
                      {userRoutes.map(p=>
                        <Route path={p.path} component={p.Component} key={p.path} exact/>  
                      )}
                     
                    </Switch>
                  </>
                  :
                  <>
                    <Switch>
                      {publicRoutes.map(p=>
                        <Route path={p.path} component={p.Component} key={p.path} exact/>  
                      )}
                    </Switch>
                  </>
                }
              </>
          </BrowserRouter>
        </AdminContext.Provider>
    </div>
  );
}

export default App;
