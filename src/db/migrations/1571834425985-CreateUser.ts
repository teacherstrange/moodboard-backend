import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateUser1571834425985 implements MigrationInterface {

    private userTable = new Table({
        name: 'user',
        columns: [
            {
                name: 'id',
                type: 'INTEGER',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: 'first_name',
                type: 'varchar',
                length: '255',
                isNullable: true,
            },
            {
                name: 'last_name',
                type: 'varchar',
                length: '255',
                isNullable: true,
            },
            {
                name: 'email',
                type: 'varchar',
                length: '255',
                isUnique: true,
                isNullable: false,
            },
            {
                name: 'created_at',
                type: 'timestamptz',
                isNullable: false,
                default: 'now()',
            },
            {
                name: 'updated_at',
                type: 'timestamptz',
                isNullable: false,
                default: 'now()',
            }],
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(this.userTable);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(this.userTable);
    }

}
