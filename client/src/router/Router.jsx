import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import { AdminTeacher } from '../components/subRoutes/AdminTeacher.jsx';
import {Login} from '../components/Login.jsx'
import { Main } from '../components/Main.jsx';
import { Create } from '../components/subRoutes/Create.jsx';
import { ContextReservationsProvider } from '../components/context/Context.jsx';

export const Router = () => {
  return (
    <ContextReservationsProvider>
      <BrowserRouter>
        <Routes>
          {/*Componente login*/}
          <Route path='https://reserva-laboratorios-production.up.railway.app/Login' element={<Login />}/>
          {/*Componente Main*/}
          <Route path='https://reserva-laboratorios-production.up.railway.app/Main/*' element={<Main/>}>
            {/*Componente AdminTeacher*/}
            <Route path='AdminTeacher/' element={<AdminTeacher/>} />
          </Route>
          {/*Componente Crear Usuario*/}
          <Route path='https://reserva-laboratorios-production.up.railway.app/Create' element={<Create/>} /> 
          {/*Componente Editar usuario*/}
          <Route path='https://reserva-laboratorios-production.up.railway.app/Edit/:codigo' element={<Create/>} />   
        </Routes>
      </BrowserRouter>
    </ContextReservationsProvider>
  )
}
