export type UnsavedEntry = {
  title: string;
  notes: string;
  photoUrl: string;
};

export type Entry = UnsavedEntry & {
  entryId: number;
};

export async function readEntries(): Promise<Entry[]> {
  const res = await fetch('/api/entries');
  if (!res.ok) throw new Error(`An error occured: ${res.status}`);
  const entries: Entry[] = await res.json();
  return entries;
}

export async function addEntry(entry: UnsavedEntry): Promise<Entry> {
  const res = await fetch('/api/entries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
  console.log(res);
  if (!res.ok) throw new Error(`An error occurred: ${res.status}`);
  const newEntry: Entry = await res.json();
  console.log(newEntry);

  return newEntry;
}

export async function updateEntry(entry: Entry): Promise<Entry> {
  const entryId = entry.entryId;
  const res = await fetch(`/api/entries/${entryId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
  if (!res.ok) throw new Error(`An error occurred: ${res.status}`);
  entry = await res.json();
  return entry;
}

export async function removeEntry(entryId: number): Promise<void> {
  const res = await fetch(`/api/entries/${entryId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`An error occurred: ${res.status}`);
}
