import React from "react";

const Sharts = () => {
  return (
    <section>
      <h2>Charte d'utilisation du site</h2>
      <div className="shartContainer">
        <p>
          {" "}
          Les Pierres Folles... un nom évocateur, presque mystérieux, que l'on
          retrouve associé à énormément de sites mégalthiques en France. Un peu
          comme une marque de fabrique.
        </p>
        <p>l'objectif de cette application est simple :</p>
        <p>
          Chaque année, nous constatons la destruction de menhir, de dolmen, ou
          de singularité similaires. Hors, Nous sommes convaincu que ces
          vestiges du passés ont une importance capitale pour ce qui est de
          comprendre et de décrypter la (ou les) civilisation(s) qui les ont
          érigés. pourquoi ? Comment ? en combien de temps ? avec quels outils ?
          Bien des hypothèses ont été avancés. Parfois farfelues. Parfois
          tangibles.
        </p>
        <p>
          L'objectif des Pierres Folles n'est pas de trancher sur ces questions,
          mais de permettre de recueillir des données susceptible de les faire
          progresser. A ce titre, les gestionnaires de ce site s'évertueront à
          prioriser les faits, de préférence vérifiables, plutôt que les
          théories.
        </p>
        <p>
          Des photos, des coordonnées précises, des descriptions de tailles, de
          poids estimés, de matériau... Ce sont ce genre de données que nous
          devont prioriser, si nous voulons un jour trouver le sens premier de
          ses merveilles d'un autre temps.
        </p>
        <h3>Conditions d'utilisations</h3>
        <p>
          Tout visiteur du site aura la possibilité de consulter l'intégralité
          de la base de donnée concernant les mégalithes.
        </p>
        <p>
          En revanche, pour pouvoir contribuer à cette même base, qu'il s'agisse
          de répertorier un nouveau site, de commenter ou de signaler un
          problême, la création d'un compte sera nécessaire.
        </p>
        <p>
          La création d'un compte est gratuite. l'utilisateur devra renseigner
          une adresse mail valide, et choisir son identifiant et son mot de
          passe.
        </p>
        <p>
          La création d'un compte sur l'application implique l'acceptation de la
          présente charte.
        </p>
        <p>
          Tout contenu haineux, discriminatoire, sexuel ou moralement
          répréhensible, issue d'idéologies politiques ou religieuses, est
          interdit sous peine de suppression par l'équipe de modération du dit
          contenus, ou même du compte émetteur si celui-ci récidive.
        </p>
        <p>
          Chaque publication, contribution ou commentaire, devra se faire dans
          le respect et la bienveillance. L'expression d'opinions dans un
          objectif de débat est autorisé, si celles-ci ne sont pas pénalement
          répréhensible par la loi Française.
        </p>
        <p>
          Lorsqu'un compte est créé, ni l'adresse mail ni l'identifiant ne
          peuvent être modifié. en revanche, le mot de passe pourra être modifié
          à volonté.
        </p>
        <p>
          Bien que la contribution à la base de donnée ne nécéssitent pas de
          confirmation de la par de l'équipe de modération, celle-ci se réserve
          le droit de modifier ou supprimer une publication si celle-ci ne
          correspond pas aux critères décrits ci-dessous : <br />
          <ul>
            <li>
              > Le nom du site, la description, les coordonnées et les photos
              devront être exacts et vérifiables sur place.
            </li>
            <li>
              > Si le site n'est pas accessible au public sans l'autorisation du
              propriétaire, la mention "accès privé" devra être renseigné.
            </li>
            <li>
              > Les estimations des poids, tailles, et matériau devront être
              exact, dans la mesure du possible. A noter que ces mentions ne
              sont pas obligatoire.
            </li>
            <li>
              > Avant de créer un site, veuillez vous assurer qu'il n'est pas
              déja existant dans la base de données, en effectuant au préalable
              des recherches.
            </li>
            <li>
              > les photographies fournies dans les contributions devront être
              authentiques et libre de droit.
            </li>
          </ul>
        </p>
        <h3>Respect des données stockés</h3>
        <p>
          Les comptes utilisateurs sont sécurisé coté serveurs, par le biais
          d'un cryptage du mot de passe. L'équipe de modération n'aura en aucun
          cas l'accès direct à cette information, qui ne sera connu et
          accessible que du seul utilisateur.
        </p>
        <p>
          Nous encourageons les utilisateurs à complexifier un minimum leur mot
          de passe : 12 caractères minimum, au moin un chiffre et une lettre,
          caractères spéciaux...
        </p>
        <p>
          Les informations personnelles, c'est-à-dire adresse mail, identifiant
          et mot de passe, sont stocké dans une base de donnée indépendante
        </p>
        <p>
          La base de donnée contenant les sites est de type NoSQL. Elle n'est
          accessible qu'a partir du server de l'application.
        </p>
      </div>
    </section>
  );
};

export default Sharts;
