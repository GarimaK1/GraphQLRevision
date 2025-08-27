export type Book = {
    title: string;
    author: string;
};

export type Game = {
    id: string;
    title: string;
    platform: string[];
}

export type Author = {
    id: string;
    name: string;
    isVerified: boolean;
}

export type Review = {
    id: string;
    rating: number;
    content: string;
    author_id: string;
    game_id: string;
}

export type AddGame = {
    title: string;
    platform: string[];
}