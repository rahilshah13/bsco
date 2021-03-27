import '../styles/modal.css';


const CreateModal = ({ handleClose, show, children, isComp }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const xButtonStyle = {position: "absolute", right:"0", top:"0", border: "none", outline:"none", backgroundColor: "transparent", 
              fontSize: isComp ? "1.5vw": "4.5vw", padding: isComp ? ".5vw": "2vw"};

  return (
    <div className={showHideClassName}>
      <section className="modal-main" style={isComp ? {width: "30%"} : {width: "80%"}}>
        {children}
        <button type="button" onClick={handleClose} style={xButtonStyle}>
            ❌
        </button>
      </section>
    </div>
  );
};

export default CreateModal;