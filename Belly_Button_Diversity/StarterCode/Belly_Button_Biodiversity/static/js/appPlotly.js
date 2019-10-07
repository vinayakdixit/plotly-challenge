
// data route
var url = "/names";

function buildMetadata(sample) {

d3.json("/metadata/"+sample).then(function(response) {

    console.log(response);
    d3.select("#sample-metadata").html("");
    var html = "";
    html = "Age : "+response.AGE +"<br>";
    html = html + "BBType : "+response.BBTYPE +"<br>";
    html = html + "Ethnicity : "+response.ETHNICITY +"<br>";
    html = html + "Gender : "+response.GENDER +"<br>";
    html = html + "Location : "+response.LOCATION +"<br>";
    html = html + "WFREQ : "+response.WFREQ +"<br>";
    html = html + "sample : "+sample;
    d3.select("#sample-metadata").html(html);
    });
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {
d3.json("/samples/"+sample).then(function(response) {

    console.log(response);
    var data = [{
      type: "pie",
      values:response.sample_values.slice(0,10),
      labels : response.otu_ids.slice(0,10),
      hoverinfo: response.otu_labels.slice(0,10)
      }];

      var layout = {
        height: 600,
        width: 800
      };

      Plotly.plot("pie", data, layout);

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data
var trace1 = {
  x: response.otu_ids,
  y: response.sample_values,
  text: response.otu_labels,
//  hoverinfo: response.otu_labels,
  mode: 'markers',
  marker: {
    size: response.sample_values,
    color:response.otu_ids
  }
};

var data = [trace1];

var layout = {
  title: 'Bubble Plot',
  showlegend: false,
  height: 600,
  width: 1200
};

Plotly.newPlot('bubble', data, layout);
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
});
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
