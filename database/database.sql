--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-06-09 10:54:50

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 7 (class 2615 OID 16387)
-- Name: pgagent; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA pgagent;


ALTER SCHEMA pgagent OWNER TO postgres;

--
-- TOC entry 5127 (class 0 OID 0)
-- Dependencies: 7
-- Name: SCHEMA pgagent; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA pgagent IS 'pgAgent system tables';


--
-- TOC entry 2 (class 3079 OID 16388)
-- Name: pgagent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgagent WITH SCHEMA pgagent;


--
-- TOC entry 5128 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgagent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgagent IS 'A PostgreSQL job scheduler';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 252 (class 1259 OID 16652)
-- Name: Ejercicio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Ejercicio" (
    id_ejercicio integer NOT NULL,
    id_creador integer NOT NULL,
    tipo character varying,
    dificultad numeric,
    contenido character varying
);


ALTER TABLE public."Ejercicio" OWNER TO postgres;

--
-- TOC entry 251 (class 1259 OID 16651)
-- Name: Ejercicio_id_creador_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Ejercicio_id_creador_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Ejercicio_id_creador_seq" OWNER TO postgres;

--
-- TOC entry 5129 (class 0 OID 0)
-- Dependencies: 251
-- Name: Ejercicio_id_creador_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Ejercicio_id_creador_seq" OWNED BY public."Ejercicio".id_creador;


--
-- TOC entry 250 (class 1259 OID 16650)
-- Name: Ejercicio_id_ejercicio_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Ejercicio_id_ejercicio_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Ejercicio_id_ejercicio_seq" OWNER TO postgres;

--
-- TOC entry 5130 (class 0 OID 0)
-- Dependencies: 250
-- Name: Ejercicio_id_ejercicio_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Ejercicio_id_ejercicio_seq" OWNED BY public."Ejercicio".id_ejercicio;


--
-- TOC entry 246 (class 1259 OID 16597)
-- Name: Hijo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Hijo" (
    id_usuario integer NOT NULL,
    id_padre integer,
    id_maestro integer,
    "nivelDificultad" numeric,
    accesibilidad character varying
);


ALTER TABLE public."Hijo" OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 16596)
-- Name: Hijo_id_maestro_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Hijo_id_maestro_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Hijo_id_maestro_seq" OWNER TO postgres;

--
-- TOC entry 5131 (class 0 OID 0)
-- Dependencies: 245
-- Name: Hijo_id_maestro_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Hijo_id_maestro_seq" OWNED BY public."Hijo".id_maestro;


--
-- TOC entry 244 (class 1259 OID 16595)
-- Name: Hijo_id_padre_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Hijo_id_padre_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Hijo_id_padre_seq" OWNER TO postgres;

--
-- TOC entry 5132 (class 0 OID 0)
-- Dependencies: 244
-- Name: Hijo_id_padre_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Hijo_id_padre_seq" OWNED BY public."Hijo".id_padre;


--
-- TOC entry 243 (class 1259 OID 16594)
-- Name: Hijo_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Hijo_id_usuario_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Hijo_id_usuario_seq" OWNER TO postgres;

--
-- TOC entry 5133 (class 0 OID 0)
-- Dependencies: 243
-- Name: Hijo_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Hijo_id_usuario_seq" OWNED BY public."Hijo".id_usuario;


--
-- TOC entry 242 (class 1259 OID 16567)
-- Name: Padre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Padre" (
    id_usuario integer NOT NULL,
    id_hijo integer NOT NULL
);


ALTER TABLE public."Padre" OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 16566)
-- Name: Padre_id_hijo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Padre_id_hijo_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Padre_id_hijo_seq" OWNER TO postgres;

--
-- TOC entry 5134 (class 0 OID 0)
-- Dependencies: 241
-- Name: Padre_id_hijo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Padre_id_hijo_seq" OWNED BY public."Padre".id_hijo;


--
-- TOC entry 240 (class 1259 OID 16565)
-- Name: Padre_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Padre_id_usuario_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Padre_id_usuario_seq" OWNER TO postgres;

