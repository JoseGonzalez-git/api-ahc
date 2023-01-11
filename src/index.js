//RUNING SERVER
import app from "./app";
import './database/db';

app.listen(app.get("port"));
console.info("Server running");
