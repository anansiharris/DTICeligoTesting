/* eslint-disable */
/* Auto-generated from celigo/PostResponseMap/Orderful Post Response Map.js */
/* Hard lint-safe wrapper mode */

"use strict";

function __celigoInvoke(options) {
  function postResponseMap(options) {
    const record = options.postResponseMapData[0];
  
    const reservationActionCode = record.status === "in_review" ? "A" : "D";
    record.statusCode=record.status
    record.emailID=null
    const response = [{
      statusCode: record.statusCode,
      transactionSetHeader: [{ transactionSetIdentifierCode: "990" }],
      beginningSegmentForBookingOrPickupDelivery: [{
        standardCarrierAlphaCode: "PDCT",
        shipmentIdentificationNumber: record.loadRef,
        date: getTodayDate(),
        reservationActionCode,
      }],
      businessInstructionsAndReferenceNumber: [{
        referenceIdentification: String(record.loadID),
        referenceIdentificationQualifier: "CN",
      }],
      transactionSetTrailer: []
    }];
  
    const totalSegments = countAllSegments(response[0]);
    response[0].transactionSetTrailer.push({ numberOfIncludedSegments: String(totalSegments) });
  
    record.response = response;
    return [record];
  }
  
  function countAllSegments(obj) {
    // Counts the total number of key-value pairs inside each array (segment)
    return Object.values(obj)
      .filter(Array.isArray)
      .reduce((sum, arr) => sum + arr.length, 0);
  }
  
  function getTodayDate() {
    const today = new Date();
    return today.toISOString().slice(0, 10).replace(/-/g, '');
  }
  
  
  
  /*function postResponseMap(options) {
    var record = options.postResponseMapData[0];
    var Reference;
  
    var reservationActionCode;
    if (record["status"] === "in_review") {
      reservationActionCode = "A";
    } else {
      reservationActionCode = "D";
    }
    var data = [
      {
        statusCode: record.statusCode,
        transactionSetHeader: [
          {
            transactionSetIdentifierCode: "990",
          },
        ],
        beginningSegmentForBookingOrPickupDelivery: [
          {
            standardCarrierAlphaCode: "PDCT",
            shipmentIdentificationNumber: record.loadRef,
            date: getTodayDate(),
            reservationActionCode,
          },
        ],
        businessInstructionsAndReferenceNumber: [
          {
            referenceIdentification: String(record.loadID),
            referenceIdentificationQualifier: "CN",
          },
        ],
        transactionSetTrailer: [],
      },
    ];
    var numberOfIncludedSegments = String(
      countKeys(data[0].businessInstructionsAndReferenceNumber) +
        countKeys(data[0].transactionSetHeader) +
        countKeys(data[0].transactionSetTrailer) +
        countKeys(data[0].beginningSegmentForBookingOrPickupDelivery)
    );
    data[0].transactionSetTrailer.push({ numberOfIncludedSegments });
  
    record.response = data;
    return record;
  }
  
  function countKeys(obj) {
    let count = 0;
  
    function recursiveCount(o) {
      for (let key in o) {
        if (o.hasOwnProperty(key)) {
          count++; // Count the key itself
          if (typeof o[key] === "object" && o[key] !== null) {
            recursiveCount(o[key]); // Recursively count keys in objects/arrays
          }
        }
      }
    }
  
    recursiveCount(obj);
    return count;
  }
  
  function countMessageKeys(data) {
    // Extract the first data element
    const firstElement = data[0];
  
    // Check if message exists
    if (!firstElement || !firstElement.message) {
      return 0;
    }
  
    // Count all keys in message object
    return countKeys(firstElement.message);
  }
  
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Ensure two digits
    const day = String(today.getDate()).padStart(2, "0"); // Ensure two digits
    return `${year}${month}${day}`;
  }
  /*
  /*
  * postResponseMapFunction stub:
  *
  * The name of the function can be changed to anything you like.
  *
  * The function will be passed one 'options' argument that has the following fields:
  *   'postResponseMapData' - an array of records representing the page of data after response mapping is completed. A record can be an object {} or array [] depending on the data source.
  *   'responseData' - the array of responses for the page of data.  An individual response will have the following fields:
  *      'statusCode' - 200 is a success.  422 is a data error.  403 means the connection went offline.
  *      'errors' - [{code: '', message: '', source: ''}]
  *      'ignored' - true if the record was filtered/skipped, false otherwise.
  *      'data' - exports only.  the array of records returned by the export application.
  *      'id' - imports only.  the id from the import application response.
  *      '_json' - imports only.  the complete response data from the import application.
  *      'dataURI' - imports only.  a URI for the data in the import application (populated only for errored records).
  *   'oneToMany' - as configured on your export/import resource.
  *   'pathToMany' - as configured on your export/import resource.
  *   '_exportId' - the _exportId currently running.
  *   '_importId' - the _importId currently running.
  *   '_connectionId' - the _connectionId currently running.
  *   '_flowId' - the _flowId currently running.
  *   '_integrationId' - the _integrationId currently running.
  *   '_apiId' - the _apiId currently running.
  *   '_parentIntegrationId' - the parent of the _integrationId currently running.
  *   'settings' - all custom settings in scope for the export/import currently running.
  *   'sandbox' - boolean value indicating whether the script is invoked for sandbox.
  *   'testMode' - boolean flag indicating test mode and previews.
  *   'job' - the job currently running.
  *
  * The function needs to return the postResponseMapData array provided by options.postResponseMapData.  The length of postResponseMapData MUST remain unchanged.  Elements within postResponseMapData can be changed however needed.
  
  * Throwing an exception will signal a fatal error and fail the entire page of records.
  */

  const __impl =
    (typeof postResponseMap === "function" && postResponseMap) ||
    (typeof postResponseMap === "function" && postResponseMap) ||
    null;

  if (!__impl) {
    throw new Error(
      "No callable function found. Expected one of: postResponseMap, postResponseMap"
    );
  }

  return __impl(options);
}

module.exports = { postResponseMap: __celigoInvoke };
