import { useEffect, useState } from 'react';
import { Image } from "@aws-amplify/ui-react";
import { Auth, API, Storage } from 'aws-amplify';


function UserPhotos() {
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
  
    useEffect(() => {
      const fetchUploadedPhotos = async () => {
        try {
          const response = await Storage.list('', { level: 'private' });
          const photos = response.results
          const photoArray = photos.map(photo => Storage.get(photo.key, { level: 'private' }));
          setUploadedPhotos(photoArray);
          console.log(photoArray)
        } catch (error) {
          console.error('Error listing uploaded photos:', error);
        }
      };
  
      fetchUploadedPhotos();
    }, []);
  
    return (
      <div>
        <h2>Uploaded Photos</h2>
        {uploadedPhotos.map(photo => (
          <Image source={``} style={{ width: 100, height: 100 }} key={photo.eTag}/>
        ))}
      </div>
    );
  }

export default UserPhotos;