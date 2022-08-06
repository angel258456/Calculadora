import styles from "./styles/App.module.css";
import { useState } from "react";
let numeroGuardado1 = null;
let numeroGuardado2 = null;
let operador = null;
let numeroCalculado = false;
function App() {
  let [display, setDisplay] = useState("");
  function mostrar(numero) {
    if (display == "*" || display == "+" || display == "-" || display == "/") {
      setDisplay(numero);
    } else if (numeroCalculado == true) {
      setDisplay(numero);
      numeroCalculado = false;
    } else if (isNaN(display + numero) == false) {
      setDisplay(display + numero);
    }
  }

  function borrar() {
    setDisplay("");
    numeroGuardado1 = "";
    numeroGuardado2 = "";
  }
  function operar(simbolo) {
    if (numeroGuardado1 != null && numeroGuardado2 != null) {
      resolver();
    } else {
      setDisplay(simbolo);
    }
  }

  function resolver() {
    let resultado = 0;
    if (operador == "+") {
      resultado = Number(numeroGuardado1) + Number(numeroGuardado2);
    } else if (operador == "-") {
      resultado = Number(numeroGuardado1) - Number(numeroGuardado2);
    } else if (operador == "*") {
      resultado = Number(numeroGuardado1) * Number(numeroGuardado2);
    } else if (operador == "/") {
      resultado = Number(numeroGuardado1) / Number(numeroGuardado2);
    }
    setDisplay(resultado);
  }

  return (
    <>
      <div className={styles.contenedor}>
        <div className={styles.display}>{display}</div>
        <div className={styles.numerosYOperaciones}>
          <div className={styles.contenedorNumeros}>
            {["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."].map(
              function (numero) {
                return (
                  <button
                    onClick={function () {
                      mostrar(numero);
                    }}
                  >
                    {numero}
                  </button>
                );
              }
            )}
            <button onClick={borrar}>Ac</button>
          </div>
          <div className={styles.operaciones}>
            {["+", "-", "*", "/"].map(function (simbolo) {
              return (
                <button
                  onClick={() => {
                    if (numeroGuardado1 == null) {
                      numeroGuardado1 = display;
                      operar(simbolo);
                      operador = simbolo;
                    } else {
                      numeroGuardado2 = display;
                      resolver();
                      numeroGuardado1 = display;
                      numeroGuardado2 = null;
                      numeroCalculado = true;
                    }
                  }}
                >
                  {simbolo}
                </button>
              );
            })}
          </div>
        </div>
        <div className={styles.acciones}>
          <button
            onClick={() => {
              numeroGuardado2 = display;
              resolver();
              numeroGuardado1 = display;
              numeroGuardado2 = null;
            }}
          >
            =
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
