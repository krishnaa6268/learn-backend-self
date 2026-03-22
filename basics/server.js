import http from "http";
import fs from "fs";
import url from "url";

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);

  const log = `${Date.now()}: ${req.method} ${myUrl.pathname} - New Req Recieved\n`;

  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        if (req.method === "GET") return res.end("Home Page");
        break;

      case "/about":
        const username = myUrl.query.myname;
        res.end(`Hello I'am ${username}...`);
        break;

      case "/search":
        const search = myUrl.query.search_query;
        res.end(`Hello you are searching: ${search}...`);
        break;

      case "/signup":
        if (req.method === "GET") return res.end("This is a signup Form.");
        else if (req.method === "POST") {
          // Db Query...
          return res.end("Success");
        }
        break;

      default:
        res.end("404 not found...");
    }
  });
  // console.log("new req rec.", req.headers);
});

myServer.listen(8000, () => {
  console.log("server started...");
});
