import { createEvent, restore } from 'effector';
import { AppTheme } from './types';
import { routes } from 'shared/router';

const themeChanged = createEvent<AppTheme>();

const $theme = restore(themeChanged, 'light');

export const appModel = {
    theme: $theme,
    onThemeChange: themeChanged
};
