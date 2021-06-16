import { isAbsolute } from "path"

const colors = {
  textOff: "#666",
  text: "#000",
  white: "#fff",
  background: "#fff",
  primary: "#273c75",
  primaryBg: "#f2f2f2",
  secondary: "#30c",
  neutralOff: "#ddd",
  neutral: "#bbb",
  muted: "#f6f6f6",
  red: "#c23616",
  green: "#44bd32",

  grey: "#efefef",
  grey200: "#ddd",
  grey800: "#666"
}
const space = {
  none: 0,
  xxs: 3,
  xs: 4,
  s: 8,
  m: 16,
  l: 32,
  xl: 64,
  xxl: 128,
  xxxl: 256,
  max: 512,
}

export const theme = {
  breakpoints: ["40em", "52em", "64em"],
  space: Object.values(space),
  fonts: {
    body: "Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    heading: "Rubik",
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 300,
    heading: 400,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors,
  variants: {
    error: {
      color: colors.red
    },
    success: {
      color: colors.green,
    },
    infoBanner: {
      bg: colors.primaryBg,
      border: `1px solid ${colors.grey200}`,
      p: "12px",
      textAlign: "center",
      borderRadius: "8px"
    },
    rowStyle: {
      padding: "12px 16px",
      fontSize: "12px",
      backgroundColor: "white",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },
    tableStyle: {
      display: "grid",
      rowGap: "1px",
      backgroundColor: "#e0e0e0",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      overflow: "hidden",
      mb: "32px"
    },
    menuStyle: {
      display: "grid",
      rowGap: "1px",
      backgroundColor: "#e0e0e0",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      overflow: "hidden",
      mb: "32px"
    },
    defaultCardRadio: {
      width: "100px"
    },
    popup: {
      width: "100%",
      maxWidth: "500px",
      paddingBottom: "32px"
    },
    dropDown: {
      position: "absolute",
      backgroundColor: colors.white,
      border: `1px solid ${colors.grey200}`,
      borderRadius: "8px",
      marginTop: "32px",
      overflow: "hidden",
      boxShadow: "1px 1px 3px rgba(0,0,0,0.1)"
    },
    cardInput: {
      // borderRadius: "8px",
      // padding: "0 0 0 16px",
      // borderWidth: '1px',
      // borderStyle: 'solid',
      // borderColor: colors.neutralOff,
      // color: colors.textOff,
      // outlineColor: colors.primary,
      // margin: '16px 0',
      "&:hover": {
        color: colors.text,
        borderColor: colors.neutral,
      },
      "&:focus": {
        color: colors.text,
        borderColor: colors.neutral,
      }
    },
  },
  text: {
    heading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: 400,
      letterSpacing: "-0.02rem"
    },
    error: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "1.2em",
      color: colors.red,
    },
    success: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "1.2em",
      color: colors.green,
    },

    // subcription status
    canceled: {
      fontWeight: 500,
      color: colors.red,
    },
    active: {
      fontWeight: 500,
      color: colors.green,
    },
    trialing: {
      fontWeight: 500,
      color: colors.text,
    },
    // subscription
    subscriptionTitle: {
      fontSize: "16px",
      fontWeight: 500,
      textTransform: "uppercase",
    },
    cardNumber: {
      fontSize: "12px",
      fontFamily: "\"Roboto Mono\", Courier"
    },
    skipLink: {
      fontSize: "10px",
      color: colors.grey800,
    }
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    h1: {
      variant: "text.heading",
      fontSize: 5,
    },
    h2: {
      variant: "text.heading",
      fontSize: 4,
    },
    h3: {
      variant: "text.heading",
      fontSize: 3,
    },
    h4: {
      variant: "text.heading",
      fontSize: 2,
    },
    h5: {
      variant: "text.heading",
      fontSize: 1,
    },
    h6: {
      variant: "text.heading",
      fontSize: 0,
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    button: {
      fontSize: 1,
    },
  },
  buttons: {
    primary: {
      fontFamily: "Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      letterSpacing: "-0.005rem",
      fontWeight: 500,
      fontSize: '12px',
      border: `1px solid ${colors.primary}`,
      bg: colors.primary,
      color: colors.primaryBg,
      borderRadius: "20px",
      textTransform: "uppercase",
      lineHeight: "11px",
      padding: "12px 16px",
      "&:hover": {
        bg: colors.white,
        color: colors.primary,
      }
    },
    popupClose: {
      position: "absolute",
      top: "16px",
      right: "16px",
      padding: "8px",
      lineHeight: 0,
      background: "transparent",
      color: "grey800",
      "&:hover": {
        color: colors.text
      }
    },
    secondary: {
      fontSize: 1,
      border: `1px solid ${colors.primary}`,
      bg: colors.primaryBg,
      color: colors.primary,
      borderRadius: "20px",
      "&:hover": {
        bg: colors.primary,
        color: colors.primaryBg,
      }
    },
    small: {
      fontFamily: "Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      letterSpacing: "-0.005rem",
      fontWeight: 500,
      fontSize: '10px',
      border: `1px solid ${colors.primary}`,
      bg: colors.primary,
      color: colors.primaryBg,
      borderRadius: "20px",
      textTransform: "uppercase",
      lineHeight: "11px",
      padding: "8px 12px",
      "&:hover": {
        bg: colors.white,
        color: colors.primary,
      }
    },
    smallGreen: {
      fontFamily: "Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      letterSpacing: "-0.005rem",
      fontWeight: 500,
      fontSize: '10px',
      border: `1px solid ${colors.green}`,
      bg: colors.green,
      color: colors.primaryBg,
      borderRadius: "20px",
      textTransform: "uppercase",
      lineHeight: "11px",
      padding: "8px 12px",
      "&:hover": {
        bg: colors.white,
        color: colors.green,
      }
    },
    smallGhostGreen: {
      fontFamily: "Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      letterSpacing: "-0.005rem",
      fontWeight: 500,
      fontSize: '10px',
      border: `1px solid ${colors.green}`,
      bg: colors.white,
      color: colors.green,
      borderRadius: "20px",
      textTransform: "uppercase",
      lineHeight: "11px",
      padding: "8px 12px",
      "&:hover": {
        bg: colors.green,
        color: colors.primaryBg,
      }
    },
    smallghost: {
      fontFamily: "Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      fontWeight: 500,
      fontSize: '10px',
      border: `1px solid ${colors.primary}`,
      bg: colors.white,
      color: colors.primary,
      borderRadius: "20px",
      textTransform: "uppercase",
      lineHeight: "11px",
      padding: "8px 12px",
      "&:hover": {
        bg: colors.primaryBg,
        color: colors.primary,
      }
    },
    smallGhostGrey: {
      fontFamily: "Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      fontWeight: 500,
      fontSize: '10px',
      border: `1px solid ${colors.grey200}`,
      bg: colors.white,
      color: colors.grey800,
      borderRadius: "20px",
      textTransform: "uppercase",
      lineHeight: "11px",
      padding: "8px 12px",
      "&:hover": {
        bg: colors.primaryBg,
        color: colors.text,
      }
    }
  },
  forms: {
    label: {
      fontSize: "12px",
      py: 1,
    },
    input: {
      fontFamily: "Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: "12px",
      fontWeight: 300,
      borderRadius: "8px",
      padding: "8px",
      borderColor: colors.neutralOff,
      color: colors.textOff,
      outlineColor: colors.primary,
      "&:hover": {
        color: colors.text,
        borderColor: colors.neutral,
      },
      "&:focus": {
        color: colors.text,
        borderColor: colors.neutral,
      }
    },
    defaultCardRadio: {
      borderWidth: 0
    }
  },
}
