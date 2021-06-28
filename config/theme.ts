import { isAbsolute } from "path"

const colors = {
  navy: "#273c75",

  red: "#c23616",
  green: "#44bd32",

  grey100: "#222",
  grey200: "#444",
  grey300: "#666",
  grey400: "#888",
  grey500: "#AAA",
  grey600: "#BBB",
  grey700: "#CCC",
  grey800: "#DDD",
  grey900: "#EFEFEF",

  white: "#FFF",
  black: "#000"
}

const themeColors = {
  textOff: colors.grey600,
  text: colors.black,
  disabled: colors.grey700,

  background: colors.white,
  lightBackground: colors.grey900,

  primary: colors.navy,
  secondary: colors.green,

  error: colors.red,
  success: colors.green,
}

const space = {
  none: 0,
  xs: "4px",
  s: "8px",
  m: "12px",
  l: "16px",
  xl: "32px",
  xxl: "64px",
}

const fonts = {
  main: `Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif`,
  mono: `"Roboto Mono", Courier`,
  heading: `Rubik`,
  menu: `Rubik`,
}

const themeFonts = {
  body: fonts.main,
  heading: fonts.heading,
  input: fonts.main,
  button: fonts.main,
}

const themeFontWeights = {
  body: 400,
  heading: 400,
  input: 400,
  button: 400,
}

const fontSizes = {
  s: "10px",
  m: "12px",
  l: "14px",
  xl: "16px",
  xxl: "18px",
  xxxl: "20px",
}

const lineHeight = {
  title: "1.3em",
  text: "1.6em",
}

const themeLineHeights = {
  body: lineHeight.text,
  heading: lineHeight.title,
}

const breakpoints = {
  mobile: "40rem",
  tablet: "52rem",
  desktop: "64rem"
}

const radius = {
  main: "8px",
  round: "20px",
}

const border = {
  grey: `1px solid ${colors.grey800}`,
  green: `1px solid ${colors.green}`
}


