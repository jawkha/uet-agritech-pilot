export const apiEndpoints = {
  ownerAuth: {
    url:
      'http://ec2-18-220-207-53.us-east-2.compute.amazonaws.com/agritech/ownerAuthentication.php',
    exampleInput:
      'http://ec2-18-220-207-53.us-east-2.compute.amazonaws.com/agritech/ownerAuthentication.php?cnic=1330201777553;pwd=12345',
    successResponse: {
      success: 1,
      message: 'Authentication successful',
      Owner: [
        {
          id: '1',
          name: 'Ali Khan',
          address: 'hno1,sector1,abc,def',
          gis_location_lat: '33.9665277',
          gis_location_lng: '71.4444512'
        }
      ]
    },
    failureResponse: {
      success: 0,
      message: 'CNIC Or Password Invalid!'
    }
  },
  ownerViewPendingRequests: {
    url:
      'http://ec2-18-220-207-53.us-east-2.compute.amazonaws.com/agritech/ownerReservationsByCNIC.php',
    exampleInput:
      'http://ec2-18-220-207-53.us-east-2.compute.amazonaws.com/agritech/ownerReservationsByCNIC.php?cnic=1330201777553',
    successResponse: {
      success: 1,
      reservations: [
        {
          rid: '68',
          farmer_id: '9',
          mid: '1',
          status: 'pending',
          owner_id: '1',
          start_date: '2019-06-06 03:00:00',
          end_date: '2019-06-20 01:52:00',
          area_requested: '2',
          data_link: null,
          request_date: '2019-07-01 01:52:40',
          farmer_name: 'Bilal Sheikh',
          farmer_address: 'phase 2, hayatabad, peshawar',
          machineType: 'Leveler',
          width: '5',
          make: 'make',
          model: 'model',
          'owner name': 'Ali Khan',
          owner_address: 'hno1,sector1,abc,def',
          dist: '8,305.53'
        }
      ]
    },
    failureResponse: {
      success: 0,
      message: "Service Provider's CNIC is not registered"
    }
  },
  ownerAcceptRequest: {
    url:
      'http://ec2-18-220-207-53.us-east-2.compute.amazonaws.com/agritech/ownerAcceptOrRejectRequest.php',
    exampleInput:
      'http://ec2-18-220-207-53.us-east-2.compute.amazonaws.com/agritech/ownerAcceptOrRejectRequest.php?rid=62&status=accepted',
    successResponse: {
      success: 1
    },
    failureResponse: {
      success: 0
    }
  },
  ownerRejectRequest: {
    url:
      'http://ec2-18-220-207-53.us-east-2.compute.amazonaws.com/agritech/ownerAcceptOrRejectRequest.php',
    exampleInput:
      'http://ec2-18-220-207-53.us-east-2.compute.amazonaws.com/agritech/ownerAcceptOrRejectRequest.php?rid=62&status=notAccepted',
    successResponse: {
      success: 1
    },
    failureResponse: {
      success: 0
    }
  },
  ownerViewAcceptedRequests: {
    url:
      'http://ec2-18-220-207-53.us-east-2.compute.amazonaws.com/agritech/ownerAcceptedReservationsByCNIC.php',
    exampleInput:
      'http://ec2-18-220-207-53.us-east-2.compute.amazonaws.com/agritech/ownerAcceptedReservationsByCNIC.php?cnic=1330201777553',
    successResponse: null,
    failureResponse: {
      success: 0,
      message: 'Currently, no reservation acceted by Service Provide'
    }
  },
  ownerViewHistory: {
    url:
      'http://ec2-18-220-207-53.us-east-2.compute.amazonaws.com/agritech/ownerCompletedReservationsByCNIC.php',
    exampleInput:
      'http://ec2-18-220-207-53.us-east-2.compute.amazonaws.com/agritech/ownerCompletedReservationsByCNIC.php?cnic=1330201777553',
    successResponse: null,
    failureResponse: null
  }
};
