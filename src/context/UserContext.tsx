import { createContext, useState, useContext } from 'react';
import { ReactNode } from 'react';

/*
import {
  ListUsersContextProps,
  ListUsersProviderProps,
  UsersDataProps,
} from '../services/types';*/

import { IResults, Result, Info } from '../backend';

type UsersProviderProps = {
  children: ReactNode;
};

export const UsersContext = createContext({} as IResults);

export function ListUsersProvider({ children }: UsersProviderProps) {
  const [results, setResults] = useState<Result[]>([]);
  const [info, setInfo] = useState<Info[]>([]);
  const [filtered, setFiltered] = useState<Result[]>([]);

  const [openModal, setOpenModal] = useState<boolean>(false);

  function getUsers(params: Result[]) {
    setResults(params);
  }

  function getFiltered(params: Result[]) {
    setFiltered(params);
  }

  function getInfo(params: Info[]) {
    setInfo(params);
  }

  function handleModal(param: boolean) {
    setOpenModal(param);
  }

  return (
    <UsersContext.Provider
      value={{
        results,
        getUsers,
        info,
        getInfo,
        openModal,
        handleModal,
        getFiltered,
        filtered,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export const useUsersContext = () => {
  return useContext(UsersContext);
};
