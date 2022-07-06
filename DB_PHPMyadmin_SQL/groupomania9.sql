-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 06 juil. 2022 à 15:39
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

DELIMITER $$
--
-- Procédures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_user4` (IN `v_email` VARCHAR(255), IN `v_first_name` VARCHAR(255), IN `v_last_name` VARCHAR(255), IN `v_password` VARCHAR(255), IN `v_pseudo` VARCHAR(255))   BEGIN

    DECLARE nb_exists INT;
    SELECT COUNT(*) INTO nb_exists FROM user_ WHERE email = v_email;
 INSERT INTO user_(email,first_name,last_name,password_,pseudo)
 VALUES(v_email,v_first_name,v_last_name,v_password,v_pseudo);

SELECT "NO TRANSACTION BUT OK";
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_messages` ()   BEGIN 
	SELECT Arti.*,typ.*
    FROM Article_message Arti, Type_message typ
    WHERE Arti.id_type = typ.id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `poling` (IN `id_user` INT, IN `id_article` INT, IN `pseudo` VARCHAR(255), IN `poll_sign` VARCHAR(255))   BEGIN
START TRANSACTION;
	Set @poll_sign  = poll_sign;
	SET @plus = -10;
    SET @minus = -11;
  	SET @id_user = id_user;
    SET @pseudo = pseudo;
    Set @id_article = id_article;   
    
    DELETE FROM polling WHERE polling.id_user = @id_user;
COMMIT;
   SELECT COUNT(*) INTO @has_poll FROM polling 
   		WHERE polling.id_user = @id_user ;
           
   /* IF POLL is 0 THEN INSERT*/
  	 IF @has_poll <= 0 THEN  
 		INSERT INTO polling (id_article,id_user,is_liked)
    	VALUES(@id_article,@id_user,@poll_sign);     
    END IF;
  
    SELECT * From polling where polling.id_user = @id_user 
    	AND polling.id_article = @id_article;        
   
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `answer_article`
--

CREATE TABLE `answer_article` (
  `id` int(11) NOT NULL,
  `id_article` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `text_title` varchar(255) NOT NULL,
  `text_content` text NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `image_alt` varchar(255) DEFAULT NULL,
  `date_created` date NOT NULL DEFAULT current_timestamp(),
  `image_file` longblob DEFAULT NULL,
  `owner_pseudo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `answer_article`
--

INSERT INTO `answer_article` (`id`, `id_article`, `id_user`, `text_title`, `text_content`, `image_url`, `image_alt`, `date_created`, `image_file`, `owner_pseudo`) VALUES
(9, 39, 20, 'reeeeeeponse lili', 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmiiiiiiiiiiiiiiiilllllllllo', '\"', 'undefined', '2022-06-29', '', NULL),
(10, 41, 20, 'vnvbn', 'nvn', '\"', 'undefined', '2022-06-29', '', NULL),
(11, 41, 20, 'hghghg', 'ghghg', '\"', 'undefined', '2022-06-29', '', 'lapin'),
(12, 41, 20, 'hhhhhhhhhhhhhhhhhhhhhh', 'yyyyyyyyyyyyyyyyyyyy', '\"', 'undefined', '2022-06-29', '', 'lapin'),
(13, 41, 20, 'cxccxc', 'xvxvx', '\"', 'undefined', '2022-06-29', '', 'lapin'),
(14, 24, 21, 'zzzzzzzzzzzzz', 'azezedfgdgd', '\"', 'undefined', '2022-07-04', '', '(SELECT pseudo FROM user_ WHERE user_.id = 21)'),
(15, 24, 21, 'zzzzzzzzzzzzz', 'azezedfgdgdqsdq', '\"', 'undefined', '2022-07-04', '', '(SELECT pseudo FROM user_ WHERE user_.id = 21)'),
(16, 24, 21, 'zzzzzzzzzzzzz', 'azezedfgdgdqsdq', '\"', 'undefined', '2022-07-04', '', 'waudo'),
(17, 26, 21, 'sdf', 'sdf', '\"', 'undefined', '2022-07-04', '', 'waudo'),
(18, 27, 29, 'Je te réponds pas', 'hum', '\"', 'undefined', '2022-07-05', '', 'AB'),
(19, 27, 29, 'Une autre', 'Et voilà', '\"', 'undefined', '2022-07-05', '', 'AB'),
(20, 27, 29, '', 'dg', '\"', 'undefined', '2022-07-05', '', 'AB'),
(21, 29, 21, 'aeae', 'aeaeaeaaeae', '{}', 'undefined', '2022-07-05', 0x5b6f626a656374204f626a6563745d, 'waudo'),
(22, 44, 21, 'azez', 'dqdqsd', '{}', 'undefined', '2022-07-06', 0x5b6f626a656374204f626a6563745d, 'waudo'),
(23, 44, 21, 'fhfghfgh', 'fghfhfgh', '{}', 'undefined', '2022-07-06', 0x5b6f626a656374204f626a6563745d, 'waudo');

-- --------------------------------------------------------

--
-- Structure de la table `article_message`
--

CREATE TABLE `article_message` (
  `id` int(11) NOT NULL,
  `text_content` text NOT NULL,
  `article_owner_id` mediumint(9) NOT NULL COMMENT 'Owner id',
  `article_type_id` mediumint(9) DEFAULT NULL,
  `text_title` varchar(255) NOT NULL,
  `imgUrl` varchar(255) DEFAULT NULL,
  `imgAlt` varchar(255) DEFAULT NULL,
  `ownerName` varchar(255) DEFAULT NULL,
  `ownerPseudo` varchar(255) NOT NULL,
  `dateCreated` datetime NOT NULL DEFAULT current_timestamp(),
  `likes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`likes`)),
  `disLikes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`disLikes`)),
  `image_file_blob` longblob DEFAULT NULL,
  `image_file_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `article_message`
