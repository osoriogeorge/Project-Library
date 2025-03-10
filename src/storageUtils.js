const STORAGE_KEY = "myLibrary";

export function saveLibraryToStorage(myLibrary) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(myLibrary));
}

export function loadLibraryFromStorage() {
  const storedLibrary = JSON.parse(localStorage.getItem(STORAGE_KEY));
  return storedLibrary || [];
}
