export const hostname = process.env.MONGO_HOSTNAME || 'localhost';
export const mongo_port = process.env.MONGO_PORT || '27017';
export const mongo_db = process.env.MONGO_DB || 'test_database';
export const mongo_url = `mongodb://${hostname}:${mongo_port}/${mongo_db}`;
export const port = process.env.PORT || 8080;
