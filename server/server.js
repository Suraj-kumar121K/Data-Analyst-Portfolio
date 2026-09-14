const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// Serve static files from root portfolio folder
app.use(express.static(path.join(__dirname, "..", "portfolio")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "portfolio", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
