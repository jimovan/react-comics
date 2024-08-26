import md5 from "md5";

const publicKey = import.meta.env.VITE_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_PRIVATE_KEY;

function generateHash(timeStamp: number) {
    return md5(timeStamp + privateKey + publicKey);
}

export async function getCharacters() {

    try {
        let timeStamp = new Date().getTime();
        let hash = generateHash(timeStamp);

        let url = `https://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}&limit=10`

        let response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        let data = await response.json();
        return data.data.results;
    }
    catch (error) {
        console.error(error);
    }
}