
import React, { useState } from 'react';
import axios from 'axios'; 

const SaveSegmentButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [schemas, setSchemas] = useState(['']); 
  const schemaOptions = {
    first_name: 'First Name',
    last_name: 'Last Name',
    gender: 'Gender',
    age: 'Age',
    account_name: 'Account Name',
    city: 'City',
    state: 'State'
  };

  const webhookUrl = 'https://webhook.site/19d95361-d2fc-4d72-a9d9-3f104b7cd57f'; 

  
  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

 
  const handleAddSchema = () => {
    setSchemas([...schemas, '']); 
  };

 
  const handleSchemaChange = (index, value) => {
    const updatedSchemas = [...schemas];
    updatedSchemas[index] = value;
    setSchemas(updatedSchemas); 
  };

 
  const getAvailableOptions = (currentSchema) => {
    return Object.entries(schemaOptions).filter(([key]) => {
      return key === currentSchema || !schemas.includes(key);
    });
  };

  
  const handleSaveSegment = () => {
    
    const schemaData = schemas.filter(Boolean).map((schema) => ({
      [schema]: schemaOptions[schema],
    }));

    const dataToSend = {
      segment_name: segmentName,
      schema: schemaData,
    };

    
    axios
      .post(webhookUrl, dataToSend)
      .then((response) => {
        console.log('Data sent successfully:', response.data);
        alert('Segment saved successfully!');
      })
      .catch((error) => {
        console.error('Error sending data:', error);
        alert('Failed to save segment.');
      });

    
    handleClosePopup();
  };

  return (
    <div>
      <button onClick={handleOpenPopup}>Save Segment</button>

      {isPopupOpen && (
        <div style={popupStyle}>
          <h3>Save Segment</h3>
          <form>
            <div>
              <label>Segment Name: </label>
              <input
                type="text"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
                placeholder="Enter segment name"
              />
            </div>

            <div>
              <label>Add schema to segment:</label>
             
              {schemas.map((schema, index) => (
                <select
                  key={index}
                  value={schema}
                  onChange={(e) => handleSchemaChange(index, e.target.value)}
                >
                  <option value="">-- Select schema --</option>
                  {getAvailableOptions(schema).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              ))}
              <button type="button" onClick={handleAddSchema}>
                + Add new schema
              </button>
            </div>

            <button type="button" onClick={handleSaveSegment}>
              Save Segment
            </button>
            <button type="button" onClick={handleClosePopup}>Close</button>
          </form>
        </div>
      )}
    </div>
  );
};


const popupStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '20px',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

export default SaveSegmentButton;
