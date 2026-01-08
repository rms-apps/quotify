import { useThemeColor } from '@rms-apps/ui-utils';

export const useAppColors = () => {
  return {
    // Themed
    THEMED_CONTENT: useThemeColor({ name: 'themed_content' }),
    THEMED_CONTENT_ERROR: useThemeColor({ name: 'themed_content_error' }),
    THEMED_BACKGROUND: useThemeColor({ name: 'themed_background' }),

    // Bottom Tab Bar
    BOTTOM_TAB_BAR_BACKROUND: useThemeColor({
      name: 'bottom_tab_bar_background',
    }),
    BOTTOM_TAB_BAR_ICON_ACTIVE: useThemeColor({
      name: 'bottom_tab_bar_icon_active',
    }),
    BOTTOM_TAB_BAR_ICON_INACTIVE: useThemeColor({
      name: 'bottom_tab_bar_icon_inactive',
    }),

    INPUT_WRAPPER_BACKGROUND: useThemeColor({
      name: 'input_wrapper_background',
    }),

    // Marker Color
    ACTIVE_MARKER_COLOR: useThemeColor({
      name: 'active_marker_color',
    }),
    INACTIVE_MARKER_COLOR: useThemeColor({
      name: 'inactive_marker_color',
    }),

    // TabBar Tint Color
    TAB_BAR_ACTIVE_TINT_COLOR: useThemeColor({
      name: 'tabBarActiveTintColor',
    }),
    TAB_BAR_INACTIVE_TINT_COLOR: useThemeColor({
      name: 'tabBarInactiveTintColor',
    }),

    // Typography
    TEXT_PRIMARY: useThemeColor({ name: 'text_primary' }),
    TEXT_SECONDARY: useThemeColor({ name: 'text_secondary' }),
    TEXT_TERTIARY: useThemeColor({ name: 'text_tertiary' }),

    // Backgrounds
    BACKGROUND_PRIMARY: useThemeColor({ name: 'background_primary' }),
    BACKGROUND_SECONDARY: useThemeColor({ name: 'background_secondary' }),
    BACKGROUND_TERTIARY: useThemeColor({ name: 'background_tertiary' }),

    // Input
    TEXT_INPUT_CARET: useThemeColor({ name: 'text_input_caret' }),
    TEXT_INPUT_BORDER: useThemeColor({ name: 'text_input_border' }),
    TEXT_INPUT_CONTENT: useThemeColor({ name: 'text_input_content' }),
    TEXT_INPUT_PLACEHOLDER: useThemeColor({ name: 'text_input_placeholder' }),
    TEXT_INPUT_BORDER_FOCUS: useThemeColor({ name: 'text_input_border_focus' }),
    // Primary Button
    BUTTON_BG_PRIMARY_FILLED: useThemeColor({
      name: 'button_bg_primary_filled',
    }),
    BUTTON_BG_PRIMARY_GRADIENT: useThemeColor({
      name: 'button_bg_primary_gradient',
    }),
    BUTTON_TEXT_PRIMARY_HOLLOW: useThemeColor({
      name: 'button_text_primary_hollow',
    }),
    BUTTON_TEXT_PRIMARY_FILLED: useThemeColor({
      name: 'button_text_primary_filled',
    }),
    BUTTON_TEXT_PRIMARY_GRADIENT: useThemeColor({
      name: 'button_text_primary_gradient',
    }),

    // Secondary Button
    BUTTON_BG_SECONDARY_FILLED: useThemeColor({
      name: 'button_bg_secondary_filled',
    }),
    BUTTON_BG_SECONDARY_GRADIENT: useThemeColor({
      name: 'button_bg_secondary_gradient',
    }),
    BUTTON_TEXT_SECONDARY_HOLLOW: useThemeColor({
      name: 'button_text_secondary_hollow',
    }),
    BUTTON_TEXT_SECONDARY_FILLED: useThemeColor({
      name: 'button_text_secondary_filled',
    }),
    BUTTON_TEXT_SECONDARY_GRADIENT: useThemeColor({
      name: 'button_text_secondary_gradient',
    }),

    // Tertiary Button
    BUTTON_BG_TERTIARY_FILLED: useThemeColor({
      name: 'button_bg_tertiary_filled',
    }),
    BUTTON_BG_TERTIARY_GRADIENT: useThemeColor({
      name: 'button_bg_tertiary_gradient',
    }),
    BUTTON_TEXT_TERTIARY_FILLED: useThemeColor({
      name: 'button_text_tertiary_filled',
    }),
    BUTTON_TEXT_TERTIARY_GRADIENT: useThemeColor({
      name: 'button_text_tertiary_gradient',
    }),

    // Icons
    ICON_ACTIVE: useThemeColor({ name: 'icon_active' }),
    ICON_DEFAULT: useThemeColor({ name: 'icon_default' }),
    // UI Elements
    DIVIDER: useThemeColor({ name: 'divider' }),

    // TOAST
    TOAST_BACKGROUND: useThemeColor({ name: 'toast_background' }),
    TOAST_TITLE_INFO: useThemeColor({ name: 'toast_title_info' }),
    TOAST_TITLE_ERROR: useThemeColor({ name: 'toast_title_error' }),
    TOAST_TITLE_WARNING: useThemeColor({ name: 'toast_title_warning' }),
    TOAST_TITLE_SUCCESS: useThemeColor({ name: 'toast_title_success' }),
    TOAST_SUBTITLE: useThemeColor({ name: 'toast_subtitle' }),
  };
};
