{
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