--
-- TOC entry 5135 (class 0 OID 0)
-- Dependencies: 240
-- Name: Padre_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Padre_id_usuario_seq" OWNED BY public."Padre".id_usuario;


--
-- TOC entry 259 (class 1259 OID 16691)
-- Name: Progreso; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Progreso" (
    id_progreso integer NOT NULL,
    id_usuario integer NOT NULL,
    "puntajeTotal" numeric,
    "nivelActual" numeric,
    "desempeño" numeric
);


ALTER TABLE public."Progreso" OWNER TO postgres;

--
-- TOC entry 257 (class 1259 OID 16689)
-- Name: Progreso_id_progreso_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Progreso_id_progreso_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Progreso_id_progreso_seq" OWNER TO postgres;

--
-- TOC entry 5136 (class 0 OID 0)
-- Dependencies: 257
-- Name: Progreso_id_progreso_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Progreso_id_progreso_seq" OWNED BY public."Progreso".id_progreso;


--
-- TOC entry 258 (class 1259 OID 16690)
-- Name: Progreso_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Progreso_id_usuario_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Progreso_id_usuario_seq" OWNER TO postgres;

--
-- TOC entry 5137 (class 0 OID 0)
-- Dependencies: 258
-- Name: Progreso_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Progreso_id_usuario_seq" OWNED BY public."Progreso".id_usuario;


--
-- TOC entry 263 (class 1259 OID 16708)
-- Name: Reporte; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Reporte" (
    id_reporte integer NOT NULL,
    id_usuario integer NOT NULL,
    id_maestro integer NOT NULL,
    "fechaGeneracion" date,
    contenido character varying
);


ALTER TABLE public."Reporte" OWNER TO postgres;

--
-- TOC entry 262 (class 1259 OID 16707)
-- Name: Reporte_id_maestro_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Reporte_id_maestro_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Reporte_id_maestro_seq" OWNER TO postgres;

--
-- TOC entry 5138 (class 0 OID 0)
-- Dependencies: 262
-- Name: Reporte_id_maestro_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Reporte_id_maestro_seq" OWNED BY public."Reporte".id_maestro;


--
-- TOC entry 260 (class 1259 OID 16705)
-- Name: Reporte_id_reporte_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Reporte_id_reporte_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Reporte_id_reporte_seq" OWNER TO postgres;

--
-- TOC entry 5139 (class 0 OID 0)
-- Dependencies: 260
-- Name: Reporte_id_reporte_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Reporte_id_reporte_seq" OWNED BY public."Reporte".id_reporte;


--
-- TOC entry 261 (class 1259 OID 16706)
-- Name: Reporte_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Reporte_id_usuario_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Reporte_id_usuario_seq" OWNER TO postgres;

--
-- TOC entry 5140 (class 0 OID 0)
-- Dependencies: 261
-- Name: Reporte_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Reporte_id_usuario_seq" OWNED BY public."Reporte".id_usuario;


--
-- TOC entry 239 (class 1259 OID 16557)
-- Name: Usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Usuario" (
    id_usuario integer NOT NULL,
    nombre character varying,
    correo character varying,
    "contraseña" character varying,
    "tipoUsuario" character varying NOT NULL,
    "fechaRegistro" date
);


ALTER TABLE public."Usuario" OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 16556)
-- Name: Usuario_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Usuario_id_usuario_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Usuario_id_usuario_seq" OWNER TO postgres;

--
-- TOC entry 5141 (class 0 OID 0)
-- Dependencies: 238
-- Name: Usuario_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Usuario_id_usuario_seq" OWNED BY public."Usuario".id_usuario;


--
-- TOC entry 256 (class 1259 OID 16669)
-- Name: intentoEjercicio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."intentoEjercicio" (
    id_intento integer NOT NULL,
    id_usuario integer NOT NULL,
    id_ejercicio integer NOT NULL,
    "fechaRealizacion" date,
    resultado character varying,
    "erroresDetectados" numeric
);


ALTER TABLE public."intentoEjercicio" OWNER TO postgres;