--

INSERT INTO `article_message` (`id`, `text_content`, `article_owner_id`, `article_type_id`, `text_title`, `imgUrl`, `imgAlt`, `ownerName`, `ownerPseudo`, `dateCreated`, `likes`, `disLikes`, `image_file_blob`, `image_file_json`) VALUES
(11, '', 17, NULL, '', '', '', 'name', 'pseudo', '2022-06-23 16:16:07', NULL, NULL, '', '0'),
(2, 'ssssssssssss', 17, NULL, 'titre2', '', '', 'name', 'pseudo', '0000-00-00 00:00:00', NULL, NULL, '', '0'),
(3, 'message 3 et voilà', 17, NULL, 'titre3', 'C:fakepathwater-eaf.jpg', '', 'name', 'pseudo', '0000-00-00 00:00:00', NULL, NULL, '', '0'),
(4, 'message 3 et voilà', 17, NULL, 'titre3', 'C:fakepathwater-eaf.jpg', '', 'name', 'pseudo', '0000-00-00 00:00:00', NULL, NULL, '', '0'),
(5, 'Le message ', 17, NULL, 'Le titre', '', '', 'name', 'pseudo', '2022-06-22 04:24:24', NULL, NULL, '', '0'),
(6, 'Le message auj', 17, NULL, 'TItre aujourd\'', 'C:fakepathwater-eaf.jpg', '', 'name', 'pseudo', '2022-06-22 16:09:55', NULL, NULL, '', '0'),
(7, 'Mon message contient', 18, NULL, 'Mon MESSAGE QUoi', 'C:fakepathwater-eaf.jpg', '', 'name', 'pseudo', '2022-06-23 04:20:38', NULL, NULL, '', '0'),
(12, '', 17, NULL, '', '', '', 'name', 'pseudo', '2022-06-23 16:19:25', NULL, NULL, '', '0'),
(10, '', 17, NULL, '', '', '', 'name', 'pseudo', '2022-06-23 16:15:56', NULL, NULL, '', '0'),
(13, '', 18, NULL, '', '', '', 'name', 'pseudo', '2022-06-23 16:50:14', NULL, NULL, '', '0'),
(14, '', 18, NULL, '', '', '', 'name', 'pseudo', '2022-06-23 16:59:59', NULL, NULL, '', '0'),
(15, '', 18, NULL, '', '', '', 'name', 'pseudo', '2022-06-23 17:06:56', NULL, NULL, '', '0'),
(16, '', 18, NULL, '', '', '', 'name', 'pseudo', '2022-06-23 17:07:26', NULL, NULL, '', '0'),
(17, '', 18, NULL, '', '', '', 'name', 'pseudo', '2022-06-23 17:13:06', NULL, NULL, '', '0'),
(22, '', 0, NULL, '', '', 'pseudo1', NULL, 'undefinedé', '2022-07-04 02:51:46', NULL, NULL, '', '0'),
(23, 'vnvn', 21, NULL, 'vnvnvn', '', '', NULL, 'waudo', '2022-07-04 02:57:45', NULL, NULL, '', '0'),
(24, '', 21, NULL, '', '', '', NULL, 'waudo', '2022-07-04 11:59:19', NULL, NULL, '', '0'),
(25, 'OK bonsoir', 21, NULL, 'VOilà le nouveau', '', '', NULL, 'waudo', '2022-07-04 18:52:02', NULL, NULL, '', '0'),
(26, 'AAA', 21, NULL, 'mon Message', '', '', NULL, 'waudo', '2022-07-04 19:56:49', NULL, NULL, '', '0'),
(27, 'aaaaaaaaaaa', 21, NULL, 'UN nouveau', '', '', NULL, 'waudo', '2022-07-05 14:48:04', NULL, NULL, '', '0'),
(29, 'abcdqsd', 21, NULL, 'soutenance', '', '', NULL, 'waudo', '2022-07-05 21:22:43', NULL, NULL, '', '0'),
(30, 'qsdqd', 21, NULL, '', '', '', NULL, 'waudo', '2022-07-06 12:52:42', NULL, NULL, '', '0'),
(31, 'qsdqd', 21, NULL, '', '', '', NULL, 'waudo', '2022-07-06 12:52:49', NULL, NULL, '', '0'),
(32, 'qsdqd', 21, NULL, '', 'C:fakepathwater-eaf.jpg', '', NULL, 'waudo', '2022-07-06 12:53:01', NULL, NULL, '', '0'),
(33, '', 21, NULL, '', '', '', NULL, 'waudo', '2022-07-06 12:54:18', NULL, NULL, '', '0'),
(34, 'e', 21, NULL, '', '', '', NULL, 'waudo', '2022-07-06 13:00:02', NULL, NULL, '', '0'),
(35, 'e', 21, NULL, 'e', '', '', NULL, 'waudo', '2022-07-06 13:00:04', NULL, NULL, '', '0'),
(36, '', 21, NULL, '', '', '', NULL, 'waudo', '2022-07-06 13:00:30', NULL, NULL, '', '0'),
(37, '', 21, NULL, '', '', '', NULL, 'waudo', '2022-07-06 13:01:05', NULL, NULL, '', '0'),
(38, '', 21, NULL, '', '', '', NULL, 'waudo', '2022-07-06 13:01:21', NULL, NULL, '', '0'),
(39, '', 21, NULL, '', '', '', NULL, 'waudo', '2022-07-06 13:31:49', NULL, NULL, '', '0'),
(40, '', 21, NULL, '', '[object Object]', '', NULL, 'waudo', '2022-07-06 13:50:22', NULL, NULL, '', '0'),
(41, '', 21, NULL, '', 'undefined', '', NULL, 'waudo', '2022-07-06 13:52:37', NULL, NULL, '', '0'),
(42, '', 21, NULL, '', 'undefined', '', NULL, 'waudo', '2022-07-06 13:53:18', NULL, NULL, '', '0'),
(43, 'qsdqd', 21, NULL, '', 'undefined', '', NULL, 'waudo', '2022-07-06 13:53:27', NULL, NULL, '', '0'),
(44, 'qsdqdqsd', 21, NULL, 'qsdq', '[object Object]', '', NULL, 'waudo', '2022-07-06 13:53:36', NULL, NULL, '', '0'),
(45, 'undefined', 21, NULL, 'undefined', 'undefined', 'undefined', NULL, 'waudo', '2022-07-06 15:28:01', NULL, NULL, 0x5b6f626a656374204f626a6563745d, '{}');

