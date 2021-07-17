import { themedStyle } from '@connectv/jss-theme';
import { CodedocTheme } from '@codedoc/core';


export const GlyphStyle = themedStyle<CodedocTheme>(theme => ({
  glyph: {
    border: `2px solid #9e9e9e20`,
    display: 'inline-block',
    borderRadius: 3,
    cursor: 'pointer',
    padding: 24,
    fontSize: 32,
    marginRight: 4,
    marginBottom: 8,
    transition: 'border-color .15s',

    '&:hover': {
      borderColor: theme.dark.primary,
    },

    '&[hidden]': {
      display: 'none',
    }
  },

  glyphHolder: {
    textAlign: 'center',
  },

  glyphSearch: {
    '& input': {
      padding: 8,
      lineHeight: 2,
      fontSize: 16,
      appearance: 'none',
      minWidth: 320,
      maxWidth: '95vw',
    },

    '& span': {
      display: 'inline-block',
      marginLeft: -44,
      padding: 12,
      cursor: 'pointer',
      '& b': { transition: 'opacity .15s', },
      '& b.active': { opacity: 1, },
      '& b.hidden': { opacity: 0, },
      background: theme.light.background,
      'body.dark &': {
        background: theme.dark.background,
      },
      '@media (prefers-color-scheme: dark)': {
        'body:not(.dark-mode-animate) &': {
          background: theme.dark.background,
        }
      },
      'body.dark-mode-animate &': { transition: 'background .3s' },
    }
  }
}));