--
-- TOC entry 255 (class 1259 OID 16668)
-- Name: intentoEjercicio_id_ejercicio_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."intentoEjercicio_id_ejercicio_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."intentoEjercicio_id_ejercicio_seq" OWNER TO postgres;

--
-- TOC entry 5142 (class 0 OID 0)
-- Dependencies: 255
-- Name: intentoEjercicio_id_ejercicio_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."intentoEjercicio_id_ejercicio_seq" OWNED BY public."intentoEjercicio".id_ejercicio;


--
-- TOC entry 253 (class 1259 OID 16666)
-- Name: intentoEjercicio_id_intento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."intentoEjercicio_id_intento_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."intentoEjercicio_id_intento_seq" OWNER TO postgres;

--
-- TOC entry 5143 (class 0 OID 0)
-- Dependencies: 253
-- Name: intentoEjercicio_id_intento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."intentoEjercicio_id_intento_seq" OWNED BY public."intentoEjercicio".id_intento;


--
-- TOC entry 254 (class 1259 OID 16667)
-- Name: intentoEjercicio_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."intentoEjercicio_id_usuario_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."intentoEjercicio_id_usuario_seq" OWNER TO postgres;

--
-- TOC entry 5144 (class 0 OID 0)
-- Dependencies: 254
-- Name: intentoEjercicio_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."intentoEjercicio_id_usuario_seq" OWNED BY public."intentoEjercicio".id_usuario;


--
-- TOC entry 249 (class 1259 OID 16614)
-- Name: maestro; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.maestro (
    id_usuario integer NOT NULL,
    id_alumno integer NOT NULL
);


ALTER TABLE public.maestro OWNER TO postgres;

--
-- TOC entry 248 (class 1259 OID 16613)
-- Name: maestro_id_alumno_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.maestro_id_alumno_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.maestro_id_alumno_seq OWNER TO postgres;

--
-- TOC entry 5145 (class 0 OID 0)
-- Dependencies: 248
-- Name: maestro_id_alumno_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.maestro_id_alumno_seq OWNED BY public.maestro.id_alumno;


--
-- TOC entry 247 (class 1259 OID 16612)
-- Name: maestro_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.maestro_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.maestro_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 5146 (class 0 OID 0)
-- Dependencies: 247
-- Name: maestro_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.maestro_id_usuario_seq OWNED BY public.maestro.id_usuario;


--
-- TOC entry 4876 (class 2604 OID 16655)
-- Name: Ejercicio id_ejercicio; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ejercicio" ALTER COLUMN id_ejercicio SET DEFAULT nextval('public."Ejercicio_id_ejercicio_seq"'::regclass);


--
-- TOC entry 4877 (class 2604 OID 16656)
-- Name: Ejercicio id_creador; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ejercicio" ALTER COLUMN id_creador SET DEFAULT nextval('public."Ejercicio_id_creador_seq"'::regclass);


--
-- TOC entry 4871 (class 2604 OID 16600)
-- Name: Hijo id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Hijo" ALTER COLUMN id_usuario SET DEFAULT nextval('public."Hijo_id_usuario_seq"'::regclass);


--
-- TOC entry 4872 (class 2604 OID 16601)
-- Name: Hijo id_padre; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Hijo" ALTER COLUMN id_padre SET DEFAULT nextval('public."Hijo_id_padre_seq"'::regclass);


--
-- TOC entry 4873 (class 2604 OID 16602)
-- Name: Hijo id_maestro; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Hijo" ALTER COLUMN id_maestro SET DEFAULT nextval('public."Hijo_id_maestro_seq"'::regclass);


--
-- TOC entry 4869 (class 2604 OID 16570)
-- Name: Padre id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Padre" ALTER COLUMN id_usuario SET DEFAULT nextval('public."Padre_id_usuario_seq"'::regclass);


--
-- TOC entry 4870 (class 2604 OID 16571)
-- Name: Padre id_hijo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Padre" ALTER COLUMN id_hijo SET DEFAULT nextval('public."Padre_id_hijo_seq"'::regclass);


--
-- TOC entry 4881 (class 2604 OID 16694)
-- Name: Progreso id_progreso; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Progreso" ALTER COLUMN id_progreso SET DEFAULT nextval('public."Progreso_id_progreso_seq"'::regclass);


