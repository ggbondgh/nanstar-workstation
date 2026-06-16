const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const host = "127.0.0.1";
const port = Number(process.env.PORT || process.argv[2] || 4321);

const mime = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png"
};

http.createServer((req, res) => {
  const rawPath = decodeURIComponent((req.url || "/").split("?")[0]);
  const relPath = rawPath === "/" ? "/index.html" : rawPath;
  const filePath = path.normalize(path.join(root, relPath));

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(error.code === "ENOENT" ? 404 : 500);
      res.end(error.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const isAsset = ext === ".png";
    res.writeHead(200, {
      "Cache-Control": isAsset ? "public, max-age=31536000, immutable" : "no-cache",
      "Content-Type": mime[ext] || "application/octet-stream",
      "Content-Security-Policy": "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; img-src 'self' data:"
    });
    res.end(data);
  });
}).listen(port, host, () => {
  console.log(`NanStar Workstation: http://${host}:${port}/index.html`);
});
