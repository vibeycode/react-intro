import { useMemo, useState } from 'react';

export function useFilteredList(items, getSearchableValue) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const lowerQuery = query.toLowerCase();
    return items.filter((item) => getSearchableValue(item).toLowerCase().includes(lowerQuery));
  }, [items, query, getSearchableValue]);

  return { query, setQuery, filtered };
}