--
-- TOC entry 4882 (class 2604 OID 16695)
-- Name: Progreso id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Progreso" ALTER COLUMN id_usuario SET DEFAULT nextval('public."Progreso_id_usuario_seq"'::regclass);


--
-- TOC entry 4883 (class 2604 OID 16711)
-- Name: Reporte id_reporte; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reporte" ALTER COLUMN id_reporte SET DEFAULT nextval('public."Reporte_id_reporte_seq"'::regclass);


--
-- TOC entry 4884 (class 2604 OID 16712)
-- Name: Reporte id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reporte" ALTER COLUMN id_usuario SET DEFAULT nextval('public."Reporte_id_usuario_seq"'::regclass);


--
-- TOC entry 4885 (class 2604 OID 16713)
-- Name: Reporte id_maestro; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reporte" ALTER COLUMN id_maestro SET DEFAULT nextval('public."Reporte_id_maestro_seq"'::regclass);


--
-- TOC entry 4868 (class 2604 OID 16560)
-- Name: Usuario id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Usuario" ALTER COLUMN id_usuario SET DEFAULT nextval('public."Usuario_id_usuario_seq"'::regclass);


--
-- TOC entry 4878 (class 2604 OID 16672)
-- Name: intentoEjercicio id_intento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."intentoEjercicio" ALTER COLUMN id_intento SET DEFAULT nextval('public."intentoEjercicio_id_intento_seq"'::regclass);


--
-- TOC entry 4879 (class 2604 OID 16673)
-- Name: intentoEjercicio id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."intentoEjercicio" ALTER COLUMN id_usuario SET DEFAULT nextval('public."intentoEjercicio_id_usuario_seq"'::regclass);


--
-- TOC entry 4880 (class 2604 OID 16674)
-- Name: intentoEjercicio id_ejercicio; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."intentoEjercicio" ALTER COLUMN id_ejercicio SET DEFAULT nextval('public."intentoEjercicio_id_ejercicio_seq"'::regclass);


--
-- TOC entry 4874 (class 2604 OID 16617)
-- Name: maestro id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maestro ALTER COLUMN id_usuario SET DEFAULT nextval('public.maestro_id_usuario_seq'::regclass);


--
-- TOC entry 4875 (class 2604 OID 16618)
-- Name: maestro id_alumno; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maestro ALTER COLUMN id_alumno SET DEFAULT nextval('public.maestro_id_alumno_seq'::regclass);


--
-- TOC entry 4830 (class 0 OID 16389)
-- Dependencies: 223
-- Data for Name: pga_jobagent; Type: TABLE DATA; Schema: pgagent; Owner: postgres
--

COPY pgagent.pga_jobagent (jagpid, jaglogintime, jagstation) FROM stdin;
4984	2025-06-01 02:46:38.112503-06	JosueNGC224
\.


--
-- TOC entry 4831 (class 0 OID 16398)
-- Dependencies: 225
-- Data for Name: pga_jobclass; Type: TABLE DATA; Schema: pgagent; Owner: postgres
--

COPY pgagent.pga_jobclass (jclid, jclname) FROM stdin;
\.


--
-- TOC entry 4832 (class 0 OID 16408)
-- Dependencies: 227
-- Data for Name: pga_job; Type: TABLE DATA; Schema: pgagent; Owner: postgres
--

COPY pgagent.pga_job (jobid, jobjclid, jobname, jobdesc, jobhostagent, jobenabled, jobcreated, jobchanged, jobagentid, jobnextrun, joblastrun) FROM stdin;
\.


--
-- TOC entry 4834 (class 0 OID 16456)
-- Dependencies: 231
-- Data for Name: pga_schedule; Type: TABLE DATA; Schema: pgagent; Owner: postgres
--

COPY pgagent.pga_schedule (jscid, jscjobid, jscname, jscdesc, jscenabled, jscstart, jscend, jscminutes, jschours, jscweekdays, jscmonthdays, jscmonths) FROM stdin;
\.


