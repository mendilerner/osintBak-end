export interface  Newsinterface {
        _id: string;
        source: string;
        link: string;
        snippet: string;
        body: string;
        keywords: [string]
        time: string;
        rating: number;
        matchTo?: string;
        literalLocation: [string];
        coordinates: [number]  
}