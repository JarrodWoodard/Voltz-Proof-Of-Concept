declare namespace NodeJS {
  export interface ProcessEnv {
    // Environment
    NODE_ENV: "development" | "test" | "production" | "staging";
    PORT: string;

    // Api
    API_NAME: string;
    API_TOKEN: string;

    // Docker
    DOCKER_IMAGE: string;

    // Localization
    LANG: string;
    TZ?: string;

    // Logging
    GRAPHQL_DEBUG: "0" | "1";

    // Postgres
    POSTGRES_HOST: string;
    POSTGRES_PORT: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;

    // Migrations
    MIGRATIONS_ENABLED: "0" | "1";

    // Options
    RUN_INTERVALS_IMMEDIATELY: "0" | "1";
  }
}
