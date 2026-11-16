
const fetchCountries = async (limit = 100, offset = 0, query = "") => {
    const apiKey = import.meta.env.VITE_REST_COUNTRIES_API_KEY

    const params = new URLSearchParams({
        limit: limit,
        offset: offset,
        query: query,
    });

    if (query.trim()) {
        params.append("q", query);
    }

    const url = `https://api.restcountries.com/countries/v5?${params}`;
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch countries");
        }
        const data = await response.json();
        console.log("Fetched countries:", data);
        return data;
    } catch (error) {
        console.error("Error fetching countries:", error);
        throw error;
    }
}

export default fetchCountries;

