export async function fetchImages(poke) {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${poke}`
    );
    try {
        const data = await response.json();
    return data;
    } catch (error) {
        return null
    }
  }