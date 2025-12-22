function transform (options) {
  var lines = []
  const today = new Date();
  var apiCall={
    Reference:options.record.length>0 ?today.getFullYear().toString() +
                 String(today.getMonth() + 1).padStart(2, '0') +
                 String(today.getDate()).padStart(2, '0'):"blank",
    total:0,
    lines
  }
  options.record.forEach((rec)=>{
    apiCall.total=apiCall.total+Number(rec["Anz IST"].replace(",",""))
    
    lines.push({Item:rec.ArtikelNr.replace(".","").replace(".",""),Lot:rec.Charge.slice(0,8),Qty:rec["Anz IST"],NetWgt:(Number(rec.SummeNettoKG) *2.205).toFixed(3),UnitWgt:(Number(rec.EinzelNettoKG) * 2.205).toFixed(3)})
  }
  )
  
  console.log(JSON.stringify(apiCall.lines))
  apiCall.lines=consolidateLines(apiCall.lines);
  return [apiCall]
}

function consolidateLines(lines) {
  const grouped = {};

  lines.forEach(line => {
    const key = `${line.Item}|${line.Lot}`;
    if (!grouped[key]) {
      // Set UnitWgt from the first occurrence only
      grouped[key] = {
        Item: line.Item,
        Lot: line.Lot,
        UnitWgt: Number(line.UnitWgt || 0), // first occurrence only
        quantity: 0,
        NetWgt: 0
      };
    }
    // Sum only Qty and NetWgt
    grouped[key].quantity += Number(line.Qty || 0);
    grouped[key].NetWgt += Number(line.NetWgt || 0);
  });

  // Convert grouped object into array, round quantities
  return Object.values(grouped).map(record => ({
    Item: record.Item,
    Lot: record.Lot,
    UnitWgt: record.UnitWgt,                   // unchanged from first record
    quantity: Math.round(record.quantity),     // whole number
    NetWgt: Number(record.NetWgt.toFixed(3))   // 3 decimal places
  }));
}

function invtLev2ToMMDDYYYY(value) {
  const s = (value === null || typeof value === "undefined") ? "" : String(value).trim();

  if (s.length < 5) return ""; // or throw / return null if you prefer

  const yearOffset = parseInt(s.charAt(0), 10);
  const mm = parseInt(s.substring(1, 3), 10);
  const dd = parseInt(s.substring(3, 5), 10);

  if (Number.isNaN(yearOffset) || Number.isNaN(mm) || Number.isNaN(dd)) return "";

  const yyyy = 2020 + yearOffset;

  const MM = String(mm).padStart(2, "0");
  const DD = String(dd).padStart(2, "0");

  return `${MM}-${DD}-${yyyy}`;
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