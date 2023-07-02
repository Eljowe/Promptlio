import { useEffect, useState } from 'react';
import { withAuthenticator, AmplifyS3Image  } from '@aws-amplify/ui-react';
import { Auth, API, Storage } from 'aws-amplify';


function UserPhotos() {
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
  
    useEffect(() => {
      const fetchUploadedPhotos = async () => {
        try {
          const photos = await Storage.list('photos/', { level: 'private' });
          const photoArray = photos.map(photo => photo.key);
          setUploadedPhotos(photoArray);
        } catch (error) {
          console.error('Error listing uploaded photos:', error);
        }
      };
  
      fetchUploadedPhotos();
    }, []);
  
    return (
      <div>
        <h2>Uploaded Photos</h2>
        {uploadedPhotos.map(photoKey => (
          <AmplifyS3Image key={photoKey} imgKey={photoKey} />
        ))}
      </div>
    );
  }

export default UserPhotos;