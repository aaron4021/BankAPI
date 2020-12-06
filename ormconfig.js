module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [process.env.PRODUCTION ? "build/src/**/*.entity.js" : "src/**/*.entity.ts"],
  migrationsTableName: "migration_table",
  migrations: [process.env.PRODUCTION ? "migrations/*.js" : "migrations/*.ts"],
  cli: { migrationsDir: "migrations" },
};
