import app from "./app";

const port = process.env.PORT || 3000;

app.listen(port).then(({ url }) => console.log(`listening on ${url}`));
