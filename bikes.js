require([
  "esri/arcgis/utils",
  "dojo/domReady!"
], function(
  arcgisUtils
) {
  // create the map from the web map
  arcgisUtils.createMap('4f14b86bae03448fac8e9ac8faff938f', 'map', {
    mapOptions: {
      zoom: 13
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
            "where": "BICYCLE_ACCIDENT='Y' AND ACCIDENT_YEAR=2009",

            "outStatistics": [{
              "statisticType": "sum",
              "onStatisticField": "COUNT_BICYCLIST_INJURED",
              "outStatisticFieldName": "COUNT_BICYCLIST_INJURED_SUM"
            },{
              "statisticType": "sum",
              "onStatisticField": "COUNT_BICYCLIST_KILLED",
              "outStatisticFieldName": "COUNT_BICYCLIST_KILLED_SUM"

}],

            "groupByFieldsForStatistics": "TIMECAT",
            "orderByFields": "TIMECAT"
          },

          "x": "TIMECAT",
          "y": "COUNT_BICYCLIST_INJURED_SUM",

          "showLabels": false,
          "horizontalAxisId": "x-axis",
          "verticalAxisId": "y-axis",

          "colorType": "singleColor",


          "multipleBarType": "none",
          "barSize": "long",
          "fillSymbol": {
            "type": "esriSFS",
            "style": "esriSFSSolid",
            "color": [255,0,0,255],
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
          "title": "Time of Day",
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
          "title": "Total Cyclists Injured",
          "valueFormat": "string",
          "dateTimeFormat": "string",
          "calculateAutomaticMinimum": true,
          "calculateAutomaticMaximum": true,
          "minimum": "number",
          "maximum": "number"
        }
      ],
      "metadata": "",

      "dataSource": "http://services1.arcgis.com/tp9wqSVX1AitKgjd/ArcGIS/rest/services/roadsafegis_20092013/FeatureServer/0"
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
