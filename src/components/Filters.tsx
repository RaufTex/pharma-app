import { useUsersContext } from '../context/UserContext';
import { useState } from 'react';
import { Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

const nationalities = [
  'AU',
  'BR',
  'CA',
  'CH',
  'DE',
  'DK',
  'ES',
  'FI',
  'FR',
  'GB',
  'IE',
  'IR',
  'NO',
  'NL',
  'NZ',
  'TR',
  'US',
];
const genderConst = ['male', 'female'];

export default function Filters() {
  const [gender, setGender] = useState<string>('');
  const { getUsers, filtered } = useUsersContext();

  function filterByGender(event: SelectChangeEvent) {
    const e = event.target.value;
    if (e === gender) {
      getUsers(filtered);
      setGender('');
    } else {
      setGender(e);
      getUsers(filtered.filter(result => result.gender === e));
    }
  }

  function filterByNationality(event: SelectChangeEvent) {
    const nationalityFilter = event.target.value;
    if (!nationalityFilter) {
      getUsers(filtered);
    } else {
      getUsers(
        filtered.filter(
          result => result.nat.toUpperCase() === nationalityFilter
        )
      );
    }
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          margin: '0 auto',
          width: '60%',
          mb: 2,
        }}
      >
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Gênero</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={gender}
            label='Gênero'
            onChange={filterByGender}
          >
            {genderConst.map((genderC, i) => (
              <MenuItem key={i} value={genderC}>
                {genderC === 'male' ? 'Masculino' : 'Feminino'}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Nacionalidade</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='Nacionalidade'
            onChange={filterByNationality}
          >
            {nationalities.map((nationality, i) => (
              <MenuItem key={i} value={nationality}>
                {nationality}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
