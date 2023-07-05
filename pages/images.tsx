import React, { useState, useEffect } from "react";
import {
  FileUploader,
  Collection,
  withAuthenticator,
  useAuthenticator,
  Button
} from "@aws-amplify/ui-react";
import { Auth, API, Storage, withSSRContext } from 'aws-amplify';
import Router from 'next/router';
import { S3ProviderListOutputItem } from "@aws-amplify/storage";
import "@aws-amplify/ui-react/styles.css";
import { ImageCard } from "../src/components/ImageCard";
import { Login } from "@/src/components/Authorization/Login";
import { getServerSideProps } from "@/src/utils/authenticatedUsers";
import Link from 'next/link';
import Navbar from '@/src/components/Navigation/Navbar'

function App() {
  const [imageKeys, setImageKeys] = useState<S3ProviderListOutputItem[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const { signOut } = useAuthenticator(context => [context.signOut]);

  const { user } = useAuthenticator();

  const signOutHandler = async () => {
    try {
      await Auth.signOut();
      Router.push('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchImages = async () => {
    try {
      const { results } = await Storage.list("", { level: "private" });
      setImageKeys(results);
      const s3Images = await Promise.all(
        results.map(
          async image => await Storage.get(image.key!, { level: "private" })
        )
      );
      setImages(s3Images);
    } catch (error) { 
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const onSuccess = (event: { key: string }) => {
    fetchImages();
  };

  const deleteImage = async (imageKey: string) => {
    try {
      console.log(imageKey)
      await Storage.remove(imageKey, { level: "private" });
      const updatedKeys = imageKeys.filter(key => key.key !== imageKey);
      setImageKeys(updatedKeys);
      const updatedImages = images.filter(image => image !== imageKey);
      setImages(updatedImages);
      console.log(`Deleted image: ${imageKey}`);
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  if(!user){
    return <Login/>
  }

  return (
    <div className="flex flex-col">
      <Navbar/>
      <div className="flex flex-col items-center">
        <FileUploader
          accessLevel="private"
          acceptedFileTypes={["image/*"]}
          variation="drop"
          onSuccess={onSuccess}
        />
      </div>
      <Collection
        items={images}
        type="grid"
        padding="2rem"
        boxShadow="0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
        maxWidth="1100px"
        margin="0 auto"
        justifyContent="center"
        templateColumns={{
          base: "minmax(0, 500px)",
          medium: "repeat(2, minmax(0, 1fr))",
          large: "repeat(3, minmax(0, 1fr))"
        }}
        gap="small"
      >
        {(item, index) => (
          <>
            <ImageCard
              key={index}
              imageKeys={imageKeys}
              item={item}
              index={index}
              deleteImage={deleteImage}
            />
            
          </>
        )}
      </Collection>
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
}

export default App