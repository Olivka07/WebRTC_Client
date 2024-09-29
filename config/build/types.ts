export type TypeMode = 'development' | 'production';
export interface TypePaths {
    entry: string;
    build: string;
    html: string;
    src: string;
}
export interface BuildOptions {
    paths: TypePaths;
    mode: TypeMode;
    isDev: boolean;
    port: number;
}

export interface EnvOptions {
    port: number;
    mode: TypeMode;
}
