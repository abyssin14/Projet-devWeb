-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Hôte : db5001146800.hosting-data.io
-- Généré le : sam. 27 mars 2021 à 10:53
-- Version du serveur :  5.7.30-log
-- Version de PHP : 7.0.33-0+deb9u10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `dbs981186`
--

-- --------------------------------------------------------

--
-- Structure de la table `cadeau`
--

CREATE TABLE `cadeau` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prix` double DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `acheteurs` longtext COLLATE utf8mb4_unicode_ci COMMENT '(DC2Type:array)',
  `montants_recoltes` longtext COLLATE utf8mb4_unicode_ci COMMENT '(DC2Type:array)',
  `payement` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payements` longtext COLLATE utf8mb4_unicode_ci COMMENT '(DC2Type:array)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `cadeau`
--

INSERT INTO `cadeau` (`id`, `nom`, `prix`, `description`, `acheteurs`, `montants_recoltes`, `payement`, `payements`) VALUES
(2, 'Voyage de Noce', 4000, 'Pour notre voyage de noce, nous aimerions partir vers une destination idyllique où nous pourrons nous reposer et profiter l\'un de l\'autre.', 'a:4:{i:0;s:27:\"Adeline Ruttiens (Virement)\";i:1;s:56:\"Alexandre, Lucie et Firmin Lapaille - Sterckx (Virement)\";i:2;s:29:\"Kirsten Timmermans (Virement)\";i:3;s:29:\"Claudio Brogniet (Au mariage)\";}', 'a:4:{i:0;s:2:\"50\";i:1;s:2:\"75\";i:2;s:3:\"100\";i:3;s:3:\"100\";}', 'enattente', 'a:0:{}'),
(3, 'L\'achat de la maison de nos rêves', 10000, 'Grâce à ce cadeau, vous nous aiderez à acheter la maison dans laquelle nous pourrons vivre et peut-être même agrandir notre nouvelle famille.', 'a:2:{i:0;s:30:\"Linda Van Genechten (Virement)\";i:1;s:31:\"Jean-Pierre Dehoux (Au mariage)\";}', 'a:2:{i:0;s:3:\"250\";i:1;s:3:\"150\";}', 'enattente', 'a:0:{}'),
(4, 'Bongo Table Romantique', 70, 'Un cadeau que nous utiliserons pour fêter nos noces de coton.', 'a:1:{i:0;s:41:\"Laura et Arno Sterckx-Faivre (Au mariage)\";}', 'a:1:{i:0;s:2:\"70\";}', 'enattente', 'a:0:{}'),
(6, 'Album photo de mariage - Smartphoto', 45, 'Pour que nous puissions conserver tous les souvenir du jour le plus important de nos vies.', 'a:0:{}', 'a:0:{}', 'enattente', 'a:0:{}'),
(7, 'Billet d\'avion pour Rome', 350, 'Pour un magnifique City Trip à Rome.', 'a:1:{i:0;s:23:\"Serge Maveau (Virement)\";}', 'a:1:{i:0;s:3:\"350\";}', '', 'a:0:{}'),
(8, 'Rénovation de la maison de nos rêves', 5000, 'Grâce à ce cadeau, vous nous aiderez à embellir notre futur maison.', 'a:0:{}', 'a:0:{}', '', 'a:0:{}');

-- --------------------------------------------------------

--
-- Structure de la table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20201108170041', '2020-12-23 16:11:38', 1211),
('DoctrineMigrations\\Version20201111131416', '2020-12-23 16:11:39', 114),
('DoctrineMigrations\\Version20201111132222', '2020-12-23 16:11:40', 244),
('DoctrineMigrations\\Version20201113133437', '2020-12-23 16:11:40', 73),
('DoctrineMigrations\\Version20201113160729', '2020-12-23 16:11:40', 123),
('DoctrineMigrations\\Version20201115124430', '2020-12-23 16:11:40', 286),
('DoctrineMigrations\\Version20201115125712', '2020-12-23 16:11:40', 682),
('DoctrineMigrations\\Version20201115125927', '2020-12-23 16:11:41', 226),
('DoctrineMigrations\\Version20201115130015', '2020-12-23 16:11:41', 10),
('DoctrineMigrations\\Version20201115130110', '2020-12-23 16:11:41', 164),
('DoctrineMigrations\\Version20201115132711', '2020-12-23 16:11:41', 244),
('DoctrineMigrations\\Version20201119204749', '2020-12-23 16:11:42', 125),
('DoctrineMigrations\\Version20201122152314', '2020-12-23 16:11:42', 84),
('DoctrineMigrations\\Version20201122152735', '2020-12-23 16:11:42', 58),
('DoctrineMigrations\\Version20201122152907', '2020-12-23 16:11:42', 96),
('DoctrineMigrations\\Version20201126153817', '2020-12-23 16:11:42', 76),
('DoctrineMigrations\\Version20201128151011', '2020-12-23 16:11:42', 95),
('DoctrineMigrations\\Version20201223160357', '2020-12-23 17:04:04', 525);

