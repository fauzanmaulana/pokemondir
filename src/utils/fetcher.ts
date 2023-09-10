class Fetcher {
    static async get(url: string, useBaseUrl: boolean = true) {
        try {
            if(useBaseUrl){
                url = process.env.REACT_APP_POKEMON_URL as string + url
            }
    
            const response = await fetch(url)
            if(!response.ok) {
                throw response.status;
            }

            const result = await response.json()
            return {
                status: response.status,
                result: result
            }
        } catch (status) {
            return {
                status,
                result: {}
            }
        }
    }
}

export default Fetcher