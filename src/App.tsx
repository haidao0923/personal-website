import React, { useEffect, useState } from 'react';
import './App.css';
import {Home} from './pages/home';
import {About} from './pages/about';
import {Secret} from './pages/secret';
import {Contact} from './pages/contact';
import {
  Routes,
  Route,
} from "react-router-dom";

import badges from "./lists/badge_list";

import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage';

function App() {

  useEffect(() => {
    document.title = "Hai's Hub"
  }, [])

  const [imageUrls, setImageUrls] = useState<string[][]>([]);
  const category_count = [13, 23, 17, 15, 8, 13, 5, 16, 6, 3, 5, 15, 11, 11, 7, 25, 2, 6, 36, 22, 1, 3, 9, 0, 2, 2];
/*
  useEffect(() => {
    const storage = getStorage();

    const retrieveImages = async (imageCounts: number[]) => {
      const tempImageUrls: string[][] = []
      for (let folderIndex = 0; folderIndex < imageCounts.length; folderIndex++) {
        const folderCount = imageCounts[folderIndex];
        const folderUrls: string[] = [];

        for (let imageIndex = 0; imageIndex < folderCount; imageIndex++) {
          const imageRef = ref(
            storage,
            `gallery_images/${String.fromCharCode(65 + folderIndex)}/${imageIndex}.png`
          );

          try {
            const url = await getDownloadURL(imageRef);
            folderUrls.push(url);
          } catch (error) {
            console.error('Error fetching image:', error);
          }
        }

        tempImageUrls.push(folderUrls);
      }
      console.log("More testing", tempImageUrls)
      setImageUrls(tempImageUrls);
    };

    retrieveImages(category_count);
    console.log("Hey! Is this running multiple times?")
    console.log("New ImageURLS", imageUrls)
  }, []);
*/

  useEffect(() => {
    const storage = getStorage();

    const retrieveImages = async () => {
      const tempImageUrls: string[][] = []

      for (let folderIndex = 0; folderIndex < 26; folderIndex++) {
        const folderUrls: string[] = [];

        const folderRef = ref(
          storage,
          `gallery_images/${String.fromCharCode(65 + folderIndex)}/`
        );

        try {
          const { items } = await listAll(folderRef);
          await Promise.all(items.map(async (itemRef) => {
            try {
              const url = await getDownloadURL(itemRef);
              folderUrls.push(url);
            } catch (error) {
              console.error('Error fetching image:', error);
            }
          }));
          tempImageUrls.push(folderUrls);
        } catch (error) {
          console.error('Error listing folder:', error);
        }
      }
      console.log("More testing", tempImageUrls)
      setImageUrls(tempImageUrls);
    };

    retrieveImages();
    console.log("Hey! Is this running multiple times?")
    console.log("New ImageURLS", imageUrls)
  }, []);


  const getActiveSlideValues = () => {
    const activeSlides = document.querySelectorAll(`.active-slider`);
    const activeSlideIndices = Array.from(activeSlides).map((slide: any) => slide.getAttribute('data-key'));
    checkBadgeCompletion(activeSlideIndices);
    console.log(`Active Slide Indices`, activeSlideIndices);
  };

  const lockedBadges: number[] = [];
  const unlockedBadges: number[] = [0,1,2];
  const completedBadges: number[] = [];

  const checkBadgeCompletion = (activeSlideIndices: string[]) => {
    //TODO
    for (let i = 0; i < unlockedBadges.length; i++) {
      console.log("Unlocked Cond: " + badges[unlockedBadges[i]].unlockConditions)
      if (badges[unlockedBadges[i]].unlockConditions.every((e) => {
        return activeSlideIndices.includes(e);
      })) {
        console.log("Yay!!!" + unlockedBadges[i]);
        const badgeNumber = unlockedBadges.splice(i, 1)[0];
        completedBadges.unshift(badgeNumber);
        alert("You completed a badge! Check the Secret tab!")
      }
    }
  }

  return (
      <Routes>
        <Route path='/' element={<About/>}/>
        <Route path='/gallery' element={<Home imageUrls={imageUrls} getActiveSlideValues={getActiveSlideValues}/>}/>
        <Route path='/secret' element={<Secret unlockedBadges={unlockedBadges} completedBadges={completedBadges}/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
  );
}

export default App;
