<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200330085413 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE cadeau ADD acheteurs LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', ADD montants_recoltes LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', ADD payement VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE invite ADD nom VARCHAR(255) NOT NULL, ADD prenom VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE cadeau DROP acheteurs, DROP montants_recoltes, DROP payement');
        $this->addSql('ALTER TABLE invite DROP nom, DROP prenom');
    }
}
