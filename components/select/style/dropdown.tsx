import { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import {
  resetComponent,
  initSlideMotion,
  slideUpIn,
  slideUpOut,
  slideDownIn,
  slideDownOut,
} from '../../_util/theme';
import type { SelectToken } from '.';

const genItemStyle = (token: SelectToken): CSSObject => {
  const { controlPaddingHorizontal } = token;

  return {
    position: 'relative',
    display: 'block',
    minHeight: token.controlHeight,
    padding: `${
      (token.controlHeight - token.fontSize * token.lineHeight) / 2
    }px ${controlPaddingHorizontal}px`,
    color: token.textColor,
    fontWeight: 'normal',
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
  };
};

export default function genSingleStyle(token: SelectToken, hashId: string): CSSInterpolation {
  const { rootPrefixCls, antCls, selectCls } = token;

  const selectItemCls = `${selectCls}-item`;

  return [
    {
      [`${selectCls}-dropdown`]: {
        // ========================== Popup ==========================
        ...resetComponent(token),

        position: 'absolute',
        top: -9999,
        zIndex: token.zIndexDropdown,
        boxSizing: 'border-box',
        padding: `${token.paddingXXS}px 0`,
        overflow: 'hidden',
        fontSize: token.fontSize,
        // Fix select render lag of long text in chrome
        // https://github.com/ant-design/ant-design/issues/11456
        // https://github.com/ant-design/ant-design/issues/11843
        fontVariant: 'initial',
        backgroundColor: token.componentBackground,
        borderRadius: token.borderRadius,
        outline: 'none',
        boxShadow: token.boxShadow,

        [`
            &${antCls}-slide-up-enter${antCls}-slide-up-enter-active&-placement-bottomLeft,
            &${antCls}-slide-up-appear${antCls}-slide-up-appear-active&-placement-bottomLeft
          `]: {
          animationName: slideUpIn.getName(hashId),
        },

        [`
            &${antCls}-slide-up-enter${antCls}-slide-up-enter-active&-placement-topLeft,
            &${antCls}-slide-up-appear${antCls}-slide-up-appear-active&-placement-topLeft
          `]: {
          animationName: slideDownIn.getName(hashId),
        },

        [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active&-placement-bottomLeft`]: {
          animationName: slideUpOut.getName(hashId),
        },

        [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active&-placement-topLeft`]: {
          animationName: slideDownOut.getName(hashId),
        },

        '&-hidden': {
          display: 'none',
        },

        '&-empty': {
          color: token.textColorDisabled,
        },

        // ========================= Options =========================
        [`${selectItemCls}-empty`]: {
          ...genItemStyle(token),
          color: token.textColorDisabled,
        },

        [`${selectItemCls}`]: {
          ...genItemStyle(token),
          cursor: 'pointer',
          transition: `background ${token.duration} ease`,

          // =========== Group ============
          '&-group': {
            color: token.textColorSecondary,
            fontSize: token.fontSizeSM,
            cursor: 'default',
          },

          // =========== Option ===========
          '&-option': {
            display: 'flex',

            '&-content': {
              flex: 'auto',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            },

            '&-state': {
              flex: 'none',
            },

            [`&-active:not(${selectItemCls}-option-disabled)`]: {
              backgroundColor: token.itemHoverBackground,
            },

            [`&-selected:not(${selectItemCls}-option-disabled)`]: {
              color: token.textColor,
              fontWeight: 600, // FIXME: Need design token?
              backgroundColor: token.itemActiveBackground,

              [`${selectItemCls}-option-state`]: {
                color: token.primaryColor,
              },
            },
            '&-disabled': {
              [`&${selectItemCls}-option-selected`]: {
                backgroundColor: token.componentBackgroundDisabled,
              },

              color: token.textColorDisabled,
              cursor: 'not-allowed',
            },

            '&-grouped': {
              paddingInlineStart: token.controlPaddingHorizontal * 2,
            },
          },
        },

        // =========================== RTL ===========================
        '&-rtl': {
          direction: 'rtl',
        },
      },
    },

    // Follow code may reuse in other components
    initSlideMotion(hashId, rootPrefixCls, 'slide-up', slideUpIn, slideUpOut, token),
    initSlideMotion(hashId, rootPrefixCls, 'slide-down', slideDownIn, slideDownOut, token),
    slideUpIn,
    slideUpOut,
    slideDownIn,
    slideDownOut,
  ];
}
