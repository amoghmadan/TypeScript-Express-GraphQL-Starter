import fs from "fs";
import path from "path";
import http, { Server, ServerOptions } from "http";

import express, { Application } from "express";
import { graphqlHTTP } from "express-graphql";
import helmet from "helmet";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

import { IConfig } from "./interfaces";
import { typeDefs, resolvers } from "./schema";

export default class App {
    private static INSTANCE: App;
    public static BASE_DIR: string = path.dirname(__dirname);
    public static ENV: string = process.env.ENV || "development";
    public static CONFIG: IConfig = JSON.parse(
        fs.readFileSync(path.join(App.BASE_DIR, "resources", `${App.ENV}.json`), "utf-8")
    );

    private server: Server;
    private serverOptions: ServerOptions;
    private app: Application = express();

    private constructor() {
        const logDir: string = path.join(App.BASE_DIR, "logs");
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }

        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(morgan("combined", {
            stream: fs.createWriteStream(path.join(logDir, "access.log"), {
                flags: "a"
            })
        }));
        
        this.app.use("/graphql/", graphqlHTTP({
            schema: typeDefs,
            rootValue: resolvers,
            graphiql: App.CONFIG.graphiql
        }));

        this.serverOptions = {};
        this.server = http.createServer(this.serverOptions, this.app);
    }

    public async run(): Promise<void> {
        await mongoose.connect(App.CONFIG.mongo.uri, App.CONFIG.mongo.options);
        this.server.listen(App.CONFIG.port, "::", (): void => {
            console.log(this.server.address());
        });
    }

    public static getInstance(): App {
        if (!App.INSTANCE) {
            App.INSTANCE = new App();
        }
        return App.INSTANCE;
    }
}
