import { Configuration } from 'webpack';
import { buildLoaders } from './buildLoaders';
import { buildResolves } from './buildResolves';
import { buildPlugins } from './buildPlugins';
import { BuildOptions } from './types';
import 'webpack-dev-server';
import { buildDevServer } from './buildDevServer';

export function buildWebpackConfig(options: BuildOptions): Configuration {
    const { mode, paths, isDev } = options;

    return {
        mode,
        entry: paths.entry,
        output: {
            path: paths.build,
            filename: '[name].[contenthash:8].js',
            publicPath: isDev ? '/' : '/dist/',
            clean: true
        },
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolves(options),
        plugins: buildPlugins(options),
        devServer: isDev ? buildDevServer(options) : undefined,
        devtool: isDev ? 'inline-source-map' : undefined
    };
}
