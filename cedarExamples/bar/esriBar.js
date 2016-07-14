const barChart = {
  type: 'chart',
  name: 'test bar chart',
  title: 'test bar chart',
  subTitle: '',
  footer: '',
  series: [
    {
      type: 'barSeries',

      // chartSeries
      title: 'string',

      query: {
        where: 'where-clause',

        outStatistics: [{
          onStatisticField: 'fs_field_name', // actual field name from the data
          statisticType: '<count | sum | min | max | avg | stddev | var>', // what is var?
          outStatisticFieldName: 'uniqueFieldName'
        }], // other outstatistics here

        groupByFieldsForStatistics: 'field1,field2',
        orderByFields: 'field1,field2'
      },

      x: 'field-name',
      y: 'field-name',

      showLabels: false, // boolean default false
      horizontalAxisId: 'x-axis',
      verticalAxisId: 'y-axis',

      colorType: 'singleColor|colorMatch', // default singleColor could inherit site colors here

      // barSeries
      multipleBarType: 'none|sideBySide|stacked|stacked100', // what is stacked100?
      barSize: 'long', //default: 90 ??????
      fillSymbol: {esriSFS} // Pull in our own stuff
    }
  ],
  legend: [
    {
      type: 'chartLegend',
      visible: false,
      title: '',
      alignment: 'right',
      valueFormat: '' // need clarification
    }
  ],
  axes: [
    {
      type: 'chartAxis',
      id: 'x-axis',
      visible: true,
      isLogarithmic: false,
      title: 'x axis',
      valueFormat: 'string',
      dateTimeFormat: 'string',
      calculateAutomaticMinimum: true, //boolean default true
      calculateAutomaticMaximum: true, // boolean default true
      minimum: 'number',
      maximum: 'number'
    },
    {
      type: 'chartAxis',
      id: 'y-axis',
      visible: true,
      isLogarithmic: false,
      title: 'y axis',
      valueFormat: 'string',
      dateTimeFormat: 'string',
      calculateAutomaticMinimum: true, //boolean default true
      calculateAutomaticMaximum: true, // boolean default true
      minimum: 'number',
      maximum: 'number'
    }
  ],
  metadata: ''
};
