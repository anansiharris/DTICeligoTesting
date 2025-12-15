/* eslint-disable */
/* Auto-generated from celigo/Transform/Echo 204 - Transform.js */
/* Hard lint-safe wrapper mode */

"use strict";

function __celigoInvoke(options) {
  function transform (options) {
    var record=options.record
    record.retry="reprocessed"
    var L11Lookup={
      "BM":"bill_of_lading_no",
      "P8":"transfer_order_no",
      "P1":"transfer_order_no",
      "CN":"load_no",
      "PO":"purchase_order_no",
      "SO":"sales_order_no",
      "EN":"Echo Customer ID",
      "CC":"Contract Co-op Number"
    }
    
    var subL11Lookup={
      "BM":"bill_of_lading_no",
      "P8":"pick_up_no",
      "D8":"delivery_no",
      "CN":"order_no",
      "CR":"load_no",
      "PO":"purchase_order_no",
      "SO":"sales_order_no"
    }
    
    var stopReason={
      "AL":"Advanced Loading",
      "CL":"Complete",
      "CN":"Consolidate",
      "CU":"Complete Unload",
      "DR":"Deramp and Ramp for Subsequent Loading",
      "DT":"Drop Trailer",
      "HT":"Heat The Shipment",
      "IN":"Inspection",
      "LD":"pickup",
      "LE":"Spot for Load Exchange",
      "PA":"Pick-up Pre-loaded Equipment",
      "PL":"Part Load",
      "PU":"Part Unload",
      "RT":"Retrieval of Trailer",
      "UL":"delivery"
    }
    
    var commentCode={
      "ZZZ":"General Notes:",
      "ADD":"Additional Information:",
      "BOL":"Bill of Lading Note:"
    }
    
    var dateQual = {
      "37":"pickup",
      "38":"pickup",
      "53":"delivery",
      "54":"delivery",
      "86":"delivery"
    }
    
    var timeQual={
      "0":"Original Transaction",
      "I":"pickup",
      "K":"pickup",
      "Y":"pickup",
      "G":"delivery",
      "X":"delivery",
      "Z":"delivery",
      "L":"delivery"
    }
    var timeType={
      "CN":"delivery",
      "ST":"delivery",
      "SH":"pickup",
      "SF":"pickup"
    }
    
    if (record.L11) {
    // keep only the first 15
    if (Array.isArray(record.L11)) {
    record.L11 = record.L11.slice(0, 15);
    // rest unchanged
    record.L11.forEach((ref) => {
      let qualifier = L11Lookup[ref["Reference Identification Qualifier"]] || "";
  
      if (!qualifier.includes("_")) {
        ref.other = qualifier;
        ref["Reference Identification Qualifier"] = "other";
      } else {
        ref["Reference Identification Qualifier"] = qualifier;
      }
    });
  }
    else{
      record.L11=[record.L11]
    }
      
    }
  
    
    record.NTE.forEach((note)=>{
      note["Note Reference Code"]=commentCode[note["Note Reference Code"]]||""
    })
    
    record["0300"].forEach((stop)=>{
      var comment={}
      stop["0310"].forEach((addr)=>{
        stop.reference_ID=addr.Name.toUpperCase().replace(" ","").substring(0,3)+addr.N3[0]["Address Information"].toUpperCase().replace(" ","").substring(0,3)+addr["Postal Code"].substr(0,4)
        if(addr.Name.toUpperCase().includes("CBG")){
        if(addr.N3[0]["Address Information"].toUpperCase().includes("119 EASTPORT L")){
          stop.reference_ID=stop.reference_ID+"L"
          console.log("pie")
        }else{
          stop.reference_ID=stop.reference_ID+"D"
          console.log("osan")
        }
      }
      if(addr.G61){
        addr.G61.forEach((contact)=>{
          comment={
            "Note Reference Code": contact["Name"]+": ",
            "Description": contact["Communication Number"]
          }
        })}
      })
      
      if(stop.NTE){
        stop.NTE.forEach((note)=>{
          note["Note Reference Code"]=commentCode[note["Note Reference Code"]]||""
        })
        stop.NTE.push(comment)
      }else if (comment!={}){
        stop.NTE=[comment]
      }
      
      if(stop.NTE){
        stop.notes=[]
        stop.NTE.forEach((note)=>{
          stop.notes.push({"note":note["Note Reference Code"]+note.Description})
        })
      }
      
      
      stop.G62.forEach((date)=>{
        date["Date Qualifier"]=dateQual[date["Date Qualifier"]]||""
        date["Date"]=date["Date(G6202)"]
        delete date["Date(G6202)"]
        date["Time Qualifier"]=timeQual[date["Time Qualifier"]]||""
        date["Time"]=date["Time(G6204)"].substring(0,2)+":"+date["Time(G6204)"].substring(2,4)
        delete date["Time(G6204)"]
      })
      
      stop["Stop Reason Code"]=stopReason[stop["Stop Reason Code"]]||""
      
      if(stop.L11){
        stop.L11.forEach((ref)=>{
          ref["Reference Identification Qualifier"]=subL11Lookup[ref["Reference Identification Qualifier"]]||""
        })
      }
    })
    
    return options.record
  }
  /*
  * transformFunction stub:
  *
  * The name of the function can be changed to anything you like.
  *
  * The function will be passed one 'options' argument that has the following fields:
  *   'record' - object {} or array [] depending on the data source.
  *   'settings' - all custom settings in scope for the transform currently running.
  *   'testMode' - boolean flag indicating test mode and previews.
  *   'job' - the job currently running.
  *
  * The function needs to return the transformed record.
  * Throwing an exception will return an error for the record.
  */

  const __impl =
    (typeof transform === "function" && transform) ||
    (typeof transform === "function" && transform) ||
    null;

  if (!__impl) {
    throw new Error(
      "No callable function found. Expected one of: transform, transform"
    );
  }

  return __impl(options);
}

module.exports = { transform: __celigoInvoke };
