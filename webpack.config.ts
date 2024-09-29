import path from 'node:path';
import {
    BuildOptions,
    EnvOptions,
    TypeMode,
    TypePaths
} from './config/build/types';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';

export default (env: EnvOptions) => {
    const mode: TypeMode = env.mode || 'development';
    const isDev = mode === 'development';
    const PORT = env.port || 3001;

    const paths: TypePaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'dist'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src')
    };

    const options: BuildOptions = {
        mode,
        paths,
        isDev,
        port: PORT
    };

    const config = buildWebpackConfig(options);

    return config;
};
