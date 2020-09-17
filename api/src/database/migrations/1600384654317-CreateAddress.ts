import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateAddress1600384654317 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'addresses',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  generationStrategy: 'uuid',
                  default: 'uuid_generate_v4()',
                },
                {
                  name: 'street',
                  type: 'varchar',
                },
                {
                  name: 'number',
                  type: 'varchar',
                },
                {
                  name: 'neighborhood',
                  type: 'varchar',
                },
                {
                  name: 'city',
                  type: 'varchar',
                },
                {
                  name: 'state',
                  type: 'varchar',
                },
                {
                  name: 'zipcode',
                  type: 'varchar',
                },
                {
                  name: 'complement',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'latitude',
                  type: 'varchar',
                },
                {
                  name: 'longitude',
                  type: 'varchar',
                },
                {
                  name: 'created_at',
                  type: 'timestamp',
                  default: 'now()',
                },
                {
                  name: 'updated_at',
                  type: 'timestamp',
                  default: 'now()',
                },
              ],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('addresses');
    }

}