export const theme = {
  breakpoints: Object.values(breakpoints),
  space: Object.values(space),
  fontSizes: Object.values(fontSizes).map(val => parseInt(val)),
  colors: { ...themeColors },
  fonts: { ...themeFonts },
  fontWeights: { ...themeFontWeights },
  lineHeights: { ...themeLineHeights },

  variants: {
    error: {
      color: themeColors.error
    },

    success: {
      color: themeColors.success,
    },

    infoBanner: {
      bg: themeColors.lightBackground,
      border: border.grey,
      p: space.m,
      textAlign: "center",
      borderRadius: radius.main
    },

    block: {
      overflow: "hidden",
      display: "grid",
      rowGap: "1px",
      backgroundColor: colors.grey900,
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: colors.grey900,
      borderRadius: radius.main,
      mb: space.xl,
    },

    blockHeader: {
      backgroundColor: colors.white,
      py: space.m,
      px: space.l,
    },

    rowStyle: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      px: space.l,
      py: space.m,
      bg: colors.white,
      fontSize: fontSizes.m,
    },

    menuStyle: {
      overflow: "hidden",
      display: "grid",
      rowGap: "1px",
      bg: colors.white,
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: colors.grey900,
      borderRadius: radius.main,
      mb: space.xl,
    },

    accountMenuLink: {
      color: themeColors.text,
      fontSize: fontSizes.m,
      textDecoration: 'none',
      px: space.l,
      py: space.m,
      minWidth: "200px",
      "&:hover": {
        bg: colors.grey900
      }
    },

    sidebarMenuLink: {
      bg: colors.white,
      color: themeColors.text,
      textDecoration: 'none',
      px: space.l,
      py: space.s,
      fontSize: fontSizes.m,
      "&:hover": {
        bg: colors.grey900
      }
    },

    topMenuLink: {
      fontSize: fontSizes.l,
      fontFamily: fonts.menu,
      color: colors.white,
      textDecoration: 'none',
      fontWeight: 400,
      mx: space.l,
      "&:hover": {
        opacity: 0.8
      }
    },

    defaultCardRadio: {
      width: "100px"
    },

    popup: {
      width: "100%",
      maxWidth: "500px",
      paddingBottom: space.xl,
    },

    dropDown: {
      overflow: "hidden",
      position: "absolute",
      backgroundColor: colors.white,
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: colors.grey800,
      borderRadius: radius.main,
      marginTop: space.xl,
      boxShadow: "1px 1px 3px rgba(0,0,0,0.1)"
    },

    cardInput: {
      "&:hover": {
        color: themeColors.text,
        borderColor: colors.grey600,
      },
      "&:focus": {
        color: themeColors.text,
        borderColor: colors.grey500,
      }
    },
  },

  text: {
    error: {
      fontSize: fontSizes.m,
      fontWeight: 400,
      lineHeight: lineHeight.title,
      color: colors.red,
    },
    success: {
      fontSize: fontSizes.m,
      fontWeight: 400,
      lineHeight: lineHeight.title,
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
      color: themeColors.text,
    },

    // subscription
    subscriptionTitle: {
      fontSize: fontSizes.m,
      fontWeight: 500,
      textTransform: "uppercase",
    },
    cardNumber: {
      fontSize: fontSizes.m,
      fontFamily: fonts.mono,
    },
    skipLink: {
      fontSize: fontSizes.s,
      color: colors.grey500,
      cursor: "pointer",
      mt: space.xl,
      textDecoration: "underline",
      "&:hover": {
        color: colors.grey300,
      }
    }
  },


  buttons: {
    base: {
      fontFamily: fonts.main,
      letterSpacing: "-0.005em",
      fontWeight: 500,
      borderWidth: "1px",
      borderStyle: "solid",
      borderRadius: radius.round,
      textTransform: "uppercase",
      lineHeight: "1em",
    },

    baseMedium: {
      variant: "buttons.base",
      px: space.l,
      py: space.m,
      fontSize: fontSizes.m
    },

    baseSmall: {
      variant: "buttons.base",
      px: space.m,
      py: space.s,
      fontSize: fontSizes.s
    },

    primaryMedium: {
      variant: "buttons.baseMedium",
      borderColor: themeColors.primary,
      bg: themeColors.primary,
      color: colors.white,
      "&:hover": {
        bg: colors.white,
        color: themeColors.primary,
      }
    },

    primarySmall: {
      variant: "buttons.baseSmall",
      borderColor: themeColors.primary,
      bg: themeColors.primary,
      color: colors.white,
      "&:hover": {
        bg: colors.white,
        color: themeColors.primary,
      }
    },

    secondarySmall: {
      variant: "buttons.baseSmall",
      borderColor: themeColors.secondary,
      bg: themeColors.secondary,
      color: colors.white,
      "&:hover": {
        bg: colors.white,
        color: themeColors.secondary,
      }
    },

    secondaryGhostMedium: {
      variant: "buttons.baseMedium",
      borderColor: themeColors.secondary,
      bg: colors.white,
      color: themeColors.secondary,
      "&:hover": {
        bg: themeColors.secondary,
        color: colors.white,
      }
    },

    primaryGhostSmall: {
      variant: "buttons.baseSmall",
      borderColor: themeColors.primary,
      bg: colors.white,
      color: themeColors.primary,
      "&:hover": {
        bg: themeColors.primary,
        color: colors.white,
      }
    },

    greyGhostSmall: {
      variant: "buttons.baseSmall",
      borderColor: colors.grey800,
      bg: colors.white,
      color: colors.grey300,
      "&:hover": {
        bg: colors.grey900,
        color: themeColors.text,
      }
    },

    popupClose: {
      position: "absolute",
      top: "16px",
      right: "16px",
      padding: "8px",
      lineHeight: 0,
      background: "transparent",
      color: colors.grey600,
      "&:hover": {
        color: colors.grey200
      }
    },
  },

  forms: {
    input: {
      fontFamily: "input",
      borderRadius: radius.main,
      p: space.s,
      borderColor: colors.grey800,
      color: colors.grey300,
      outlineColor: themeColors.primary,
      "&:hover": {
        color: themeColors.text,
        borderColor: colors.grey600,
      },
      "&:focus": {
        color: themeColors.text,
        borderColor: colors.grey600,
      }
    },
    defaultCardRadio: {
      borderWidth: 0
    }
  },

  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
      fontSize: "body"
    },
  },
}
