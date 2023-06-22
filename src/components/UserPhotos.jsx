import { useEffect, useState } from 'react';
import { withAuthenticator, AmplifyS3Image  } from '@aws-amplify/ui-react';
import { Auth, API, Storage } from 'aws-amplify';


const UserPhotos = () => {
    const [images, setImages] = useState([])
    useEffect(async () => {
        setImages(fetchImages());
        console.log('fetched')
    }, []);

    
    return(
        <div>
            {images.map(photo => (
                <AmplifyS3Image key={photo.key} imgKey={photo.key} />
            ))}
        </div>
    )
}

export default UserPhotos;