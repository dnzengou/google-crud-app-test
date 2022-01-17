// source: https://codewithcurt.com/create-a-bootstrap-crud-google-web-app/
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('WebAppBoot');
}

function uuid() {
  var uuid_array = [];
  var ss= SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = ss.getSheetByName("DATA");
  var getLastRow = dataSheet.getLastRow();
  if(getLastRow > 1) {
    var uuid_values = dataSheet.getRange(2, 1, getLastRow - 1, 1).getValues(); 
    for(i = 0; i < uuid_values.length; i++)
    {
      uuid_array.push(uuid_values[i][0]);
    }
    var x_count = 0;
    do {
    var y = 'false';
    var uuid_value = Utilities.getUuid(); 

    if(uuid_array.indexOf(uuid_value) == -1.0)
    {
      y = 'true';
      Logger.log(uuid_value);
      return uuid_value;   
    } 
    x_count++;
    } while (y == 'false' && x_count < 5);
  } else {
    return Utilities.getUuid();
  }
}

function UpdateRecord(record_id, idekategori, beskrivning, prioritet, namn, avdelning, email) {
  var ss= SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = ss.getSheetByName("DATA"); 
  var getLastRow = dataSheet.getLastRow();
  var table_values = dataSheet.getRange(2, 1, getLastRow - 1, 8).getValues();
  for(i = 0; i < table_values.length; i++)
  {
    if(table_values[i][0] == record_id)
    {
      dataSheet.getRange(i+2, 2).setValue(idekategori);
      dataSheet.getRange(i+2, 3).setValue(beskrivning);
      dataSheet.getRange(i+2, 4).setValue(prioritet);
      dataSheet.getRange(i+2, 5).setValue(namn);
      dataSheet.getRange(i+2, 6).setValue(avdelning);
      dataSheet.getRange(i+2, 7).setValue(email);
    }
    
  }
  return 'SUCCESS';
}

function DeleteRecord(record_id)
{
  var ss= SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = ss.getSheetByName("DATA"); 
  var getLastRow = dataSheet.getLastRow();
  var table_values = dataSheet.getRange(2, 1, getLastRow - 1, 8).getValues();
  for(i = 0; i < table_values.length; i++)
  {
    if(table_values[i][0] == record_id)
    {
      var rowNumber = i+2;
      dataSheet.getRange('A' + rowNumber +':I' + rowNumber).clearContent();
      
    }   
  }
  return 'SUCCESS';
}

function AddRecord(idekategori, beskrivning, prioritet, namn, avdelning, email) {
  var uniqueID = uuid();
  var found_record = false;
  var ss= SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = ss.getSheetByName("DATA");
  var getLastRow = dataSheet.getLastRow();
  for(i = 2; i < getLastRow; i++)
  {
    if(dataSheet.getRange(i, 1).getValue() == '')
    {
      dataSheet.getRange('A' + i + ':I' + i).setValues([[uniqueID, idekategori, beskrivning, prioritet, namn, avdelning, email, new Date()]]);
      found_record = true;
      break;
    }
  }
  if(found_record == false)
  { 
    dataSheet.appendRow([uniqueID, idekategori, beskrivning, prioritet, namn, avdelning, email, new Date()]);
  }
  return 'SUCCESS';
  
}

function searchRecords(idekategori, beskrivning, prioritet, namn, avdelning, email) 
{

  var returnRows = [];
  var allRecords = getRecords();

  allRecords.forEach(function(value, index) {

    var evalRows = [];
    if(idekategori != '')
    {
      if(value[1].toUpperCase() == idekategori.toUpperCase()) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else
    {
       evalRows.push('true');
    }

    if(beskrivning != '')
    {
       if(value[2].toUpperCase() == beskrivning.toUpperCase()) {
         evalRows.push('true');
       } else {
         evalRows.push('false');
       }
    }
    else
    {
       evalRows.push('true');
    }

    if(prioritet != '')
    {
       if(value[3] == prioritet) {
         evalRows.push('true');
       } else {
         evalRows.push('false');
       }
    }
    else
    {
       evalRows.push('true');
    }

    if(namn != '')
    {
       if(value[4].toUpperCase() == namn.toUpperCase()) {
         evalRows.push('true');
       } else {
         evalRows.push('false');
       }
    }
    else
    {
       evalRows.push('true');
    }

    if(avdelning != '')
    {
       if(value[5].toUpperCase() == avdelning.toUpperCase()) {
         evalRows.push('true');
       } else {
         evalRows.push('false');
       }
    }
    else
    {
       evalRows.push('true');
    }

    if(email != '')
    {
       if(value[6].toUpperCase() == email.toUpperCase()) {
         evalRows.push('true');
       } else {
         evalRows.push('false');
       }
    }
    else
    {
       evalRows.push('true');
    }

    if(evalRows.indexOf("false") == -1)
    {
      returnRows.push(value);    
    }

  });

  return returnRows;
}

function getRecords() { 
  var return_Array = [];
  var ss= SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = ss.getSheetByName("DATA"); 
  var getLastRow = dataSheet.getLastRow();
  for(i = 2; i <= getLastRow; i++)
  {
    if(dataSheet.getRange(i, 1).getValue() != '')
    {
      return_Array.push([dataSheet.getRange(i, 1).getValue(), 
      dataSheet.getRange(i, 2).getValue(),
      dataSheet.getRange(i, 3).getValue(),
      dataSheet.getRange(i, 4).getValue(),
      dataSheet.getRange(i, 5).getValue(),
      dataSheet.getRange(i, 6).getValue()]);
    }
  }  
  return return_Array;  
}