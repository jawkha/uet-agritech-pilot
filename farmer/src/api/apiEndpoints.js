export const apiEndpoints = {
  farmerAuth: {
    url:
      'http://ec2-18-220-207-53.us-east-2.compute.amazonaws.com/agritech/farmerAuthentication.php',
    exampleInput:
      'http://ec2-18-220-207-53.us-east-2.compute.amazonaws.com/agritech/farmerAuthentication.php?cnic=1330201777553&pwd=12345',
    successResponse: {
      farmer: [
        {
          id: '1',
          name: 'Ali Ahmad',
          address: 'hno1,sector1,abc,def',
          gis_location_lat: '33.962770',
          gis_location_lng: '71.446432'
        }
      ],
      success: 1,
      message: 'Authentication successful'
    },
    failureResponse: {
      success: 0,
      message: 'CNIC Or Password Invalid!'
    }
  },
  farmerSearchReservationOptions: {
    url:
      'http://ec2-18-220-207-53.us-east-2.compute.amazonaws.com/agritech/AvailableMachinesForReservation.php',
    exampleInput:
      'http://ec2-18-220-207-53.us-east-2.compute.amazonaws.com/agritech/AvailableMachinesForReservation.php?farmerNIC=1330201777553&startDate=2019/07/04%2020:00&endDate=2019/07/04%2021:30&machineType=Rotavator',
    successResponse: {
      success: 1,
      farmer: [
        {
          id: '1',
          name: 'Ali',
          fname: 'Ahmad',
          lat: '33.962770',
          lng: '71.446432'
        }
      ],
      owner: [
        {
          id: '2',
          name: 'Mustafa',
          fname: 'Rahman',
          lat: '33.96751',
          lng: '71.4444512',
          address: 'hno1,sector1,abc,def',
          mid: '5',
          reg_no: 'reg456',
          make: 'FIAT',
          model: '2000',
          length: '5',
          width: '2.5',
          height: '4',
          dist: '0.56'
        },
        {
          id: '7',
          name: 'Shah',
          fname: 'Jahan',
          lat: '33.995579',
          lng: '71.496725',
          address: 'university town peshawar',
          mid: '7',
          reg_no: '4536',
          make: 'Ferguson',
          model: '2010',
          length: '1',
          width: '2.5',
          height: '1',
          dist: '5.90'
        }
      ]
    },
    failureResponse: {
      success: 0,
      farmer: [
        {
          id: '1',
          name: 'Ali',
          fname: 'Ahmad',
          lat: '33.962770',
          lng: '71.446432'
        }
      ],
      owner: [],
      message: 'No machine available for the specified time.'
    }
  },
  farmerSendReservationRequest: {
    url:
      'http://ec2-18-220-207-53.us-east-2.compute.amazonaws.com/agritech/makeReservationForFarmer.php',
    exampleInput:
      'http://ec2-18-220-207-53.us-east-2.compute.amazonaws.com/agritech/makeReservationForFarmer.php?fid=1&oid=7&mid=7&startDate=2019-06-25%2011:00:00&endDate=2019-06-25%2013:00:00&areaRequested=5',
    successResponse: {
      success: 1,
      message: 'Reservation request is submitted. Please, wait for reservation process'
    },
    failureResponse: null
  },
  farmerListOpenReservations: {
    url:
      'http://ec2-18-220-207-53.us-east-2.compute.amazonaws.com/agritech/farmerReservationsByCNIC.php',
    exampleInput:
      'http://ec2-18-220-207-53.us-east-2.compute.amazonaws.com/agritech/farmerReservationsByCNIC.php?cnic=3120244533247',
    successResponse: {
      success: 1,
      reservations: [
        {
          rid: '65',
          farmer_id: '16',
          mid: '18',
          status: 'notGranted',
          owner_id: '13',
          start_date: '2019-06-27 13:00:00',
          end_date: '2019-06-27 14:00:00',
          area_requested: '24',
          data_link: null,
          request_date: '2019-06-27 12:36:46',
          Name: 'Mazhar Fareed',
          address: 'Ext Bahawalpur Farm',
          machineType: 'Rotavator',
          width: '1.7',
          make: 'Massey',
          model: 'MF385',
          'owner name': 'Bahawalpur Farm',
          owner_address: 'Ext Farm Bahawalpur',
          dist: '0.00'
        }
      ]
    },
    failureResponse: {
      success: 0,
      message: 'Currently, no reservation requests by Service Reccipient'
    }
  }
};
