export const AC_MODAL_CONFIG = {
  animationDuration: 200,
  backdropStyle: {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
    opacity: "0",
    zIndex: "-1",
  },
  closeStyle: {
    display: "none",
    position: "fixed",
    zIndex: "1050",
    overflow: "hidden",
    willChange: "transform, opacity",
  },
  openStyle: {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    top:'0px',
    left:'0px',
    display:'flex',
    background: "",
    opacity: "0",
    zIndex: "1040",
    'justify-content': 'center',
    'align-items': 'center'
  }
}
