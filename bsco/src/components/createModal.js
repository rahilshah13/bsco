import '../styles/modal.css';


const CreateModal = ({ handleClose, show, children, isComputer }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const xButtonStyle = isComputer
  ? {position: "absolute", right:"0", top:"0", border: "none", outline:"none", backgroundColor: "transparent", fontSize: "1.5vw", padding: ".5vw"}
  : {position: "absolute", right:"0", top:"0", border: "none", outline:"none", backgroundColor: "transparent", fontSize: "4.5vw", padding: "1.5vw"};
  console.log("PLSS");
  return (
    <div className={showHideClassName}>
      <section className="modal-main" style={isComputer ? {width: "30%"} : {width: "80%"}}>
        {children}
        <button type="button" onClick={handleClose} style={xButtonStyle}>
            ❌
        </button>
      </section>
    </div>
  );
};

export default CreateModal;