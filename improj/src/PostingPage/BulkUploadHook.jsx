import { useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import supabase from '../Supabase/Supabase';

export default function UploadBulkData() {
  const [file, setFile] = useState(null);

  const SelectFiles = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (fileExtension === 'csv') {
      Papa.parse(file, {
        header: true,
        complete: async (results) => {
          const cleanedData = results.data.filter(row => {
            return Object.values(row).some(value => value !== null && value !== '');
          });
          await uploadToSupabase(cleanedData);
        },
      });
    }
    else {
      alert('Your File is Unsupported! Download The Guide');
    }
  };

  const uploadToSupabase = async (data) => {
    const { data: insertedData, error } = await supabase
      .from('Books')
      .insert(data);

    if (error) {
      console.error('Error uploading data:', error);
      alert('Error uploading data: ' + error.message);
    } else {
      alert('Data uploaded successfully!');
      console.log('Uploaded data:', insertedData);
    }
  };

  const TestSupa = () =>{
    console.log(supabase);
  }

  return (
    <div style={{ paddingTop: '315px' }}>
      <input type="file" onChange={SelectFiles} />
      <label>Enter a csv or excel file</label>
      <button onClick={handleUpload}>Upload</button>
      <button onClick={TestSupa}>Try</button>
    </div>
  );
}
