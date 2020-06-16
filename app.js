console.log("hello DS10!");
let viz;

//Create a variable to store the URL
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";
//Create a variable to store the dashboard options
const options = {
  device: "desktop",
  height: "600px",
  width: "1000px",
};
//Create a variable to store the vizContainer
const vizContainer = document.getElementById("vizContainer");
//Create a variable to store the showViz button
const showVizButton = document.getElementById("showViz");
//Create a variable to store the hideViz button
const hideVizButton = document.getElementById("hideViz");
//Create a function that shows the dashboard
function initViz() {
  console.log("Hello!");

  viz = new tableau.Viz(vizContainer, url, options);
}

function showViz() {
  viz.show();
}

function hideViz() {
  viz.hide();
}

showVizButton.addEventListener("click", showViz);
hideVizButton.addEventListener("click", hideViz);

document.addEventListener("DOMContentLoaded", initViz);

//Create variables for PDF and PPT buttons
const exportPDFbutton = document.getElementById("exportPDF");
const exportPPTbutton = document.getElementById("exportPPT");

//Create functions for PDF and PPT
function exportPDFfunction() {
  viz.showExportPDFDialog();
}

function exportPPTfunction() {
  viz.showExportPowerPointDialog();
}

//create event listeners for the buttons PPT and PDF
exportPDFbutton.addEventListener("click", exportPDFfunction);
exportPPTbutton.addEventListener("click", exportPPTfunction);

//function on getting range values and applying them to the sheet
function getRangeValues() {
  //get values from min and max
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  //get the workbook object
  const workbook = viz.getWorkbook();
  const activesheet = workbook.getActiveSheet();
  const sheets = activesheet.getWorksheets();
  const sheetToFilter = sheets[1];
  sheetToFilter.applyRangeFilterAsync("SUM(Sales)", {
    min: minValue,
    max: maxValue,
  });
  console.log("getRangeValues applied");
}
document.getElementById("applyBtn").addEventListener("click", getRangeValues);
