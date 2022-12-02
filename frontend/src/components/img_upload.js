import React, { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";

// function ImageUpload() {
//     const [image, setImage] = useState('')
//     const [loading, setLoading] = useState(false)

//     const uploadImage = async e => {
//       const files = e.target.files
//       const data = new FormData()
//       data.append('file', files[0])
//       data.append('upload_preset', 'recipeImages')
//       for (var pair of data.entries()) {
//         console.log(pair[0]+ ', ' + pair[1]);
//     }
//       setLoading(true)
//       const res = await fetch(
//         'https://api.cloudinary.com/v1_1/dype2qwpo/image/upload',
//         {
//           method: 'POST',
//           body: data
//         }
//       )
//       const file = await res.json()

//       setImage(file.secure_url)
//       setLoading(false)
//     }

// return (
//   <div className="App">
//     <h1>Upload Image</h1>
//     <input
//       type="file"
//       name="file"
//       placeholder="Upload an image"
//       onChange={uploadImage}
//     />
//     {loading ? (
//       <h3>Loading...</h3>
//     ) : (
//       <img src={image} style={{ width: '300px' }} />
//     )}
//   </div>
// );
// }
// export default ImageUpload;

const ImageUpload = () => {
  const [url, setUrl] = useState([]);
  const [reqBody, setReqBody] = useState({
    urlSource: "",
  });
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dype2qwpo",
        uploadPreset: "recipeImages",
      },
      function (error, result) {
        if (result.event === "success") {
          const urlSave = result.info.secure_url;
          setUrl(urlSave);
          //   setReqBody({ ...reqBody, urlSource: url });
          console.log(urlSave);
        }

        // setUrl(result.info.secure_url);
        // console.log(`This is url ${url}`);
      },
    );
  }, []);

  async function makePostCall(imageReqBody) {
    try {
      const response = await axios.post(
        "http://localhost:5000/recipes",
        imageReqBody,
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function submitForm() {
    makePostCall(reqBody);
    // props.handleSubmit(recipe);
    // setrecipe({title: '', servings: '',
    //  totalTime: '', activeTime: '', cookTime: '',ingredients: [],steps: []
    // });
  }

  return (
    <div>
      <button onClick={() => widgetRef.current.open()}>Upload an Image</button>

      <button onClick={submitForm}>Submit your form!</button>
    </div>
  );
};

export default ImageUpload;
