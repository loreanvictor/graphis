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
    '.medium &': { fontSize: 28, width: 88, height: 88, },
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
    zIndex: 101,

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
  },

  header: {
    textAlign: 'center',
    width: 'calc(5 * min(5vw, 3.5rem) + 5 * 2 * 20px + 8px)',
    margin: '0 auto',
    marginTop: 36,
    marginBottom: 24,

    '& span': {
      display: 'inline-block',
      padding: 20,
      fontSize: 'min(5vw, 3.5rem)',

      '&:nth-of-type(1)': { color: '#AA2EE6' },
      '&:nth-of-type(2)': { color: '#FF79CD' },
      '&:nth-of-type(3)': { color: '#FA9905' },
      '&:nth-of-type(4)': { color: '#1CC5DC' },
      '&:nth-of-type(5)': { color: '#9EDE73' },
      '&:nth-of-type(6)': { color: '#7868E6' },
      '&:nth-of-type(7)': { color: '#F14668' },
      '&:nth-of-type(8)': { color: '#FFD369' },
      '&:nth-of-type(9)': { color: '#6930C3' },
      '&:nth-of-type(10)': { color: '#00AF91' },
    }
  }
}));