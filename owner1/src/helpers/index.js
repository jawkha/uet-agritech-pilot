import moment from 'moment';

export const transformDistanceStringToDistanceNumber = distance => {
  let distanceWithCommasRemoved = distance.split(',').join('');

  let transformedDistanceInMeters = Number.parseFloat(distanceWithCommasRemoved, 10);
  let transformedDistanceInKilometers = transformedDistanceInMeters / 1000;

  if (transformedDistanceInKilometers < 1) {
    return transformedDistanceInKilometers.toFixed(2);
  } else {
    return transformedDistanceInKilometers.toFixed(0);
  }
};

export const tranformAreaRequestedIntoPresentableNumber = area => {
  let areaWithCommasRemoved = area.split(',').join('');
  let parsedArea = Number.parseFloat(areaWithCommasRemoved, 10).toFixed(2);

  if (parsedArea > 1) {
    return `${parsedArea} hectares`;
  } else {
    return `${parsedArea} hectare`;
  }
};

export const calculateDurationInHours = (startDate, endDate) => {
  let duration = moment.duration(moment(endDate).diff(moment(startDate)));
  let durationAsHours = duration.as('hours');

  if (durationAsHours > 1) {
    return `${durationAsHours} hours`;
  } else {
    return `${durationAsHours} hour`;
  }
};
