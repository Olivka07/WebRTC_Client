import { ClassNamesProps } from './types';

export const cn = (...classes: ClassNamesProps): string => {
    return classes
        .map((className) => {
            if (typeof className === 'string' || !className) return className;
            const resultClassNames = [];
            for (const [key, value] of Object.entries(className)) {
                if (value) resultClassNames.push(key);
            }
            return resultClassNames.length > 0
                ? resultClassNames.join(' ')
                : null;
        })
        .filter((className) => !!className)
        .join(' ');
};
