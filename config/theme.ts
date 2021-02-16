const colors = {
  textOff: "#666",
  text: "#000",
  background: "#fff",
  primary: "#0984e3",
  primaryBg: "#dff9fb",
  secondary: "#30c",
  neutralOff: "#ddd",
  neutral: "#bbb",
  muted: "#f6f6f6",
  red: "#e74c3c",
  green: "#27ae60",
}
export const theme = {
  breakpoints: ["40em", "52em", "64em"],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", sans-serif",
    heading: "inherit",
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
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
    }
  },
  text: {
    heading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      letterSpacing: "-0.055rem"
    },
    error: {
      fontSize: 1,
      color: colors.red,
    },
    success: {
      fontSize: 1,
      color: colors.green,
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
    }
  },
  buttons: {
    secondary: {
      fontSize: 1,
      border: `1px solid ${colors.primary}`,
      bg: colors.primaryBg,
      color: colors.primary,
      borderRadius: "7px",
      "&:hover": {
        bg: colors.primary,
        color: colors.primaryBg,
      }
    }
  },
  forms: {
    label: {
      fontSize: 1,
      py: 1,
    },
    input: {
      fontSize: 1,
      borderRadius: "7px",
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
    }
  },
}
