import '../styles/modal.css';

const xButtonStyle = {position: "absolute", right:"0", top:"0", border: "none", outline:"none", backgroundColor: "transparent", fontSize: "1.5vw", padding: ".5vw"};


const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main" style={{width: "30%"}}>
        {children}
        <button type="button" onClick={handleClose} style={xButtonStyle}>
            ❌
        </button>
      </section>
    </div>
  );
};

export default Modal;