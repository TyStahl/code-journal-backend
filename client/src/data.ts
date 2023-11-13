export type UnsavedEntry = {
  title: string;
  notes: string;
  photoUrl: string;
};
export type Entry = UnsavedEntry & {
  entryId: number;
};


// useEffect(()=>{
//   async function readEntries() {
//         try {
//         const res = await fetch('/api/entries');
//         if (!res.ok) throw new Error(`An error occured: ${res.status}`);
//         const entry = await res.json();
//         setTitle(entry.title);
//         setNotes(entry.notes);
//         setPhotoUrl(entry.photoUrl);
//       } catch (err) {
//         console.log(err);
//       }
//   // return data.entries;
// }
// readEntries();
// }, [])


export async function readEntries(): Promise<Entry[]> {
  const res = await fetch('api/entries');
  if (!res.ok) throw new Error(`An error occured: ${res.status}`);

  const entries: Entry[] = await res.json();


  return entries;
}

export async function addEntry(entry: UnsavedEntry): Promise<Entry> {
  // const newEntry = {
  //   ...entry,
  //   entryId: data.nextEntryId++,
  // };
  // data.entries.unshift(newEntry);
  const res = await fetch('api/entries/:entryId', {method:'post'})
  if (!res.ok) throw new Error(`An error occurred: ${res.status}`)
  const newEntry: Entry = await res.json();

  return newEntry;
}

export function updateEntry(entry: Entry): Entry {
  // const newEntries = data.entries.map((e) =>
  //   e.entryId === entry.entryId ? entry : e
  // );
  // data.entries = newEntries;
  return entry;
}

export function removeEntry(entryId: number): void {
  // const updatedArray = data.entries.filter(
  //   (entry) => entry.entryId !== entryId
  // );
  // data.entries = updatedArray;
}
