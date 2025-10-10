export const AC_MODAL_CONFIG = {
  animationDuration: 200,
  closeStyle: {
    display: "none",
    position: "fixed",
    zIndex: "1050",
    background: "#fff",
    boxShadow: "0 3px 9px rgba(0,0,0,.5)",
    borderRadius: "8px",
    overflow: "hidden",
    willChange: "transform, opacity",
  },
  openStyle: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.5)",
      opacity: "0",
      zIndex: "1040",
    }
}
