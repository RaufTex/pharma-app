import { useState } from 'react';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  return (
    <input
      type='search'
      onChange={event => {
        setSearch(event.target.value);
      }}
    />
  );
}
