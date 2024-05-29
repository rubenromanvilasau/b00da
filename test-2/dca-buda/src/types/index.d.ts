export interface Trade {
    market_id: string;
    timestamp: string;
    last_timestamp: string;
    entries: Entry[];
};

type Entry = [string, string, string, string, number];