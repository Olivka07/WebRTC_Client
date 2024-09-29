import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types';

export function buildDevServer({ port }: BuildOptions): DevServerConfiguration {
    return {
        historyApiFallback: true,
        hot: true,
        open: true,
        compress: true,
        port,
        liveReload: true
    };
}