--
-- TOC entry 4835 (class 0 OID 16484)
-- Dependencies: 233
-- Data for Name: pga_exception; Type: TABLE DATA; Schema: pgagent; Owner: postgres
--

COPY pgagent.pga_exception (jexid, jexscid, jexdate, jextime) FROM stdin;
\.


--
-- TOC entry 4836 (class 0 OID 16498)
-- Dependencies: 235
-- Data for Name: pga_joblog; Type: TABLE DATA; Schema: pgagent; Owner: postgres
--

COPY pgagent.pga_joblog (jlgid, jlgjobid, jlgstatus, jlgstart, jlgduration) FROM stdin;
\.


--
-- TOC entry 4833 (class 0 OID 16432)
-- Dependencies: 229
-- Data for Name: pga_jobstep; Type: TABLE DATA; Schema: pgagent; Owner: postgres
--

COPY pgagent.pga_jobstep (jstid, jstjobid, jstname, jstdesc, jstenabled, jstkind, jstcode, jstconnstr, jstdbname, jstonerror, jscnextrun) FROM stdin;
\.


--
-- TOC entry 4837 (class 0 OID 16514)
-- Dependencies: 237
-- Data for Name: pga_jobsteplog; Type: TABLE DATA; Schema: pgagent; Owner: postgres
--

COPY pgagent.pga_jobsteplog (jslid, jsljlgid, jsljstid, jslstatus, jslresult, jslstart, jslduration, jsloutput) FROM stdin;
\.


--
-- TOC entry 5110 (class 0 OID 16652)
-- Dependencies: 252
-- Data for Name: Ejercicio; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Ejercicio" (id_ejercicio, id_creador, tipo, dificultad, contenido) FROM stdin;
\.


--
-- TOC entry 5104 (class 0 OID 16597)
-- Dependencies: 246
-- Data for Name: Hijo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Hijo" (id_usuario, id_padre, id_maestro, "nivelDificultad", accesibilidad) FROM stdin;
19	12	21	2	Visual
23	10	24	3	Auditiva
\.


--
-- TOC entry 5100 (class 0 OID 16567)
-- Dependencies: 242
-- Data for Name: Padre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Padre" (id_usuario, id_hijo) FROM stdin;
12	19
10	23
\.


--
-- TOC entry 5117 (class 0 OID 16691)
-- Dependencies: 259
-- Data for Name: Progreso; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Progreso" (id_progreso, id_usuario, "puntajeTotal", "nivelActual", "desempeño") FROM stdin;
\.


--
-- TOC entry 5121 (class 0 OID 16708)
-- Dependencies: 263
-- Data for Name: Reporte; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Reporte" (id_reporte, id_usuario, id_maestro, "fechaGeneracion", contenido) FROM stdin;
\.


