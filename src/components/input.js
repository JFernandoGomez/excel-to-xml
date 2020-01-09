import React, { useState, useEffect } from 'react';
import XLSX from 'xlsx';
import builder from 'xmlbuilder';

const handleXLS = (file, setFileValues) => {
  
  var fileReader = new FileReader();
  fileReader.onload = async (e) => {
    // Parse data
    let bstr = e.target.result;
    let wb = XLSX.read(bstr, { type: 'binary' });
    
    // create empty output parsedFile Container
    let parsedFile = {};

    for await (let wsname of wb.SheetNames) {
      // get content by sheetName;
      let ws = wb.Sheets[wsname];

      // Convert array of arrays
      let data = XLSX.utils.sheet_to_json(ws);

      // Append sheetValues to sheetName
      parsedFile[wsname] = data;
    }
    
    // Update state
    setFileValues(parsedFile);
  };
  fileReader.readAsBinaryString(file);
};

const createXMLformValues = (fileValues) => {
  console.log(fileValues);
  if (!fileValues) return;
  var xml = builder.create(fileValues)
  .end({ pretty: true});
 
  console.log(xml);
  var link = document.createElement("a");
  var bb = new Blob([xml], {type: 'text/plain'});
  link.setAttribute('href', window.URL.createObjectURL(bb));
  link.setAttribute("download", "generated.xml");
  link.dataset.downloadurl = ['text/plain', link.download, link.href].join(':');
  document.body.appendChild(link); // Required for FF

  link.click(); // This will download the data file named "my_data.csv".
}

const InputExcel = () => {
  let [fileValues, setFileValues] = useState();
  let [fileName, setFileName] = useState('');

  useEffect(() => {
    setFileName('');
    createXMLformValues(fileValues);
  }, [fileValues])

  let handleChange = (e) => {
    var files = e.target.files, file;
    if (!files || files.length === 0) {
      console.log('No File selected');
      return;
    }
    file = files[0];
    handleXLS(file, setFileValues);
  }

  console.log(fileValues);

  return (
    <input type="file" id="input" value={fileName} onChange={handleChange} />
  );
};

export default InputExcel;