require([
  "esri/arcgis/utils",
  "dojo/domReady!"
], function(
  arcgisUtils
) {
  // create the map from the web map
  arcgisUtils.createMap('a1e8dd86096c4c0192867ccaa51196ec', 'map', {
    mapOptions: {
      zoom: 16
    }
  }).then(function(response) {
    console.log(response)

    // TODO: get this from the webmap
    var esriBarSpec = {
      "type": "chart",
      "name": "test bar chart",
      "title": "test bar chart",
      "subTitle": "",
      "footer": "",
      "series": [
        {
          "type": "barSeries",


          "title": "string",

          "query": {
            "where": "1=1",

            "outStatistics": [{
              "statisticType": "count",
              "onStatisticField": "REQUESTTYPE",
              "outStatisticFieldName": "REQUESTTYPE_COUNT"
            }],

            "groupByFieldsForStatistics": "REQUESTTYPE",
            "orderByFields": "REQUESTTYPE_COUNT DESC"
          },

          "x": "REQUESTTYPE",
          "y": "REQUESTTYPE_COUNT",

          "showLabels": false,
          "horizontalAxisId": "x-axis",
          "verticalAxisId": "y-axis",

          "colorType": "singleColor",


          "multipleBarType": "none",
          "barSize": "long",
          "fillSymbol": {
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
          "valueFormat": ""
        }
      ],
      "axes": [
        {
          "type": "chartAxis",
          "id": "x-axis",
          "visible": true,
          "isLogarithmic": false,
          "title": "Request Type",
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
          "title": "Number of Requests",
          "valueFormat": "string",
          "dateTimeFormat": "string",
          "calculateAutomaticMinimum": true,
          "calculateAutomaticMaximum": true,
          "minimum": "number",
          "maximum": "number"
        }
      ],
      "metadata": "",

      "dataSource": "http://maps2.dcgis.dc.gov/dcgis/rest/services/DDOT/VisionZero/MapServer/0"
    };

    //create a show chart
    var chart = new Cedar({
      "type": "vg",
      "spec": esriBarSpec
    });
    chart.show("#chart");

    // set page title
    document.title = response.itemInfo.item.title;
    document.getElementById('pageTitle').innerHTML = response.itemInfo.item.title;
  });
 });
