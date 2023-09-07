import React, { useState, useEffect } from "react";
import Accordion from "../components/Accordion";
import { useParams } from "react-router-dom";
const BACKEND_URL = "http://51.77.159.211:11007";

const Site = () => {
  const { id } = useParams();
  const [siteData, setSiteData] = useState();
  const [selectedImage, setSelectedImage] = useState(
    siteData?.images?.url1 || ""
  );
  const [isConnected, setIsConnected] = useState(false);
  const [post, setPost] = useState("");

  const handlePostSubmit = (e) => {
    e.preventDefault();
    // Envoi du contenu du commentaire au backend
    fetch(`${BACKEND_URL}/api/sites/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        siteId: id,
        userId: localStorage.getItem("lpf_userId"),
        post: post,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur d'enregistrement du commentaire");
        }
        return response.json();
      })
      .then((data) => {
        // Actualisation de la liste des commentaires
        setSiteData(data.site);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  useEffect(() => {
    if (localStorage.getItem("lpf_userId")) setIsConnected(true);
  }, [isConnected]);

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
              <img
                src={`${BACKEND_URL}/images/${selectedImage}`}
                alt="first image"
              />
            </div>
            <div className="previewersList">
              <div
                className="previewer"
                onClick={() => handlePreviewerClick(siteData?.images?.url1)}
              >
                {siteData.images.url1 && (
                  <img
                    src={`${BACKEND_URL}/images/${siteData?.images?.url1}`}
                    alt="photo1"
                  />
                )}
              </div>
              <div
                className="previewer"
                onClick={() => handlePreviewerClick(siteData?.images?.url2)}
              >
                {siteData.images.url2 && (
                  <img
                    src={`${BACKEND_URL}/images/${siteData?.images?.url2}`}
                    alt="photo2"
                  />
                )}
              </div>
              <div
                className="previewer"
                onClick={() => handlePreviewerClick(siteData?.images?.url3)}
              >
                {siteData.images.url3 && (
                  <img
                    src={`${BACKEND_URL}/images/${siteData?.images?.url3}`}
                    alt="photo3"
                  />
                )}
              </div>
              <div
                className="previewer"
                onClick={() => handlePreviewerClick(siteData?.images?.url4)}
              >
                {siteData.images.url4 && (
                  <img
                    src={`${BACKEND_URL}/images/${siteData?.images?.url4}`}
                    alt="photo4"
                  />
                )}
              </div>
              <div
                className="previewer"
                onClick={() => handlePreviewerClick(siteData?.images?.url5)}
              >
                {siteData.images.url5 && (
                  <img
                    src={`${BACKEND_URL}/images/${siteData?.images?.url5}`}
                    alt="photo5"
                  />
                )}
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
              {isConnected && (
                <form id="postWriting" onSubmit={(e) => handlePostSubmit(e)}>
                  <label htmlFor="postWriter">
                    Envie d'apporter votre commentaire ? (max 200 caractères) :
                  </label>
                  <textarea
                    name="post"
                    id="postWriter"
                    cols="80"
                    rows="4"
                    maxLength="200"
                    placeholder="Entrez votre commentaire ici..."
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                  ></textarea>
                  <button type="submit">Ajouter le commentaire</button>
                </form>
              )}
            </Accordion>
          </div>
        </>
      )}
    </section>
  );
};

export default Site;
