/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carusel from "./Carusel";
import SortButon from "./SortButon";
import Modal from "../modal/modal";
import "./cardList.scss";
import Card from "../Card/Card";

const { VITE_BACKEND_URL } = import.meta.env;

function CardsList() {
  const [data, setData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [isCard, setIsCard] = useState(false);
  const [dataCategories, setDataCategories] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const dataSoft = [
    {
      name: "Couleur de cheveux",
      style: [
        "Noir",
        "Brun foncé",
        "Brun",
        "Châtain",
        "Blond foncé",
        "Blond",
        "Roux",
        "Gris",
        "Coloré",
        "Autre",
      ],
    },
    {
      name: "Type de coiffure",
      style: [
        "Court",
        "Moyen",
        "Long",
        "Dégradé",
        "Undercut",
        "Frange",
        "Bohème",
        "Chignon",
        "Tresse",
        "Afro",
        "Autre",
      ],
    },
    {
      name: "Type de peau",
      style: ["Pâle", "Claire", "Medium", "Mate", "Foncée", "Autre"],
    },
    {
      name: "Type de bouche",
      style: ["Pulpeuse", "Fine", "Epaisse", "Dessinée", "En cœur", "Autre"],
    },
  ];
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fetchModelsProducts = async () => {
      try {
        const response = await fetch(`${VITE_BACKEND_URL}/api/models`);
        if (!response.ok) {
          throw new Error("Erreur réseau");
        }

        const resalt = await response.json();

        setData(resalt);
      } catch (err) {
        console.error(err);
      }
    };
    fetchModelsProducts();
  }, []);
  let categories = [];
  let categoriesSoftMap;
  console.log(data);
  if (data.length) {
    categories = Object.groupBy(data, ({ category }) => category);
  }
  const [dataMap, setDataMap] = useState();
  useEffect(() => {
    setDataMap(Object.groupBy(data, ({ category }) => category));
  }, [data]);
  useEffect(() => {
    let dataSortTrue = [];
    let dataSortFalse = [];
    for (let i = 0; i < Object.keys(categories).length; i++) {
      const dataSort = Object.values(categories)[i];
      dataSort.map((item) => {
        if (Object.values(item).includes(active)) {
          dataSortTrue.unshift(item);
        } else {
          dataSortFalse.unshift(item);
        }
      });
    }
    categoriesSoftMap = [...dataSortTrue, ...dataSortFalse];
    setDataMap(Object.groupBy(categoriesSoftMap, ({ category }) => category));
  }, [active]);

  const handleCardOpen = (item) => {
    setDataCategories([item]);
    setIsCard(true);
    setIsModal(false);
  };

  const [styleContainer, setStyleContainer] = useState();
  console.log(dataMap);

  return (
    <>
      <div className="cardsList">
        <section className="soft-containers">
          {dataSoft.map((item, index) => (
            <div key={index} className="soft-cantainer">
              <button
                type="button"
                className="title-soft-style"
                onClick={(e) => {
                  styleContainer === e.target.textContent
                    ? setStyleContainer()
                    : setStyleContainer(e.target.textContent);
                }}
              >
                {item.name}
              </button>
              {styleContainer === item.name && (
                <SortButon
                  item={item.style}
                  active={active}
                  setActive={setActive}
                  setStyleContainer={setStyleContainer}
                />
              )}
            </div>
          ))}
        </section>

        {dataMap &&
          Object.entries(dataMap).map((entry) => {
            const categoryKey = entry[0];
            const categoryItems = entry[1];

            return (
              <div
                key={entry[1][0].id}
                style={{ width: "20%" }}
                className="card-container-item"
              >
                <button
                  type="button"
                  className="title-card-btn"
                  onClick={() => {
                    setDataCategories(categoryItems);
                    setIsModal(!isModal);
                  }}
                >
                  {categoryKey}
                </button>
                <Carusel item={categoryItems} onCardClick={handleCardOpen} />
              </div>
            );
          })}
        {isModal && (
          <Modal
            setIsModal={setIsModal}
            isModal={isModal}
            dataCategories={dataCategories}
          />
        )}
        {isCard && (
          <Card
            item={dataCategories[0]}
            setIsCard={setIsCard}
            isCard={isCard}
          />
        )}
      </div>
      <div className="card-list-div">
        <Link to="/tuto" className="card-list-link">
          Tester notre IA
        </Link>
      </div>
    </>
  );
}

export default CardsList;
