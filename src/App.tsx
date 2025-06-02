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
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "75%",
          height: "1000px",
          background: "rgba(0,0,0,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          alignSelf:'center',
          zIndex: 1200,
          overflowY: 'auto',
        }} onClick={() => setModalOpen(false)}>
          <div style={{
            background: "#181818",
            color: "#fff",
            padding: 32,
            borderRadius: 12,
            minWidth: 350,
            maxWidth: 90,
            width: '100%',
            boxShadow: "0 4px 32px rgba(0,0,0,0.8)",
            border: "1px solid #333",
            boxSizing: 'border-box',
          }}>
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
