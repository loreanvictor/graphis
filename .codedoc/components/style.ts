import { themedStyle } from '@connectv/jss-theme';
import { CodedocTheme } from '@codedoc/core';


export const GlyphStyle = themedStyle<CodedocTheme>(theme => ({
  glyph: {
    border: `2px solid #9e9e9e20`,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    cursor: 'pointer',
    marginRight: 0,
    marginBottom: 4,
    transition: 'border-color .15s',

    '.bold &': { fontWeight: 'bold', },
    '.small &': { fontSize: 18, width: 56, height: 56, },
    '.medium &': { fontSize: 24, width: 88, height: 88, },
    '.large &': { fontSize: 36, width: 120, height: 120, },

    '&:hover': {
      borderColor: theme.dark.primary,
    },

    '&[hidden]': {
      display: 'none',
    }
  },

  glyphHolder: {
    '& p': { display: 'none' },
    '&.searching h3': { display: 'none' },
  },

  glyphSearch: {
    position: 'sticky',
    top: 16,
    bottom: 0,
    display: 'flex',
    paddingRight: 4,
    zIndex: 1,

    '& button': {
      fontSize: 18,
      width: 52,
      height: 52,
      minWidth: 0,
      margin: 0,
      marginLeft: 4,
      fontWeight: 'bold',

      '@media only screen and (max-width: 768px)' : {
        '&': {
          display: 'none'
        }
      }
    },

    '& input': {
      padding: 8,
      paddingLeft: 40,
      lineHeight: 2,
      fontSize: 16,
      appearance: 'none',
      flexGrow: 1,
      background: theme.light.background,
      'body.dark &': { background: theme.dark.background },
      '@media (prefers-color-scheme: dark)': {
        'body:not(.dark-mode-animate) &': {
          background: theme.dark.background,
        }
      },
      'body.dark-mode-animate &': { transition: 'background .3s' },
    },

    '& span': {
      display: 'inline-flex',
      position: 'absolute',
      top: 0,
      bottom: 0,
      alignItems: 'center',
      marginLeft: 16,
      cursor: 'pointer',
    }
  }
}));