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
      padding: 12,
      fontSize: 16,
    }
  }
}));