-- --------------------------------------------------------

--
-- Structure de la table `invite`
--

CREATE TABLE `invite` (
  `id` int(11) NOT NULL,
  `allergie` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accompagnant` tinyint(1) NOT NULL,
  `enfants` longtext COLLATE utf8mb4_unicode_ci COMMENT '(DC2Type:array)',
  `present_ceremonie` tinyint(1) NOT NULL,
  `present_vin_dhonneur` tinyint(1) NOT NULL,
  `present_repas` tinyint(1) NOT NULL,
  `present_soiree` tinyint(1) NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prenom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `invite`
--

INSERT INTO `invite` (`id`, `allergie`, `accompagnant`, `enfants`, `present_ceremonie`, `present_vin_dhonneur`, `present_repas`, `present_soiree`, `nom`, `prenom`) VALUES
(2, '', 0, 'a:0:{}', 1, 1, 1, 1, 'Sterckx', 'Nicolas'),
(3, '', 0, 'a:0:{}', 1, 1, 1, 1, 'Delwiche', 'Stephanie'),
(4, '', 0, 'a:0:{}', 1, 1, 1, 1, 'Marraine', 'Annick'),
(5, 'Poissons/Crustacés (Tristan)', 1, 'a:0:{}', 1, 1, 1, 1, 'Delwiche', 'Eléonore'),
(6, 'De la bière 0%', 0, 'a:0:{}', 1, 1, 1, 1, 'Di Legami', 'Nando \"Nandouze\"'),
(7, '', 1, 'a:0:{}', 1, 1, 0, 1, 'Bille', 'Colette'),
(8, 'Lait, fromage, crème, glace-->lactose', 1, 'a:0:{}', 1, 1, 1, 1, 'Van Regenmorter', 'Nathalie'),
(9, '', 0, 'a:0:{}', 1, 1, 1, 1, 'Sterckx', 'Florian'),
(12, '', 0, 'a:0:{}', 1, 1, 1, 1, 'Ruttiens', 'Adeline'),
(13, 'lactose', 1, 'a:0:{}', 1, 1, 1, 1, 'Sterckx', 'Laura'),
(14, '', 1, 'a:0:{}', 1, 1, 1, 1, 'Lapaille - Sterckx', 'Alex, Lucie et Firmin'),
(15, '', 1, 'a:0:{}', 1, 1, 0, 1, 'Butera', 'Sarah'),
(16, '', 1, 'a:0:{}', 1, 1, 1, 1, 'Sterckx ', 'Alain '),
(17, '', 1, 'a:0:{}', 1, 1, 1, 1, 'LEDENT ', 'Sébastien'),
(18, '', 1, 'a:0:{}', 1, 1, 1, 1, 'Sterckx', 'Raphael'),
(19, '', 0, 'a:0:{}', 1, 1, 1, 1, ' Brogniet - Vanhamme', 'Claudio & Josiane'),
(20, '', 1, 'a:0:{}', 1, 1, 0, 0, 'Dehoux', 'Jean-Pierre'),
(21, 'Non', 1, 'a:1:{i:0;s:1:\"2\";}', 0, 1, 0, 0, 'Guisset', 'Matthieu');

-- --------------------------------------------------------

--
-- Structure de la table `migration_versions`
--

CREATE TABLE `migration_versions` (
  `version` varchar(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `executed_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migration_versions`
--

INSERT INTO `migration_versions` (`version`, `executed_at`) VALUES
('20200306131240', '2020-11-05 20:20:41'),
('20200308110529', '2020-11-05 20:20:41'),
('20200308131751', '2020-11-05 20:20:41'),
('20200310090225', '2020-11-05 20:20:41'),
('20200311152328', '2020-11-05 20:20:41'),
('20200311184308', '2020-11-05 20:20:41'),
('20200330085413', '2020-11-05 20:20:41'),
('20200501142044', '2020-11-05 20:20:41'),
('20200501151554', '2020-11-05 20:20:41'),
('20201101161218', '2020-11-05 20:20:41');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `username`, `password`) VALUES
(1, 'sterckx', '$2y$12$Q9mEWZXASxRdn3jctXI99OUzS7CXBBt.zksSTJ3zjwcJQAWSHz1.W'),
(2, 'stephetnico', '$2y$12$UMjp5JG44.k9gWUaPxQna./dZY8KSZbxQavGZl/LQUnCFRiev0oIO'),
(3, 'nicoetsteph', '$2y$12$y97IRNpy6ociTTAiET.b2u28RQOPq6n7AILVm1yoa/U7m74WJGJfy');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cadeau`
--
ALTER TABLE `cadeau`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `invite`
--
ALTER TABLE `invite`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `migration_versions`
--
ALTER TABLE `migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `cadeau`
--
ALTER TABLE `cadeau`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `invite`
--
ALTER TABLE `invite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
