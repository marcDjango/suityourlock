/*eslint-disable*/
import React from "react";
import Input from "../Input/Input";
import "./FormUpload.scss";
import { useState } from "react";
import InputSelect from "../InputSelect/InputSelect";
import {
  hairColorOptions,
  haircutOptions,
  skinTypeOptions,
  lipsTypeOptions,
  categoriesOptions,
} from "../../services/modelsOptions";

function FormUpload() {
  const [previewSource, setPreviewSource] = useState();
  //   const [nameValue, setNameValue] = useState();
  //   const [hairCutValue, setHairCutValue] = useState();
  //   const [hairColorValue, setColorValue] = useState();
  //   const [categoryValue, setCategoryValue] = useState();
  //   const [skinToneValue, setSkinToneValue] = useState();
  //   const [typeLipsValue, setLipsTypeValue] = useState();

  const previewFile = (file) => {
    const reader = new FileReader();
    console.info(reader);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // Se déclenche à la sélection d'un fichier image, puis appelle previewFile
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  // Se déclenche au submit du formulaire et passe à uploadImage l'URL base64 de l'image
  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource, e);
  };

  // Post l'url du fichier image, ainsi que les autres champs de la table photo sur cloudinary puis sur la database
  const uploadImage = async (base64EncodedImage, e) => {
    const formData = new FormData(e.target);

    const objectToPost = {};
    formData.forEach((value, key) => {
      objectToPost[key] = value;
    });

    objectToPost.image = base64EncodedImage;

    console.log(objectToPost);

    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, {
        method: "POST",
        body: JSON.stringify({ objectToPost }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-upload-main-container">
      <h1 className="form-main-title">Ajouter un modèle</h1>
      <form className="form-upload-container" onSubmit={handleSubmitFile}>
        <label htmlFor="image">
          <img src={previewSource} alt="chosen" />
          <input
            id="image"
            type="file"
            name="image"
            onChange={handleFileInputChange}
          />
        </label>
        <div className="form-upload-btn">
          <button type="submit" name="submit">
            Ajouter
          </button>
        </div>
        {/* </form> */}

        <h2 className="form-second-title">Sélectionnez des options :</h2>
        {/* <form className="form-options-container" onSubmit={handleSubmitFile}> */}
        <Input
          className="form-input"
          labelName="name"
          labelText="Nom du modèle"
          type="name"
          maxLength="100"
        />

        <InputSelect
          labelName="hair_style"
          labelTitle="Coupe de cheveux"
          id="hair_style"
          modelsOptions={haircutOptions}
        />

        <InputSelect
          labelName="hair_color"
          labelTitle="Couleur de cheveux"
          id="hair_color"
          modelsOptions={hairColorOptions}
        />
        <InputSelect
          labelName="category"
          labelTitle="Catégorie"
          id="category"
          modelsOptions={categoriesOptions}
        />
        <InputSelect
          labelName="skin_tone"
          labelTitle="Teint de peau"
          id="skin_tone"
          modelsOptions={skinTypeOptions}
        />
        <InputSelect
          labelName="lips_type"
          labelTitle="Type de lèvres"
          id="lips_type"
          modelsOptions={lipsTypeOptions}
        />

        <div className="form-upload-btn">
          <button type="submit" name="submit">
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormUpload;
