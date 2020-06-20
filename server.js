const express = require("express");
const bp = require("body-parser");
const { GoogleSpreadsheet } = require("google-spreadsheet");

const port = process.env.PORT || 3000;
const app = express();

app.use(bp.urlencoded({ extended: false }))

app.use(bp.json());

// spreadsheet key is the long id in the sheets URL
const spreadsheetID = "YOUR_SPREADSHEET_ID";
// you can download service account credential file in json format from google dev console
const serviceAccountCredentials = require("./service-account-cred.json");

const doc = new GoogleSpreadsheet(spreadsheetID);
let sheet;

(async () => {
    await doc.useServiceAccountAuth(serviceAccountCredentials);
    
    await doc.loadInfo(); // loads document properties and worksheets

    sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
})();


app.get("/test", (req, res) => {
  res.send("ok");
});

app.post("/addrow", async (req, res) => {
    try {
        console.log(req.body);
        const newRow = await sheet.addRow(req.body);
        console.log("row added");
        res.json(req.body);

    } catch (err) {
        console.error(err);
    }
});

app.get("/fetchrecords", async (req, res) => {
  console.log(sheet);

  const rows = await sheet.getRows();

  const response = [
    { name: rows[0].name, marks: rows[0].marks },
    { name: rows[1].name, marks: rows[1].marks },
  ];

  res.json(response);
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`server is running at port ${port}`);
});
