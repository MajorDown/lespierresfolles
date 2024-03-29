import React, { useState, useEffect } from "react";
const API_URL = "http://51.77.159.211:11007";

const Connexion = () => {
  // STATES
  const [userId, setUserId] = useState(localStorage.getItem("lpf_userId"));
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [signinErrorMessage, setSigninErrorMessage] = useState("");
  const [nextMdpErrorMessage, setNextMdpErrorMessage] = useState("");
  const [isSigned, setIsSigned] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [mdpInput, setMdpInput] = useState("");
  const [mailInput, setMailInput] = useState("");
  const [newUserInput, setNewUserInput] = useState("");
  const [newMdp1Input, setNewMdp1Input] = useState("");
  const [newMdp2Input, setNewMdp2Input] = useState("");
  const [prevMdpInput, setPrevMdpInput] = useState("");
  const [nextMdp1Input, setNextMdp1Input] = useState("");
  const [nextMdp2Input, setNextMdp2Input] = useState("");

  // HANDLERS
  const handleLogin = (e) => {
    e.preventDefault();
    const loginData = {
      userId: userInput,
      password: mdpInput,
    };

    fetch(`${API_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Identifiant ou mot de passe incorrect");
        }
      })
      .then((data) => {
        const { userId, token } = data;
        setUserId(userId);
        localStorage.setItem("lpf_userId", userId);
        localStorage.setItem("lpf_token", token);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion:", error);
        setLoginErrorMessage(error.message);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("lpf-token");
    localStorage.removeItem("lpf_userId");
    setUserId(null);
    window.location.reload();
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (signinErrorMessage === "") {
      const signupData = {
        email: mailInput,
        userId: newUserInput,
        password: newMdp1Input,
      };
      fetch(`${API_URL}/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      })
        .then((response) => {
          if (response.ok) {
            setIsSigned(true);
            setTimeout(() => {
              setIsSigned(false);
            }, 10000);
          } else {
            throw new Error("Une erreur s'est produite lors de l'inscription");
          }
        })
        .catch((error) => {
          console.error("Erreur lors de l'inscription:", error);
          setSigninErrorMessage(error.message);
        });
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const passwordChangeData = {
      userId: userId,
      password: prevMdpInput,
      newPassword: nextMdp1Input,
    };
    fetch(`${API_URL}/api/users/editUserPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("lpf_token")}`,
      },
      body: JSON.stringify(passwordChangeData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Erreur lors de la modification du mot de passe");
        }
      })
      .then((data) => {
        console.log("Mot de passe modifié avec succès");
        setNextMdpErrorMessage("Mot de passe modifié avec succès");
        setTimeout(() => {
          setNextMdpErrorMessage("");
        }, 10000);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la modification du mot de passe :",
          error
        );
        setNextMdpErrorMessage("la modification du mot de passe a échoué");
        setTimeout(() => {
          setNextMdpErrorMessage("");
        }, 10000);
      });
  };

  //INITIALISATIONS
  useEffect(() => {
    if (newMdp1Input && newMdp2Input && newMdp1Input !== newMdp2Input) {
      setSigninErrorMessage("Il y a une différence entre vos deux passwords !");
    } else {
      setSigninErrorMessage("");
    }
  }, [newMdp1Input, newMdp2Input]);

  useEffect(() => {
    if (nextMdp1Input && nextMdp2Input && nextMdp1Input !== nextMdp2Input) {
      setNextMdpErrorMessage(
        "Il y a une différence entre vos deux nouveaux passwords !"
      );
    } else {
      setNextMdpErrorMessage("");
    }
  }, [nextMdp1Input, nextMdp2Input]);

  //RENDER
  return (
    <section id="connexionSection">
      {!userId && (
        <>
          <h2>Connexion</h2>
          <form onSubmit={(e) => handleLogin(e)}>
            <label htmlFor="user">Votre identifiant :</label>
            <input
              required
              type="text"
              name="user"
              id="user"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <label htmlFor="mdp">Votre mot de passe :</label>
            <input
              required
              type="password"
              name="mdp"
              id="mdp"
              value={mdpInput}
              onChange={(e) => setMdpInput(e.target.value)}
            />
            {loginErrorMessage && <p id="loginMsgError">{loginErrorMessage}</p>}
            <button type="submit">Se connecter</button>
          </form>
          <p>Vous n'avez pas encore de compte ?</p>
          <h2>Inscription</h2>
          <form onSubmit={(e) => handleSignUp(e)}>
            <label htmlFor="mail">Votre adresse mail :</label>
            <input
              required
              type="email"
              name="mail"
              id="mail"
              value={mailInput}
              onChange={(e) => setMailInput(e.target.value)}
            />
            <label htmlFor="newUser">
              Choisissez votre identifiant : <br />
              (minimum 6 caractères ! )
            </label>
            <input
              required
              type="text"
              name="user"
              id="newUser"
              value={newUserInput}
              onChange={(e) => setNewUserInput(e.target.value)}
            />
            <label htmlFor="newMdp1">Votre mot de passe :</label>
            <input
              required
              type="password"
              name="newMdp1"
              id="newMdp1"
              value={newMdp1Input}
              onChange={(e) => setNewMdp1Input(e.target.value)}
            />
            <label htmlFor="newMdp2">Confirmez votre mot de passe :</label>
            <input
              required
              type="password"
              name="newMdp2"
              id="newMdp2"
              value={newMdp2Input}
              onChange={(e) => setNewMdp2Input(e.target.value)}
            />
            {signinErrorMessage && (
              <p id="signinMsgError">{signinErrorMessage}</p>
            )}
            <p>
              En vous inscrivant sur notre application, vous reconnaissez avoir
              pri connaissance des conditions d'utilisation et de notre
              politiques de confidentialité
            </p>
            <button type="submit">S'inscrire</button>
            {isSigned && (
              <p>
                Merci ! Un mail vient d'être envoyé à votre adresse pour
                confirmer l'inscription.
              </p>
            )}
          </form>
        </>
      )}
      {userId && (
        <>
          <div>
            <p>Souhaitez-vous vous déconnecter ?</p>
            <button onClick={handleLogout}>Déconnexion</button>
          </div>
          <div>
            <p>Souhaitez-vous modifier votre mot de passe ?</p>
            <form onSubmit={(e) => handlePasswordChange(e)}>
              <label htmlFor="prevMdp">Votre ancien mot de passe :</label>
              <input
                type="password"
                name="prevMdp"
                id="prevMdp"
                value={prevMdpInput}
                onChange={(e) => setPrevMdpInput(e.target.value)}
              />
              <label htmlFor="nextMdp1">Votre nouveau mot de passe : </label>
              <input
                type="password"
                name="nextMdp1"
                id="nextMdp1"
                value={nextMdp1Input}
                onChange={(e) => setNextMdp1Input(e.target.value)}
              />
              <label htmlFor="nextMdp2">
                Confirmez votre nouveau mot de passe :{" "}
              </label>
              <input
                type="password"
                name="nextMdp2"
                id="nextMdp2"
                value={nextMdp2Input}
                onChange={(e) => setNextMdp2Input(e.target.value)}
              />
              {nextMdpErrorMessage && (
                <p id="nextMdpMsgError">{nextMdpErrorMessage}</p>
              )}
              <button type="submit">Changer le mot de passe</button>
            </form>
          </div>
        </>
      )}
    </section>
  );
};

export default Connexion;
