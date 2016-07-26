var esriBarSpec = {
  "type": "chart",
  "name": "test bar chart",
  "title": "test bar chart",
  "subTitle": "",
  "footer": "",
  "series": [
    {
      "type": "barSeries",

      // chartSeries
      "title": "string",

      "query": {
        "where": "1=1",

        "outStatistics": [{
          "onStatisticField": "Number_of", // actual field name from the data
          "statisticType": "sum", // what is var?
          "outStatisticFieldName": "Number_of_SUM"
        }], // other outstatistics here

        "groupByFieldsForStatistics": "Type",
        "orderByFields": "Number_of_SUM DESC"
      },

      "x": "Type",
      "y": "Number_of_SUM",

      "showLabels": false, // boolean default false
      "horizontalAxisId": "x-axis",
      "verticalAxisId": "y-axis",

      "colorType": "singleColor", // default singleColor could inherit site colors here

      // barSeries
      "multipleBarType": "none", // what is stacked100?
      "barSize": "long", //default: 90 ??????
      "fillSymbol": { // Pull in our own stuff
        "type": "esriSFS",
        "style": "esriSFSSolid",
        "color": [115,76,0,255],
        "outline": {
          "type": "esriSLS",
          "style": "esriSLSSolid",
          "color": [110,110,110,255],
          "width": 1
        }
      }
    }
  ],
  "legend": [
    {
      "type": "chartLegend",
      "visible": false,
      "title": "",
      "alignment": "right",
      "valueFormat": "" // need clarification
    }
  ],
  "axes": [
    {
      "type": "chartAxis",
      "id": "x-axis",
      "visible": true,
      "isLogarithmic": false,
      "title": "Facility Use",
      "valueFormat": "string",
      "dateTimeFormat": "string",
      "calculateAutomaticMinimum": true, //boolean default true
      "calculateAutomaticMaximum": true, // boolean default true
      "minimum": "number", // Match to scales[0].domain || scales[0].range
      "maximum": "number" // Match to scales[0].domain || scales[0].range
    },
    {
      "type": "chartAxis",
      "id": "y-axis",
      "visible": true,
      "isLogarithmic": false,
      "title": "Total Students",
      "valueFormat": "string",
      "dateTimeFormat": "string",
      "calculateAutomaticMinimum": true, //boolean default true
      "calculateAutomaticMaximum": true, // boolean default true
      "minimum": "number", // Match to scales[1].domain || scales[1].range
      "maximum": "number" // Match to scales[1].domain || scales[1].range
    }
  ],
  "metadata": "",

  "dataSource": "https://services.arcgis.com/uDTUpUPbk8X8mXwl/arcgis/rest/services/Public_Schools_in_Onondaga_County/FeatureServer/0"
}

var esriLineSpec = {
  "type": "chart",
  "name": "test line chart",
  "title": "test line chart",
  "subTitle": "",
  "footer": "",
  "series": [
    {
      "type": "lineSeries",

      "title": "string",

      "query": {
        "where": "1=1",

        "orderByFields": "Date"
      },

      "x": "Date",
      "y": "Injuries",

      "showLabels": false,
      "horizontalAxisId": "x-axis",
      "verticalAxisId": "y-axis",

      "colorType": "singleColor",

      "lineSymbol": {
        "type": "esriSLS",
        "style": "esriSLSSolid",
        "color": [115,76,0,255],
        "width": 1
      }
    }
  ],
  "legend": [
    {
      "type": "chartLegend",
      "visible": false,
      "title": "",
      "alignment": "right",
      "valueFormat": ""
    }
  ],
  "axes": [
    {
      "type": "chartAxis",
      "id": "x-axis",
      "visible": true,
      "isLogarithmic": false,
      "title": "Date",
      "valueFormat": "string",
      "dateTimeFormat": "string",
      "calculateAutomaticMinimum": true,
      "calculateAutomaticMaximum": true,
      "minimum": "number",
      "maximum": "number"
    },
    {
      "type": "chartAxis",
      "id": "y-axis",
      "visible": true,
      "isLogarithmic": false,
      "title": "Injuries",
      "valueFormat": "string",
      "dateTimeFormat": "string",
      "calculateAutomaticMinimum": true,
      "calculateAutomaticMaximum": true,
      "minimum": "number",
      "maximum": "number"
    }
  ],
  "metadata": "",

  "dataSource": "http://services.arcgis.com/bkrWlSKcjUDFDtgw/arcgis/rest/services/It's_a_Tornado_Map/FeatureServer/0"
}

var esriScatterSpec = {
  "type": "chart",
  "name": "test scatterplot chart",
  "title": "test scatterplot chart",
  "subTitle": "",
  "footer": "",
  "series": [
    {
      "type": "scatterSeries",

      "title": "string",

      "query": {
        "where": "1=1",
      },

      "x": "Number_of",
      "y": "F_of_teach",

      "showLabels": false,
      "horizontalAxisId": "x-axis",
      "verticalAxisId": "y-axis",

      "colorType": "singleColor",

      "markerSymbol": {
        "type": "esriSMS",
        "style": "esriSMSCircle",
        "color": [76,115,0,255],
        "size": 8,
        "angle": 0,
        "xoffset": 0,
        "yoffset": 0,
        "outline": {
          "color": [152,230,0,255],
          "width": 1
        }
      },
      "visualVariables": [
        {
          "type": "colorInfo",
          "field": "Type",
          "stops": [
            {
              "value": 0,
              "color": [255,255,255,255],
              "label": "< 30.900"
            },
            {
              "value": 100,
              "color": [127,127,0,255],
              "label": "37.415"
            }
          ]
        }
      ]
    }
  ],
  "legend": [
    {
      "type": "chartLegend",
      "visible": true,
      "title": "Facility Type",
      "alignment": "right",
      "valueFormat": ""
    }
  ],
  "axes": [
    {
      "type": "chartAxis",
      "id": "x-axis",
      "visible": true,
      "isLogarithmic": false,
      "title": "Student Enrollment (2008)",
      "valueFormat": "string",
      "dateTimeFormat": "string",
      "calculateAutomaticMinimum": true,
      "calculateAutomaticMaximum": true,
      "minimum": "number",
      "maximum": "number"
    },
    {
      "type": "chartAxis",
      "id": "y-axis",
      "visible": true,
      "isLogarithmic": false,
      "title": "Fraction of Teachers",
      "valueFormat": "string",
      "dateTimeFormat": "string",
      "calculateAutomaticMinimum": true,
      "calculateAutomaticMaximum": true,
      "minimum": "number",
      "maximum": "number"
    }
  ],
  "metadata": "",

  "dataSource": "https://services.arcgis.com/uDTUpUPbk8X8mXwl/arcgis/rest/services/Public_Schools_in_Onondaga_County/FeatureServer/0"
}



var barChart = Cedar({
  "type": "vg",
  "spec": esriBarSpec
})
console.log('bar is: ', barChart)
barChart.show('#bar')

var lineChart = Cedar({
  "type": "vg",
  "spec": esriLineSpec
})
console.log('line is: ', lineChart)
lineChart.show('#line')

var scatterChart = Cedar({
  "type": "vg",
  "spec": esriScatterSpec
})
console.log('scatter is: ', scatterChart)
scatterChart.show('#scatter')