--
-- TOC entry 5097 (class 0 OID 16557)
-- Dependencies: 239
-- Data for Name: Usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Usuario" (id_usuario, nombre, correo, "contraseña", "tipoUsuario", "fechaRegistro") FROM stdin;
1	Juan	juan@gmail.com	1234	hijo	2025-05-06
3	Carlos	carlos@gmail.com	4321	padre	2025-05-06
4	Josue	josue@gmail.com	volandovolando1	maestro	2025-05-06
5	Sebastian Saldivar	sebastian@gmail.com	e14cb9e5c0eeee0ea313a4e04fbd10aa17ac17aa33a3cad4bdfe74b87ca18ef8	hijo	2025-05-06
6	Josue Serrano	josue@gmail.com	8df0af46a1fcc956221428cea29696ebd894e147f99959641460f217ab878604	padre	2025-05-06
7	Adair Lopez	adair@gmail.com	e14cb9e5c0eeee0ea313a4e04fbd10aa17ac17aa33a3cad4bdfe74b87ca18ef8	maestro	2025-05-06
8	Carlos Perez	carlos@gmail.com	8df0af46a1fcc956221428cea29696ebd894e147f99959641460f217ab878604	hijo	2025-05-06
9	Miguel	miguel@gmail.com	$2b$10$nbG3sXZtS.LEf8TVxIHZU.dNXV2qh8ooejg7/pSzj3ICTSiN3C/h.	Hijo	2025-05-08
10	Fernando	fer@gmail.com	$2b$10$bsBNWhhuKQ20B1o8bh.FvOEdQE86GEgDlmq1EtLrURAQKf0lHVIGO	Padre	2025-05-08
11	lalo	lalo@gmail.com	$2b$10$Uk40suUHZ2ooqaJGwW9AdOEKpxWZSUX5dyVQ0v2K107.fMWHcqIjm	Maestro	2025-05-08
12	pepito	pepito@gmail.com	$2b$10$sXV4mxwT7EANIpYuLwzpyehgQlSTuL5xS8BcZlZFHvpouPDo32n66	Padre	2025-05-08
14	felipe	felipe@gmail.com	$2b$10$pgUb9O1yuS/v2cOlY2ksQO3DvH8ygmjQ8MF4PXGCmdAl/KZBTNskC	Hijo	2025-05-08
15	gregorio	greg@gmail.com	$2b$10$j9m7MfACLk3yxXV3hRt1zOLJP8/f1CzInxCiGWvKem6cbE7P3jwhW	Maestro	2025-05-08
16	felix	felix@gmail.com	$2b$10$8vpSJ.gUnGI8txfJO55Vzu2oELlnMaSbART7L0XYeTznkWrvU1lN.	Maestro	2025-05-08
17	gibby	gib@gmail.com	$2b$10$6q8mO2faJrkWpHRUBswe4.du9XEJpQ4eBpjR1kwvAZtkhokyWt5US	Hijo	2025-05-08
18	generico	gee@gmail.com	$2b$10$9gmbcP2ub4RwZBGiyEd6vO3a5GxYQxMXQx/sZmzSb4VL3GOeTuYxO	Maestro	2025-05-08
19	Sebastian	sebas@gmail.com	$2b$10$LqDfiaid1qLSwnFuk7fkpODch6L2RUuQ9jO3RHzMuGqGzdBfpywR.	Hijo	2025-05-09
20	Popeye	popeye@gmail.com	$2b$10$xNetGHcqI/rOLI0mw.WD9.gKpqzRIn0X6axRcnfSsqxdVmhoFIJy2	Hijo	2025-05-09
21	Josue	jos@gmail.com	$2b$10$0zcn2Hkxa6aC27TYlzPOeO.NI2I6W1oAyUbal.Y2iGYAVgexQiogG	Maestro	2025-05-11
22	Adair	ada@gmail.com	$2b$10$eepOGCIdEfe8SDKM0LeMm.2c5EwNNBvTaG.lJEpOa6hUJnO0fZIBO	Hijo	2025-05-19
23	Kevin Uriel	adler@gmail.com	$2b$10$EWcsolNF.q5PhWzKSQgV1uI8Nc6ejtLrxshJWHOODVOfdBKozYuxa	Hijo	2025-06-04
24	Manzano	manzano@gmail.com	$2b$10$HyhfYHgWV6YlswfAs5LW.OeWbQvD1ZlL9I7Fwtmc7pPugD3l6NQfO	Maestro	2025-06-04
25	Manzano	apple@gmail.com	$2b$10$LNKLnJImFtWkTheT09.coO8FmyfIpgoIO3cWx86C72iA9GSCB.sh.	Maestro	2025-06-04
26	Vivian	vivian@gmail.com	$2b$10$G3J3KF94aoPV7gFey9kaEOcVA/BJMgdQp1Z5p6Vdj76yZAFLEa6FS	Maestro	2025-06-09
\.


--
-- TOC entry 5114 (class 0 OID 16669)
-- Dependencies: 256
-- Data for Name: intentoEjercicio; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."intentoEjercicio" (id_intento, id_usuario, id_ejercicio, "fechaRealizacion", resultado, "erroresDetectados") FROM stdin;
\.


--
-- TOC entry 5107 (class 0 OID 16614)
-- Dependencies: 249
-- Data for Name: maestro; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.maestro (id_usuario, id_alumno) FROM stdin;
21	19
24	23
\.


