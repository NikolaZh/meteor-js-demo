declare module "meteor/vlasky:mysql" {
    export class LiveMysql {
        constructor(settings: Record<string, unknown>);

        select(
            query:
                | string
                | ((esc: (value: unknown) => string, escId: (value: string) => string) => string),
            params?: unknown,
            keySelector?: unknown,
            triggers?: Array<{
                table: string;
                database?: string;
                condition?: (row: unknown, newRow?: unknown, rowDeleted?: boolean | null) => boolean;
            }>
        ): any;

        end(): void;
    }

    export const LiveMysqlKeySelector: {
        Index(): any;
    };
}