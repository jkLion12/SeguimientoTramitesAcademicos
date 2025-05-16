-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-05-2025 a las 00:04:42
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gradostitulostramites`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `año_trabajo`
--

CREATE TABLE `año_trabajo` (
  `id_anio_trabajo` int(11) NOT NULL,
  `anio` varchar(30) NOT NULL,
  `estado` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `año_trabajo`
--

INSERT INTO `año_trabajo` (`id_anio_trabajo`, `anio`, `estado`) VALUES
(195, '001-2023-UGyT-U', 'abierto'),
(196, '002-2023-UGyT-U', 'abierto'),
(197, '003-2023-UGyT-U', 'abierto'),
(198, '004-2023-UGyT-U', 'abierto'),
(199, '005-2023-UGyT-U', 'abierto'),
(200, '006-2023-UGyT-U', 'abierto'),
(201, '007-2023-UGyT-U', 'abierto'),
(202, '008-2023-UGyT-U', 'abierto'),
(203, '009-2023-UGyT-U', 'abierto'),
(204, '010-2023-UGyT-U', 'abierto'),
(205, '011-2023-UGyT-U', 'abierto'),
(206, '012-2023-UGyT-U', 'abierto'),
(207, '013-2023-UGyT-U', 'abierto'),
(208, '014-2023-UGyT-U', 'abierto'),
(209, '015-2023-UGyT-U', 'abierto'),
(210, '016-2023-UGyT-U', 'abierto'),
(211, '017-2023-UGyT-U', 'abierto'),
(212, '018-2023-UGyT-U', 'abierto'),
(213, '019-2023-UGyT-U', 'abierto'),
(214, '020-2023-UGyT-U', 'abierto'),
(215, '021-2023-UGyT-U', 'abierto'),
(216, '022-2023-UGyT-U', 'abierto'),
(217, '023-2023-UGyT-U', 'abierto'),
(218, '024-2023-UGyT-U', 'abierto'),
(219, '025-2023-UGyT-U', 'abierto'),
(220, '026-2023-UGyT-U', 'abierto'),
(221, '027-2023-UGyT-U', 'abierto'),
(222, '028-2023-UGyT-U', 'abierto'),
(223, '029-2023-UGyT-U', 'abierto'),
(224, '030-2023-UGyT-U', 'abierto'),
(225, '031-2023-UGyT-U', 'abierto'),
(226, '032-2023-UGyT-U', 'abierto'),
(227, '033-2023-UGyT-U', 'abierto'),
(228, '034-2023-UGyT-U', 'abierto'),
(229, '035-2023-UGyT-U', 'abierto'),
(230, '036-2023-UGyT-U', 'abierto'),
(231, '037-2023-UGyT-U', 'abierto'),
(232, '038-2023-UGyT-U', 'abierto'),
(233, '039-2023-UGyT-U', 'abierto'),
(234, '040-2023-UGyT-U', 'abierto'),
(235, '041-2023-UGyT-U', 'abierto'),
(236, '042-2023-UGyT-U', 'abierto'),
(237, '043-2023-UGyT-U', 'abierto'),
(238, '044-2023-UGyT-U', 'abierto'),
(239, '045-2023-UGyT-U', 'abierto'),
(240, '046-2023-UGyT-U', 'abierto'),
(241, '047-2023-UGyT-U', 'abierto'),
(242, '048-2023-UGyT-U', 'abierto'),
(243, '049-2023-UGyT-U', 'abierto'),
(244, '050-2023-UGyT-U', 'abierto'),
(245, '051-2023-UGyT-U', 'abierto'),
(246, '052-2023-UGyT-U', 'abierto'),
(247, '053-2023-UGyT-U', 'abierto'),
(248, '054-2023-UGyT-U', 'abierto'),
(249, '055-2023-UGyT-U', 'abierto'),
(250, '056-2023-UGyT-U', 'abierto'),
(251, '057-2023-UGyT-U', 'abierto'),
(252, '058-2023-UGyT-U', 'abierto'),
(253, '059-2023-UGyT-U', 'abierto'),
(254, '060-2023-UGyT-U', 'abierto'),
(255, '061-2023-UGyT-U', 'abierto'),
(279, '001-2024-UGyT-UNAMBA', 'abierto'),
(280, '002-2024-UGyT-UNAMBA', 'abierto'),
(281, '003-2024-UGyT-UNAMBA', 'abierto'),
(282, '004-2024-UGyT-UNAMBA', 'abierto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carta`
--