--
-- TOC entry 5147 (class 0 OID 0)
-- Dependencies: 251
-- Name: Ejercicio_id_creador_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Ejercicio_id_creador_seq"', 1, false);


--
-- TOC entry 5148 (class 0 OID 0)
-- Dependencies: 250
-- Name: Ejercicio_id_ejercicio_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Ejercicio_id_ejercicio_seq"', 1, false);


--
-- TOC entry 5149 (class 0 OID 0)
-- Dependencies: 245
-- Name: Hijo_id_maestro_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Hijo_id_maestro_seq"', 1, false);


--
-- TOC entry 5150 (class 0 OID 0)
-- Dependencies: 244
-- Name: Hijo_id_padre_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Hijo_id_padre_seq"', 1, false);


--
-- TOC entry 5151 (class 0 OID 0)
-- Dependencies: 243
-- Name: Hijo_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Hijo_id_usuario_seq"', 1, false);


--
-- TOC entry 5152 (class 0 OID 0)
-- Dependencies: 241
-- Name: Padre_id_hijo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Padre_id_hijo_seq"', 1, false);


--
-- TOC entry 5153 (class 0 OID 0)
-- Dependencies: 240
-- Name: Padre_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Padre_id_usuario_seq"', 1, false);


--
-- TOC entry 5154 (class 0 OID 0)
-- Dependencies: 257
-- Name: Progreso_id_progreso_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Progreso_id_progreso_seq"', 1, false);


--
-- TOC entry 5155 (class 0 OID 0)
-- Dependencies: 258
-- Name: Progreso_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Progreso_id_usuario_seq"', 1, false);


--
-- TOC entry 5156 (class 0 OID 0)
-- Dependencies: 262
-- Name: Reporte_id_maestro_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Reporte_id_maestro_seq"', 1, false);


--
-- TOC entry 5157 (class 0 OID 0)
-- Dependencies: 260
-- Name: Reporte_id_reporte_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Reporte_id_reporte_seq"', 1, false);


--
-- TOC entry 5158 (class 0 OID 0)
-- Dependencies: 261
-- Name: Reporte_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Reporte_id_usuario_seq"', 1, false);


--
-- TOC entry 5159 (class 0 OID 0)
-- Dependencies: 238
-- Name: Usuario_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Usuario_id_usuario_seq"', 26, true);


--
-- TOC entry 5160 (class 0 OID 0)
-- Dependencies: 255
-- Name: intentoEjercicio_id_ejercicio_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."intentoEjercicio_id_ejercicio_seq"', 1, false);


--
-- TOC entry 5161 (class 0 OID 0)
-- Dependencies: 253
-- Name: intentoEjercicio_id_intento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."intentoEjercicio_id_intento_seq"', 1, false);


--
-- TOC entry 5162 (class 0 OID 0)
-- Dependencies: 254
-- Name: intentoEjercicio_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."intentoEjercicio_id_usuario_seq"', 1, false);


--
-- TOC entry 5163 (class 0 OID 0)
-- Dependencies: 248
-- Name: maestro_id_alumno_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.maestro_id_alumno_seq', 1, false);


--
-- TOC entry 5164 (class 0 OID 0)
-- Dependencies: 247
-- Name: maestro_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.maestro_id_usuario_seq', 1, false);


--
-- TOC entry 4931 (class 2606 OID 16660)
-- Name: Ejercicio pk_ejercicio; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ejercicio"
    ADD CONSTRAINT pk_ejercicio PRIMARY KEY (id_ejercicio);


--
-- TOC entry 4933 (class 2606 OID 16678)
-- Name: intentoEjercicio pk_intentoEjercicio; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."intentoEjercicio"
    ADD CONSTRAINT "pk_intentoEjercicio" PRIMARY KEY (id_intento);


--
-- TOC entry 4929 (class 2606 OID 16639)
-- Name: maestro pk_maestro; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maestro
    ADD CONSTRAINT pk_maestro UNIQUE (id_usuario);


--
-- TOC entry 4927 (class 2606 OID 16625)
-- Name: Hijo pk_niño; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Hijo"
    ADD CONSTRAINT "pk_niño" UNIQUE (id_usuario);


