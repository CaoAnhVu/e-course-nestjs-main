import { Connection } from "mongoose";
export declare const databaseConnectionProviders: {
    provide: string;
    useFactory: () => Connection;
}[];
