import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { useEffect, useState } from 'react';
import api from '../services/api';
import InfoScreen from './InfoScreen';
import { useUsersContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { AiOutlineReload } from 'react-icons/ai';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import formattedDate from '../services/formattedDate';
import Filters from './Filters';

interface Data {
  name: string;
  gender: string;
  birth: string;
  action: string;
}

function createData(
  name: string,
  gender: string,
  birth: string,
  action: string
): Data {
  return {
    name,
    gender,
    birth,
    action,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { order, orderBy, onRequestSort, rowCount } = props;

  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead sx={{ borderRight: 1, backgroundColor: 'lightblue' }}>
      <TableRow sx={{ borderRight: 1 }}>
        <TableCell
          sx={{ borderRight: 1 }}
          key={'name'}
          sortDirection={orderBy === 'name' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'name'}
            direction={orderBy === 'name' ? order : 'asc'}
            onClick={createSortHandler('name')}
          >
            Nome
            {orderBy === 'name' ? (
              <Box component='span' sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell sx={{ borderRight: 1 }} key={'gender'}>
          <TableSortLabel>Gênero</TableSortLabel>
        </TableCell>
        <TableCell sx={{ borderRight: 1 }} key={'birth'}>
          <TableSortLabel>Data de Nascimento</TableSortLabel>
        </TableCell>
        <TableCell sx={{ borderRight: 1 }} key={'action'}>
          <TableSortLabel>Info</TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
  const [loading, setLoading] = useState(10);
  const { getUsers, results, handleModal, getFiltered } = useUsersContext();

  useEffect(() => {
    api.get<any>('/?results=50&nat=br').then(response => {
      getUsers(response.data.results);
      getFiltered(response.data.results);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rows = results.map(result => {
    return createData(
      `${result.name.first} ${result.name.last}`,
      result.gender,
      result.dob.date,
      result.login.uuid
    );
  });
  const createRows = rows.slice(loading - loading, loading);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const [search, setSearch] = useState('');

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box>
        <TextField
          sx={{ width: '60%', mb: 2 }}
          id='outlined-search'
          label='Pesquise pelo nome'
          type='search'
          onChange={event => {
            setSearch(event.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Filters />
      <Box
        sx={{
          border: 1,
          borderRight: 1,
          borderColor: 'blue',
          width: '60%',
          alignContent: 'center',
          margin: 'auto',
        }}
      >
        <TableContainer sx={{ borderRight: 1 }}>
          <Table
            sx={{ borderRight: 1, minWidth: 750 }}
            aria-labelledby='tableTitle'
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody sx={{ borderRight: 1 }}>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(createRows, getComparator(order, orderBy))
                .filter(row => {
                  if (search === '') {
                    return row;
                  } else if (
                    row.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return row;
                  }
                })
                .map((row, index) => {
                  return (
                    <TableRow
                      sx={{ borderRight: 1, borderBottom: 1 }}
                      tabIndex={-1}
                      key={row.name}
                    >
                      <TableCell
                        sx={{ borderRight: 1, borderBottom: 1 }}
                        component='th'
                        scope='row'
                        padding='none'
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        sx={{ borderRight: 1, borderBottom: 1 }}
                        align='left'
                      >
                        {row.gender === 'male' ? 'Masculino' : 'Feminino'}
                      </TableCell>
                      <TableCell
                        sx={{ borderRight: 1, borderBottom: 1 }}
                        align='left'
                      >
                        {formattedDate(row.birth)}
                      </TableCell>
                      <TableCell
                        sx={{ borderRight: 1, borderBottom: 1 }}
                        align='center'
                      >
                        <Link to={`${row.action}`}>
                          <Button
                            variant='contained'
                            onClick={() => handleModal(true)}
                          >
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <InfoScreen />
      </Box>
      <Button onClick={() => setLoading(prevState => prevState + 10)}>
        <AiOutlineReload size={22} />
        <span>Carregar mais</span>
      </Button>
    </Box>
  );
}