--
-- TOC entry 4925 (class 2606 OID 16632)
-- Name: Padre pk_padre; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Padre"
    ADD CONSTRAINT pk_padre UNIQUE (id_usuario);


--
-- TOC entry 4935 (class 2606 OID 16699)
-- Name: Progreso pk_progreso; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Progreso"
    ADD CONSTRAINT pk_progreso PRIMARY KEY (id_progreso);


--
-- TOC entry 4937 (class 2606 OID 16717)
-- Name: Reporte pk_reporte; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reporte"
    ADD CONSTRAINT pk_reporte PRIMARY KEY (id_reporte);


--
-- TOC entry 4921 (class 2606 OID 16564)
-- Name: Usuario pk_user; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT pk_user PRIMARY KEY (id_usuario);


--
-- TOC entry 4923 (class 2606 OID 16611)
-- Name: Usuario pk_usuario; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT pk_usuario UNIQUE (id_usuario);


--
-- TOC entry 4943 (class 2606 OID 16640)
-- Name: maestro fk_alumno; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maestro
    ADD CONSTRAINT fk_alumno FOREIGN KEY (id_alumno) REFERENCES public."Hijo"(id_usuario) NOT VALID;


--
-- TOC entry 4945 (class 2606 OID 16661)
-- Name: Ejercicio fk_creador; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ejercicio"
    ADD CONSTRAINT fk_creador FOREIGN KEY (id_creador) REFERENCES public.maestro(id_usuario);


--
-- TOC entry 4946 (class 2606 OID 16684)
-- Name: intentoEjercicio fk_ejercicio; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."intentoEjercicio"
    ADD CONSTRAINT fk_ejercicio FOREIGN KEY (id_ejercicio) REFERENCES public."Ejercicio"(id_ejercicio);


--
-- TOC entry 4938 (class 2606 OID 16626)
-- Name: Padre fk_hijo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Padre"
    ADD CONSTRAINT fk_hijo FOREIGN KEY (id_hijo) REFERENCES public."Hijo"(id_usuario) NOT VALID;


--
-- TOC entry 4944 (class 2606 OID 16619)
-- Name: maestro fk_maestro; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maestro
    ADD CONSTRAINT fk_maestro FOREIGN KEY (id_usuario) REFERENCES public."Usuario"(id_usuario);


--
-- TOC entry 4949 (class 2606 OID 16723)
-- Name: Reporte fk_maestro; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reporte"
    ADD CONSTRAINT fk_maestro FOREIGN KEY (id_maestro) REFERENCES public.maestro(id_usuario);


--
-- TOC entry 4940 (class 2606 OID 16736)
-- Name: Hijo fk_maestro; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Hijo"
    ADD CONSTRAINT fk_maestro FOREIGN KEY (id_maestro) REFERENCES public."Usuario"(id_usuario);


--
-- TOC entry 4941 (class 2606 OID 16731)
-- Name: Hijo fk_padre; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Hijo"
    ADD CONSTRAINT fk_padre FOREIGN KEY (id_padre) REFERENCES public."Usuario"(id_usuario);


--
-- TOC entry 4939 (class 2606 OID 16572)
-- Name: Padre fk_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Padre"
    ADD CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES public."Usuario"(id_usuario);


--
-- TOC entry 4942 (class 2606 OID 16605)
-- Name: Hijo fk_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Hijo"
    ADD CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES public."Usuario"(id_usuario);


--
-- TOC entry 4947 (class 2606 OID 16679)
-- Name: intentoEjercicio fk_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."intentoEjercicio"
    ADD CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES public."Hijo"(id_usuario);


--
-- TOC entry 4948 (class 2606 OID 16700)
-- Name: Progreso fk_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Progreso"
    ADD CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES public."Hijo"(id_usuario);


--
-- TOC entry 4950 (class 2606 OID 16718)
-- Name: Reporte fk_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reporte"
    ADD CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES public."Hijo"(id_usuario);


-- Completed on 2025-06-09 10:54:51

--
-- PostgreSQL database dump complete
--

