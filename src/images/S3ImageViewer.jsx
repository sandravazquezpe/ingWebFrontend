import React, { useState, useEffect } from "react";
import AWS from "aws-sdk";
import { Spinner } from "react-bootstrap";

const S3ImageViewer = ({ filePath }) => {
  const [imageUrl, setImageUrl] = useState("");

  // Configura las credenciales y el bucket
  useEffect(() => {
    const fetchImage = async () => {
      const s3 = new AWS.S3({
        accessKeyId: "AKIA4R6BEDEEJ3NVAR7J", // Sustituye con tu accessKey
        secretAccessKey: "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", // Sustituye con tu secretKey
        region: "eu-west-1", // Cambia según tu región
      });

      const params = {
        Bucket: "wiki-uma", // Sustituye con el nombre de tu bucket
        Key: filePath, // El archivo a buscar en el bucket
      };

      try {
        // Generar un enlace de firma temporal (presigned URL) para la descarga
        const signedUrl = await s3.getSignedUrlPromise("getObject", params);
        setImageUrl(signedUrl);
      } catch (error) {
        console.error("Error fetching image from S3:", error);
      }
    };

    if (filePath) {
      fetchImage();
    }
  }, [filePath]);

  // Renderizar la imagen o un mensaje de carga
  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Fetched from S3" style={{ maxWidth: "100%" }} />
      ) : (
        <Spinner animation="border"/>
      )}
    </div>
  );
};

export default S3ImageViewer;
