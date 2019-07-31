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
  ownerDeviceTokenRegistration: {
    url: 'https://kf5t8rvhvf.execute-api.us-west-2.amazonaws.com/prod/data',
    exampleInput:
      'https://kf5t8rvhvf.execute-api.us-west-2.amazonaws.com/prod/data?oid=1&token=evZm-0sCQCY:APA91bE7NAuxuE5Fn0PUNw7oPJwYzDH4QduasMpFiwXI5yYN0T0og4Kj3N6faVFNDBqiwBFJpPN5rAf2rTuwcb-TPjrmhvBH0-r0p2q5FkqmdModrKOW_0ZDu_i0JyWqyuW_zZtgMhfz',
    successResponse: {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      serverStatus: 2,
      warningCount: 0,
      message: '(Rows matched: 1 Changed: 0 Warnings: 0',
      protocol41: true,
      changedRows: 0
    },
    failureResponse: {
      fieldCount: 0,
      affectedRows: 0,
      insertId: 0,
      serverStatus: 2,
      warningCount: 0,
      message: '(Rows matched: 0 Changed: 0 Warnings: 0',
      protocol41: true,
      changedRows: 0
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
    successResponse: {
      success: 1,
      reservations: [
        {
          rid: '61',
          farmer_id: '13',
          mid: '16',
          status: 'accepted',
          owner_id: '11',
          start_date: '2019-06-26 11:00:00',
          end_date: '2019-06-26 12:00:00',
          area_requested: '1',
          data_link: null,
          request_date: '2019-06-26 10:45:19',
          farmer_name: 'Manzoor Hussain',
          farmer_address: 'chak# 19,piplan, Mianwali',
          machineType: 'Rotavator',
          width: '2.8',
          make: 'Massey',
          model: 'MF385',
          'owner name': 'Piplan Farm',
          owner_address: 'Piplan AR Farm',
          dist: '8,270.45'
        }
      ]
    },
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
    successResponse: {
      success: 1,
      reservations: [
        {
          rid: '61',
          billAmount: 0,
          farmer_id: '13',
          mid: '16',
          status: 'Completed',
          owner_id: '11',
          start_date: '2019-06-26 11:00:00',
          end_date: '2019-06-26 12:00:00',
          area_requested: '1',
          data_link: 'https://agritechstorage.s3.amazonaws.com/Sandbox/fullApptesting/61.csv',
          request_date: '2019-06-26 10:45:19',
          actual_area: '3246.141712',
          authenticity: 'False',
          FarmerName: 'Manzoor',
          FarmerLastName: 'Hussain',
          machineType: 'Rotavator',
          make: 'Massey',
          model: 'MF385',
          OwnerName: 'Piplan',
          OwnerLastName: 'Farm',
          address: 'Piplan AR Farm'
        }
      ]
    },
    failureResponse: null
  }
};
