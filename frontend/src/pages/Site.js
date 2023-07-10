import React, { useState, useEffect } from "react";
import Accordion from "../components/Accordion";
import { useParams } from "react-router-dom";
const BACKEND_URL = "http://localhost:4000";

const Site = () => {
  const { id } = useParams();
  const [siteData, setSiteData] = useState();
  const [selectedImage, setSelectedImage] = useState(
    siteData?.images?.url1 || ""
  );

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/sites/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur de récupération des données");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setSiteData(data);
        setSelectedImage(data.images.url1);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, setSiteData]);

  const handlePreviewerClick = (imageURL) => {
    setSelectedImage(imageURL);
  };

  return (
    <section>
      {siteData && (
        <>
          <h2>{siteData.name}</h2>
          <p className="place">
            {siteData.place} ({siteData.department})
          </p>
          <div className="previewers">
            <div className="previewerLead">
              <img src={`${BACKEND_URL}/images/${selectedImage}`} alt="" />
            </div>
            <div className="previewersList">
              <div
                className="previewer"
                onClick={() => handlePreviewerClick(siteData?.images?.url1)}
              >
                <img
                  src={`${BACKEND_URL}/images/${siteData?.images?.url1}`}
                  alt="photo1"
                />
              </div>
              <div
                className="previewer"
                onClick={() => handlePreviewerClick(siteData?.images?.url2)}
              >
                <img
                  src={`${BACKEND_URL}/images/${siteData?.images?.url2}`}
                  alt="photo2"
                />
              </div>
              <div
                className="previewer"
                onClick={() => handlePreviewerClick(siteData?.images?.url3)}
              >
                <img
                  src={`${BACKEND_URL}/images/${siteData?.images?.url3}`}
                  alt="photo3"
                />
              </div>
              <div
                className="previewer"
                onClick={() => handlePreviewerClick(siteData?.images?.url4)}
              >
                <img
                  src={`${BACKEND_URL}/images/${siteData?.images?.url4}`}
                  alt="photo4"
                />
              </div>
              <div
                className="previewer"
                onClick={() => handlePreviewerClick(siteData?.images?.url5)}
              >
                <img
                  src={`${BACKEND_URL}/images/${siteData?.images?.url5}`}
                  alt="photo5"
                />
              </div>
            </div>
            <p className="credits">crédit photos : {siteData.userId}</p>
          </div>
          <div className="informer">
            <p>{siteData.description}</p>
            <Accordion name="autres informations">
              <p className="type">Type de structure : {siteData.type}</p>
              <p className="type">Etat de conservation : {siteData.state}</p>
              <p className="type">
                Accès publique : {siteData.publicAccess ? "oui" : "non"}
              </p>
              <p className="type">Hauteur : {siteData.size}m</p>
              <p className="type">Masse : ~ {siteData.weigth}t</p>
              <p className="type">Matériau : {siteData.material}</p>
            </Accordion>
            <Accordion name="commentaires">
              <article className="post">
                <p>Posté par Romano :</p>
                <p>"super méga menhir de la mort of ze dead"</p>
              </article>
              <article className="post">
                <p>Posté par Alex :</p>
                <p>"ouai mon chat c'est super méga vrai d'abooooord"</p>
              </article>
            </Accordion>
          </div>
        </>
      )}
    </section>
  );
};

export default Site;