CREATE TABLE `carta` (
  `id_carta` int(11) NOT NULL,
  `id_anio_trabajo` int(11) NOT NULL,
  `nro_correlativo` varchar(25) NOT NULL,
  `detalle` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carta`
--

INSERT INTO `carta` (`id_carta`, `id_anio_trabajo`, `nro_correlativo`, `detalle`) VALUES
(193, 195, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(194, 196, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(195, 197, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(196, 198, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(197, 199, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(198, 200, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(199, 201, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(200, 202, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(201, 203, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(202, 204, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(203, 205, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(204, 206, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(205, 207, '005-2023-UGT-DFI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(206, 208, '035-2023-UGT-DFI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(207, 209, '005-2023-UGT-DFI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(208, 210, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(209, 211, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(210, 212, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(211, 213, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(212, 214, '022-2023-UGT-DFI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(213, 215, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(214, 216, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(215, 217, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(216, 218, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(217, 219, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(218, 220, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(219, 221, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(220, 222, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(221, 223, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(222, 224, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(223, 225, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(224, 226, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(225, 227, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(226, 228, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(227, 229, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(228, 230, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(229, 231, '004-2023-UGT-DFI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(230, 232, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(231, 233, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(232, 234, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(233, 235, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(234, 236, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(235, 237, '058-2023-UGT-DFI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(236, 238, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(237, 239, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(238, 240, '058-2023-UGT-DFI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(239, 241, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(240, 242, '025-2023-UGT-DFI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(241, 243, '026-2023-UGT-DFI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(242, 244, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(243, 245, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(244, 246, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(245, 247, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(246, 248, '100-2023-UGT-DFI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(247, 249, '087-2023-UGT-DFI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(248, 250, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(249, 251, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(250, 252, '256-2023-UGT-DFI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(251, 253, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(252, 254, '090-2023-UGT-DFI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(253, 255, '091-2023-UGT-DFI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(277, 279, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(278, 280, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(279, 281, '', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(280, 282, '54512-2023-UGT-DFI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_tramite`
--

CREATE TABLE `detalle_tramite` (
  `id_detalle_tramite` int(11) NOT NULL,
  `id_tramite` int(11) NOT NULL,
  `id_oficina` int(11) NOT NULL,
  `id_observacion` int(11) NOT NULL,
  `id_hito` int(11) NOT NULL,
  `fechatramite` varchar(25) NOT NULL,
  `estado` varchar(15) NOT NULL,
  `nro_orden` varchar(20) NOT NULL,
  `verificacion` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_tramite`
--

INSERT INTO `detalle_tramite` (`id_detalle_tramite`, `id_tramite`, `id_oficina`, `id_observacion`, `id_hito`, `fechatramite`, `estado`, `nro_orden`, `verificacion`) VALUES
(140, 211, 2, 160, 168, '12/01/2023 12:28 PM', 'En proceso', '1', 'no'),
(141, 212, 2, 161, 169, '15/01/2023 12:30 PM', 'En proceso', '1', 'no'),
(142, 213, 2, 162, 170, '22/02/2023 12:33 PM', 'En proceso', '1', 'no'),
(143, 214, 2, 163, 171, '22/02/2023 12:34 PM', 'En proceso', '1', 'no'),
(144, 215, 2, 164, 172, '03/03/2023 12:35 PM', 'En proceso', '1', 'no'),
(145, 216, 2, 165, 173, '03/03/2023 12:36 PM', 'En proceso', '1', 'no'),
(146, 217, 2, 166, 174, '09/04/2023 12:41 PM', 'Completado', '1', 'si'),
(147, 218, 2, 167, 175, '22/04/2023 12:41 PM', 'En proceso', '1', 'no'),
(148, 219, 2, 168, 176, '22/05/2023 12:42 PM', 'En proceso', '1', 'si'),
(149, 220, 2, 169, 177, '23/05/2023 10:28 AM', 'Completado', '1', 'si'),
(150, 221, 2, 170, 178, '23/05/2023 10:29 AM', 'Completado', '1', 'si'),
(151, 222, 2, 171, 179, '23/06/2023 10:32 AM', 'Completado', '1', 'si'),
(152, 223, 2, 172, 180, '27/06/2023 09:53 AM', 'Completado', '1', 'si'),
(153, 224, 2, 173, 181, '27/07/2023 04:02 PM', 'Completado', '1', 'si'),
(154, 225, 2, 174, 182, '28/07/2023 11:32 AM', 'Completado', '1', 'si'),
(155, 226, 2, 175, 183, '28/08/2023 05:27 PM', 'Completado', '1', 'si'),
(156, 227, 2, 176, 184, '28/08/2023 05:43 PM', 'Detenido', '1', 'observacion'),
(160, 231, 2, 180, 188, '29/04/2023 08:38 PM', 'En proceso', '1', 'no'),
(161, 232, 2, 181, 189, '29/08/2023 08:45 PM', 'En proceso', '1', 'no'),
(162, 233, 2, 182, 190, '29/06/2023 08:50 PM', 'En proceso', '1', 'no'),
(163, 234, 2, 183, 191, '29/07/2023 08:52 PM', 'En proceso', '1', 'no'),
(164, 235, 2, 184, 192, '29/03/2023 08:54 PM', 'En proceso', '1', 'no'),
(165, 236, 2, 185, 193, '29/09/2023 09:03 PM', 'En proceso', '1', 'no'),
(166, 237, 2, 186, 194, '29/09/2023 09:06 PM', 'En proceso', '1', 'no'),
(167, 238, 2, 187, 195, '29/10/2023 09:08 PM', 'En proceso', '1', 'si'),
(168, 239, 2, 188, 196, '29/10/2023 09:10 PM', 'En proceso', '1', 'no'),
(169, 240, 2, 189, 197, '29/11/2023 09:11 PM', 'En proceso', '1', 'no'),
(170, 241, 2, 190, 198, '29/11/2023 09:12 PM', 'En proceso', '1', 'no'),
(171, 242, 2, 191, 199, '29/12/2023 09:13 PM', 'En proceso', '1', 'no'),
(172, 243, 2, 192, 200, '29/12/2023 09:15 PM', 'En proceso', '1', 'no'),
(173, 244, 2, 193, 201, '29/11/2023 09:16 PM', 'En proceso', '1', 'no'),
(174, 245, 2, 194, 202, '29/09/2023 09:17 PM', 'En proceso', '1', 'no'),
(179, 250, 2, 199, 207, '30/11/2023 09:00 AM', 'En proceso', '1', 'no'),
(181, 252, 2, 201, 209, '30/12/2023 09:45 AM', 'Completado', '1', 'si'),
(182, 253, 2, 202, 210, '30/11/2023 10:24 AM', 'En proceso', '1', 'si'),
(185, 256, 2, 205, 213, '30/11/2023 12:22 PM', 'En proceso', '1', 'si'),
(186, 257, 2, 206, 214, '04/12/2023 11:41 AM', 'En proceso', '1', 'si'),
(187, 258, 2, 207, 215, '07/12/2023 09:14 AM', 'En proceso', '1', 'si'),
(188, 259, 2, 208, 216, '07/12/2023 11:11 AM', 'Detenido', '1', 'observacion'),
(189, 260, 2, 209, 217, '07/12/2023 11:24 AM', 'En proceso', '1', 'no'),
(190, 261, 2, 210, 218, '11/12/2023 10:30 AM', 'Completado', '1', 'si'),
(192, 263, 2, 212, 220, '11/12/2023 11:15 AM', 'Completado', '1', 'si'),
(193, 264, 2, 213, 221, '14/12/2023 10:41 AM', 'Completado', '1', 'si'),
(194, 265, 2, 214, 222, '21/12/2023 12:00 PM', 'En proceso', '1', 'no'),
(195, 266, 2, 215, 223, '21/12/2023 12:04 PM', 'Detenido', '1', 'observacion'),
(197, 268, 2, 217, 225, '14/12/2023', 'Completado', '1', 'si'),
(198, 269, 2, 218, 226, '13/12/2023', 'En proceso', '1', 'si'),
(199, 270, 2, 219, 227, '21/12/2023', 'En proceso', '1', 'si'),
(222, 293, 2, 242, 250, '01/01/2024', 'En proceso', '1', 'no'),
(223, 294, 2, 243, 251, '03/01/2024', 'En proceso', '1', 'no'),
(224, 295, 2, 244, 252, '01/01/2024', 'Detenido', '1', 'observacion'),
(225, 296, 2, 245, 253, '01/01/2024', 'Completado', '1', 'si');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dictamen`
--

CREATE TABLE `dictamen` (
  `id_dictamen` int(11) NOT NULL,
  `id_anio_trabajo` int(11) NOT NULL,
  `id_plan_estudio` int(11) NOT NULL,
  `nro_correlativo` varchar(25) NOT NULL,
  `detalle` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `dictamen`
--

INSERT INTO `dictamen` (`id_dictamen`, `id_anio_trabajo`, `id_plan_estudio`, `nro_correlativo`, `detalle`) VALUES
(191, 195, 1, '001-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(192, 196, 1, '002-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(193, 197, 1, '003-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(194, 198, 1, '004-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(195, 199, 1, '005-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(196, 200, 1, '006-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(197, 201, 1, '007-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(198, 202, 1, '008-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(199, 203, 1, '009-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(200, 204, 1, '010-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(201, 205, 1, '011-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(202, 206, 1, '012-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(203, 207, 1, '013-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(204, 208, 1, '014-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(205, 209, 1, '015-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(206, 210, 1, '016-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(207, 211, 1, '017-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(208, 212, 1, '018-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(209, 213, 1, '019-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(210, 214, 1, '020-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(211, 215, 1, '021-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(212, 216, 1, '022-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(213, 217, 1, '023-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(214, 218, 1, '024-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(215, 219, 1, '025-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(216, 220, 1, '026-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(217, 221, 1, '027-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(218, 222, 1, '028-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(219, 223, 1, '029-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(220, 224, 1, '030-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(221, 225, 1, '031-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(222, 226, 1, '032-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(223, 227, 1, '033-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(224, 228, 1, '034-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(225, 229, 1, '035-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(226, 230, 1, '036-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(227, 231, 1, '037-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(228, 232, 1, '038-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(229, 233, 1, '039-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(230, 234, 1, '040-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(231, 235, 1, '041-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(232, 236, 1, '042-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(233, 237, 1, '043-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(234, 238, 1, '044-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(235, 239, 1, '045-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(236, 240, 1, '046-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(238, 242, 10, '047-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(239, 243, 0, '048-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(240, 244, 0, '049-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(241, 245, 0, '050-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(242, 246, 0, '051-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(243, 247, 0, '052-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(244, 248, 1, '053-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(245, 249, 1, '054-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(246, 250, 0, '055-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(247, 251, 0, '056-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(248, 252, 1, '057-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(249, 253, 0, '058-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(250, 254, 1, '059-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(251, 255, 1, '060-2023-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(274, 279, 0, '001-2024-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(275, 280, 0, '002-2024-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(276, 281, 0, '003-2024-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA'),
(277, 282, 1, '004-2024-UGT-FI-UNAMBA', 'AQUI ENTRARA MAS TEXTO SI LO AMERITA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentos`
--

CREATE TABLE `documentos` (
  `id` int(11) NOT NULL,
  `id_dictamen` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `documentos`
--

INSERT INTO `documentos` (`id`, `id_dictamen`, `nombre`, `descripcion`) VALUES
(3, 245, 'FUT', 'AQUI VA LA DESCRIPCION ESTO SOLAMENTE ES UNA PRUEBA '),
(6, 245, 'Certificado de estudios', 'AQUI VA LA DESCRIPCION ESTO SOLAMENTE ES UNA ddddddPRUEBA '),
(7, 245, 'Certificado de notas', 'AQUI VA LA DESCRIPCION ESTO SOLAMENTE ES UNA ddddddPRUEBA '),
(8, 244, 'PRUEBA1', 'PRUEBA1.1'),
(9, 244, 'pueba', 'fsfs'),
(10, 244, 'pueba 2', 'fsfs'),
(11, 244, 'Fur ddekfnksnfsjks sjdhsjdhjshjdhjsh jshdjhsjdshdjhsjdhsjdj\ndsbdjs', 'sdsdsdsdsdf hsvdhvshdvshdv shgf h'),
(19, 244, 'prueba final', 'dddf'),
(20, 244, 'prueba final 2.0', 'dfdfd'),
(22, 206, 'Prueba 0.2', 'descrisf'),
(23, 245, 'Prueba final', 'fkdfnjd'),
(24, 244, 'Edny ', 'LLoclli'),
(25, 244, 'prueba para el edit', 'edita esto'),
(26, 245, 'prueba edit', 'dfdfdf'),
(28, 245, 'DOCUMENTO EDITADO', 'DESCRIPCION'),
(29, 245, 'ghghgh', '8565'),
(30, 248, 'fut', 'dfd'),
(31, 250, 'Fut', 'descripcion'),
(32, 250, 'prueba', 'SDEEE'),
(34, 251, 'dfdf', 'dfdf'),
(35, 251, 'dffggflll', 'dfg'),
(37, 277, 'fgfgf', '6565466545'),
(38, 277, 'jbjsdfvds4', '4545454'),
(39, 277, 'nbjdsbgvhsd', '545454545454');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `escuela`
--

CREATE TABLE `escuela` (
  `id_escuela` int(11) NOT NULL,
  `id_facultad` int(11) NOT NULL,
  `Nombre` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `escuela`
--

INSERT INTO `escuela` (`id_escuela`, `id_facultad`, `Nombre`) VALUES
(1, 1, 'Ingeniería Informática y Sistemas'),
(2, 2, 'Administración de Empresas'),
(3, 1, 'Ingeniería de Minas'),
(5, 3, 'Educación Inicial Intercultural Bilingüe');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante`
--

CREATE TABLE `estudiante` (
  `id_estudiante` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `dni` varchar(10) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `nrocelular` varchar(15) NOT NULL,
  `sexo` varchar(10) NOT NULL,
  `correo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estudiante`
--

INSERT INTO `estudiante` (`id_estudiante`, `nombre`, `apellido`, `dni`, `direccion`, `nrocelular`, `sexo`, `correo`) VALUES
(43, 'MELITZA GRACIELA', 'ALVITES LEON', '76237215', 'AV. quita sol', '963157896', '2', ''),
(44, 'ALEX GRIMALDO', 'CONDORI LIMA', '76502623', 'Su casa', '969865752', '1', ''),
(45, 'JOSE LUIS', 'GOMEZ UTANI', '76802896', 'SFSFJ', '965874669', '1', ''),
(46, 'ASUNCION LIZBETH', 'CCORAHUA BARRIENTOS', '76027642', 'dfdfd', '965855555', '2', ''),
(47, 'LUZ MILEIDY', 'MONZ?N MENDOZA', '71290876', 'ffdgd', '987458966', '2', ''),
(48, 'ESTEFANY', 'SUNQUILLPO AMPUERO', '71006897', 'dfd', '963257415', '2', ''),
(49, 'Estefani', 'Torres Guzman', '0558695', 'sfbsbfh', '963258741', '2', ''),
(50, 'RUBI FIORELIA', 'DAMIAN OCHOA', '72169937', 'fhgff', '968574551', '2', ''),
(51, 'ANGEL RONALDO', 'LEON CARRASCO', '75939060', 'ddfd', '965856988', '1', ''),
(52, 'JOSELY JANETH', 'VILLACREZ PE?A', '70679929', 'gchchcg', '996523555', '2', ''),
(53, 'ANTONY STEBEND ', 'CAMACHO GARCIA', '71809615', 'fdf', '962358748', '1', ''),
(54, 'LUIS ALBERTO', 'SANCHEZ VALVERDE', '72080836', 'mi casa', '926199554', '1', ''),
(55, 'FRITZ JOHAN', 'ARONE BARAZORDA', '71772911', 'sfsjf', '965856666', '1', ''),
(56, 'JEAN PHOL ALEXIS', 'CURI GARRAFA', '71713479', 'fghg', '918107154', '1', ''),
(57, 'EDNY', 'COAQUIRA BACA', '72023289', 'av. quita sol', '946264683', '1', ''),
(58, 'DEYBER', 'CUELLAR AYERVE', '71918890', 'abancay', '910089953', '1', ''),
(59, 'JACK EDWIN', 'HUAMANI AIQUIPA', '60015284', 'Urb. victor acosta primera etapa', '929308418', '1', ''),
(60, 'ANTHONY', 'MEZA BAUTISTA', '76006888', 'Urb. Naranjal S/N Pueblo Joven', '927386272', '1', ''),
(61, 'JOSELYN', 'HUAMAN AMPUERO', '71735032', 'SDS', '929308418', '2', ''),
(62, 'RUTH', 'VALCARCEL SIERRA', '71805816', 'sdsd', '929308418', '2', ''),
(63, 'MARLENY', 'NEGRON VALVERDE', '76089292', 'caida', '929308418', '2', ''),
(64, 'ALFREDO', 'CERVANTES CCASA', '75347703', 'Tamburco', '929308418', '1', ''),
(65, 'KEVIN ARMANDO', 'GUTIERREZ SOTO', '76960265', 'fer', '926542379', '1', ''),
(66, 'NURIA', 'SEGUNDO VILLA', '70811007', 'dd', '929308419', '2', ''),
(67, 'YEREMI CONNIE', 'YBARGUEN FERNANDEZ', '70247790', 'abancay', '929308418', '2', ''),
(68, 'JOSE ANDRES', 'QUISPE CALDERON', '71088261', 'dfd', '929308418', '1', ''),
(69, 'MILDRELY', 'LAIME CERVANTES', '71810284', 'sdsd', '929308418', '2', ''),
(70, 'NELSON EVER', 'MAMANI HURTADO', '43707860', 'sd', '929308418', '1', ''),
(71, 'YASBETH SAYDA', 'ARREDONDO ROQUE', '76240711', 'dsd', '946264683', '2', ''),
(72, 'YAMILETH', 'HUANCA VIVANCO', '73488756', 'sds', '946264683', '2', ''),
(73, 'NINO', 'TAPIA SUELDO', '77703937', 'ere', '946264683', '1', ''),
(74, 'MARCELO', 'ZAMORA CAHUANA', '47816384', 'dfd', '929308418', '1', ''),
(75, 'JOSE', 'CONDORI CONDORI', '73316975', 'sds', '929308418', '1', ''),
(77, 'ALEXANDHER', 'CHIPA CARDENAS', '71798973', 'mi casa', '927852607', '1', ''),
(80, 'RONALD REYGAN', 'VALENZUELA CARBAJAL', '77229865', 'dfd', '963300332', '1', ''),
(81, 'LUIS EDISON', '?AHUI VARGAS', '71958460', 'fdf', '985674596', '1', ''),
(82, 'OSCAR LORENZO', 'MOLINA PORTILLA', '75917761', 'dsdfd', '958655652', '1', ''),
(83, 'ANDERSON', 'MORIANO SAU?E', '77383373', 'dfdf', '900615531', '1', ''),
(84, 'GUSTAVO', 'CORAHUA BRAVO', '76937756', 'pturbbbb', '985658888', '1', ''),
(85, 'ROBIN WILLIAM', 'GUEVARA CONTRERAS', '71478466', 'fbgff', '968569555', '1', ''),
(87, 'LUCY ESTEFANI', 'GUTIERREZ RODRIGUEZ', '73959118', 'fgf', '910089953', '2', ''),
(88, 'YESICA', 'CONDORI NINA', '73537764', 'cvcv', '968596895', '2', ''),
(89, 'JHON FRANKLIN', 'ROMERO RAMOS', '75422755', 'prusbs', '965895986', '1', ''),
(90, 'CRISTIAN', 'MOSQUEIRA HUAMAN?AHUI', '76454010', 'xcxf', '958654869', '1', ''),
(91, 'DAVID', 'QUISPE MAUCAYLLE', '74555592', 'sddf', '965895586', '1', ''),
(98, 'HECTOR', 'CAMERO VENTURA', '73953402', 'dfdg', '956856955', '1', ''),
(112, 'JHON CLAUDIO', 'CASTILLO AGUILAR', '71809608', 'sdsd', '965413879', '1', ''),
(113, 'QUEDIN', 'OVALLE ALARCON', '74904558', 'UNAMBA', '910089953', '1', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante_escuela`
--

CREATE TABLE `estudiante_escuela` (
  `id_estudiante_escuela` int(11) NOT NULL,
  `id_estudiante` int(11) NOT NULL,
  `id_escuela` int(11) NOT NULL,
  `codigo` varchar(10) NOT NULL,
  `correo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estudiante_escuela`
--

INSERT INTO `estudiante_escuela` (`id_estudiante_escuela`, `id_estudiante`, `id_escuela`, `codigo`, `correo`) VALUES
(42, 43, 1, '182184', '182184@unamba.edu.pe'),
(43, 44, 1, '212113', '212113@unamba.edu.pe'),
(44, 45, 1, '182206', '182206@unamba.edu.pe'),
(45, 46, 1, '172137', '172137@unamba.edu.pe'),
(46, 47, 1, '221178', '221178@unamba.edu.pe'),
(47, 48, 1, '192229', '192229@unamba.edu.pe'),
(48, 49, 2, '232323', '232323@unamba.edu.pe'),
(49, 49, 3, '000000', '000000@unamba.edu.pe'),
(50, 50, 1, '201060', '201060@unamba.edu.pe'),
(51, 51, 1, '202053', '202053@unamba.edu.pe'),
(52, 52, 1, '221198', '221198@unamba.edu.pe'),
(53, 53, 1, '162135', '162135@unamba.edu.pe'),
(54, 54, 1, '182231', '182231@unamba.edu.pe'),
(55, 55, 1, '161130', '161130@unamba.edu.pe'),
(56, 56, 1, '191204', '191204@unamba.edu.pe'),
(57, 57, 1, '191200', '191200@unamba.edu.pe'),
(58, 58, 1, '191202', '191202@unamba.edu.pe'),
(59, 59, 1, '191211', '191211@unamba.edu.pe'),
(60, 60, 1, '181221', '181221@unamba.edu.pe'),
(61, 61, 1, '161146', '161146@unamba.edu.pe'),
(62, 62, 1, '181246', '181246@unamba.edu.pe'),
(63, 63, 1, '182214', '182214@unamba.edu.pe'),
(64, 64, 1, '172138', '172138@unamba.edu.pe'),
(65, 65, 1, '191209', '191209@unamba.edu.pe'),
(66, 66, 1, '191238', '191238@unamba.edu.pe'),
(67, 67, 1, '191245', '191245@unamba.edu.pe'),
(68, 68, 1, '212133', '212133@unamba.edu.pe'),
(69, 69, 1, '221170', '221170@unamba.edu.pe'),
(70, 70, 1, '141164', '141164@unamba.edu.pe'),
(71, 71, 1, '152115', '152115@unamba.edu.pe'),
(72, 72, 1, '172152', '172152@unamba.edu.pe'),
(73, 73, 1, '162177', '162177@unamba.edu.pe'),
(74, 74, 1, '82237', '82237@unamba.edu.pe'),
(75, 75, 1, '181203', '181203@unamba.edu.pe'),
(77, 77, 1, '162141', '162141@unamba.edu.pe'),
(80, 80, 1, '191241', '191241@unamba.edu.pe'),
(81, 81, 1, '191224', '191224@unamba.edu.pe'),
(82, 82, 1, '191222', '191222@unamba.edu.pe'),
(83, 83, 1, '192211', '192211@unamba.edu.pe'),
(84, 84, 1, '221161', '221161@unamba.edu.pe'),
(85, 85, 1, '221163', '221163@unamba.edu.pe'),
(87, 87, 1, '221164', '221164@unamba.edu.pe'),
(88, 88, 1, '182200', '182200@unamba.edu.pe'),
(89, 89, 1, '181238', '181238@unamba.edu.pe'),
(90, 90, 1, '181223', '181223@unamba.edu.pe'),
(91, 91, 1, '231196', '231196@unamba.edu.pe'),
(98, 98, 1, '212110', '212110@unamba.edu.pe'),
(112, 112, 1, '192185', '192185@unamba.edu.pe'),
(113, 113, 1, '182218', '182218@unamba.edu.pe');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facultad`
--

CREATE TABLE `facultad` (
  `id_facultad` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `facultad`
--

INSERT INTO `facultad` (`id_facultad`, `nombre`) VALUES
(1, 'Facultad de Ingeniería'),
(2, 'Facultad de Administración'),
(3, 'Educación y Ciencias Sociales');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fecha_hito`
--

CREATE TABLE `fecha_hito` (
  `id_fecha_hito` int(11) NOT NULL,
  `id_hito` int(11) NOT NULL,
  `fecha_hito_1` varchar(20) NOT NULL,
  `fecha_hito_2` varchar(20) NOT NULL,
  `fecha_hito_3` varchar(20) NOT NULL,
  `fecha_hito_4` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `fecha_hito`
--

INSERT INTO `fecha_hito` (`id_fecha_hito`, `id_hito`, `fecha_hito_1`, `fecha_hito_2`, `fecha_hito_3`, `fecha_hito_4`) VALUES
(1, 224, '21/12/2023 12:12 PM', '21/12/2023 12:26 PM', '', ''),
(2, 225, '21/12/2023 12:30 PM', '21/12/2023 12:49 PM', '21/12/2023 12:50 PM', ''),
(3, 226, '22/12/2023 10:27 AM', '22/12/2023 10:32 AM', '', ''),
(4, 227, '22/12/2023 11:43 AM', '22/12/2023 11:43 AM', '', ''),
(5, 228, '02/01/2024 10:40 AM', '', '', ''),
(6, 229, '02/01/2024 10:41 AM', '', '', ''),
(7, 230, '02/01/2024 10:59 AM', '', '', ''),
(8, 233, '02/01/2024 11:16 AM', '', '', ''),
(9, 234, '02/01/2024 11:27 AM', '', '', ''),
(10, 235, '02/01/2024 11:31 AM', '', '', ''),
(11, 236, '02/01/2024 11:33 AM', '', '', ''),
(12, 237, '02/01/2024 11:58 AM', '', '', ''),
(13, 238, '02/01/2024 11:58 AM', '', '', ''),
(14, 239, '02/01/2024 12:04 PM', '', '', ''),
(15, 240, '02/01/2024 12:05 PM', '', '', ''),
(16, 241, '02/01/2024 12:30 PM', '', '', ''),
(17, 242, '02/01/2024 12:35 PM', '', '', ''),
(18, 243, '02/01/2024 12:38 PM', '', '', ''),
(19, 244, '02/01/2024 12:43 PM', '', '', ''),
(20, 245, '02/01/2024 12:46 PM', '', '', ''),
(21, 246, '02/01/2024 12:47 PM', '', '', ''),
(22, 247, '02/01/2024 12:48 PM', '', '', ''),
(23, 248, '02/01/2024 12:50 PM', '', '', ''),
(24, 249, '02/01/2024 01:16 PM', '', '', ''),
(25, 250, '03/01/2024 03:57 PM', '', '', ''),
(26, 251, '03/01/2024 03:58 PM', '', '', ''),
(27, 252, '04/01/2024 11:47 AM', '04/01/2024 11:54 AM', '', ''),
(28, 253, '04/01/2024 01:01 PM', '04/01/2024 01:06 PM', '04/01/2024 01:14 PM', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hito`
--

CREATE TABLE `hito` (
  `id_hito` int(11) NOT NULL,
  `nro_hito` varchar(11) NOT NULL,
  `fecha` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hito`
--

INSERT INTO `hito` (`id_hito`, `nro_hito`, `fecha`) VALUES
(104, '6', ''),
(105, '2', ''),
(106, '2', ''),
(107, '2', ''),
(108, '2', ''),
(109, '2', ''),
(110, '2', ''),
(111, '2', ''),
(112, '2', ''),
(113, '2', ''),
(114, '2', ''),
(115, '2', ''),
(116, '2', ''),
(117, '2', ''),
(118, '2', ''),
(119, '2', ''),
(120, '2', ''),
(121, '2', ''),
(122, '2', ''),
(123, '2', ''),
(124, '2', ''),
(125, '2', ''),
(126, '2', ''),
(127, '2', ''),
(128, '2', ''),
(129, '2', ''),
(130, '2', ''),
(131, '2', ''),
(132, '2', ''),
(133, '2', ''),
(134, '2', ''),
(135, '2', ''),
(136, '3', ''),
(137, '2', ''),
(138, '3', ''),
(139, '3', ''),
(140, '3', ''),
(141, '3', ''),
(142, '2', ''),
(143, '3', ''),
(144, '2', ''),
(145, '2', ''),
(146, '2', ''),
(147, '2', ''),
(148, '2', ''),
(149, '2', ''),
(150, '2', ''),
(151, '2', ''),
(152, '2', ''),
(153, '2', ''),
(154, '2', ''),
(155, '2', ''),
(156, '2', ''),
(157, '2', ''),
(158, '2', ''),
(159, '2', ''),
(160, '2', ''),
(161, '2', ''),
(162, '2', ''),
(163, '2', ''),
(164, '2', ''),
(165, '2', ''),
(166, '2', ''),
(167, '2', ''),
(168, '2', ''),
(169, '2', ''),
(170, '2', ''),
(171, '2', ''),
(172, '2', ''),
(173, '2', ''),
(174, '6', ''),
(175, '2', ''),
(176, '3', ''),
(177, '6', ''),
(178, '6', ''),
(179, '6', ''),
(180, '6', ''),
(181, '6', ''),
(182, '6', ''),
(183, '6', ''),
(184, '2', ''),
(185, '2', ''),
(186, '2', ''),
(187, '6', ''),
(188, '2', ''),
(189, '2', ''),
(190, '2', ''),
(191, '2', ''),
(192, '2', ''),
(193, '2', ''),
(194, '2', ''),
(195, '3', ''),
(196, '2', ''),
(197, '2', ''),
(198, '2', ''),
(199, '2', ''),
(200, '2', ''),
(201, '2', ''),
(202, '2', ''),
(203, '2', ''),
(204, '6', ''),
(205, '2', ''),
(206, '2', ''),
(207, '2', ''),
(208, '2', ''),
(209, '6', ''),
(210, '3', ''),
(211, '2', ''),
(212, '2', ''),
(213, '3', ''),
(214, '3', ''),
(215, '3', ''),
(216, '2', '07/12/2023 11:11 AM'),
(217, '2', ''),
(218, '6', ''),
(219, '2', ''),
(220, '6', ''),
(221, '6', ''),
(222, '2', ''),
(223, '2', ''),
(224, '6', ''),
(225, '6', ''),
(226, '3', ''),
(227, '3', ''),
(228, '2', ''),
(229, '2', ''),
(230, '2', ''),
(231, '2', ''),
(232, '2', ''),
(233, '2', ''),
(234, '2', ''),
(235, '2', ''),
(236, '2', ''),
(237, '2', ''),
(238, '2', ''),
(239, '2', ''),
(240, '2', ''),
(241, '2', ''),
(242, '2', ''),
(243, '2', ''),
(244, '2', ''),
(245, '2', ''),
(246, '2', ''),
(247, '2', ''),
(248, '2', ''),
(249, '2', ''),
(250, '2', ''),
(251, '2', ''),
(252, '2', ''),
(253, '6', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `observacion`
--

CREATE TABLE `observacion` (
  `id_observacion` int(11) NOT NULL,
  `obs_foto` varchar(20) NOT NULL,
  `obs_doc` varchar(20) NOT NULL,
  `obs_fut` varchar(11) NOT NULL,
  `obs_constancia_egresado` varchar(11) NOT NULL,
  `obs_constancia_matricula` varchar(11) NOT NULL,
  `obs_certificado_estudio` varchar(11) NOT NULL,
  `obs_constancia_no_adeudar_libros` varchar(11) NOT NULL,
  `obs_fotogracia` varchar(11) NOT NULL,
  `obs_copia_legalizada_dni` varchar(11) NOT NULL,
  `obs_partida_nacimiento` varchar(11) NOT NULL,
  `obs_comprobante_pago_titulacion` varchar(11) NOT NULL,
  `obs_comprobante_pago_bachiller` varchar(11) NOT NULL,
  `obs_copia_certificado_idiomas` varchar(11) NOT NULL,
  `obs_resolucion_sustentacion_tesis` varchar(11) NOT NULL,
  `obs_constancia_investigacion` varchar(11) NOT NULL,
  `obs_constancia_biblioteca` varchar(11) NOT NULL,
  `obs_cd` varchar(11) NOT NULL,
  `obs_constancia_no_adeudar_escuela` varchar(11) NOT NULL,
  `obs_verificacion` varchar(11) NOT NULL,
  `otros` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `observacion`
--

INSERT INTO `observacion` (`id_observacion`, `obs_foto`, `obs_doc`, `obs_fut`, `obs_constancia_egresado`, `obs_constancia_matricula`, `obs_certificado_estudio`, `obs_constancia_no_adeudar_libros`, `obs_fotogracia`, `obs_copia_legalizada_dni`, `obs_partida_nacimiento`, `obs_comprobante_pago_titulacion`, `obs_comprobante_pago_bachiller`, `obs_copia_certificado_idiomas`, `obs_resolucion_sustentacion_tesis`, `obs_constancia_investigacion`, `obs_constancia_biblioteca`, `obs_cd`, `obs_constancia_no_adeudar_escuela`, `obs_verificacion`, `otros`) VALUES
(96, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(97, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(98, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(99, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(100, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(101, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(102, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(103, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(104, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(105, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(106, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(107, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(108, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(109, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(110, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(111, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(112, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(113, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(114, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(115, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(116, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(117, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(118, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(119, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(120, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(121, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(122, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(123, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(124, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(125, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(126, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(127, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(128, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '', '', '1', '1', '', ''),
(129, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(130, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '', '', '1', '1', '', ''),
(131, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '', '', '1', '1', '', ''),
(132, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '', '', '1', '1', '', ''),
(133, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '', '', '1', '1', '', ''),
(134, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(135, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '', '', '1', '1', '', ''),
(136, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(137, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(138, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(139, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(140, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(141, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(142, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(143, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(144, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(145, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(146, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(147, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(148, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(149, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(150, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(151, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(152, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(153, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(154, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(155, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(156, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(157, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(158, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(159, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(160, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(161, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(162, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(163, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(164, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(165, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(166, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '', '', '1', '1', '', ''),
(167, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(168, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '', '', '1', '1', '', ''),
(169, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '', '', '1', '1', '', ''),
(170, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '1', '1', '1', '1', '1', '', ''),
(171, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '', '', '1', '1', '', ''),
(172, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '1', '1', '1', '1', '1', '', ''),
(173, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '', '', '1', '1', '', ''),
(174, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '', '', '1', '1', '', ''),
(175, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '', '', '1', '1', '', ''),
(176, '', '', '1', '1', '1', '1', '1', '0', '1', '1', '1', '', '1', '1', '1', '1', '1', '1', '', ''),
(177, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(178, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(179, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '', '', '1', '1', '', ''),
(180, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(181, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(182, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(183, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(184, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(185, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(186, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(187, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '', '', '1', '1', '', ''),
(188, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(189, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(190, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(191, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(192, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(193, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(194, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(195, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(196, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '1', '1', '1', '1', '1', '', ''),
(197, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(198, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(199, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(200, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(201, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '1', '1', '1', '1', '1', '', ''),
(202, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '', '', '1', '1', '', ''),
(203, '', '', '1', '1', '1', '1', '1', '1', '0', '1', '', '1', '', '', '', '', '1', '1', '', ''),
(204, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(205, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '', '', '1', '1', '', ''),
(206, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '', '', '1', '1', '', ''),
(207, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '1', '1', '1', '1', '1', '', ''),
(208, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '', '', '1', '0', '', ''),
(209, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(210, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '1', '1', '1', '1', '1', '', ''),
(211, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(212, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '1', '1', '1', '1', '1', '', ''),
(213, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '', '', '1', '1', '', ''),
(214, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(215, '', '', '1', '1', '1', '1', '1', '0', '1', '1', '', '1', '', '', '', '', '1', '1', '', ''),
(216, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '', '', '1', '1', '', ''),
(217, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '', '', '1', '1', '', ''),
(218, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '', '', '1', '1', '', ''),
(219, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '1', '1', '1', '1', '1', '', ''),
(220, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(221, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(222, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(223, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(224, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(225, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(226, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(227, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(228, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(229, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(230, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(231, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(232, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(233, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(234, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(235, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(236, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(237, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(238, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(239, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(240, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(241, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(242, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(243, 'Por revisar', 'Por revisar', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Por pevisar'),
(244, '', '', '1', '1', '0', '1', '1', '1', '0', '1', '', '1', '', '', '', '', '1', '0', '', ''),
(245, '', '', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '', '', '1', '1', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oficina`
--

CREATE TABLE `oficina` (
  `id_oficina` int(11) NOT NULL,
  `codoficina` varchar(10) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `oficina`
--

INSERT INTO `oficina` (`id_oficina`, `codoficina`, `nombre`, `descripcion`) VALUES
(1, 'ofi01', 'Mesa de Partes', 'aqui se presentan la mayoria de documentos'),
(2, 'ofi02', 'Grados y Títulos de la Facultad de Ingeniería ', 'Aquí se decepcionan los expedientes con solicitud pera optar el grado de bachiller o titulo profesio'),
(3, 'ofi03', 'Decanatura de ingeniería', 'dfhishfiur');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plan_estudio`
--

CREATE TABLE `plan_estudio` (
  `id_plan_estudio` int(11) NOT NULL,
  `id_escuela` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `fecha` varchar(20) NOT NULL,
  `estudios_generales` varchar(45) NOT NULL,
  `estudios_esfecificos` varchar(45) NOT NULL,
  `estudios_especialidad` varchar(45) NOT NULL,
  `practicas_preprofecionales` varchar(45) NOT NULL,
  `total` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `plan_estudio`
--

INSERT INTO `plan_estudio` (`id_plan_estudio`, `id_escuela`, `nombre`, `fecha`, `estudios_generales`, `estudios_esfecificos`, `estudios_especialidad`, `practicas_preprofecionales`, `total`) VALUES
(0, 1, '', '', '', '', '', '', ''),
(1, 1, '536-2019-CU-UNAMBA', '12/12/2019', '36', '47', '124', 'SI', '207'),
(6, 1, '785-2022-CU-UNAMBA', '12/12/2022', '46', '40', '86', 'SI', '148'),
(7, 1, '785-2022-CU-UNAMBA', '12/12/2022', '46', '40', '86', 'SI', '148'),
(10, 1, 'prueba', '2023-12-11', '4', '0', '00', '0', '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `requisitos`
--

CREATE TABLE `requisitos` (
  `id_requisito` int(11) NOT NULL,
  `fut` varchar(100) NOT NULL,
  `detalle_fut` varchar(200) NOT NULL,
  `constancia_egresado` varchar(100) NOT NULL,
  `detalle_constancia_egresado` varchar(200) NOT NULL,
  `constancia_matricula` varchar(100) NOT NULL,
  `detalle_constancia_matricula` varchar(200) NOT NULL,
  `certificado_estudio` varchar(100) NOT NULL,
  `constancia_no_adeudar_libros` varchar(100) NOT NULL,
  `fotografia` varchar(100) NOT NULL,
  `copia_legalizada_dni` varchar(100) NOT NULL,
  `partida_nacimiento` varchar(100) NOT NULL,
  `comprobante_pago_titulacion` varchar(100) NOT NULL,
  `comprobante_pago_bachiller` varchar(100) NOT NULL,
  `copia_certificado_idiomas` varchar(100) NOT NULL,
  `resolucion_sustentacion_tesis` varchar(100) NOT NULL,
  `constancia_investigacion` varchar(100) NOT NULL,
  `constancia_biblioteca` varchar(100) NOT NULL,
  `cd` varchar(100) NOT NULL,
  `constancia_no_adeudar_escuela` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `requisitos`
--

INSERT INTO `requisitos` (`id_requisito`, `fut`, `detalle_fut`, `constancia_egresado`, `detalle_constancia_egresado`, `constancia_matricula`, `detalle_constancia_matricula`, `certificado_estudio`, `constancia_no_adeudar_libros`, `fotografia`, `copia_legalizada_dni`, `partida_nacimiento`, `comprobante_pago_titulacion`, `comprobante_pago_bachiller`, `copia_certificado_idiomas`, `resolucion_sustentacion_tesis`, `constancia_investigacion`, `constancia_biblioteca`, `cd`, `constancia_no_adeudar_escuela`) VALUES
(1, 'Fut completo', '', 'Constancia de Egresado (SSAA actualizado)	', '', 'Constancia de Matricula (SSAA actualizado)	', '', 'Certificado de Estudios originales (SSAA actualizado)	', 'Constancia de NO ADEUDAR libros de la universidad	', '03 fotografias, tamaño pasaporte a color fondo blanco terno Azul/blusa blanco (si retoques ni joyas)', 'Copia legalizada de DNI (Notario Publico)	', 'Partida de Nacimiento Original (año fiscal)	', 'Comprobante de pago por derecho de Titulación.', 'Comprobante de pago por derecho de graduación Otorgado del Grado Académico de Bachiller.', 'Copia fedatada de secretaria general del Certificado de idiomas de la (UNAMBA)	', 'Resolución de Consejo de Facultad de Sustentación de Tesis y Acia (fedatado por el Scre. General de ', 'Constancia emitida por la Unidad de Investigación de la Facultad (figurar conformidad de entrega de ', 'Constancia emitida por la Biblioteca central (conformidad de entrega de requisitos Aplicativo Web \"R', 'CD con los Documentos Requeridos.', 'Constancia de NO ADEUDAR por la dirección de la Escuela Profesional	');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seguimiento_tramite`
--

CREATE TABLE `seguimiento_tramite` (
  `id` int(11) NOT NULL,
  `idtramite` varchar(15) NOT NULL,
  `idoficina` varchar(15) NOT NULL,
  `estado` varchar(15) NOT NULL,
  `observacion` varchar(500) NOT NULL,
  `fechaderivacion` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tramites`
--

CREATE TABLE `tramites` (
  `id_tramite` int(11) NOT NULL,
  `codtramite` varchar(15) NOT NULL,
  `id_carta` int(11) NOT NULL,
  `id_dictamen` int(11) NOT NULL,
  `id_estudiante_escuela` int(11) NOT NULL,
  `tipo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tramites`
--

INSERT INTO `tramites` (`id_tramite`, `codtramite`, `id_carta`, `id_dictamen`, `id_estudiante_escuela`, `tipo`) VALUES
(211, 'sddfdf', 193, 191, 42, 'Bachiller'),
(212, 'tra005', 194, 192, 43, 'Titulo'),
(213, 'Tra002', 195, 193, 44, 'Titulo'),
(214, 'dfdfdf', 196, 194, 45, 'Bachiller'),
(215, 'dfdf', 197, 195, 46, 'Bachiller'),
(216, 'dfdf', 198, 196, 47, 'Titulo'),
(217, 'fdfdf', 199, 197, 48, 'Bachiller'),
(218, 'fgfg', 200, 198, 49, 'Titulo'),
(219, 'cc5', 201, 199, 50, 'Bachiller'),
(220, 'df4', 202, 200, 51, 'Bachiller'),
(221, 'tra005', 203, 201, 52, 'Titulo'),
(222, 'dfdfd', 204, 202, 53, 'Bachiller'),
(223, '322', 205, 203, 54, 'Titulo'),
(224, 'Tra005', 206, 204, 55, 'Bachiller'),
(225, 'fbfb', 207, 205, 56, 'Bachiller'),
(226, 'tra005', 208, 206, 57, 'Bachiller'),
(227, 'trammd54', 209, 207, 58, 'Titulo'),
(230, 'fdf', 212, 210, 59, 'Bachiller'),
(231, 'Trami005', 213, 211, 60, 'Titulo'),
(232, 'hbhh', 214, 212, 61, 'Titulo'),
(233, 'dsd', 215, 213, 62, 'Bachiller'),
(234, 'tra002', 216, 214, 63, 'Titulo'),
(235, 't008', 217, 215, 64, 'Bachiller'),
(236, 'ggt5', 218, 216, 65, 'Titulo'),
(237, 'fdfd', 219, 217, 66, 'Titulo'),
(238, 'dfd', 220, 218, 67, 'Bachiller'),
(239, 'tr002', 221, 219, 68, 'Titulo'),
(240, 'ddd', 222, 220, 69, 'Bachiller'),
(241, 'ds', 223, 221, 70, 'Titulo'),
(242, 'traa', 224, 222, 71, 'Titulo'),
(243, 'hhh', 225, 223, 72, 'Bachiller'),
(244, 'dfd', 226, 224, 73, 'Bachiller'),
(245, 'sds', 227, 225, 74, 'Bachiller'),
(246, 'tsds', 228, 226, 75, 'Bachiller'),
(247, 'tra005', 229, 227, 59, 'Titulo'),
(248, 'fdfd', 230, 228, 59, 'Bachiller'),
(249, 't008', 231, 229, 59, 'Titulo'),
(250, 'tr006', 232, 230, 59, 'Titulo'),
(252, 'fdf', 234, 232, 57, 'Titulo'),
(253, 'tr05', 235, 233, 77, 'Bachiller'),
(256, 'dfd', 238, 236, 80, 'Bachiller'),
(257, 'Hola', 240, 238, 45, 'Bachiller'),
(258, 'FGT778', 241, 239, 81, 'Titulo'),
(259, 'dfd', 242, 240, 82, 'Bachiller'),
(260, 'fdfd', 243, 241, 67, 'Titulo'),
(261, 'tratratra', 244, 242, 56, 'Titulo'),
(263, 'dfd', 246, 244, 57, 'Titulo'),
(264, '058', 247, 245, 83, 'Bachiller'),
(265, '58666', 248, 246, 84, 'Bachiller'),
(266, '89955', 249, 247, 85, 'Bachiller'),
(268, '86655', 251, 249, 87, 'Bachiller'),
(269, '75555', 252, 250, 88, 'Bachiller'),
(270, '12345', 253, 251, 59, 'Titulo'),
(293, '55555', 277, 274, 112, 'Bachiller'),
(294, '55551', 278, 275, 112, 'Titulo'),
(295, '2525', 279, 276, 113, 'Bachiller'),
(296, '898985', 280, 277, 45, 'Bachiller');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `ID` int(11) NOT NULL,
  `codusuario` varchar(10) NOT NULL,
  `usuario` varchar(30) NOT NULL,
  `nombreusuario` varchar(100) NOT NULL,
  `contrasena` varchar(25) NOT NULL,
  `estado` varchar(10) NOT NULL,
  `nivel` varchar(15) NOT NULL,
  `rol` varchar(30) NOT NULL,
  `fechacreacion` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`ID`, `codusuario`, `usuario`, `nombreusuario`, `contrasena`, `estado`, `nivel`, `rol`, `fechacreacion`) VALUES
(1, 'admin', 'admin@unamba.edu.pe', 'Administrador del Sistema', 'admin123', 'Activo', 'Director', 'Administrador', '2023-09-03'),
(2, 'user01', '191211@unamba.edu.pe', 'Jack Lion', '191211', 'Activo', 'Secretario', 'Usuario', '2023-09-04'),
(3, 'user02', '191200@unamba.edu.pe', 'Edny', '191200', 'Activo', 'Director', 'Administrador', '2023-08-28'),
(64, '126589', 'prueba', 'prueba no mas', '123', 'Activo', 'Secretario', 'Usuario', '2023-12-28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_token`
--

CREATE TABLE `usuarios_token` (
  `TokenId` int(200) NOT NULL,
  `UsuarioId` int(11) NOT NULL,
  `token` varchar(100) NOT NULL,
  `estado` varchar(15) NOT NULL,
  `fecha` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios_token`
--

INSERT INTO `usuarios_token` (`TokenId`, `UsuarioId`, `token`, `estado`, `fecha`) VALUES
(68, 1, '915941310dbd0dc0ed1a68071dec547d', 'Activo', '2023-09-11 16:13'),
(69, 2, 'ef6b275094c7e6fb2248a53ba8447fcd', 'Activo', '2023-09-11 16:24'),
(70, 64, '152c03523e83c27da4b739c1947fc6a6', 'Activo', '2023-12-28 10:19'),
(71, 3, '410b05e23fccc95663b02143107e083d', 'Activo', '2023-12-28 12:13');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `año_trabajo`
--
ALTER TABLE `año_trabajo`
  ADD PRIMARY KEY (`id_anio_trabajo`);

--
-- Indices de la tabla `carta`
--
ALTER TABLE `carta`
  ADD PRIMARY KEY (`id_carta`),
  ADD KEY `id_anio_trabajo` (`id_anio_trabajo`);

--
-- Indices de la tabla `detalle_tramite`
--
ALTER TABLE `detalle_tramite`
  ADD PRIMARY KEY (`id_detalle_tramite`),
  ADD KEY `id_oficina` (`id_oficina`),
  ADD KEY `id_observacion` (`id_observacion`),
  ADD KEY `id_hito` (`id_hito`),
  ADD KEY `id_tramite` (`id_tramite`);

--
-- Indices de la tabla `dictamen`
--
ALTER TABLE `dictamen`
  ADD PRIMARY KEY (`id_dictamen`),
  ADD KEY `id_anio_trabajo` (`id_anio_trabajo`),
  ADD KEY `id_plan_estudio` (`id_plan_estudio`);

--
-- Indices de la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_dictamen` (`id_dictamen`);

--
-- Indices de la tabla `escuela`
--
ALTER TABLE `escuela`
  ADD PRIMARY KEY (`id_escuela`),
  ADD KEY `id_facultad` (`id_facultad`);

--
-- Indices de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`id_estudiante`);

--
-- Indices de la tabla `estudiante_escuela`
--
ALTER TABLE `estudiante_escuela`
  ADD PRIMARY KEY (`id_estudiante_escuela`),
  ADD KEY `id_estudiante` (`id_estudiante`),
  ADD KEY `id_escuela` (`id_escuela`);

--
-- Indices de la tabla `facultad`
--
ALTER TABLE `facultad`
  ADD PRIMARY KEY (`id_facultad`);

--
-- Indices de la tabla `fecha_hito`
--
ALTER TABLE `fecha_hito`
  ADD PRIMARY KEY (`id_fecha_hito`),
  ADD KEY `id_hito` (`id_hito`);

--
-- Indices de la tabla `hito`
--
ALTER TABLE `hito`
  ADD PRIMARY KEY (`id_hito`);

--
-- Indices de la tabla `observacion`
--
ALTER TABLE `observacion`
  ADD PRIMARY KEY (`id_observacion`);

--
-- Indices de la tabla `oficina`
--
ALTER TABLE `oficina`
  ADD PRIMARY KEY (`id_oficina`);

--
-- Indices de la tabla `plan_estudio`
--
ALTER TABLE `plan_estudio`
  ADD PRIMARY KEY (`id_plan_estudio`),
  ADD KEY `id_escuela` (`id_escuela`);

--
-- Indices de la tabla `requisitos`
--
ALTER TABLE `requisitos`
  ADD PRIMARY KEY (`id_requisito`);

--
-- Indices de la tabla `seguimiento_tramite`
--
ALTER TABLE `seguimiento_tramite`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tramites`
--
ALTER TABLE `tramites`
  ADD PRIMARY KEY (`id_tramite`),
  ADD KEY `id_carta` (`id_carta`),
  ADD KEY `id_dictamen` (`id_dictamen`),
  ADD KEY `id_estudiante_escuela` (`id_estudiante_escuela`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `usuarios_token`
--
ALTER TABLE `usuarios_token`
  ADD PRIMARY KEY (`TokenId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `año_trabajo`
--
ALTER TABLE `año_trabajo`
  MODIFY `id_anio_trabajo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=283;

--
-- AUTO_INCREMENT de la tabla `carta`
--
ALTER TABLE `carta`
  MODIFY `id_carta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=281;

--
-- AUTO_INCREMENT de la tabla `detalle_tramite`
--
ALTER TABLE `detalle_tramite`
  MODIFY `id_detalle_tramite` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=226;

--
-- AUTO_INCREMENT de la tabla `dictamen`
--
ALTER TABLE `dictamen`
  MODIFY `id_dictamen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=278;

--
-- AUTO_INCREMENT de la tabla `documentos`
--
ALTER TABLE `documentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `escuela`
--
ALTER TABLE `escuela`
  MODIFY `id_escuela` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  MODIFY `id_estudiante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT de la tabla `estudiante_escuela`
--
ALTER TABLE `estudiante_escuela`
  MODIFY `id_estudiante_escuela` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT de la tabla `facultad`
--
ALTER TABLE `facultad`
  MODIFY `id_facultad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `fecha_hito`
--
ALTER TABLE `fecha_hito`
  MODIFY `id_fecha_hito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `hito`
--
ALTER TABLE `hito`
  MODIFY `id_hito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=254;

--
-- AUTO_INCREMENT de la tabla `observacion`
--
ALTER TABLE `observacion`
  MODIFY `id_observacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=246;

--
-- AUTO_INCREMENT de la tabla `oficina`
--
ALTER TABLE `oficina`
  MODIFY `id_oficina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `plan_estudio`
--
ALTER TABLE `plan_estudio`
  MODIFY `id_plan_estudio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `requisitos`
--
ALTER TABLE `requisitos`
  MODIFY `id_requisito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `seguimiento_tramite`
--
ALTER TABLE `seguimiento_tramite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tramites`
--
ALTER TABLE `tramites`
  MODIFY `id_tramite` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=297;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT de la tabla `usuarios_token`
--
ALTER TABLE `usuarios_token`
  MODIFY `TokenId` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carta`
--
ALTER TABLE `carta`
  ADD CONSTRAINT `carta_ibfk_1` FOREIGN KEY (`id_anio_trabajo`) REFERENCES `año_trabajo` (`id_anio_trabajo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle_tramite`
--
ALTER TABLE `detalle_tramite`
  ADD CONSTRAINT `detalle_tramite_ibfk_1` FOREIGN KEY (`id_tramite`) REFERENCES `tramites` (`id_tramite`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_tramite_ibfk_2` FOREIGN KEY (`id_hito`) REFERENCES `hito` (`id_hito`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_tramite_ibfk_3` FOREIGN KEY (`id_observacion`) REFERENCES `observacion` (`id_observacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_tramite_ibfk_4` FOREIGN KEY (`id_oficina`) REFERENCES `oficina` (`id_oficina`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `dictamen`
--
ALTER TABLE `dictamen`
  ADD CONSTRAINT `dictamen_ibfk_1` FOREIGN KEY (`id_anio_trabajo`) REFERENCES `año_trabajo` (`id_anio_trabajo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dictamen_ibfk_2` FOREIGN KEY (`id_plan_estudio`) REFERENCES `plan_estudio` (`id_plan_estudio`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD CONSTRAINT `documentos_ibfk_1` FOREIGN KEY (`id_dictamen`) REFERENCES `dictamen` (`id_dictamen`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `escuela`
--
ALTER TABLE `escuela`
  ADD CONSTRAINT `escuela_ibfk_1` FOREIGN KEY (`id_facultad`) REFERENCES `facultad` (`id_facultad`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `estudiante_escuela`
--
ALTER TABLE `estudiante_escuela`
  ADD CONSTRAINT `estudiante_escuela_ibfk_2` FOREIGN KEY (`id_escuela`) REFERENCES `escuela` (`id_escuela`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `estudiante_escuela_ibfk_4` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id_estudiante`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `fecha_hito`
--
ALTER TABLE `fecha_hito`
  ADD CONSTRAINT `fecha_hito_ibfk_1` FOREIGN KEY (`id_hito`) REFERENCES `hito` (`id_hito`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `plan_estudio`
--
ALTER TABLE `plan_estudio`
  ADD CONSTRAINT `plan_estudio_ibfk_1` FOREIGN KEY (`id_escuela`) REFERENCES `escuela` (`id_escuela`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tramites`
--
ALTER TABLE `tramites`
  ADD CONSTRAINT `tramites_ibfk_1` FOREIGN KEY (`id_carta`) REFERENCES `carta` (`id_carta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tramites_ibfk_2` FOREIGN KEY (`id_estudiante_escuela`) REFERENCES `estudiante_escuela` (`id_estudiante_escuela`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tramites_ibfk_3` FOREIGN KEY (`id_dictamen`) REFERENCES `dictamen` (`id_dictamen`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
