-- phpMyAdmin SQL Dump
-- version 3.5.8.2
-- http://www.phpmyadmin.net
--
-- Servidor: sql310.byetcluster.com
-- Tiempo de generación: 09-09-2014 a las 13:26:57
-- Versión del servidor: 5.6.19-67.0
-- Versión de PHP: 5.3.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `mb260_13335837_2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carreramateria`
--

CREATE TABLE IF NOT EXISTS `carreramateria` (
  `Id_Carrera_Materia` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Carrera` int(11) NOT NULL,
  `Id_Materia` int(11) NOT NULL,
  `Descripcion` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Carrera_Materia`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `carreramateria`
--

INSERT INTO `carreramateria` (`Id_Carrera_Materia`, `Id_Carrera`, `Id_Materia`, `Descripcion`) VALUES
(1, 1, 1, 'Matematicas'),
(2, 2, 2, 'Redes'),
(3, 3, 1, 'Matematica Industrial'),
(4, 1, 3, 'Para Informacion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carreras`
--

CREATE TABLE IF NOT EXISTS `carreras` (
  `Id_Carrera` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre_Carrera` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Carrera`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=7 ;

--
-- Volcado de datos para la tabla `carreras`
--

INSERT INTO `carreras` (`Id_Carrera`, `Nombre_Carrera`) VALUES
(1, 'Informacion'),
(2, 'Redes y Comunicaciones'),
(3, 'Produccion Industrial'),
(4, 'Electrica'),
(5, 'Logistica'),
(6, 'Mercadeo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cohorte`
--

CREATE TABLE IF NOT EXISTS `cohorte` (
  `Id_Cohorte` int(11) NOT NULL AUTO_INCREMENT,
  `Numero_Cohorte` varchar(15) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Cohorte`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `cohorte`
--

INSERT INTO `cohorte` (`Id_Cohorte`, `Numero_Cohorte`) VALUES
(1, '2013'),
(2, '2012'),
(3, '2011'),
(4, '2010');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante`
--

CREATE TABLE IF NOT EXISTS `estudiante` (
  `Cedula_Estudiante` int(20) NOT NULL,
  `Id_Cohorte_Estudiante` int(11) NOT NULL,
  `Id_Carrera_Estudiante` int(11) NOT NULL,
  `Referencias` varchar(60) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`Cedula_Estudiante`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `estudiante`
--

INSERT INTO `estudiante` (`Cedula_Estudiante`, `Id_Cohorte_Estudiante`, `Id_Carrera_Estudiante`, `Referencias`) VALUES
(20456123, 3, 2, 'Miguel Estudiante Redes'),
(21029953, 4, 1, 'NULL'),
(22224963, 4, 1, 'Manuel Estudiante Carrera Información');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantehorariocarreramateria`
--

CREATE TABLE IF NOT EXISTS `estudiantehorariocarreramateria` (
  `Id_EstudianteHorarioCarreraMateria` int(11) NOT NULL AUTO_INCREMENT,
  `Cedula` int(11) NOT NULL,
  `Id_HorarioCarreraMateria_E` int(11) NOT NULL,
  `Descripcion` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_EstudianteHorarioCarreraMateria`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `estudiantehorariocarreramateria`
--

INSERT INTO `estudiantehorariocarreramateria` (`Id_EstudianteHorarioCarreraMateria`, `Cedula`, `Id_HorarioCarreraMateria_E`, `Descripcion`) VALUES
(1, 21029953, 4, 'Cindy Arquitectura Martes Tarde'),
(2, 21029953, 1, 'Cindy Mate Lunes Mañana'),
(3, 22224963, 4, 'Manuel Arquitectura Martes Tarde'),
(4, 20456123, 3, 'Miguel Redes I Lunes Mañana');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantematerianota`
--

CREATE TABLE IF NOT EXISTS `estudiantematerianota` (
  `Id_EstudianteMateriaNota` int(11) NOT NULL AUTO_INCREMENT,
  `Id_EstudianteCarreraMateria_N` int(11) NOT NULL,
  `Id_Nota_Estudiante` int(11) NOT NULL,
  `Descripcion` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  `Id_CohorteNota` int(11) NOT NULL,
  PRIMARY KEY (`Id_EstudianteMateriaNota`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=24 ;

--
-- Volcado de datos para la tabla `estudiantematerianota`
--

INSERT INTO `estudiantematerianota` (`Id_EstudianteMateriaNota`, `Id_EstudianteCarreraMateria_N`, `Id_Nota_Estudiante`, `Descripcion`, `Id_CohorteNota`) VALUES
(1, 1, 20, 'Salió Bien', 1),
(2, 3, 15, '', 1),
(3, 3, 10, '', 2),
(4, 1, 17, '', 2),
(5, 1, 19, '', 2),
(6, 3, 11, '', 3),
(7, 1, 9, '', 5),
(8, 2, 15, '', 3),
(9, 1, 13, '', 4),
(10, 1, 20, '', 3),
(11, 1, 14, '', 2),
(12, 3, 20, '', 0),
(13, 3, 19, '', 0),
(14, 4, 16, '', 0),
(15, 4, 14, '', 0),
(16, 2, 14, '', 0),
(17, 4, 3, '', 0),
(18, 1, 7, '', 0),
(19, 3, 9, '', 0),
(20, 1, 20, '', 0),
(21, 4, 18, '', 0),
(22, 4, 20, '', 0),
(23, 2, 2, '', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fecha`
--

CREATE TABLE IF NOT EXISTS `fecha` (
  `Id_Fecha` int(11) NOT NULL AUTO_INCREMENT,
  `Dia` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Fecha`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=7 ;

--
-- Volcado de datos para la tabla `fecha`
--

INSERT INTO `fecha` (`Id_Fecha`, `Dia`) VALUES
(1, 'Lunes'),
(2, 'Martes'),
(3, 'Miercoles'),
(4, 'Jueves'),
(5, 'Viernes'),
(6, 'Sabado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hora`
--

CREATE TABLE IF NOT EXISTS `hora` (
  `Id_Hora` int(11) NOT NULL AUTO_INCREMENT,
  `Hora_Inicio` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `Hora_Fin` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Hora`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `hora`
--

INSERT INTO `hora` (`Id_Hora`, `Hora_Inicio`, `Hora_Fin`) VALUES
(1, '8:00am', '12:00pm'),
(2, '1:00pm', '5:00pm'),
(3, '6:00pm', '10:00pm');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

CREATE TABLE IF NOT EXISTS `horario` (
  `Id_Horario` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Fecha_Horario` int(11) NOT NULL,
  `Id_Hora_Horario` int(11) NOT NULL,
  `Descripcion` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Horario`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `horario`
--

INSERT INTO `horario` (`Id_Horario`, `Id_Fecha_Horario`, `Id_Hora_Horario`, `Descripcion`) VALUES
(1, 1, 1, 'Lunes En La Mañana'),
(2, 2, 2, 'Martes En La Tarde'),
(3, 3, 3, 'Miercoles en la noche');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horariocarreramateria`
--

CREATE TABLE IF NOT EXISTS `horariocarreramateria` (
  `Id_HorarioCarreraMateria` int(11) NOT NULL AUTO_INCREMENT,
  `Id_carrera_Materia_H` int(11) NOT NULL,
  `Id_Horario_M` int(11) NOT NULL,
  `Cedula_Profesor_H` int(11) NOT NULL,
  `Descripcion` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_HorarioCarreraMateria`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=6 ;

--
-- Volcado de datos para la tabla `horariocarreramateria`
--

INSERT INTO `horariocarreramateria` (`Id_HorarioCarreraMateria`, `Id_carrera_Materia_H`, `Id_Horario_M`, `Cedula_Profesor_H`, `Descripcion`) VALUES
(1, 1, 1, 7100893, 'Materia De Informaciona Dada Por Alejo En La Mañana'),
(2, 3, 2, 7100893, 'Para Produccion'),
(3, 2, 1, 7100894, 'Redes I Lunes en la mañana por Juan Alejo'),
(4, 4, 2, 7100894, 'Arquitectura Por Juan Alejo Martes Tarde'),
(5, 4, 3, 7100894, 'Juan Alejo Arquitectura Miercoles en la Noche');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE IF NOT EXISTS `materias` (
  `Id_Materia` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre_Materia` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Materia`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `materias`
--

INSERT INTO `materias` (`Id_Materia`, `Nombre_Materia`) VALUES
(1, 'Matematica Superior I'),
(2, 'Redes I'),
(3, 'Arquitectura Del Computador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas`
--

CREATE TABLE IF NOT EXISTS `notas` (
  `Nota` int(11) NOT NULL AUTO_INCREMENT,
  `Descripción` int(11) NOT NULL,
  PRIMARY KEY (`Nota`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=21 ;

--
-- Volcado de datos para la tabla `notas`
--

INSERT INTO `notas` (`Nota`, `Descripción`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10),
(11, 11),
(12, 12),
(13, 13),
(14, 14),
(15, 15),
(16, 16),
(17, 17),
(18, 18),
(19, 19),
(20, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor`
--

CREATE TABLE IF NOT EXISTS `profesor` (
  `Cedula_Profesor` int(25) NOT NULL,
  `Fecha_Ingreso` varchar(25) COLLATE utf32_spanish2_ci NOT NULL,
  PRIMARY KEY (`Cedula_Profesor`)
) ENGINE=MyISAM DEFAULT CHARSET=utf32 COLLATE=utf32_spanish2_ci;

--
-- Volcado de datos para la tabla `profesor`
--

INSERT INTO `profesor` (`Cedula_Profesor`, `Fecha_Ingreso`) VALUES
(7100893, '07-01-2008'),
(7100894, '14-05-2001');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipousuario`
--

CREATE TABLE IF NOT EXISTS `tipousuario` (
  `Id_TipoUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `Rol` varchar(15) COLLATE utf16_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_TipoUsuario`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf16 COLLATE=utf16_spanish2_ci AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `tipousuario`
--

INSERT INTO `tipousuario` (`Id_TipoUsuario`, `Rol`) VALUES
(1, 'Estudiante'),
(2, 'Profesor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `Cedula` int(20) NOT NULL,
  `Id_Tipo_Usuario` int(5) NOT NULL,
  `Nombre` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `Apellido` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `Password` varchar(25) COLLATE utf8_spanish2_ci NOT NULL,
  `Correo` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `Fecha_Nacimiento` varchar(25) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Cedula`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`Cedula`, `Id_Tipo_Usuario`, `Nombre`, `Apellido`, `Password`, `Correo`, `Fecha_Nacimiento`) VALUES
(7100893, 2, 'Jose', 'Alejo', '123456', 'alejo@gmail.com', '25-06-1980'),
(7100894, 2, 'kose antonio', 'Alejo', '7100894', 'ajuan@gmail.com', '19-08-1980'),
(20456123, 1, 'Miguel', 'Sanchez', '20456123', 'miguel@gmail,com', '05-01-1992'),
(21029953, 1, 'Cindy Yarimar', 'Salinas Zambrano', '21029953', 'cindysalinas15@gmail.com', '14-02-1993'),
(22224963, 1, 'Manuel ', 'Abrante Talavera ', '22224963', 'abrantemanuel@gmail.com', '11-03-1993'),
(24300113, 1, 'Alexandrei Rafael', 'Delgadillo Peraza', '24300113', 'alexandrei@gmail.com', '19/08/1993');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