-- --------------------------------------------------------

--
-- Structure de la table `article_message2`
--

CREATE TABLE `article_message2` (
  `id` int(11) NOT NULL,
  `text_content` text NOT NULL,
  `owner_id` mediumint(9) NOT NULL COMMENT 'Owner id',
  `type_id` mediumint(9) DEFAULT NULL,
  `text_title` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `image_alt` varchar(255) DEFAULT NULL,
  `owner_name` varchar(255) NOT NULL,
  `owner_pseudo` varchar(255) NOT NULL,
  `date_created` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `date_message`
--

CREATE TABLE `date_message` (
  `id` int(11) NOT NULL,
  `id_message` int(11) NOT NULL,
  `id_user` mediumint(9) NOT NULL,
  `is_from_article` tinyint(1) DEFAULT NULL COMMENT 'NOT REALLY NECESSARY',
  `date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `image`
--

CREATE TABLE `image` (
  `id` int(11) NOT NULL,
  `id_user` mediumint(9) NOT NULL,
  `id_message` int(11) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `image_alt` varchar(120) DEFAULT NULL,
  `is_from_article` tinyint(1) DEFAULT NULL COMMENT 'DETERMINES IF image is from article or answer, Constitue primary Key to set unique'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `image2`
--

CREATE TABLE `image2` (
  `id` int(11) NOT NULL,
  `image2` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `polling`
--

CREATE TABLE `polling` (
  `id_article` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `is_liked` varchar(255) COLLATE latin1_general_ci NOT NULL COMMENT 'IS NO MORE BOOLEAN => NOW JUST RECEIVE SIGN VALUE TRUE IF USER LIKE FALSE IF  DISLIKE 	'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Déchargement des données de la table `polling`
--

INSERT INTO `polling` (`id_article`, `id_user`, `is_liked`) VALUES
(1, 1, '2'),
(1, 2, '3'),
(21, 27, '4'),
(26, 29, '+'),
(27, 30, '+'),
(29, 21, '-'),
(29, 34, '+'),
(455, 44545, '4'),
(4545, 4545, '4'),
(4545, 45454, '4'),
(4545, 4544545, '5'),
(456456, 45646, '456456456'),
(456456, 456456456, '5'),
(464564, 46546, '6'),
(4546456, 45645646, '4'),
(4564564, 456546, '6'),
(6456456, 45645645, '456456'),
(6546546, 45654654, '4645654'),
(7777777, 777777777, '777777777'),
(45545454, 545454, '5'),
(54545454, 454545, '5'),
(2147483647, 2147483647, 'k');

-- --------------------------------------------------------

--
-- Structure de la table `polling resuse transaction and ither`
--

CREATE TABLE `polling resuse transaction and ither` (
  `id_article` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `is_liked` tinyint(1) NOT NULL COMMENT 'TRUE IF USER LIKE FALSE IF DISLIKE 	'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Déchargement des données de la table `polling resuse transaction and ither`
--

INSERT INTO `polling resuse transaction and ither` (`id_article`, `id_user`, `is_liked`) VALUES
(1, 1, 2),
(1, 2, 3),
(4545, 12, 0);

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `id` mediumint(9) NOT NULL,
  `id_permission` tinyint(4) NOT NULL,
  `id_user` mediumint(9) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id`, `id_permission`, `id_user`, `name`, `date`) VALUES
(1, 1, 9, 'user_role', NULL),
(2, 1, 10, 'user_role', NULL),
(3, 1, 11, 'user_role', NULL),
(4, 1, 12, 'user_role', NULL),
(5, 1, 13, 'user_role', NULL),
(6, 1, 14, 'user_role', NULL),
(7, 1, 15, 'user_role', NULL),
(8, 1, 16, 'user_role', NULL),
(9, 1, 17, 'user_role', NULL),
(10, 1, 18, 'user_role', NULL),
(11, 1, 19, 'user_role', NULL),
(12, 1, 20, 'user_role', NULL),
(13, 1, 21, 'user_role', NULL),
(14, 1, 22, 'user_role', NULL),
(15, 1, 23, 'user_role', NULL),
(16, 1, 24, 'user_role', NULL),
(17, 1, 25, 'user_role', NULL),
(18, 1, 26, 'user_role', NULL),
(19, 1, 27, 'user_role', NULL),
(20, 1, 28, 'user_role', NULL),
(21, 1, 29, 'user_role', NULL),
(22, 1, 30, 'user_role', NULL),
(23, 1, 31, 'user_role', NULL),
(24, 1, 32, 'user_role', NULL),
(25, 1, 33, 'user_role', NULL),
(26, 1, 34, 'user_role', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `type_message`
--

CREATE TABLE `type_message` (
  `id` int(11) NOT NULL,
  `normal_message` tinyint(1) NOT NULL,
  `annonce_message` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `user_`
--

CREATE TABLE `user_` (
  `id` mediumint(9) NOT NULL,
  `id_role` int(4) NOT NULL DEFAULT 1 COMMENT 'ROLE ADMIN MOD GUEST USER => 1',
  `email` varchar(255) NOT NULL,
  `password_` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `pseudo` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user_`
--

INSERT INTO `user_` (`id`, `id_role`, `email`, `password_`, `last_name`, `first_name`, `pseudo`) VALUES
(14, 1, 'nom1@email.com', 'ww', 'nom1', 'prenom1', 'pseudo1'),
(15, 1, 'nom2@email.com', 'ww', 'nom2', 'prenom2', 'pseudo2'),
(16, 1, 'nom3@email.com', '$2b$10$EaRlbHlkkAaJlWf9DvdaneaK0G5UaKpJIN.ItxR.H2cjkUEChuoXO', 'nom3', 'prenom3', 'pseudo3'),
(17, 1, 'nom4@email.com', '$2b$10$wFoLe0/ng4rr7yiOCZBHnejFYWTaSW5goFUZVJv8Gt7MTdF.S5m9C', 'nom4', 'prenom4', 'pseudo4'),
(18, 1, 'nom5@email.com', '$2b$10$JykjJ5nfWs5i13h7oIsfu.vlv5p3MLQRYb3eQNbyIYaLhHr8PeoJm', 'nom5', 'prenom5', 'pseudo5'),
(19, 1, 'nom6@email.com', '$2b$10$zqXEjWH/HWOHDUe0wV1U6uAcyG3pyKvXPNYSJVJ7Vm8vPxDInV2X6', 'nom6', 'prenom6', 'pseudo6'),
(21, 1, 'waymail@mail.com', '$2b$10$uHjMHRWxf.Ofj6jiqp2eHOHz.99u7mgRau8QquwX.lUWfg9vvdBhK', 'way', 'waypre', 'waudo'),
(28, 2000, 'd.c@lycos.com', '$2b$10$0oUmi5iKsoras7J8IPY0D.375DB2f7.CPP55rDSseB5QH360KwZNq', 'DAK', 'Claude', 'DL-odd-pseudo'),
(30, 1, 'isOwnerisOwner', '$2b$10$WN.H5R1.MRgLvNmt4erUPuxRsgA9lk7TmrxLMRpJTUbS/7Eg./S0y', 'isOwner', 'isOwner', 'isOwner'),
(31, 1, 'ad', '$2b$10$IIn116G2kG9UWy9OuxldL.mzAULGhwAwXAvDLIO77jo9vvTNnpNou', 'adadad', 'adadad', 'adad'),
(32, 1, 'abc@abc.com', '$2b$10$buq5cRAr8ZQQHmLZ6X4Cuep04MdzAKKaFROpFW./Ks6GWDT9S1DrS', 'abc', 'abc', 'abc'),
(33, 1, 'abcd@ss.f', '$2b$10$4L.E/yKtMu2NdLlvRXodY.Gja.pfLc6AIcC7XV.gHzDaOdAgbj53y', 'abcd', 'abcd', 'abcd'),
(34, 1, 'aa@aa', '$2b$10$DOW99D5R4SaHukFpVgTne.rjAP3pX9U9UXLGTDv3bOVKnxZ4xoXNK', 'aa', 'aa', 'aa');

--
-- Déclencheurs `user_`
--
DELIMITER $$
CREATE TRIGGER `upd_role` AFTER INSERT ON `user_` FOR EACH ROW BEGIN
 	INSERT INTO role
 	(id_permission,id_user,name)
    VALUES(1,NEW.id,"user_role");
 END
$$
DELIMITER ;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `answer_article`
--
ALTER TABLE `answer_article`
  ADD PRIMARY KEY (`id`,`id_article`,`id_user`) USING BTREE;

--
-- Index pour la table `article_message`
--
ALTER TABLE `article_message`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `article_message2`
--
ALTER TABLE `article_message2`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `date_message`
--
ALTER TABLE `date_message`
  ADD PRIMARY KEY (`id`,`id_message`,`id_user`),
  ADD KEY `fk_user` (`id_user`),
  ADD KEY `fk_message` (`id_message`);

--
-- Index pour la table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`,`id_user`,`id_message`),
  ADD KEY `fk_user` (`id_user`),
  ADD KEY `fk_message` (`id_message`);

--
-- Index pour la table `image2`
--
ALTER TABLE `image2`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `polling`
--
ALTER TABLE `polling`
  ADD PRIMARY KEY (`id_article`,`id_user`),
  ADD KEY `id_user` (`id_user`) USING BTREE;

--
-- Index pour la table `polling resuse transaction and ither`
--
ALTER TABLE `polling resuse transaction and ither`
  ADD PRIMARY KEY (`id_article`,`id_user`),
  ADD KEY `id_user` (`id_user`) USING BTREE;

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `type_message`
--
ALTER TABLE `type_message`
  ADD PRIMARY KEY (`id`,`normal_message`,`annonce_message`),
  ADD UNIQUE KEY `id` (`id`,`normal_message`,`annonce_message`);

--
-- Index pour la table `user_`
--
ALTER TABLE `user_`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `pseudo` (`pseudo`) USING BTREE;

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `answer_article`
--
ALTER TABLE `answer_article`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `article_message`
--
ALTER TABLE `article_message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT pour la table `article_message2`
--
ALTER TABLE `article_message2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `date_message`
--
ALTER TABLE `date_message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `image2`
--
ALTER TABLE `image2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `type_message`
--
ALTER TABLE `type_message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `user_`
--
ALTER TABLE `user_`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
