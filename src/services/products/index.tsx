export const getData = async (url: string) => {
    // const res = await fetch("https://fakestoreapi.com/products");
    const res = await fetch(url, {
        cache: "no-cache",
        next: {
            tags: ["rooms"]
        }
    }
        
    );

    if(!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}