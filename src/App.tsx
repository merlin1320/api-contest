import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
import type { TCGDexCard, TCGDexSet } from "./dexTypes";

const pkmnURL = "https://api.tcgdex.net/v2/en/";

function App() {
  const [card, setCard] = useState<TCGDexCard[]>([]);
  const [mySet, setMySet] = useState<TCGDexSet[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSet, setSelectedSet] = useState<TCGDexSet>({} as TCGDexSet)

  useEffect(() => {
    fetchPkmnSets();
    fetchPkmnCards();
  }, []);

  const fetchPkmnSets = async () => {
    axios.get(`${pkmnURL}sets`).then((response) => {
      setMySet(response.data)
    }).catch((error) => {
      console.error(error)
    })
  }
  const fetchPkmnCards = async () => {
    axios.get(`${pkmnURL}series`).then((response) => {
      setCard(response.data)
    }).catch((error) => {
      console.error(error)
    })
  }

  const handleSetSelect = async (set: TCGDexSet) => {
    await axios.get(`${pkmnURL}sets/${set.id}`).then((response) => {
      setSelectedSet(response.data)
    })
    console.log(selectedSet.releaseDate);

    setModalOpen(true)
  }
  const handleModalClose = () => {
    setModalOpen(false)
    setSelectedSet({} as TCGDexSet)
  }




  return (
    <div>
      <table className="table-bordered">
        <thead>
          <tr>
            <td>Set name</td>
            <td>Set Official Number of Cards</td>
            <td>Set Number of Cards</td>
            <td>Set Logo</td>
            <td>Set Release Date</td>
          </tr>
        </thead>
        <tbody>
          {mySet.map((set) => (
            <tr key={set.id}>
              <td><button style={{
                background: "none",
                border: "none",
                color: "lightblue",
                textDecoration: "underline",
                cursor: "pointer",
              }} onClick={() => handleSetSelect(set)}>{set.name}</button></td>
              <td>{set.cardCount.official}</td>
              <td>{set.cardCount.total}</td>
              <td><img src={`${set.logo}.webp`} alt={`${set.logo} image`} style={{ width: "100px", height: "100px", objectFit: "contain" }} /></td>
              <td>{set.releaseDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && selectedSet && (
        <div className="modalContainer" onClick={() => setModalOpen(false)}>
          <div className="modalBody">
            <h2 style={{ color: '#fff', marginBottom: 20 }}>Set Cards</h2>
          </div>
          <table className="table-bordered">
            <thead>
              <tr>
                <td>Card name</td>
                <td>Card Local ID</td>
                <td>Card Image</td>
              </tr>
            </thead>
            <tbody>
              {selectedSet.cards.map((card) => (
                <tr key={card.id}>
                  <td>{card.name}</td>
                  <td>{card.localId}</td>
                  <td><img src={`${card.image}/high.webp`} alt={`${card.name} image`} style={{ width: "24px", height: "24px", objectFit: "contain" }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button onClick={handleModalClose} style={{ background: '#333', color: '#fff', border: '1px solid #444', marginRight: 8, padding: '6px 16px', borderRadius: 4 }}>Close</button>
          </div>
        </div>
      )}
    </div >
  );
}

export default App;
