-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : dim. 29 mai 2022 à 02:15
-- Version du serveur : 8.0.29-0ubuntu0.22.04.2
-- Version de PHP : 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `rhuma-sug`
--

--
-- Déchargement des données de la table `produit`
--

INSERT INTO `produit` (`id`, `nom`, `prix`, `description`, `url`) VALUES
(3, 'rhum ordinaire', 39.9, 'Rhum bio produit et mis en bouteille à la propriété.', 'rhumnormal.webp'),
(4, 'rhum vieilli', 89.9, 'Rhum vieilli en fût.', 'rhumvieux.webp'),
(5, 'sucre de canne', 4.9, 'Sucre de canne bio, produit sur place.', 'sucredecanne.webp'),
(6, 'sucre  liquide', 9.9, 'Sucre de canne liquide bio.', 'canadou.webp');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
