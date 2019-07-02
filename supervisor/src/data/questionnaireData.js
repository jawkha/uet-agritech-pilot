export const questions = [
  {
    name: 'machineryType',
    title: 'Machinery Type',
    questionText: 'Please select the machinery type used for this task',
    choices: ['Tractor', 'Cultivator', 'Cultipacker', 'Baler', 'Plough', 'Rotator']
  },
  {
    name: 'soilType',
    title: 'Soil Type',
    questionText: 'Please select the soil type of the land where this task is being carried out',
    choices: ['Clay', 'Sandy', 'Silt', 'Loam']
  },
  {
    name: 'irrigationSource',
    title: 'Irrigation Source',
    questionText:
      'Please select the irrigation source for the land where this task is being carried out',
    choices: ['Rainwater', 'Groundwater', 'River']
  },
  {
    name: 'lastCropSown',
    title: 'Last Crop Sown',
    questionText: 'Please input the name of the last crop sown on this piece of land',
    choices: null
  },
  {
    name: 'nextCropToBeSown',
    title: 'Next Crop To Be Sown',
    questionText: 'Please input the name of the next crop to be sown on this piece of land',
    choices: null
  },
  {
    name: 'fuelUsed',
    title: 'Fuel Usage',
    questionText: 'Please input the quantity of fuel in litres consumed while doing this task',
    choices: null
  }
];
