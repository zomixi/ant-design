import { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import type { SelectToken } from '.';

function genSizeStyle(token: SelectToken, suffix?: string): CSSObject {
  const { selectCls, selectSuffixCls, left, right, inputPaddingHorizontalBase } = token;

  const selectHeightWithoutBorder = token.controlHeight - token.borderWidth * 2;

  const selectionItemPadding = Math.ceil(token.fontSize * 1.25);

  const suffixCls = suffix ? `${selectCls}-${suffix}` : '';

  return {
    [`${selectCls}-single${suffixCls}${selectSuffixCls}`]: {
      fontSize: token.fontSize,

      // ========================= Selector =========================
      [`${selectCls}-selector`]: {
        display: 'flex',
        [`${selectCls}-selection-search`]: {
          position: 'absolute',
          top: 0,
          [left]: inputPaddingHorizontalBase,
          [right]: inputPaddingHorizontalBase,
          bottom: 0,

          '&-input': {
            width: '100%',
          },
        },

        [`
          ${selectCls}-selection-item,
          ${selectCls}-selection-placeholder
        `]: {
          padding: 0,
          lineHeight: `${selectHeightWithoutBorder}px`,
          transition: `all ${token.duration}`,

          // Firefox inline-block position calculation is not same as Chrome & Safari. Patch this:
          '@supports (-moz-appearance: meterbar) &': {
            lineHeight: `${selectHeightWithoutBorder}px`,
          },
        },

        [`${selectCls}-selection-item`]: {
          position: 'relative',
          userSelect: 'none',
        },

        [`${selectCls}-selection-placeholder`]: {
          transition: 'none',
          pointerEvents: 'none',
        },

        // For common baseline align
        [[
          '&:after',
          /* For '' value baseline align */
          `${selectCls}-selection-item:after`,
          /* For undefined value baseline align */
          `${selectCls}-selection-placeholder:after`,
        ].join(',')]: {
          display: 'inline-block',
          width: 0,
          visibility: 'hidden',
          content: '"\\a0"',
        },
      },

      // With arrow should provides `padding-right` to show the arrow
      [`&${selectCls}-show-arrow ${selectCls}-selection-search`]: {
        [left]: 'auto',
        [right]: inputPaddingHorizontalBase + token.fontSize,
      },

      [`
        &${selectCls}-show-arrow ${selectCls}-selection-item,
        &${selectCls}-show-arrow ${selectCls}-selection-placeholder
      `]: {
        paddingInlineEnd: selectionItemPadding,
      },

      // Opacity selection if open
      [`&${selectCls}-open ${selectCls}-selection-item`]: {
        color: token.placeholderColor,
      },

      // ========================== Input ==========================
      // We only change the style of non-customize input which is only support by `combobox` mode.
      // Not customize
      [`&:not(${selectCls}-customize-input)`]: {
        [`${selectCls}-selector`]: {
          width: '100%',
          height: token.controlHeight,
          padding: `0 ${inputPaddingHorizontalBase}px`,

          [`${selectCls}-selection-search-input`]: {
            height: selectHeightWithoutBorder,
          },

          '&:after': {
            lineHeight: `${selectHeightWithoutBorder}px`,
          },
        },
      },

      [`&${selectCls}-customize-input`]: {
        [`${selectCls}-selector`]: {
          '&:after': {
            display: 'none',
          },

          [`${selectCls}-selection-search`]: {
            position: 'static',
            width: '100%',
          },

          [`${selectCls}-selection-placeholder`]: {
            position: 'absolute',
            [left]: 0,
            [right]: 0,
            padding: `0 ${inputPaddingHorizontalBase}px`,

            '&:after': {
              display: 'none',
            },
          },
        },
      },
    },
  };
}

export default function genSingleStyle(token: SelectToken): CSSInterpolation {
  const { selectCls, selectSuffixCls, left, right } = token;

  const inputPaddingHorizontalSM = token.controlPaddingHorizontalSM - token.borderWidth;

  return [
    genSizeStyle(token),

    // ======================== Small ========================
    // Shared
    genSizeStyle(
      {
        ...token,
        controlHeight: token.controlHeightSM,
      },
      'sm',
    ),

    // padding
    {
      [`${selectCls}-single${selectCls}-sm${selectSuffixCls}`]: {
        [`&:not(${selectCls}-customize-input)`]: {
          [`${selectCls}-selection-search`]: {
            [left]: inputPaddingHorizontalSM,
            [right]: inputPaddingHorizontalSM,
          },

          [`${selectCls}-selector`]: {
            padding: `0 ${inputPaddingHorizontalSM}px`,
          },

          // With arrow should provides `padding-right` to show the arrow
          [`&${selectCls}-show-arrow ${selectCls}-selection-search`]: {
            [left]: 'auto',
            [right]: inputPaddingHorizontalSM + token.fontSize * 1.5,
          },

          [`
            &${selectCls}-show-arrow ${selectCls}-selection-item,
            &${selectCls}-show-arrow ${selectCls}-selection-placeholder
          `]: {
            paddingInlineEnd: token.fontSize * 1.5,
          },
        },
      },
    },

    // ======================== Large ========================
    // Shared
    genSizeStyle(
      {
        ...token,
        controlHeight: token.controlHeightLG,
        fontSize: token.fontSizeLG,
      },
      'lg',
    ),
  ];
}
